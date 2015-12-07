#!/bin/bash
# Step 1: Glue the pre-existing parts (using this one).
# Step 2: Make changes in the new filestructure (./tmpfs).
# Step 3: Use z_slice.sh to slice everything up.
# Step 4: Run z_update.sh to update the JS files.
echo "Concatenating parts..."
cat hda* > ./hda_img.bin
echo "Making tmpfs directory to mount hda_img.bin image to..."
mkdir tmpfs
echo "Mounting ./hda_img.bin as a loop in ./tmpfs..."
sudo mount -o loop ./hda_img.bin ./tmpfs
echo "DONE."
