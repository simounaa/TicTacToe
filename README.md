Chromium can be instructed to trust a self-signed certificate using command-line flags.  Here are step-by-step instructions on how to do that:

1. Generate a certificate and a private key: ```openssl req -newkey rsa:2048 -nodes -keyout cert.key -x509 -out cert.pem -subj '/CN=Test Certificate' -addext "subjectAltName = DNS:localhost"```

2. Compute the fingerprint of the certificate: ```openssl x509 -pubkey -noout -in cert.pem | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | base64```

The result should be a base64-encoded blob that looks like this: ```Gi/HIwdiMcPZo2KBjnstF5kQdLI5bPrYJ8i3Vi6Ybck=```

3. Pass a flag to Chromium indicating what host and port should be allowed to use the self-signed certificate.  For instance, if the host is localhost, and the port is 4433, the flag would be: ```--origin-to-force-quic-on=localhost:443```

4. Pass a flag to Chromium indicating which certificate needs to be trusted. For the example above, that flag would be: ```--ignore-certificate-errors-spki-list=Gi/HIwdiMcPZo2KBjnstF5kQdLI5bPrYJ8i3Vi6Ybck=```
