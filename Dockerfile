FROM golang as build
WORKDIR /app
ADD . .
RUN CGO_ENABLED=0 GOOS=linux go build -o tictactoe

FROM scratch
COPY --from=build /app/tictactoe /tictactoe
EXPOSE 80/tcp
EXPOSE 443/udp
ENTRYPOINT ["/tictactoe"]