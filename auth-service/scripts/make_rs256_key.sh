keyfilename=jwtRS256
# remove files generated ealier
rm $(pwd)/src/lib/crypto/$keyfilename.key $(pwd)/src/lib/crypto/$keyfilename.pem

# generate jwtRS256.key file
ssh-keygen -t rsa -b 4096 -m PEM -f $keyfilename.key
# generate jwtRS256.pem file
openssl rsa -in $(pwd)/$keyfilename.key -text > $(pwd)/$keyfilename.pem

# move needed files to suitable directory
mv $(pwd)/$keyfilename.key $(pwd)/src/lib/crypto/$keyfilename.key
mv $(pwd)/$keyfilename.pem $(pwd)/src/lib/crypto/$keyfilename.pem
# remove useless generated file
rm $(pwd)/$keyfilename.key.pub
