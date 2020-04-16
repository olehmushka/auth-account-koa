#!/bin/bash

KEY_NAME="key"
CERT_NAME="cert"

rm $KEY_NAME.pem $CERT_NAME.pem

openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout $KEY_NAME.pem -out $CERT_NAME.pem

mv $(pwd)/$KEY_NAME.pem $(pwd)/secrets/$KEY_NAME.pem
mv $(pwd)/$CERT_NAME.pem $(pwd)/secrets/$CERT_NAME.pem
