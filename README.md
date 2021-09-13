Root access to the camera is easy - hit enter at the Ambarella bootloader, password is `ipc.fos~`, then you can run `boot console=ttyS0 ubi.mtd=lnx root=ubi0:rootfs rw rootfstype=ubifs init=/bin/sh` to boot to a root shell. Environment is a moderately-featured busybox with a few extra utilities.

Serial is 3.3V UART next to ethernet jack - with the top side up, ethernet rotated towards you, from left to right: [TX, GND, RX, VCC]. 115200 baud, 8N1. Hardware flow control might have to be off?

```
# cat /proc/mtd
dev:    size   erasesize  name
mtd0: 00020000 00020000 "bst"
mtd1: 00140000 00020000 "bld"
mtd2: 00140000 00020000 "ptb"
mtd3: 01000000 00020000 "pba"
mtd4: 00800000 00020000 "pri"
mtd5: 03000000 00020000 "lnx"
mtd6: 00600000 00020000 "add"
mtd7: 02c00000 00020000 "adc"
```

Most info here is relevant to this camera as well: https://github.com/santeri3700/opticam_o8_hacking
