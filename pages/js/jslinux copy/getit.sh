#!/bin/bash

echo "Here we go..."
for i in {0..9}
  do
      wget http://bellard.org/jslinux/hda00000000$i.bin
done
