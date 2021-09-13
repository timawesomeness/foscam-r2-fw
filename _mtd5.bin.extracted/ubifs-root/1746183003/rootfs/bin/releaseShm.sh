#!/bin/sh

for i  in `ipcs -m|grep root|cut -f 2 -d" "`; do ipcrm -m $i; done
