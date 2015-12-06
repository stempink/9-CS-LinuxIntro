#!/bin/bash

echo "Here we go..."
touch z_img.bin

for i in {0..9}
  do
      cat hda00000000$i.bin z_img.bin > z_img.bin
done

for i in {10..99}
  do
      cat hda0000000$i.bin z_img.bin > z_img.bin
done

for i in {100..912}
  do
      cat hda000000$i.bin z_img.bin > z_img.bin
done

echo "Ouss"
