#!/bin/bash

echo "Slicing into parts (putting in ./newparts/)"
mkdir newparts
split -b 65536 -d -a 9 hda_img.bin ./newparts/hda
echo "Appending .bin extensions... "
cd newparts
find . -type f -exec mv '{}' '{}'.bin \;
echo "DONE"
