# TicTacToe

TicTacToe is a game of tic-tac-toe.

## Installation

```bash
git clone https://github.com/D4N13LxD4V1D/tictactoe.git
cd tictactoe
npm install
```

## Development

```bash
npm run dev
```

## Usage

```bash
openssl req -new -x509 -nodes \
    -out cert.pem \                   
    -keyout key.pem \             
    -newkey ec \
    -pkeyopt ec_paramgen_curve:prime256v1 \
    -subj '/CN=127.0.0.1' \
    -days 14
HASH=`openssl x509 -pubkey -noout -in cert.pem |
    openssl pkey -pubin -outform der |
    openssl dgst -sha256 -binary |
    base64`
npm run build
node .
chromium \
    --ignore-certificate-errors-spki-list=$HASH \
    --origin-to-force-quic-on=127.0.0.1:443 \
    https://localhost:443
```

