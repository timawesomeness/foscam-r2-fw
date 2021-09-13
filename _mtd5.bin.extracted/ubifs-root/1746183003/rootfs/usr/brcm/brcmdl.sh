#!/bin/sh

cp libusb* /usr/lib/
./bcmdl -n nvram_wubb-738gn.nvm fw_bcm43143b0.bin.trx -C 10
