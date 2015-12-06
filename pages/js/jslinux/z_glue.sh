#!/bin/bash

echo "Here we go..."
cp hda000000000.bin z_img.bin

for i in {1..9}
  do
      echo "Now splicing in $i"
      cat hda00000000$i.bin z_img.bin > z_img_tmp.bin
      rm z_img.bin
      mv z_img_tmp.bin z_img.bin
done

for i in {10..99}
  do
      echo "Now splicing in $i"
      cat hda0000000$i.bin z_img.bin > z_img_tmp.bin
      rm z_img.bin
      mv z_img_tmp.bin z_img.bin
done

for i in {100..911}
  do
      echo "Now splicing in $i"
      cat hda000000$i.bin z_img.bin > z_img_tmp.bin
      rm z_img.bin
      mv z_img_tmp.bin z_img.bin
done

echo "Ouss"
