#!/bin/bash

rs256filename=jwtRS256
cp $(pwd)/src/lib/crypto/$rs256filename.key $(pwd)/dist/lib/crypto/$rs256filename.key
cp $(pwd)/src/lib/crypto/$rs256filename.pem $(pwd)/dist/lib/crypto/$rs256filename.pem
