#!/bin/sh
###amb boot.sh startup

echo "set default system time"
date -s 2000.01.01-08:00:00
#sysinit
#echo 10 > /proc/sys/vm/dirty_ratio
echo 4096 > /proc/sys/vm/min_free_kbytes

echo 93 > /sys/class/gpio/export
sleep 1

#add network optimization
sysctl -w net.core.wmem_max=5000000
sysctl -w net.core.wmem_default=5000000

#step 1 --init sensor ov4689
#sensor reset
echo 99 > /sys/class/gpio/export 
echo low > /sys/class/gpio/gpio99/direction
sleep 1
echo high > /sys/class/gpio/gpio99/direction

#step2 --check product.xml to get ability
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep '<model>' | awk -F ">" '{print $2}' | awk -F "<" '{printf("MODELNUM=\"%d\"",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'modelName' | awk -F ">" '{print $2}' | awk -F "<" '{printf("MODELNAME=\"%s\"",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'sensorType' | awk -F ">" '{print $2}' | awk -F "<" '{printf("SENSOR=%d",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'wifiType' | awk -F ">" '{print $2}' | awk -F "<" '{printf("WIFI=%d",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'language' | awk -F ">" '{print $2}' | awk -F "<" '{printf("LANGUAGE=%d",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'modelVersion' | awk -F ">" '{print $2}' | awk -F "<" '{printf("MODELVERSION=%d",$1);}') 
eval $(cat /mnt/mtd/app/config/ProductConfig.xml | grep 'reserveFlag1' | awk -F ">" '{print $2}' | awk -F "<" '{printf("RESERVEFLAG1=%d",$1);}')
echo "==== Your model name is $MODELNAME SENSOR=$SENSOR WIFI=$WIFI LANGUAGE=$LANGUAGE MODELVERSION=$MODELVERSION MODELNUM=$MODELNUM ===="

#init diff wifi
Version=`uname -a | awk '{print $3}'`  
case $WIFI in
	3 ) #bcm43143
		ln -sf /lib/modules/$Version/wifi_usb/modules.alias /lib/modules/$Version/modules.alias 
		ln -sf /lib/modules/$Version/wifi_usb/modules.alias.bin /lib/modules/$Version/modules.alias.bin
	     	ln -sf /lib/modules/$Version/wifi_usb/modules.dep /lib/modules/$Version/modules.dep 
		ln -sf /lib/modules/$Version/wifi_usb/modules.dep.bin /lib/modules/$Version/modules.dep.bin
		ln -sf /lib/modules/$Version/wifi_usb/modules.usbmap /lib/modules/$Version/modules.usbmap
	    ;;
	4 ) #ap5256
		ln -sf /lib/modules/$Version/wifi_sdio/modules.alias /lib/modules/$Version/modules.alias 
		ln -sf /lib/modules/$Version/wifi_sdio/modules.alias.bin /lib/modules/$Version/modules.alias.bin
	     	ln -sf /lib/modules/$Version/wifi_sdio/modules.dep /lib/modules/$Version/modules.dep 
		ln -sf /lib/modules/$Version/wifi_sdio/modules.dep.bin /lib/modules/$Version/modules.dep.bin
		ln -sf /lib/modules/$Version/wifi_sdio/modules.usbmap /lib/modules/$Version/modules.usbmap	    
	    ;;
	* )
		ln -sf /lib/modules/$Version/wifi_usb/modules.alias /lib/modules/$Version/modules.alias 
		ln -sf /lib/modules/$Version/wifi_usb/modules.alias.bin /lib/modules/$Version/modules.alias.bin
	     	ln -sf /lib/modules/$Version/wifi_usb/modules.dep /lib/modules/$Version/modules.dep 
		ln -sf /lib/modules/$Version/wifi_usb/modules.dep.bin /lib/modules/$Version/modules.dep.bin
		ln -sf /lib/modules/$Version/wifi_usb/modules.usbmap /lib/modules/$Version/modules.usbmap
	    ;;
esac

#init diff sensor
ADJ_PARAMS_DIR=/etc/idsp/adj_params_fos
SENSORS_3D_DIR=/etc/idsp/sensors_fos
cd $ADJ_PARAMS_DIR

case $SENSOR in                                                                                                         
                
    11 ) #ov4689 4M        
	for binfile in `ls ov4689*_4M.bin`
	do
	    binfile_sl=`echo "$binfile" | sed 's/\_4M//g'`
	    ln -sf $ADJ_PARAMS_DIR/$binfile /etc/idsp/adj_params/$binfile_sl
        done

	cd $SENSORS_3D_DIR
	for binfile in `ls ov4689*_4M.bin`                                      
        do                                                                      
            binfile_sl=`echo "$binfile" | sed 's/\_4M//g'`                      
            ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile_sl
        done
	;;
                                                                                                              
    12 | 15) #ar0230 ar0237 2M
	for binfile in `ls ar0230*.bin`
	do
	    ln -sf $ADJ_PARAMS_DIR/$binfile /etc/idsp/adj_params/$binfile
	done
	
	cd $SENSORS_3D_DIR
	for binfile in `ls ar0230*.bin`                                         
        do                                                                      
            ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile       
        done
	;;
    17) #imx291 2M
	for binfile in `ls imx291*.bin`
	do
	    ln -sf $ADJ_PARAMS_DIR/$binfile /etc/idsp/adj_params/$binfile
	done
	
	cd $SENSORS_3D_DIR
	for binfile in `ls imx291*.bin`                                         
	do                                                                      
	    ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile       
	done
	;;
     20) #imx307 2M
	for binfile in `ls imx307*.bin`
	do
	    ln -sf $ADJ_PARAMS_DIR/$binfile /etc/idsp/adj_params/$binfile
	done
	
	cd $SENSORS_3D_DIR
	for binfile in `ls imx307*.bin`                                         
	do                                                                      
	    ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile       
	done
	;;
    19) #ov2735
        ln -sf $ADJ_PARAMS_DIR/ov2735_aeb_param.bin /etc/idsp/adj_params/ov2735_aeb_param.bin
        ln -sf $ADJ_PARAMS_DIR/ov2735_aliso_adj_param.bin /etc/idsp/adj_params/ov2735_aliso_adj_param.bin
        ln -sf $ADJ_PARAMS_DIR/ov2735_liso_adj_param.bin /etc/idsp/adj_params/ov2735_liso_adj_param.bin
        ln -sf $ADJ_PARAMS_DIR/ov2735_mliso_adj_param.bin /etc/idsp/adj_params/ov2735_mliso_adj_param.bin
        ln -sf $ADJ_PARAMS_DIR/ov2735_mliso_ir_adj_param.bin /etc/idsp/adj_params/ov2735_mliso_ir_adj_param.bin

        case $MODELNUM in
        5105 | 5108) #FI9961EPV3 FC6618EPV3
                ln -sf $ADJ_PARAMS_DIR/ov2735_mliso_ir_adj_param_5105.bin /etc/idsp/adj_params/ov2735_mliso_ir_adj_param.bin
                ;;
        *)
                ;;
        esac

        cd $SENSORS_3D_DIR
        for binfile in `ls ov2735*.bin`                                         
        do                                                                      
            ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile       
        done
        ;;
    *) #ov4689 2M default
	for binfile in `ls ov4689*.bin | grep -v "_4M"`
	do
	    ln -sf $ADJ_PARAMS_DIR/$binfile /etc/idsp/adj_params/$binfile
	done
	
	cd $SENSORS_3D_DIR
	for binfile in `ls ov4689*.bin | grep -v "_4M"`                         
        do                                                                      
            ln -sf $SENSORS_3D_DIR/$binfile /etc/idsp/sensors/$binfile       
        done
	;;
esac

case $SENSOR in
	12 | 15)
	    /usr/local/bin/init.sh --ar0230
	    ;;
	17)
	    /usr/local/bin/init.sh --imx291
	    ;;
	20)
	    /usr/local/bin/init.sh --imx307
	    ;;
	19)
		case $MODELNUM in
			5111 | 5120 |5121)
	    		/usr/local/bin/init.sh --ov2735_mipi_enhance
			;;
			* )
	    		/usr/local/bin/init.sh --ov2735_mipi
			;;	    
		esac
		;; 
	* )
	    /usr/local/bin/init.sh --ov4689
	    ;;
esac

# usb otg
part="null"
case $MODELNUM in
	5008 | 5009 | 5011 | 5040 | 5041 | 5046 | 5068 | 5069 | 5072 | 5098 | 5099)
		# C2 | C4 | IQ200 | C2V2 | IQ200V2 | FC1608P | C2V3 | IQ200V3 | FC1608PV2 | C2V4 | FC1608PV3
		# try usb device
		# gpio4 high:download mode; low:wifi mode
		echo 4 > /sys/class/gpio/export
		echo high > /sys/class/gpio/gpio4/direction
		echo device > /proc/ambarella/usbphy0
		
		for sdpartsub in `ls /dev/mmcblk0p*`
		do
			echo $sdpartsub
			part=$sdpartsub
			break
		done

		echo "part="$part

		if [ $part == null ]; then
			for sdpartmain in `ls /dev/mmcblk*`
			do
				echo $sdpartmain
				part=$sdpartmain
				break
			done

			if [ $part == null ]; then
				echo "no sd card"
			else
				echo "hava sd card, nut have no part, now insmod ko"
				modprobe g_mass_storage file=$part stall=0 removable=1
				date
				sleep 3
			fi
		else
			echo "hava sd card, have part now insmod ko"
			modprobe g_mass_storage file=$part stall=0 removable=1
			date
			sleep 3
		fi
		;;
	5111 | 5120 | 5121)
	     	echo host > /proc/ambarella/usbphy0
		echo 4 > /sys/class/gpio/export
		echo high > /sys/class/gpio/gpio4/direction
		sleep 1	
		;;	
	*)
	     	echo host > /proc/ambarella/usbphy0
		sleep 1
		;;
esac

#modules
tar Jxf /mnt/mtd/app/zmodules.tar.xz -C /tmp/

#mkdir /tmp/www
#mkdir /etc/ppp
#mkdir /mnt/windows


rm -rf /tmp/module/

#sd
mkdir -p /mnt/sd 
rm -rf /usr/local/pureftpd			# amba must remove it, let webService rebuild it
mkdir -p /usr/local/pureftpd/etc/ 


ifconfig lo up

tar -Jxf /mnt/mtd/app/www.tar.xz -C /tmp/
mkdir -p /tmp/www/snapPic


#huntvision foscam web 

case $RESERVEFLAG1 in

        101)
                ln -sf /tmp/www/images/login-logo_ht.png /tmp/www/images/login-logo.png
                ln -sf /tmp/www/images/con-logo_ht.png /tmp/www/images/con-logo.png
                ;;
	
	100)
		#OEM no LOG ,do nothing
		;;

        *)
                ln -sf /tmp/www/images/login-logo_fos.png /tmp/www/images/login-logo.png
                ln -sf /tmp/www/images/con-logo_fos.png /tmp/www/images/con-logo.png
                ;;
esac

#0:CN 1:CNEN 2:13 FL
case $LANGUAGE in
        0)
                cp -rf /mnt/mtd/app/diff_cn/* /tmp/www
                ;;
        1)
                cp -rf /mnt/mtd/app/diff_cnen/* /tmp/www
                ;;
        *)
                ;;
esac

#0:CN 1:CNEN 2:13 FL
case $LANGUAGE in
        0)
                        ln -sf /mnt/mtd/app/ringtone/cn/cableconnected.wav /mnt/mtd/app/ringtone/cableconnected.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/ezlinkconnecting.wav /mnt/mtd/app/ringtone/ezlinkconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/poweron.wav /mnt/mtd/app/ringtone/poweron.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/reset.wav /mnt/mtd/app/ringtone/reset.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wificonnected.wav /mnt/mtd/app/ringtone/wificonnected.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wifipasswderr.wav /mnt/mtd/app/ringtone/wifipasswderr.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wpsconnecting.wav /mnt/mtd/app/ringtone/wpsconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/qrcode.wav /mnt/mtd/app/ringtone/qrcode.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wificonnecting.wav /mnt/mtd/app/ringtone/wificonnecting.wav
                        ;;
                2)
                        ln -sf /mnt/mtd/app/ringtone/en/cableconnected.wav /mnt/mtd/app/ringtone/cableconnected.wav
                        ln -sf /mnt/mtd/app/ringtone/en/ezlinkconnecting.wav /mnt/mtd/app/ringtone/ezlinkconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/en/poweron.wav /mnt/mtd/app/ringtone/poweron.wav
                        ln -sf /mnt/mtd/app/ringtone/en/reset.wav /mnt/mtd/app/ringtone/reset.wav
                        ln -sf /mnt/mtd/app/ringtone/en/wificonnected.wav /mnt/mtd/app/ringtone/wificonnected.wav
                        ln -sf /mnt/mtd/app/ringtone/en/wifipasswderr.wav /mnt/mtd/app/ringtone/wifipasswderr.wav
                        ln -sf /mnt/mtd/app/ringtone/en/wpsconnecting.wav /mnt/mtd/app/ringtone/wpsconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/en/qrcode.wav /mnt/mtd/app/ringtone/qrcode.wav
                        ln -sf /mnt/mtd/app/ringtone/en/wificonnecting.wav /mnt/mtd/app/ringtone/wificonnecting.wav
                        ;;
                *)
                        ln -sf /mnt/mtd/app/ringtone/cn/cableconnected.wav /mnt/mtd/app/ringtone/cableconnected.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/ezlinkconnecting.wav /mnt/mtd/app/ringtone/ezlinkconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/poweron.wav /mnt/mtd/app/ringtone/poweron.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/reset.wav /mnt/mtd/app/ringtone/reset.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wificonnected.wav /mnt/mtd/app/ringtone/wificonnected.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wifipasswderr.wav /mnt/mtd/app/ringtone/wifipasswderr.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wpsconnecting.wav /mnt/mtd/app/ringtone/wpsconnecting.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/qrcode.wav /mnt/mtd/app/ringtone/qrcode.wav
                        ln -sf /mnt/mtd/app/ringtone/cn/wificonnecting.wav /mnt/mtd/app/ringtone/wificonnecting.wav
                        ;;
esac


#plugin
#if [ -e /mnt/mtd/app/plugins.tar.xz ];then
#        tar -Jxf /mnt/mtd/app/plugins.tar.xz -C /tmp
#	sleep 3
#       rm /mnt/mtd/app/plugins.tar.xz
#        cp -rf /tmp/plugins/ /mnt/mtd/app/
#	sleep 3
#        rm -rf /tmp/plugins
#fi
case $RESERVEFLAG1 in
        100)
                #OEM 
#                ln -s /mnt/mtd/app/plugins/IPCWebComponents_OEM.exe /tmp/www/IPCWebComponents.exe
#                ln -s /mnt/mtd/app/plugins/plugins.pkg /tmp/www/plugins.pkg
                ln -sf /tmp/www/js/brand_oem.js /tmp/www/js/brand.js
                ;;

        *)
 #               ln -s /mnt/mtd/app/plugins/IPCWebComponents_FOSCAM.exe /tmp/www/IPCWebComponents.exe
#                ln -s /mnt/mtd/app/plugins/plugins.pkg /tmp/www/plugins.pkg
                ln -sf /tmp/www/js/brand_foscam.js /tmp/www/js/brand.js
                ;;
esac


#lib
zlib=/mnt/mtd/app/zlib.tar.xz
tar -Jxf ${zlib} -C /tmp/
ln -sf /tmp/lib/libzbar.so.0.2.0 /tmp/lib/libzbar.so
ln -sf /tmp/lib/libzbar.so.0.2.0 /tmp/lib/libzbar.so.0

#bin
zbin=/mnt/mtd/app/zbin.tar.xz
tar -Jxf ${zbin} -C /tmp/

cp /tmp/bin/ftpd/FtpPortConfig.xml /mnt/mtd/app/config/

cp /tmp/bin/cgi-bin/* /tmp/www/cgi-bin/

# copy script to pppoe dir
#mkdir /bin/ppp
#cp /usr/bin/ppp/pppoe-start /bin/ppp
#cp /usr/bin/ppp/pppoe-stop /bin/ppp
#cp /usr/bin/ppp/pppoe-status /bin/ppp
#chmod 777 /bin/ppp/*
#cp /usr/bin/ppp/* /usr/sbin/


#cp -rf /usr/bin/lighttpd-1.4.31-amb/ /usr/local/

export PATH=$PATH:/usr/bin
export PATH=$PATH:/tmp/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/lib
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib

#patch
if [ -e /mnt/mtd/app/patch/patch.tar.xz ];then
	tar -Jxf /mnt/mtd/app/patch/patch.tar.xz -C /
fi

/mnt/mtd/loadDiffParam.sh $MODELNUM

# boot flag
touch /mnt/mtd/BootFlag

#rtctool -rtctosys
mkdir -p /tmp/ldc/

/tmp/bin/MsgServer &

#start ambarella 3A 
#/usr/local/bin/test_image -i 0&
sleep 2

case $MODELNUM in
	5008 | 5009 | 5011 | 5040 | 5041 | 5046 | 5068 | 5069 | 5072 | 5098 | 5099)
		# C2 | C4 | IQ200 | C2V2 | IQ200V2 | FC1608P | C2V3 | IQ200V3 | FC1608PV2 | C2V4 | FC1608PV3
		sleep 2
		date
		if [ $part == null ]; then
			echo "no sd card found"
		else
			dmesg > /tmp/dmesg.txt
		fi
		;;
	## temp for r2v1 1.12 start
	5034) # R2V1
		eval $(cat /mnt/mtd/app/config/HWManageConfig.xml | grep 'sysLedGpio' | awk -F ">" '{print $2}' | awk -F "<" '{printf("SYSGPIO=%d",$1);}') 
		if [ $SYSGPIO != 24 ]; then
			echo "r2v1 1.12 restore hwconfig"
			rm /mnt/mtd/app/config/HWManageConfig.xml
		fi
		;;
	## temp for r2v1 1.12 stop
	*)
		;;
esac

echo 1400 > /sys/class/net/wlan0/mtu 
echo 1400 > /sys/class/net/eth0/mtu

/tmp/bin/watchdog &
case $MODELNUM in
	#FI9928P | FC8618PZ | FI9928PV2 | FC8618PZV2   
	5094 | 5095 | 5118 | 5119)
	;;
	*)
	sleep 25 
	;;
esac
guard_vsync_loss &

