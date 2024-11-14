package main

import (
	"context"
	"crypto/md5"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/quic-go/quic-go/http3"
	"github.com/quic-go/webtransport-go"
)

type Lobby struct {
	ID      string   `json:"id"`
	Players []string `json:"players"`
}

type Game struct {
	Lobby Lobby  `json:"lobby"`
	Turn  int    `json:"turn"`
	Board [9]int `json:"board"`
}

func main() {
	go serve()
	redirect()
}

func serve() {
	ctx := context.Background()

	h := md5.New()

	lobbies := map[string]Lobby{}
	games := map[string]Game{}

	server := webtransport.Server{
		H3: http3.Server{
			Addr:      ":443",
			TLSConfig: &tls.Config{},
		},
	}

	http.Handle("/", http.FileServer(http.Dir("./static")))

	http.HandleFunc("/create", func(w http.ResponseWriter, r *http.Request) {
		session, _ := server.Upgrade(w, r)
		stream, _ := session.OpenUniStreamSync(ctx)

		h.Write([]byte(r.RemoteAddr))
		id := fmt.Sprintf("%x", h.Sum(nil))

		lobby := Lobby{
			ID:      id,
			Players: []string{r.RemoteAddr},
		}
		lobbies[id] = lobby

		bytes, _ := json.Marshal(lobby)

		stream.Write(bytes)
		stream.Close()
	})

	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {
		session, _ := server.Upgrade(w, r)
		stream, _ := session.OpenUniStreamSync(ctx)

		for {
			var open_lobbies []Lobby
			for _, l := range lobbies {
				if len(l.Players) < 2 {
					open_lobbies = append(open_lobbies, l)
				}
			}

			bytes, _ := json.Marshal(open_lobbies)
			stream.Write(bytes)
		}
	})

	http.HandleFunc("/join", func(w http.ResponseWriter, r *http.Request) {
		session, _ := server.Upgrade(w, r)
		stream, _ := session.OpenUniStreamSync(ctx)

		id := r.URL.Query().Get("id")

		for _, l := range lobbies {
			if l.ID == id {
				l.Players = append(l.Players, r.RemoteAddr)

				bytes, _ := json.Marshal(l)
				stream.Write(bytes)

				break
			}
		}

		stream.Close()
	})

	http.HandleFunc("/start", func(w http.ResponseWriter, r *http.Request) {
		session, _ := server.Upgrade(w, r)
		stream, _ := session.OpenUniStreamSync(ctx)

		id := r.URL.Query().Get("id")
		game := Game{
			Lobby: lobbies[id],
			Turn:  0,
		}
		games[id] = game

		bytes, _ := json.Marshal(game)
		stream.Write(bytes)

		stream.Close()
	})

	http.HandleFunc("/move", func(w http.ResponseWriter, r *http.Request) {
		session, _ := server.Upgrade(w, r)
		stream, _ := session.OpenUniStreamSync(ctx)

		id := r.URL.Query().Get("id")
		move, _ := strconv.Atoi(r.URL.Query().Get("move"))

		for _, g := range games {
			if g.Lobby.ID == id {
				g.Board[move] = g.Turn
				g.Turn = (g.Turn + 1) % 2

				bytes, _ := json.Marshal(g)
				stream.Write(bytes)
				break
			}
		}

		stream.Close()
	})

	fmt.Println("Starting HTTP/3 server on https://localhost:443")
	server.ListenAndServeTLS("cert.pem", "cert.key")
}

func redirect() {
	fmt.Println("Starting HTTP/1 server on http://localhost:80")
	http.ListenAndServe(":80", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://"+r.Host+r.URL.Path, http.StatusMovedPermanently)
	}))
}
