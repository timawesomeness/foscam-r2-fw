
#!/bin/sh
# Useage: runDiffParam.sh model

MODELNUM=1

if [ $# -ge 1 ]; then
    MODELNUM=$1
fi

eval $(cat /mnt/mtd/app/config/PTZConfig.xml | grep 'SelfTestMode' | awk -F ">" '{print $2}' | awk -F "<" '{printf("ptzstate_xmlcfg=%d",$1);}')
case $MODELNUM in
	5094 | 5095 | 5118 | 5119) #FI9928P FC8618PZ
		eval $(cat /mnt/mtd/app/config/PTZConfig.xml | grep 'Guard_horizen' | awk -F ">" '{print $2}' | awk -F "<" '{printf("prehorpos_xmlcfg=%d",$1);}') 
		eval $(cat /mnt/mtd/app/config/PTZConfig.xml | grep 'Guard_verticalPos' | awk -F ">" '{print $2}' | awk -F "<" '{printf("preverpos_xmlcfg=%d",$1);}') 
	;;
	*)
		eval $(cat /mnt/mtd/app/config/PTZConfig.xml | grep 'PreHorPos_Appointed' | awk -F ">" '{print $2}' | awk -F "<" '{printf("prehorpos_xmlcfg=%d",$1);}') 
		eval $(cat /mnt/mtd/app/config/PTZConfig.xml | grep 'PreVerPos_Appointed' | awk -F ">" '{print $2}' | awk -F "<" '{printf("preverpos_xmlcfg=%d",$1);}') 
	;;
esac

load_modules() 
{
    case $MODELNUM in
       5001 | 5002 | 5003 | 5004 | 5005 | 5008 | 5009 | 5011 | 5012 | 5013 | 5014 | 5015 | 5016 | 5017 | 5018 | 5019 | 5020 | 5021 | 5022 | 5023 | 5024 | 5026 | 5027 | 5028 | 5029 | 5030 | 5031 | 5032 | 5033| 5037 | 5040 | 5041 | 5046 | 5047 | 5048 | 5049 | 5050 |
| 5057 | 5058 | 5059 | 5060 | 5061 | 5062 | 5063 | 5064| 5068 | 5069 | 5072 | 5055 | 5056 | 5073 | 5074 | 5075 | 5076 | 5078 | 5079 | 5080 | 5081 | 5082 | 5083 | 5084 | 5085 | 5086 | 5087 | 5088 | 5089 | 5090 | 5092 | 5097 | 5098 | 5099 | 5100 | 5103 | 5104 | 5105 | 5106 | 5107 | 5108 | 5113 | 5115)
#      FI9900P|FHD955W|EF9552|FHD955|EF9551|C2|C4|IQ200|FHD955W_LENS6|EF9552_LENS6|FHD955W_LENS8|EF9552_LENS8|FI9900EP|FHD955E|EF9553|FI9901EP|FHD956E|EF9563|FC5718EP|FI9900E|FI9900EV2|FI9900PV1|EF9552V1|FHD955WV1|FC5618PV1|FI9900EPV1|EF9553V1|FHD955EV1|FC5618EPV1|C2V2|IQ200V2|FC1608P|HT_ND42E0_AT00AN_4|HT_ND42E0_AIT0AN_4|HT_ND44E0_AT00AN_4|HT_ND44E0_AIT0AN_4|FI990PV3|EF9552V3|FHD955WV3|FC5618PV3|FI9900EPV3|EF9553V3|FHD955EV3|FC5618EPV3|C2V3|IQ200V3|FC1608PV2|MODEL_HT_NB12E3_T000AN|FI9900PV5|FI9900EPV5|FI9961EPV3|FI9901EPV2|FI9961EPV4
       /sbin/insmod /tmp/modules/audio/snd-soc-ak4951-amb.ko
       /sbin/insmod /tmp/modules/audio/snd-soc-s2lmkiwi-ak4951.ko
       ;;

       5006 | 5007 | 5010 | 5034 | 5035 | 5036 | 5038 | 5039 | 5065 | 5066 | 5067 | 5093 | 5096 | 5102 | 5110 | 5112 | 5114 | 5117)
#      R2|R4|EF8166|R2V1|EF8166V1|FHD816WV1|R2V2|EF8166V2|R2V3|EF8166V3|FHD816WV3|R2V5|R2E|R4V2|P4|P4V2

       /sbin/insmod /tmp/modules/audio/snd-soc-ak7755-amb.ko
       /sbin/insmod /tmp/modules/audio/snd-soc-s2lmkiwi-ak7755.ko
       /sbin/insmod /tmp/modules/ptz/fos_ptz.ko ptz_state=$ptzstate_xmlcfg horizen_desire_pos=$prehorpos_xmlcfg vertical_desire_pos=$preverpos_xmlcfg
       case $ptzstate_xmlcfg in
       	0)
		echo "### no self test,no wait ###"
	;;
	*)
		echo "wait 25s,self testing..."
       		sleep 25
	;;
       esac
       ;;
	   5042 | 5043 | 5070 | 5071 | 5101 | 5109 | 5116)
	# FC2607P|FC2607PA|FC2607PV2|FC2607PAV2|FC2607PV3|FC2607PV4|R2D
	   /sbin/insmod /tmp/modules/audio/snd-soc-ak4951-amb.ko
	   /sbin/insmod /tmp/modules/audio/snd-soc-s2lmkiwi-ak4951.ko
	   /sbin/insmod /tmp/modules/ptz/fos_ptz_fc2607p.ko ptz_state=$ptzstate_xmlcfg horizen_desire_pos=$prehorpos_xmlcfg vertical_desire_pos=$preverpos_xmlcfg
       ;;
	#FI9928P | FC8618PZ   
	   5094 | 5095 | 5118 | 5119)
	   /sbin/insmod /tmp/modules/audio/snd-soc-ak4951-amb.ko
	   /sbin/insmod /tmp/modules/audio/snd-soc-s2lmkiwi-ak4951.ko
	   /sbin/insmod /tmp/modules/ptz/fos_ptz_FI9928P.ko ptz_state=$ptzstate_xmlcfg horizen_desire_pos=$prehorpos_xmlcfg vertical_desire_pos=$preverpos_xmlcfg
       		case $ptzstate_xmlcfg in
       		0)
			echo "### no self test,no wait ###"
			;;
		*)
			echo "wait 25s,self testing..."
        		sleep 25
			;;
       		esac
       	;;
	5111 | 5120 |5121)
	#FI9926P | Z2
	/sbin/insmod /tmp/modules/audio/snd-soc-ak4951-amb.ko
	/sbin/insmod /tmp/modules/audio/snd-soc-s2lmkiwi-ak4951.ko
	/sbin/insmod /tmp/modules/ptz/fos_ptz_R2Plus.ko ptz_state=$ptzstate_xmlcfg horizen_desire_pos=$prehorpos_xmlcfg vertical_desire_pos=$preverpos_xmlcfg
       		case $ptzstate_xmlcfg in
       		0)
			echo "### no self test,no wait ###"
			;;
		*)
			echo "wait 15s,self testing..."
        		sleep 15
			;;
       		esac
       ;;
    *)
       ;;
    esac

}


init_audio_mixer()
{
	echo "### outdoor and audio ### init mixer ###"
	amixer cset numid=13 on	# Auto Level Control 1 -> on
	amixer cset numid=18 0	# Mic and Lin Switch -> LIN
	amixer cset numid=26 0	# RIN MUX -> RIN1
	amixer cset numid=27 0	# LIN MUX -> LIN1
}

load_audio_param() 
{
	case $MODELNUM in
    	  5001 | 5002 | 5003 | 5004 | 5005 | 5012 | 5013 | 5014 | 5015 | 5016 | 5017 | 5018 | 5019 | 5020 | 5021 | 5022 | 5023 | 5024 | 5026 | 5027 | 5028 | 5029 | 5030 | 5031 | 5032 | 5033 | 5037 | 5057 | 5058 | 5059 | 5060 | 5061 | 5062 | 5063 | 5064 | 5055 | 5056 | 5092 | 5097 | 5103 | 5104 | 5106 | 5107 | 5113)
	  
#           FI9900P|FHD955W|EF9552|FHD955|EF9551|FHD955W_LENS6|EF9552_LENS6|FHD955W_LENS8|EF9552_LENS8|FI9900EP|FHD955E|EF9553|FI9901EP|FHD956E|EF9563|FC5718EP|FI9900E|FI990EV2|FI9900PV1|EF9552V1|FHD955WV1|FC5618PV1|FI9900EPV1|EF9553V1|FHD955EV1|FC5618EPV1|FI9900PV3|EF9552V3|FHD955WV3|FC5618PV3|FI9900EPV3|EF9553V3|FHD955EV3|FC5618EPV3|FI9900PV5|FI9900EPV5|FI9901EPV2
            amixer cset numid=15 1
            ;;
          5008 | 5009 | 5011 | 5040 | 5041 | 5046 | 5047 | 5048 | 5049 | 5050 | 5068 | 5069 | 5072 | 5073 | 5074 | 5075 | 5076 | 5078 | 5079 | 5080 | 5081 | 5082 | 5083 | 5084 | 5085 | 5086 | 5087 | 5088 | 5089 | 5090 | 5094 | 5095 | 5098 | 5099 | 5100 | 5105 | 5108 | 5111 | 5115 | 5118 | 5119 | 5120 | 5121)
#           C2|C4|IQ200|C2V2|IQ200V2|FC1608P|HT_ND42E0_AT00AN_4|HT_ND42E0_AIT0AN_4|HT_ND44E0_AT00AN_4|HT_ND44E0_AIT0AN_4|C2V3|IQ200V3|FC1608PV2|FI9961EPV3|FI9961EPV4
            amixer cset numid=15 1
            amixer cset numid=3 3
            amixer cset numid=4 255
            ;;
    
          *)
            ;;
        esac

		init_audio_mixer
}


load_usb_wifi_param() 
{
	#wireless

        echo high > /sys/class/gpio/gpio93/direction 
        sleep 1		
        echo low > /sys/class/gpio/gpio93/direction
        sleep 1
        echo high > /sys/class/gpio/gpio93/direction

	case $MODELNUM in
		5008 | 5009 | 5011 | 5040 | 5041 | 5046 | 5068 | 5069 | 5072 | 5098 | 5099)
		# C2 | C4 | IQ200 | C2V2 | IQ200V2 | FC1608P |C2V3 |IQ200V3 |FC1608PV2
		# do nothing
			;;
		5016 | 5017 | 5018 |  5019 | 5020 | 5021 | 5022 | 5024 | 5025 | 5037 | 5044 | 5045 | 5047 | 5048 | 5049 | 5050 | 5047 | 5048 | 5049 | 5050 | 5061 | 5062 | 5063 | 5064 | 5055 | 5056 | 5073 | 5074 | 5075 | 5076 | 5078 | 5079 | 5080 | 5081 | 5082 | 5083 | 5084 | 5085 | 5086 | 5087 | 5088 | 5089 | 5090 | 5097 | 5100 | 5104 | 5105 | 5107 | 5108 | 5113 | 5115)  #POE
		# FI9900EP | FHD955E | EF9553 | FI9901EP | FHD956E | EF9563 | FC5718EP | FI9900E | FI990EV2 | HT-NB12E-IN | HT-NB12E-INV2 ||HT_ND42E0_AT00AN_4|HT_ND42E0_AIT0AN_4|HT_ND44E0_AT00AN_4|HT_ND44E0_AIT0AN_4|FI9900EPV3|EF9553V3|FHD955EV3|FC5618EPV3|FI9900EPV5|FI9961EPV3|FI9901EPV2|FI9961EPV4
		# POE has not wifi,do nothing	
			;;
		5111 | 5120 | 5121)
		Version=`uname -a | awk '{print $3}'` 
		insmod /lib/modules/$Version/extra/bcmdhd_sdio.ko
		ifconfig wlan0 up
		;;
		*)

			cd /usr/brcm/
			./bcmdl -n /lib/firmware/broadcom/bcm43143/nvram_wubb-738gn.nvm /lib/firmware/broadcom/bcm43143/fw_bcmdhd-43143b0-6.10.198.52_r32-cooee.bin.trx -C 10
			sleep 2
			ifconfig wlan0 up
			sleep 1
			wl country JP
			;;
	esac
}

load_gpio_param()
{
    case $MODELNUM in
     5008 | 5009 | 5011 | 5040 | 5041 | 5046 | 5068 | 5069 | 5072 | 5098 | 5099)
#    C2 | C4 | IQ200 | C2V2 | IQ200V2 | FC1608P | C2V3 | IQ200V3 | FC1608PV2
     # pir
     echo 2 > /sys/class/gpio/export 
     # sys led
     echo 33 > /sys/class/gpio/export 
     ;;
     5042 | 5043 | 5070 | 5071 | 5101 | 5109 | 5116)  
# 	FC2607P | FC2607PA | FC2607PV2 | FC2607PAV2 | FC2607PV3 | FC2607PV4 | R2D
     echo 2 > /sys/class/gpio/export 
	 ;;
    *)
      ;;
    esac
}


echo "start load param for diff model:$MODELNUM"


load_usb_wifi_param
load_modules
load_audio_param
load_gpio_param
