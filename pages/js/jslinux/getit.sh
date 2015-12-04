#!/bin/bash

echo "Here we go..."
for i in {0..99}
  do
     wget http://bellard.org/jslinux/hda0000000$i.bin
done

for i in {100..999}
  do
     wget http://bellard.org/jslinux/hda000000$i.bin
done
