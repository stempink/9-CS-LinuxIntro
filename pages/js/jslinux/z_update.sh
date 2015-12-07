#!/bin/bash

echo "Dismounting tmpfs..."
sudo umount ./tmpfs
echo "Deleting old files..."
rm hda*
echo "Moving new .bin files..."
mv ./newparts/* ./
echo "DONE"
