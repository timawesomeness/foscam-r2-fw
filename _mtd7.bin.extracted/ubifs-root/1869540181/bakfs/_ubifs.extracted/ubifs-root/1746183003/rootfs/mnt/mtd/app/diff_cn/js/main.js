var cur_Dev;//current DEV modle
var vsIf="";//version Info
var gVar;	//gloabl var
var gVar_first;
var gDvr;	//dev info 
var UI;		//UI
var lg;		//language
var lgCls;
var Struct;
var IFs = 0;
var isOpenA = new Array();
var isOpenV = new Array();
var isOpenT = new Array();
var isOpenR = new Array();
var hRecord = new Array();
var isOpenAlarmR = new Array();
var mult_https_port = new Array();
var cutdownalarmrecord = new Array();
var isEncy = new Array();
var isappallDev =0;    //0：not appall Dev      1：is appall dev
var user;
var pwd;
var Qqx=0;
var isSoftAPMode = 0;   //1:soft AP
var isFirstUse = 0;    //1:factory default
var setGuidResult = false;
var timerID = -1;
var pVersion = "5.1.0.7";     //plugins version
var needIEUpdate = false;
var bsTimeVal;
var bJudgeCgiResult = true;
var bMaskHide = true;
var strCgi = "";
var isPlugin = false;
var loginSucc = false;
var ytDev = ["FI9821E","HD816E","EH8135","EH8155","HD818P","FI9826P","FI9821A","FI9821W","FI9821W V2","FI9821W+V2","FI9821P","FI9831W","FC2401P","FC2402P","FI9818A","FI9826W","FI9828W","HD811W","HD816P","HD816W","HD818W","FI9818W V2","FI9818W+V2","FI9828W","HD963W"];
var is485ytDev = ["FI9805E","HD953E"];
var zoomDev = ["EH8155","HD818P","FI9826P","FI9826W","HD818W","FI9828W","HD963W"];
var notTalkAudioDev = ["HD950", "EH9331", "HD933", "FI9803", "FI9803W"];
var vVal = 0;
var vPage = 0;
var vList = 0;
var humidity = "";
var temperature = "";
var loadXml = true;
var guard = "";
var isSafari = false;
var isZoomWork = 0;
var isFocusWork = 0;
var needMoreTimeIPC = ["5006","5007","5010","5034","5035","5036","5038","5039","5065","5066","5067","5094","5095","5096","5102","5103","5104","5105","5106","5107","5108","5110"];
var isNVRV200IPC = ["3024","3057","3058","3500","6023","6024","6029","6030","6035"];
var stall;
var explorerInfo = navigator.userAgent.toLowerCase();
var browserPlatform = navigator.platform.toLowerCase();
var browserLanguage = (navigator.language || navigator.browserLanguage).toLowerCase();
var flashState = 1;
var hasFlash = navigator.plugins['Shockwave Flash'];
var naclState = false;
var playerVideo;
var playerAudio;
var livesplClicked = true; // 切换分辨率标志，切换过标为true,H5每切换一次分辨率需要重新打开视频一次
var H5Live = 1; // 0: flash, 1: h5
var H5Live_Edge = 0; //Edge 浏览器 0:flash, 1:h5
if(explorerInfo.indexOf("firefox") >= 0){
    var FFversion = explorerInfo.match(/firefox\/([\d.]+)/)[1];
}
function SetDefaultAudioDisplay()
{  
	if(gVar.audioFlag == 1){
		$(".liveBtnBt9").css("display", "none");
		$(".liveBtnBt109").css("display", "");
		gDvr.OpenAudio(IFs);
		isOpenA[IFs] = true;
	}else{
		$(".liveBtnBt9").css("display", "none");
		$(".liveBtnBt109").css("display", "none");
	}
   
}
/*
set plugins language when IPC has dropped。
zhuxiaolong 2016-3-8
*/
function SetPluginLanguage(){
	 try {
		    if ($("#login_language").val() == "CHS") {
		         gDvr.SetLauguage(0);
		    }else if ($("#login_language").val() == "CHT") {
		             gDvr.SetLauguage(1);
		    }else {
		            gDvr.SetLauguage(2);
		     }
        } catch (e) { }
}

 


function fixCircelPos(videoWidth, videoHeight) { 
   try { 
      //console.log("fixCircelPos"); 
      var pluginElm = document.getElementById("ipcamdiv0"); 
      if (!pluginElm) 
         return;
      var clientWidth = pluginElm.clientWidth; 
      var clientHeight = pluginElm.clientHeight; 
      var offsetRight = (clientWidth - videoWidth) / 2; 
      var offsetBottom = (clientHeight - videoHeight) / 2; 
       
      //console.log(clientWidth + " " + clientHeight + " " + offsetRight + " " + offsetBottom); 
       
      var blueCircle = document.getElementById("circleBlue"); 
      var redCircel = document.getElementById("circleRed");
		if (videoWidth == 0 && videoHeight == 0) { // if video width and video height is zero, set default pos
			offsetRight = 0;
			offsetBottom = 0;
		} 
      if (blueCircle) { 
         blueCircle.style.right = offsetRight + 50 + "px"; 
         blueCircle.style.bottom = offsetBottom + 5 + "px"; 
      } 
       
      if (redCircel) { 
         redCircel.style.right = offsetRight + "px"; 
         redCircel.style.bottom = offsetBottom + 5 + "px"; 
      }    
   } catch (e) { 
       
   } 

}
function isNVRIPC()
{
	if(IsInArray(isNVRV200IPC,gVar_first.model))
	{
		return true;
	}
	return false;
}
/*
function isModel_6000To7000
2016/1/6 yangwei
description: the model of "hi3518EV200 FI9812PV3 FI9831PV3"  is bettween 6000 and 7000
*/
function isModel_6000To7000()
{
	if(gVar_first.model>6000&&gVar_first.model<7000)
	    return true;
	
	return false;
}
// MSATR机型 
function isModel_7000To8000()
{
	if(gVar_first.model>7000&&gVar_first.model<8000)
	    return true;
	
	return false;
}
//error
function XmlParm() { }
function ErrPro(xml) {
	//console.log("xml:  "+xml);
	if (loadXml) {
        var res = XmlParser("result", xml) * 1;
        if (res != 0 && bJudgeCgiResult) {
            switch (res) {
                case -1:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_CGIW"));
                    break;
                case -2:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_UNORPWD"));
                    break;
                case -4:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_CFAIL"));
                    break;
                case -5:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_OVERT"));
                    break;
                case -6:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_INLINE"));
                    break;
                case -8:
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOLOG"));
                    break;
            }
        } else {
            bJudgeCgiResult = true;
            var xmla;
            if ((typeof xml == 'string') && xml.constructor == String) {
                if ($.browser.msie) {
                    xmla = new ActiveXObject("Microsoft.XMLDOM");
                    xmla.async = false;
                    xmla.loadXML(xml);
                } else {
                    xmla = ('<xml>' + xml + '</xml>');
                }
            }
            return xmla;
        }
    } else {
        //return htmlContent;
        loadXml = true;
        return xml;
    }
    return null;
}
function PluginCallBackCGI() {  // plugin callback
    try { CgiCall(ErrPro(arguments[0])); } catch (e) { }
    if (bMaskHide) {
    	if(lanPage != "av_base" && lanPage != "alarm_mv" && lanPage != "alarm_motion" && lanPage != "net_p2p" && lanPage != "net_onvif" && lanPage != "net_ddns")
		MasklayerHide();
    } else {
        bMaskHide = true;
    }
}

function CgiCall(){};

//CallBack -- 回调函数
//Paop -- 消息框提示标题
//cmd -- 设置或者获取页面的密令行
//xml -- 设置操作时用到的参数;
function RfParamCall(CallBack, Paop, cmd, xml, timeout, usertype) {
	//console.log("cmd:  "+cmd);
    MasklayerShow();
    if (typeof timeout == 'undefined') timeout = 5000;
    gVar.errTitle = Paop;
    if (!jQuery.isFunction(CallBack)) {
        CallBack = function () {
            MasklayerHide();
        }
    }
    CgiCall = CallBack;
	
	if(cmd.indexOf("undefined")!=-1)
	{
		MasklayerHide();
		return;
	}
	
	try
	{
		strCgi="/cgi-bin/CGIProxy.fcgi?usr=" + user + "&pwd=" + pwd + "&cmd=" + cmd;
		gDvr.SendCgiCmd2(strCgi, timeout, strCgi.length);
	}
	catch(e)
	{
		strCgi = urlEncode("/cgi-bin/CGIProxy.fcgi?usr=" + user + "&pwd=" + pwd + "&cmd=" + cmd);
	    gDvr.SendCgiCmd(strCgi, timeout, strCgi.length);
	}
}
//use in live video
function RfParamCallNoShadow(CallBack, Paop, cmd, xml, timeout, usertype) {
	//console.log("cmd2 : " + cmd);
    if (typeof timeout == 'undefined') timeout = 5000;
    gVar.errTitle = Paop;
    if (!jQuery.isFunction(CallBack)) {
        CallBack = function () {
            MasklayerHide();
        }
    }
    CgiCall = CallBack;
	if(cmd.indexOf("undefined")!=-1)
	{
		MasklayerHide();
		return ;
	}
    strCgi = "/cgi-bin/CGIProxy.fcgi?usr=" + gVar.user + "&pwd=" + gVar.passwd + "&cmd=" + cmd;
	if (isEncy[IFs]) {
		try{
			gDvr.SendCgiCmd2(strCgi, timeout, strCgi.length);
		}
		catch(e)
		{
		    strCgi = urlEncode("/cgi-bin/CGIProxy.fcgi?usr=" + gVar.user + "&pwd=" + gVar.passwd + "&cmd=" + cmd);
			gDvr.SendCgiCmd(strCgi, timeout, strCgi.length);
		}
		
        
    } else {
        gVar.KCgi("cmd=" + cmd);
    }
}

function RfParamCall2(CallBack, Paop, cmd, xml, timeout, usertype) {
    MasklayerShow();
    if (typeof timeout == 'undefined') timeout = 5000;
    gVar.errTitle = Paop;
    if (!jQuery.isFunction(CallBack)) {
        CallBack = function () {
            MasklayerHide();
        }
    }
    gVar.errTitle = Paop;
    $.ajax({
        type: 'GET',
        url: '/cgi-bin/CGIProxy.fcgi?' + urlEncode('usr=' + user + '&pwd=' + pwd + '&cmd=' + cmd + "&" + (new Date()).getTime()),
        async: true,
        timeout: timeout,
        datatype: "text",
        success: function (data) {
            var xml = ErrPro(data);
            var hide;
            if (xml != null) {
                hide = CallBack(xml, data, usertype);
            }
        },
        error: function (data, state) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_TIME_OUT"))
            MasklayerHide();
        }
    });
}

function PTZPro(e,p){}

function H264YT(e, p) {
    var res = 0;
    if (e.type == "mousedown") {
        p.mousedown = true;
        var cmd = $(p).attr("id").split("_")[2];
        if (gVar.nUserRight == 0) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PLAYBACK_RIGHT1"));
        } else {
            //gVar.KCgi("cmd="+cmd);
            RfParamCallNoShadow("", "", cmd);
        }
    } else if (e.type == "mouseup") {
        if (p.mousedown) {
            p.mousedown = false;
            var cmd = "ptzStopRun";
            //gVar.KCgi("cmd=" + cmd);
            RfParamCallNoShadow("", "", cmd);
        }
    } else if (e.type == "mouseout") {
        if (p.mousedown) {
            p.mousedown = false;
            var cmd = "ptzStopRun";
            //gVar.KCgi("cmd=" + cmd);
            RfParamCallNoShadow("", "", cmd);
        }
    }
}
	
	function MJYT(e,p){
		var res = 0;
		if (e.type == "mousedown"){
			p.mousedown = true;
			var cmd = $(p).attr("tag")*1;
			gVar.MJKCgi(cmd);
							
		}else if (e.type == "mouseup"){
			if(p.mousedown){
				p.mousedown = false;
				gVar.MJKCgi("1");
			}
		}else if(e.type == "mouseout"){
			if (p.mousedown){
				p.mousedown = false;
				gVar.MJKCgi("1");
			}
		}
	}

PTZPro = H264YT;
for (var i = 0; i < 9; i++) {
    isEncy[i] = isOpenAlarmR[i] = isOpenR[i] = isOpenA[i] = isOpenT[i] = isOpenV[i] = false;
    mult_https_port[i] = 0;
}
isEncy[0] = true;
function IframeLoad(){
}
function LanguageCall(){}//language callback
function AA(){}
function BB(){}
function WebInit(DownPluginTip, ie){
	lgCls = new LgClass();
	gVar = new GlobarVar();
	gVar_first = new GlobarVar();
	
	var aDate = (new Date()).getTime()+"";
	gVar.nDate = aDate.substring(aDate.length-9, aDate.length)*1;
	gVar_first.nDate = gVar.nDate;
	
	Struct = new PluginStruct();
	var str = window.location.href;
	
	gVar.httpver = str.split("://")[0];
	gVar_first.httpver = gVar.httpver;
	
	gVar.ip = str.split("//")[1].split("/")[0];	
	
	if (gVar.httpver == "https"){
	    if (gVar.ip.indexOf(":") != -1){
			port = gVar.port = gVar.ip.split(":")[1]*1;
			ip = gVar.ip = gVar.ip.split(":")[0];
		}else{
			port = gVar.port = 443;
			ip = gVar.ip;
		}
		mult_https_port[0] = port;
		gJson=true;
	}
	else{
		if (gVar.ip.indexOf(":") != -1){
			port = gVar.port = gVar.ip.split(":")[1]*1;
			ip = gVar.ip = gVar.ip.split(":")[0];
		}else{
			port = gVar.port = 80;
			ip = gVar.ip;
		}
	}
	gVar_first.ip = gVar.ip;
	gVar_first.port = gVar.port;
		
	try{
		gDvr = new DvrInfo();
		if (ie){ 
			gDvr.obj = document.getElementsByTagName("object");
			vsIf = gDvr.Test();
            if(vsIf != ""){
                var vv1 = vsIf.split(".");   //plugin version
                var vv2 = pVersion.split(".");    //web version
                for (var m = 0; m < 4; m++) {
                    if (vv2[m] * 1 > vv1[m] * 1) {
                        needIEUpdate = true;
                        break;
                    } else if (vv2[m] * 1 == vv1[m] * 1) {
                        continue;
                    } else {
                        needIEUpdate = false;
                        break;
                    }
                }
            }
			if($.browser.version != "6.0"){
				//window.onmousewheel= document.onmousewheel =function(){return false}
			}
		}
		else{ gDvr.obj = document.getElementsByTagName("Embed");
			gDvr.Test();
		}
		isPlugin = true;
	}catch(e){
		isPlugin = false;
		AA = function(){
			this.nDate = new Date();
			this.ChangeWndSize = function(wndType, num){};
			this.GetMotionArea = function(){return ""}
			this.GetDevIPandPort = function(){setTimeout(function(){window.location.reload()}, 100000);}
		}
		BB = function(f){
			$.getScript("js/divBox.js");
			$.get("html/left.html?"+gVar.nDate, function(data){
				$("#mleft").html(data).attr("name", "isDown");
				lan("left");
				$.getScript("js/cal.js?"+gVar.nDate);
				
				$.getScript("js/left.js?"+gVar.nDate,function(data){	
					if ($.browser.version.indexOf("6") >= 0&&$.browser.msie){
						$("#configMl").css("margin-left", "-7px");
						//$("#rss").css("margin-left", "27px")
					}
					gVar.ChangPage(3);
					
					$("#configleft").css({"display": "","margin-left": "0px"});
					tabkey = 1;
					$("#liveleft").remove();
					$("#playbackleft").remove();
					$("#left").stop().animate({marginLeft: "-24px"}, 200);
					$("#left").css({"margin-left":"0px", "width":"100%"});
					MasklayerHide();
					$("#dvrocx").css("height", "100%");
					$("#dvrocx").css("width", "100%")
					$("#login").remove();
					$("#LiveMenu").remove();
					$("#PlayBackMenu").remove();
					$("#ConfigMenu").remove();
					$("#avshelter").remove();
					$("#av_shelter").remove();
					$("#bs_multi").remove();
					$(".mheader").css("display", "block");
					$(".logo").css("background", "url(images/LOGO/LOGO_"+lgCls.logo+".gif) no-repeat"); 
					$(".header").css("height", "64px");
					$(".main").css("width", "100%");
					$("#plugin").remove();
					$("#av_osd").remove();
                    $("#av_mask").remove();
                    if(gVar_first.model == "1111"){
                        $("#alarm_mv").remove();
                    }else{
                        $("#cfgmune_4").remove();
                        $("#cfgpanel_4").remove();
                    }
					f();
				});
				$.getScript("js/cal.js");
				
			});
		}
	}
	gVar.mediaport = gVar.port;
	gVar.webPort = gVar.port;
	gVar.httpsPort = gVar.port;
	if (typeof $("#mediaPort").attr("id") != 'undefined'){
		$("#mediaPort").val(gVar.mediaport);
	}
	MasklayerHide();

	lg = new HashmapCom();	//language hashmap
	UI = new UIReg();
	LanguageCall = function (lag) {
		$.ajax({ 
			url: "lg/"+lag+".xml?"+gVar.nDate,
			timeout:5000,
			async:true,
			success:function(data){
			    gVar.XmlParsing(lg, data, "StringTable");
			    if (!gVar.bWebInit){
				    WebProc();
				    LoadLoginPage(DownPluginTip);
			    }else{
				    lan("login");
				}
		    }
        });
	}
	
	gVar.lg = getCookie("language");	
	if(gVar.lg == null){
		gVar.lg = lgCls.defaultLg;
	}else{
		var i;
		for(i =0; i<lgCls.mul.length; i++){
		if(lgCls.mul[i][0] == gVar.lg)
			break;
		}
		if(i >= lgCls.mul.length){
			gVar.lg = lgCls.defaultLg;
		}
	}

	LanguageCall(gVar.lg);
}

function Logout(){
	if(gVar.webLoginCall == 0){
		$("#plugin").css({"width":0,"height":0});
		//$("body").remove();
		gVar.webLoginCall = 100;
		RfParamCallNoShadow("", "", "logOut&usrName=" + gVar.user + "&groupId=" + gVar.nDate);
		/*try{
			gVar._Cgi({
			timeout:3000,
			url: "cmd=logOut&usrName="+gVar.user+"&groupId="+gVar.nDate,
			suc:function(data, state){
				//window.location.href = "";
			},
			err:function(data, state){
				//window.location.href = "";
			}
			});
		}catch(e){}*/
	}
}

function WebProc(){
	//init main surface
	//UI.Button("#LiveMenu,#ConfigMenu", 179);
	//UI.Button("#PlayBackMenu",179);
	//UI.Button("#LogoutMenu", 27);
	UI.Button(".liveBtnBt6", 36);
	
	function SPcontrol(e, p, tag, cmd){	//viedo all open OR all close
		var $p = $(p);
		if(e.type == "mousedown"){
			var $x = $(tag);
			//$x.css("background-position", "0px -180px");
			if(cmd == 4){
			}else if(cmd==6){$p.css("display", "none");$x.css("display", "");}
			if($p.attr("class") == "liveBtnBt1" || $p.attr("class") == "liveBtnBt2"){
				try{gDvr.VideoPlay(IFs, gVar.ip, cmd);}catch(e){}
				if (cmd==3) {
				    if ((isappallDev == true && gVar.talkFlag == 0 && gVar.audioFlag == 0) || (isappallDev == false && IsInArray(notTalkAudioDev, gVar.selChDev))) {
				        $(".liveBtnBt4").css("display", "none");
				        $(".liveBtnBt3").css("display", "none");
				        $(".liveBtnBt9").css("display", "none");
				        $(".liveBtnBt109").css("display", "none");
				    }
				    else {
				        $(".liveBtnBt4").css("display", "none");
				        $(".liveBtnBt3").css("display", "");
				        SetDefaultAudioDisplay();
//				        try{gDvr.TalkCMD(IFs, 1);}catch(e){}
				    }

                    isOpenV[IFs] = true;
                    /*if(IsFirefox() || IsChromeSupportNacl() ){
                    	if(H5Live){
	                        Flv_load_video();
	                        Flv_load_audio();
                    	}
                    }
                    if(IsEdge()){
                    	if(H5Live_Edge){
	                        Flv_load_video();
	                        Flv_load_audio();
                    	}
                    }*/
				} else if (cmd == 4) {
					ShowCircle("Blue", 0);
					ShowCircle("Red", 0);
					$("#LVRc").click();
				    isOpenV[IFs] = false;
				    if ((isappallDev == true && gVar.talkFlag == 0 && gVar.audioFlag == 0) || (isappallDev == false && IsInArray(notTalkAudioDev, gVar.selChDev))) {
				        $(".liveBtnBt4").css("display", "none");
				        $(".liveBtnBt3").css("display", "none");
				        $(".liveBtnBt9").css("display", "none");
				        $(".liveBtnBt109").css("display", "none");
				    }
				    else {
				        $(".liveBtnBt4").css("display", "none");
				        $(".liveBtnBt3").css("display", "");
				        //$(".liveBtnBt9").css("background-position", "-25px 0px").attr("name", "active");
				        $(".liveBtnBt109").attr("name", "active");
				      //  SetDefaultAudioDisplay();
					    $(".liveBtnBt9").css("display", "");
				        $(".liveBtnBt109").css("display", "none");
						
                    }
                    if(IsFirefox() || IsChromeSupportNacl() ){
                    	if(H5Live){	
                        	flv_destroy();
                    	}
                    }
                    if(IsEdge()){
                    	if(H5Live_Edge){	
                        	flv_destroy();
                    	}
                    }
				}
			}else{
			    var fileName = $(".rcChoseAC").parent().attr("title");
			    for (var index = 0; index < 10; index++) {

			    	if(!gVar.recordPath[index])
                    {
                    continue;	
                    }
                    var path = gVar.recordPath[index].split("/");
                    if (path[2] == fileName) {
                        fileName = gVar.recordPath[index];
                        break;
                    }
                }
                if (gDvr.PbVedioPlay(gVar_first.ip, $("#rcListT").attr("rDir"), fileName, cmd)) {
			        if (cmd == 3) {
			            gVar.bPbStop = false;
			            $p.css("display", "none");
			            $x.css("display", "");
			            var ele = $(".rcChoseAC");
			            vVal = ele.parent().attr("title");  //播放文件名;
			            vPage = ele.parents("table").attr("page") * 1; //页码;
			            vList = ele.parent().parent().children().first().html() * 1; //序列号;
			        }
			    }
			}
		}
		return true;
	}
	
	//------live  Button------
	UI.Button("#pbBtnBt10", 0, null, function(e, p){	//open
		if(e.type == "mousedown"){
			if(gVar.bPbStop){
				return SPcontrol(e, p, ".liveBtnBt11", 3);
			}else{
				return SPcontrol(e, p, ".liveBtnBt11", 6);
			}
		}
	});
	
	UI.Button(".liveBtnBt11", 0, null, function(e, p){	//pause
		if(e.type == "mousedown"){
			$(".liveBtnBt11").css("display", "none");
			$("#pbBtnBt10").css("display", "");
			gDvr.PbPause();			
		}
	});
	
	UI.Button("#pbBtnBt12", 36, null, function(e, p){	//stop
		if(e.type == "mousedown"){
			gVar.bPbStop = true;
			$(".liveBtnBt11").css("display", "none");
			$("#pbBtnBt10").css("display", "");
			gDvr.PBClose();			
		}
	});
	
	UI.Button(".liveBtnBt1", 0, 0, function(e, p){	//viedo all open
		return SPcontrol(e, p, ".liveBtnBt2", 3);
	});
	
	UI.Button(".liveBtnBt2", 0, 0, function(e, p){	//viedo all close
		return SPcontrol(e, ".liveBtnBt1", p, 4);
	});
	UI.Button(".liveBtnBt3,.liveBtnBt4,.liveBtnBt5", 0, null, function(e, p){	//speaker, full screen
		var $p = $(p);
		if(e.type == "mousedown"){
			switch($p.attr("class").split("liveBtnBt")[1]*1){
				case 3:
				    $(".liveBtnBt3").css("display", "none");
	                $(".liveBtnBt4").css("display", "");
					gDvr.TalkCMD(IFs,0);
					isOpenT[IFs]=true;
					break;
				case 4:
				    $(".liveBtnBt4").css("display", "none");
	                $(".liveBtnBt3").css("display", "");
					gDvr.TalkCMD(IFs,1);
					isOpenT[IFs] = false;
					break;
				case 5:
				    if (IsChromeSupportNacl()) {
				        gDvr.FullScreen(IFs);
					}else{
                        gDvr.FullScreen();
                    }
					break;
			}
		}
		return(true);
	});	
	//layout
	$(".layout").mouseover(function() {
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("LogoutMenu"));
	}).mousedown(function() {
	    $(this).css("display", "none");
	    $(".layout2").css("display", "");
	    gDvr.OpenAudio(IFs);
	    isOpenA[IFs] = true;
	})
	
	$(".liveBtnBt6").click(function(){	//live surface bottom
		var $p = $(".liveSSBtn");
		if ($(this).attr("tag") == 'open'){
			$p.attr("widthR", $p.css("width").split("px")[0]);
			$p.animate({width:"0px"}, 200);
			$(this).attr("tag", "close");
		}else{
			$(this).attr("tag", "open");
			$p.animate({width:$p.attr("widthR")}, $p.attr("widthR")*1);
		}
	});
	
	UI.Button(".liveBtnBt8", 36, null, function(e, p){	//screen pt
		var $p = $(p)
		if(e.type == "mousedown"){
			var res = 0;
			if($p.attr("name") != "on"){
				res = gDvr.PTZcontrol(97, $("#gsliderCov").attr("speed")|0, 0, 0);
				if(res == 0) {$p.attr("name","on");}
			}else {
				res = gDvr.PTZcontrol(98, $("#gsliderCov").attr("speed")|0, 0, 0);
				if(res == 0) {$p.attr("name","off");}
			}
			if(res == 2) { ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PLAYBACK_RIGHT1")); }
		}else if(e.type == "mouseover")
		{
			if($p.attr("name") != "on"){ 
				$p.attr("title",lg.get("IDS_SCREEN_PTZ_ENABLE"))
			}else {
				$p.attr("title",lg.get("IDS_SCREEN_PTZ_DISABLE"))
			}
		}
		return true;
	});

	$(".liveBtnBt9").mouseover(function() {
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_SOUND_OPEN"));
	}).mousedown(function() {
	    $(this).css("display", "none");
	    $(".liveBtnBt109").css("display", "");
	    gDvr.OpenAudio(IFs);
	    isOpenA[IFs] = true;
	})
	$(".liveBtnBt109").mouseover(function() {
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_SOUND_OFF"));
	}).mousedown(function() {
	    $(this).css("display", "none");
	    $(".liveBtnBt9").css("display", "");
	    gDvr.CloseAudio(IFs);
	    isOpenA[IFs] = false;
	})

	$(".volumeOn").mouseover(function ()
	{
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_FB_MUSIC_VOLUME_OFF"));
	}).mousedown(function ()
	{
	    $(this).css("display", "none");
	    $(".volumeOff").css("display", "");
	    $("#live_sound").css("display", "none");
	    Struct.babySoundVolume = document.getElementById("clordir_6").style.width.replace("px", "");
	})
	$(".volumeOff").mouseover(function ()
	{
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_FB_MUSIC_VOLUME_ON"));
	}).mousedown(function ()
	{
	    $(this).css("display", "none");
	    $(".volumeOn").css("display", "");
	    $("#live_sound").css("display", "");
	    if (Struct.babySoundVolume >= 0) {
	        $("#live_wd_video").attr("innerHTML", Struct.babySoundVolume | 0);
	        document.getElementById("clorbtn_6").style.marginLeft = Struct.babySoundVolume + "px";
	        document.getElementById("clordir_6").style.width = Struct.babySoundVolume + "px";
	    }
	})

	$(".liveBtnBt9B").mouseover(function() {
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_SOUND_OPEN"));
	}).mousedown(function() {
	    $(this).css("display", "none");
	    $(".liveBtnBt109B").css("display", "");
	    gDvr.OpenAudio(IFs);
	    isOpenA[IFs] = true;
	})
	$(".liveBtnBt109B").mouseover(function() {
	    $(this).css("cursor", "pointer");
	    $(this).attr("title", lg.get("IDS_SOUND_OFF"));
	}).mousedown(function() {
	    $(this).css("display", "none");
	    $(".liveBtnBt9B").css("display", "");
	    gDvr.CloseAudio(IFs);
	    isOpenA[IFs] = false;
	})
	
	//------live Button regist ------
	//page change
	$(function () {
	    $("#LiveMenu").click(function () {	//live
	        $("#MaskLayout").css("display", "none");
	        $("#serword").css("display", "none");
	        gVar.ChangPage(1);
	    });

	    $("#PlayBackMenu").click(function () {	//playback
	        $("#MaskLayout").css("display", "none");
	        var n = 0;
	        for (var i = 0; i < 9; i++) {
	            if (isOpenR[i] == 1 || isOpenAlarmR[i] == 1) {
	                n++;
	                break;
	            } 
	        }
	        if (n != 0) {
	            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_RECORD"));
	        } else gVar.ChangPage(2);
            
	        if (gVar_first.audioFlag == 0) {
	            $(".liveBtnBt9B").css("display", "none");
	            $(".liveBtnBt109B").css("display", "none");
	        }
	    });

	    $("#ConfigMenu").click(function () {	//config
	        $("#MaskLayout").css("display", "none");
	        $("#serword").css("display", "none");
	        var n = 0;
	        for (var i = 0; i < 9; i++) {
	            if (isOpenR[i] == 1 || isOpenAlarmR[i] == 1) {
	                n++;
	                break;
	            } 
	        }
	        if (n != 0) {
	            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_RECORD"));
	        } else gVar.ChangPage(3);
	    });

	    $("#LogoutMenu").click(function () {
	        Logout();
	    })

	    $(".paopao_close").click(function () {
	        $("#MsgPaop").css("display", "none").attr("name", "out");
	    }).mouseover(function () {
	        $(this).css("background-position", "-15px").css("cursor", "pointer");
	    }).mouseout(function () {
	        $(this).css("background-position", "0px")
	    })

	    $(".paopao_close1").click(function () {
	        $("#MsgPaop1").css("display", "none").attr("name", "out");
	    }).mouseover(function () {
	        $(this).css("background-position", "-15px").css("cursor", "pointer");
	    }).mouseout(function () {
	        $(this).css("background-position", "0px")
	    })

	});
}

function FosBabyCall(xml) {
    if ($(xml).find("result").text() * 1 == 0) {
        isSoftAPMode = $(xml).find("wifiMode").text() * 1;   // 0: normal  1: soft AP
    }
}

function GuidModeCall(xml) {
    if ($(xml).find("result").text() * 1 == 0) {
        isFirstUse = $(xml).find("guideMode").text() * 1;   // 0:   1: factory default
        if (gVar_first.model == "1111"){
            RfParamCall(FosBabyCall, "", "getWifiMode");
        }
        gVar.webLoginCall = webLoginResult;
        UserLoginEvent(gVar.webLoginCall);
    }
}

function LoginCall(xml) {
    webLoginResult = parseInt($(xml).find("logInResult").text());
    gVar.nUserRight = parseInt($(xml).find("privilege").text());
    Qqx = gVar.nUserRight;
    var userAg=navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);
    if (webLoginResult == 0) {
        if (LoadLeftPage == BB && Qqx != 2) {
            MasklayerHide();
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NORIGHT_NOPLUGINS"));
            }
            else{
                alert(lg.get("IDS_NORIGHT_NOPLUGINS"));
            }
            window.location.href = "";
            return;
        }
        var pwd = $("#passwd").val();
        if (gVar.user == "admin" && gVar.passwd == "" || gVar.nUserRight == 2 && isInCheckPwdFormat(pwd) == 0 && !(isPWOK(pwd))) {
        	/*if(gVar.user == "admin" && gVar.passwd == "")
	        {
	        	if(!IsChromeSupportNacl()){
					if(gVar_first.model>4000 && gVar_first.model<6000){
						stall = 1;
	            	}else{
	            		stall = 2;
	            	}
	            	RfParamCallNoShadow("", "", "setMainVideoStreamType&streamType=" + stall);
	            	setTimeout(function(){
	            		RfParamCallNoShadow("", "", "setSubVideoStreamType&streamType=0");
	            	},100);
	        	}
	        }*/
            if (matchs != null) {
                if (gVar_first.model == 1113) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_PASSWORD_EMPTY") + "<br />" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD"));
                }
                else {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_PWDANDUSR_ERROR") + "<br />" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD"));
                }
            }
            else {
                if (gVar_first.model == 1113) {
                    alert(lg.get("IDS_LOGIN_PASSWORD_EMPTY") + "\n" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD"));
                }
                else {
                    alert(lg.get("IDS_LOGIN_PWDANDUSR_ERROR") + "\n" + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD"));
                }
            }
            LoadLoginUserPage();
        } else {
            RfParamCall(GuidModeCall, "", "getGuideMode");
        }
    }
    else {
    	if(webLoginResult == -3){
    		webLoginResult = -7;
    	}
        gVar.webLoginCall = webLoginResult;
        ErrorLogin(gVar.webLoginCall);
    }
}
function onLogin() {
	
	if(IsFirefox() || IsEdge() || IsChromeSupportNacl()){
		if(gVar_first.httpver=="https"){
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NOTSUPPORT_HTTPS_LOGIN"));
			return;
		}
		/*if(browserPlatform != "macintel"){
			if(typeof(hasFlash) == "undefined"){
				var msg = lg.get("IDS_DOWNLOAD_FLASH_MSG");
				if(confirm(msg) == true){
					window.open("https://get2.adobe.com/flashplayer","_blank");
				}
				return;
			}*/
			/*
			gDvr.flashState();
			if(flashState == 0){
				ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FLASH_SETTING_TIPS"));
				return;
			}
			*/
        //}
	}
    //check userName format
    var userName = $("#username").val();
    var webLoginResult = -100;
    var userAg = navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);

    if (userName == "") {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_INPUT_USERNAME"));
        }
        else{
            alert(lg.get("IDS_BS_INPUT_USERNAME"));
        }
        return;
    }

    if (userName != "" && (!userName.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/))) {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_NAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_BS_BASE_USRNAME_TIP"));
        }
        else{
            alert(lg.get("IDS_LOGIN_NAME") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_BS_BASE_USRNAME_TIP"));
        }
        $("#username").focus();
        return;
    }

    document.getElementById("login_ok").onclick = null;
    MasklayerShow();
    gVar.nOpenPreView = $("#openPreview").attr("checked") * 1;
    gVar.user = $("#username").val();
    gVar.passwd = $("#passwd").val();

    gVar_first.user = gVar.user;
    gVar_first.passwd = gVar.passwd;
    gVar.mediaport = $("#mediaPort").val() * 1;
    gVar.nStreamType = $("#login_ml").val() * 1;
    gVar.lg = $("#login_language").val();
    setCookie("language", gVar.lg);
    gVar.multi = $("#left_multi1").val() * 1;
    if (gVar.nStreamType == 2) { gVar.nStreamType = 0; gVar.mediaport = gVar.port; }
    try {
        if (gVar.httpver == "https") {
            gDvr.SetHttpsFlg(1);
        } else {
            gDvr.SetHttpsFlg(0);
        }
        gDvr.Login(gVar.ip, gVar.mediaport, gVar.webPort, gVar.user, gVar.passwd, gVar.nStreamType, gVar.nDate);
        setTimeout(function () {
            if (gVar.pluginLoginCall == -100 || gVar.pluginLoginCall == -100) {
                MasklayerHide();
                if (matchs != null) {
                    ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_OVERT"));
                }
                else {
                    alert(lg.get("IDS_LEFT_OVERT"));
                }
                window.location.href = "";
            }
        }, 20000);
    } catch (e) {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NORIGHT_NOPLUGINS"));
        }
        else {
            alert(lg.get("IDS_NORIGHT_NOPLUGINS"));
        }
        setTimeout(function () {
            window.location.href = "";
        }, 3000);
        LoadLeftPage = BB;
        gDvr = new AA();
        gVar.pluginLoginCall = 0;
    }

    user = gVar_first.user;
    pwd = gVar_first.passwd;
}

function LoadLoginPage(DownPluginTip){
    $.get("html/login.html?" + gVar.nDate,function (data) {
        jQuery("head").append('<link href="css/login.css?' + gVar.nDate + '" rel="stylesheet" type="text/css" />');
        $("#login").html(data).css("display", "block");
        try { DownPluginTip(); } catch (e) { }
        try {
            if (needIEUpdate) {
                var objIE = document.getElementById("downPlugins");
                objIE.innerHTML = '<a id="down" href="IPCWebComponents.exe">' + lg.get("IDS_PLUGIN_UPDATE_TIP") + '</a>';
            }
            if (needServiceUpdate) {
		        var obj = document.getElementById("downPlugins");
	            obj.innerHTML = '<a id="down" href="IPCWebComponents.exe">' + lg.get("IDS_PLUGIN_UPDATE_TIP") + '</a>';
			}
        } catch (e) { }

        lan("login");
        UI.Button(".loginBtn");
        //fill cookie
        gVar.lg = getCookie("language") == null ? lgCls.defaultLg : getCookie("language");
        SetPluginLanguage();
        // try {
        //     if (gVar.lg == "CHS") gDvr.SetLauguage(0);
        //     else if (gVar.lg == "CHT") gDvr.SetLauguage(1);
        //     else gDvr.SetLauguage(2);
        // } catch (e) { }
        gVar.user = getCookie("userName");
        if (getCookie("userName") == null) {
            gVar.user = "admin";
        }
        $("#username").val(gVar.user);
        //lg	
        $("#login_language").empty();
        for (var i = 0; i < lgCls.mul.length; i++) {
            $("#login_language").append('<option class="option" value="' + lgCls.mul[i][0] + '">' + lgCls.mul[i][1] + '</option>');
        }
        if (lgCls.mul.length < 2) {
            $("#login_language").attr("disabled", "disabled");
        }
        else {
            $("#login_language").attr("disabled", "");
        }

        $("#login_language").val(gVar.lg)
        $("#login_language").change(function () {
            lg.refresh();
            var i = $(this).val();
            SetPluginLanguage();
            LanguageCall(i);
            gVar.lg = i;
        });
        if (getCookie("remenber") == 1) {
            var pwd = getCookie("pwd") == null ? "" : getCookie("pwd");
            if (pwd != "")
                $("#passwd").val(urlDecode(pwd));
            $("#remenberText").attr("checked", true);
        }
        if (gVar.mediaport != 0)
            $("#mediaPort").val(gVar.mediaport);

        $("#username").select().focus();
        $("#username, #passwd, #login_language, #username").keydown(function (e) {
            if (e.keyCode == 13) {
                onLogin();
            }
        });
		if(IsChromeSupportNacl()&&gVar_first.httpver=="https")
	    {
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NOT_SUPPORT_HTTPS"));
	    }
        gVar.bWebInit = true;
        browserAndPlatform();
        FAQs();
    });
}

function EditUserCall(xml) {
    var userAg = navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);

    if ($(xml).find("result").text() * 1 == 0) {
        if (matchs != null) {
            if (gVar_first.model == 1113) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_USR_SUCESSPSD"));
            }
            else {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NAMEPWD_CHANGESUCSS"));
            }
            setTimeout(function () {
                if (gVar.httpver == "http") {
                    window.location = "http://" + gVar.ip + ":" + gVar.port;
                }
                if (gVar.httpver == "https") {
                    window.location = "https://" + gVar.ip + ":" + gVar.httpsPort;
                }
            }, 3000);
        }
        else {
            if (gVar_first.model == 1113) {
                alert(lg.get("IDS_USR_SUCESSPSD"));
            }
            else {
                alert(lg.get("IDS_NAMEPWD_CHANGESUCSS"));
            }
            setTimeout(function () {
                if (gVar.httpver == "http") {
                    window.location = "http://" + gVar.ip + ":" + gVar.port;
                }
                if (gVar.httpver == "https") {
                    window.location = "https://" + gVar.ip + ":" + gVar.httpsPort;
                }
            }, 500);
        }
    }
    else if ($(xml).find("result").text() * 1 == -1) {   //USER_ACCOUNT_OPERATE_PARM_ERR
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_CGIW"));
        }
        else {
            alert(lg.get("IDS_LEFT_CGIW"));
        }
    }
    else if ($(xml).find("result").text() * 1 == -2) { //USER_ACCOUNT_OPERATE_EXCEED_MAX_USR
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_UNORPWD"));
        }
        else {
            alert(lg.get("IDS_LEFT_UNORPWD"));
        }
    }
    else if ($(xml).find("result").text() * 1 == -3) {  //USER_ACCOUNT_OPERATE_USR_ALREADY_EXIST
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        }
        else {
            alert(lg.get("IDS_LOGIN_CHANGE_USRNAME_EXIST"));
        }
    }
    else if ($(xml).find("result").text() * 1 == -4) {   //USER_ACCOUNT_OPERATE_USR_NOT_FOUND
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOUSRN"));
        }
        else {
            alert(lg.get("IDS_LOG_NOUSRN"));
        }
    }
    else if ($(xml).find("result").text() * 1 == -5) {   //USER_ACCOUNT_OPERATE_PASSWORD_ERR
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_WPWD"));
        }
        else {
            alert(lg.get("IDS_LOG_WPWD"));
        }
    }
    else {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_USR_CHANGE_NAMEANDPWD_FAILED"));
        }
        else {
            alert(lg.get("IDS_USR_CHANGE_NAMEANDPWD_FAILED"));
        }
    }
}

function onEditUser(){
    var userOldName;
    $("#txtLoginUser").val(gVar_first.user);
    userOldName = gVar_first.user;
    var userName = $("#txtLoginNewUser").val();
    var userAg = navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);
    if (gVar_first.model == 1113) {
        $("#loginNewUserName").css("display","none");
    }
    else {
        if (userName == "") {
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_USRNAME_EMPTY"));
            }
            else {
                alert(lg.get("IDS_LOGIN_CHANGE_USRNAME_EMPTY"));
            }
            $("#txtLoginNewUser").focus();
            return;
        }
        if (userName != "" && (!userName.match(/^[a-zA-Z0-9\_\-\@\$\*]+$/))) {
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_NAME") + " " + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_BS_BASE_USRNAME_TIP"));
            }
            else {
                alert(lg.get("IDS_LOGIN_NAME") + " " + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_BS_BASE_USRNAME_TIP"));
            }
            $("#txtLoginNewUser").focus();
            return;
        }
    }
    /*if (userOldName == userName) {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_USEEXIS"));
        }
        else {
            alert(lg.get("IDS_BS_USEEXIS"));
        }
        $("#txtLoginNewUser").focus();
        return;
    }*/
    var newPwd = $("#txtLoginNewPwd").val();
    if(newPwd == "") {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
        }
        else{
            alert(lg.get("IDS_LOGIN_CHANGE_PWD_EMPTY"));
        }
        $("#txtLoginNewPwd").focus();
        return;
    }
    if (newPwd != "" && isInCheckPwdFormat(newPwd) == 1 || isInCheckPwdFormat(newPwd) == 0 && !(isPWOK(newPwd))) {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD").split(".")[1] + "(" + lg.get("IDS_LOGIN_USER_WORD") + " ~ ! @ # % ^ * ( ) _ + { } : \"| < > ? ` - ; ' \\ , . /)");
        }
        else{
            alert(lg.get("IDS_BS_NEWPWD") + ((gVar.lg == "CHS" || gVar.lg == "CHT") ? "" : " ") + lg.get("IDS_FORMAT_ERROR") + "! " + lg.get("IDS_LOGIN_PWDANDUSR_PASSWORD").split(".")[1] + "(" + lg.get("IDS_LOGIN_USER_WORD") + "~ ! @ # % ^ * ( ) _ + { } : \"| < > ? ` - ; ' \\ , . /)");
        }
        $("#txtLoginNewPwd").focus();
        return;
    }
    if($("#txtLoginNewPwd").val() != $("#txtPwdConfirm").val()){
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PWD_NOTSAME"));
        }
        else {
            alert(lg.get("IDS_PWD_NOTSAME"));
        }
        $("#txtPwdConfirm").focus();
        return;
    }
    if (gVar_first.model == 1113) {
        RfParamCall(EditUserCall, "", "changeUserNameAndPwdTogether&usrName=" + gVar_first.user + "&newUsrName=admin" + "&oldPwd=" + gVar_first.passwd + "&newPwd=" + $("#txtLoginNewPwd").val());
    }
    else {
        RfParamCall(EditUserCall, "", "changeUserNameAndPwdTogether&usrName=" + gVar_first.user + "&newUsrName=" + $("#txtLoginNewUser").val() + "&oldPwd=" + gVar_first.passwd + "&newPwd=" + $("#txtLoginNewPwd").val());
    }
}

function LoadLoginUserPage() {
    $.get("html/login_user.html?" + gVar.nDate, function (data) {
        $("#login").html(data).css("display", "block");
        lan("login_user");
        $("#txtLoginNewUser").select().focus();
        if (gVar_first.model == 1113) {
            $("#loginNewUserName").css("display", "none");
        }
        $("#txtLoginUser, #txtLoginNewUser, #txtLoginNewPwd, #txtPwdConfirm").keydown(function (e) {
            if (e.keyCode == 13) {
                onEditUser();
            }
        });
        $("#txtLoginUser").val(gVar_first.user);
    });
}

function LoadLeftPage(func){
	tabkey = 0;
	$.getScript("js/divBox.js?"+gVar.nDate, null);
	$.get("html/left.html?"+gVar.nDate, function(data){
		$("#mleft").html(data).attr("name", "isDown");
		lan("left");
		RegLeftEvent();
	    if (IsChromeSupportNacl() || IsFirefox() || IsEdge()) {
	        $("#PlayBackMenu").remove();
	        $("#bs_multi").remove();
	        $("#multiLive").remove();
	        // $("#sys_dr").remove();
            // $("#sys_patch").remove();
	    }
		$.getScript("js/left.js?"+gVar.nDate,function(){
			try{func();}catch(e){}	
			$.getScript("js/cal.js",function(){
				$('#next_touch_date').simpleDatepicker({type:0,x:0,y:5,Laguage:gVar.lg});
				$('#next_touch_date').click();
				$("#calday").val($('#next_touch_date').simpleDatepicker.formatOutput(new Date()));
			});
			
			if ($.browser.version.indexOf("6") >= 0&&$.browser.msie){
				$("#configMl").css("margin-left", "-7px");
			}
		});
	});
}
function SliderCgi($o,v){
    //gVar.KCgi("cmd="+$o.attr("cmd")+"&"+$o.attr("flag")+"="+(v|0));
    RfParamCallNoShadow("", "", $o.attr("cmd")+"&"+$o.attr("flag")+"="+(v|0));
}

function RegLeftEvent(){
	
	/*if(IsChromeSupportNacl())
	{
	UI.motionAmb("#mboxamb");
	UI.Shel("#box", "#box1,#box2,#box3,#box4", "#box1T,#box2T,#box3T,#box4T");
	UI.motion("#mbox", "#mboxS1");
	}*/
	$(".mSel").click(function(){
		$(".mSel").css("outline", "2px solid #fff")
		$(this).css("outline", "2px solid #ff0")
	}).dblclick(function(){
		var n = $(this).attr("name")*1;
		gDvr.FullScreen(n);
	});
	UI.Clor("gsliderCov", "gsliderBtn", "gslider",15,null,function(o,v){gVar.pbMouseDown=false;gDvr.PbSeek(v);},function(){gVar.pbMouseDown=true},function(){return !gVar.bPbStop;});
	UI.Clor("clordiv_1","clorbtn_1","clordir_1",0,function($o,v){$("#live_wd_sj").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	UI.Clor("clordiv_2","clorbtn_2","clordir_2",0,function($o,v){$("#live_wd_ld").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	UI.Clor("clordiv_3","clorbtn_3","clordir_3",0,function($o,v){$("#live_wd_dbd").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	UI.Clor("clordiv_4","clorbtn_4","clordir_4",0,function($o,v){$("#live_wd_bhd").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	UI.Clor("clordiv_5","clorbtn_5","clordir_5",0,function($o,v){$("#live_wd_rd").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	UI.Clor("clordiv_6","clorbtn_6","clordir_6",0,function($o,v){$("#live_wd_video").attr("innerHTML",v|0);},function($o,v){SliderCgi($o,v)});
	
	UI.Button(".rtstyle1", 21);
	UI.Button("#live_fw", 54);
	//UI.Button("#LVCapture",31);
	//UI.Button("#LVRrA,#LVRr",0,-21);
	UI.Button("#RcSearch", 23);
	UI.Button("#RcReload", 23);
    UI.Button("#divReloadMusic", 23);
    UI.Button("#cruise_1,#preset_2,#LED_3,#colar_4,#music_5,#guard_6", 0, -25, function (e, p) { if (e.type = "mouseout") { return false; } })

	//UI.Button("#cruise_stop,#cruise_start,#pre_add,#pre_sub,#pre_goto,#preSetNameS,#preSetNameQ,#zoomOut,#zoomIn,#zoomStop", 24);
	UI.Button("#cruise_stop,#cruise_start,#pre_add,#pre_sub,#pre_goto,#preSetNameS,#preSetNameQ", 24);
	UI.Button("#music_prev,#music_next,#music_play,#music_pause,#music_stop,#music_prev", 24);
	UI.Button("#music_singlerepeat,#music_allrepeat,#music_playlist,#music_10,#music_20,#music_30,music_100", 24);
	//UI.Button("#cruise_stop",24,-21,null,0,1);
	UI.UIGroupBt("#cruise_1,#preset_2,#LED_3,#colar_4,#music_5,#guard_6", "#m_", 6, 191, function (e, p) {
		if(e.type== "mouseup"){return false;}return true;
	});
	$("#cruise_start").click(function(){
	    //gVar.KCgi("cmd=ptzStartCruise&mapName="+OthToEnu($("#cruise").find("option:selected").text()));
        RfParamCallNoShadow("", "", "ptzStartCruise&mapName="+OthToEnu($("#cruise").find("option:selected").text()));
	})
	$("#cruise_stop").click(function(){
	    //gVar.KCgi("cmd=ptzStopCruise")
        RfParamCallNoShadow("", "", "ptzStopCruise");
	})
	$("#zoomIn").click(function() {

	}).mousedown(function() {
	    //gVar.KCgi("cmd=zoomIn");
        RfParamCallNoShadow("", "", "zoomIn");
        isZoomWork = 1
	}).mouseup(function() {
	    //gVar.KCgi("cmd=zoomStop");
        RfParamCallNoShadow("", "", "zoomStop");
        isZoomWork = 0;
	}).mouseover(function() {
	    $("#zoomIn").css("background", "url(../images/zoomin02.png)");
	}).mouseout(function() {
	    $("#zoomIn").css("background", "url(../images/zoomin.png)");
		if(isZoomWork){
			RfParamCallNoShadow("", "", "zoomStop");
			isZoomWork = 0;
		}
	})
	$("#zoomOut").click(function() {
	}).mousedown(function() {
	    //gVar.KCgi("cmd=zoomOut");
        RfParamCallNoShadow("", "", "zoomOut");
        isZoomWork = 1;
	}).mouseup(function() {
	    //gVar.KCgi("cmd=zoomStop");
        RfParamCallNoShadow("", "", "zoomStop");
        isZoomWork = 0
	}).mouseover(function() {
	    $("#zoomOut").css("background", "url(../images/zoomout02.png)");
	}).mouseout(function() {
	    $("#zoomOut").css("background", "url(../images/zoomout.png)");
		if(isZoomWork){
			RfParamCallNoShadow("", "", "zoomStop");
			isZoomWork = 0
		}
	});

	$("#focus_far").click(function () {
	}).mousedown(function () {
	    //gVar.KCgi("cmd=focusFar");
	    RfParamCallNoShadow("", "", "focusFar");
	    isFocusWork = 1;
	}).mouseup(function () {
	    //gVar.KCgi("cmd=focusStop");
	    RfParamCallNoShadow("", "", "focusStop");
	    isFocusWork = 0;
	}).mouseover(function () {
	    $("#focus_far").css("background", "url(../images/zoomin02.png)");
	}).mouseout(function () {
	    $("#focus_far").css("background", "url(../images/zoomin.png)");
		if(isFocusWork){
			RfParamCallNoShadow("", "", "focusStop");
			isFocusWork = 0;
		}
	})

	$("#focus_near").click(function () {
	}).mousedown(function () {
	    //gVar.KCgi("cmd=focusNear");
	    RfParamCallNoShadow("", "", "focusNear");
	    isFocusWork = 1;
	}).mouseup(function () {
	    //gVar.KCgi("cmd=focusStop");
	    RfParamCallNoShadow("", "", "focusStop");
	    isFocusWork = 0;
	}).mouseover(function () {
	    $("#focus_near").css("background", "url(../images/zoomout02.png)");
	}).mouseout(function () {
	    $("#focus_near").css("background", "url(../images/zoomout.png)");
		if(isFocusWork){
			RfParamCallNoShadow("", "", "focusStop");
			isFocusWork = 0;
		}
	})

	$("#pre_goto").click(function(){
	    //gVar.KCgi("cmd=ptzGotoPresetPoint&name=" + OthToEnu($("#preset").find("option:selected").text()));
        RfParamCallNoShadow("", "", "ptzGotoPresetPoint&name=" + OthToEnu($("#preset").find("option:selected").text()));
	})
	
	$("#pre_add").click(function(){
		$("#preSetNameT").css("display", "none");
		$("#preSetName,#preSetNameS,#preSetNameQ").css("display", "");
		$("#preSetNameTe").focus();
	})

    //mode:  1 - list play, 2 - single repeat, 3 - all repeat
    $("#music_play").click(function(){
		$("#music_stop").css("display","");
		$("#music_play").css("display","none");
        $("#liveBtnBt3").css("display","");
        $("#liveBtnBt4").css("display","none");
        gDvr.TalkCMD(IFs,1);
		isOpenT[IFs] = false;
        if(Struct.babyPlayMode == 0){
            Struct.babyPlayMode = 3;
        }

        RfParamCallNoShadow("", "", "setMusicPlayStart&mode=" + Struct.babyPlayMode + "&index=0&name=" + $("#sel_music_list").val());
    })

    $("#music_pause").click(function(){
        
    })

    $("#music_stop").click(function(){
		$("#music_stop").css("display","none");
		$("#music_play").css("display","");
        RfParamCallNoShadow("", "", "setMusicPlayStop");
    })

    $("#music_prev").click(function(){
        //gVar.KCgi("cmd=setMusicPlayPre");
        RfParamCallNoShadow("", "", "setMusicPlayPre");
    })

    $("#music_next").click(function(){
        //gVar.KCgi("cmd=setMusicPlayNext");
        RfParamCallNoShadow("", "", "setMusicPlayNext");
    })

    $("#music_singlerepeat").click(function(){
        $("#music_singlerepeat").css("display", "none");
        $("#music_allrepeat").css("display", "");
        $("#music_playlist").css("display", "none");
        //gVar.KCgi("cmd=setMusicPlayMode&mode=2");           //repeat
        RfParamCallNoShadow("", "", "setMusicPlayMode&mode=2");
    })

    $("#music_allrepeat").click(function(){
        $("#music_singlerepeat").css("display", "none");
        $("#music_allrepeat").css("display", "none");
        $("#music_playlist").css("display", "");
        //gVar.KCgi("cmd=setMusicPlayMode&mode=3");           //loop
        RfParamCallNoShadow("", "", "setMusicPlayMode&mode=3");
    })

    $("#music_playlist").click(function(){
        $("#music_singlerepeat").css("display", "");
        $("#music_allrepeat").css("display", "none");
        $("#music_playlist").css("display", "none");
        //gVar.KCgi("cmd=setMusicPlayMode&mode=1");           //play with list
        RfParamCallNoShadow("", "", "setMusicPlayMode&mode=1");
    })
	
	$("#music_10").click(function(){
        $("#music_10").css("display", "none");
        $("#music_20").css("display", "");
        $("#music_30").css("display", "none");
        $("#music_100").css("display", "none");
        //gVar.KCgi("cmd=setMusicDormantTime&minutes=10");
        RfParamCallNoShadow("", "", "setMusicDormantTime&minutes=10");
	})
	
	$("#music_20").click(function(){
        $("#music_20").css("display", "none");
        $("#music_30").css("display", "");
        $("#music_10").css("display", "none");
        $("#music_100").css("display", "none");
        //gVar.KCgi("cmd=setMusicDormantTime&minutes=20");
        RfParamCallNoShadow("", "", "setMusicDormantTime&minutes=20");
	})
	
	$("#music_30").click(function(){
        $("#music_30").css("display", "none");
        $("#music_100").css("display", "");
	    $("#music_10").css("display", "none");
	    $("#music_20").css("display", "none");
	    //gVar.KCgi("cmd=setMusicDormantTime&minutes=30");
        RfParamCallNoShadow("", "", "setMusicDormantTime&minutes=30");
	})
	
	$("#music_100").click(function(){
	    $("#music_100").css("display", "none");
        $("#music_10").css("display", "");
        $("#music_20").css("display", "none");
	    $("#music_30").css("display", "none");
	    //gVar.KCgi("cmd=setMusicDormantTime&minutes=-1");
        RfParamCallNoShadow("", "", "setMusicDormantTime&minutes=-1");
	})

	UI.Button("#color_default", 0, -21, function (e, p) {
	    if (e.type == "mousedown") {//reset pt
	        switch (lgCls.version) {
	            default: 
	                {
	                    //gVar.KCgi("cmd=resetImageSetting");
	                    RfParamCallNoShadow("", "", "resetImageSetting");
	                    break;
	                }
	        }
	    }
	    return true;
	})
			
	
			//pt 
	UI.Button("div[id ^= 'live_yt1_']", 22, null, function(e,p){
		PTZPro(e,p);
		return true;
	});
	
	UI.Button("div[id ^= 'live_yt2_']", 13, null, function(e,p){
		PTZPro(e,p);
		return true;
	});
				
	UI.Button("div[id ^= 'live_yt5_']", 12, null, function(e,p){
		PTZPro(e,p);
		return true;
	});
			
	$("#live_jz,#live_fw").click(function(e){
		if(gVar.nUserRight>=100){
			gVar.MJKCgi("25");
		}else{
			var cmd = $(this).attr("cmd");
			//gVar.KCgi("cmd="+cmd);
            RfParamCallNoShadow("", "", cmd);
		}
	})
			
	$("#live_fz").click(function(){
	    //gVar.KCgi("cmd=flipVideo&isFlip="+(1-Struct.isFlip*1));
        RfParamCallNoShadow("", "", "flipVideo&isFlip="+(1-Struct.isFlip*1));
	})
			
	$("#live_jx").click(function(){

	    //gVar.KCgi("cmd=mirrorVideo&isMirror="+(1-Struct.isMirror*1));
        RfParamCallNoShadow("", "", "mirrorVideo&isMirror="+(1-Struct.isMirror*1));
	})

	//if($("#login_ml").val()==1) $("#livespltr").css("display","none");
	$("#live_spl").change(function(){
        livesplClicked = true;
		var cmdstr = "";
		if(gVar.nStreamType == 0){
			cmdstr = "setMainVideoStreamType"
		}else{
			cmdstr = "setSubVideoStreamType"
		}
		var streamType = $(this).val()*1;
		gVar.nSelStreamType = $(this).val()*1;
        
	

	HDR_WDR_DisabledSwitch();
		//gVar.KCgi("cmd="+cmdstr+"&streamType="+streamType);
        RfParamCallNoShadow("", "", cmdstr+"&streamType="+streamType);
	})
	$("#BsHmode").change(function () {	    
		if ($("#BsHmode").val() == 0) {
	        $("#BsHwdManualSetting").css("display", "none");
	        //gVar.KCgi("cmd=setInfraLedConfig&mode=" + $("#BsHmode").val())
            RfParamCallNoShadow("", "", "setInfraLedConfig&mode=" + $("#BsHmode").val());
	    }
	    else if ($("#BsHmode").val() == 1) {
	        $("#BsHwdManualSetting").css("display", "");
	        $("#irOn").removeAttr("checked");
	        $("#irOff").removeAttr("checked");
	        //gVar.KCgi("cmd=setInfraLedConfig&mode=" + $("#BsHmode").val());
            RfParamCallNoShadow("", "", "setInfraLedConfig&mode=" + $("#BsHmode").val());

	        if (Struct.infraLedState == 1) {
	            $("#irOff").attr("checked", "checked");
	        }
	        else {
	            $("#irOn").attr("checked", "checked");
	        }
	    }
	    else if ($("#BsHmode").val() == 2) {
	        $("#BsHwdManualSetting").css("display", "none");
	        //gVar.KCgi("cmd=setInfraLedConfig&mode=2");
            RfParamCallNoShadow("", "", "setInfraLedConfig&mode=2");
	    }
	    else {
	        //gVar.KCgi("cmd=setInfraLedConfig&mode=1");
            RfParamCallNoShadow("", "", "setInfraLedConfig&mode=1");
	    }


	})

	$("#guardSetPostion").change(function () {
	    RfParamCall(null, "", "ptzSetGuardPosition&name=" + $("#guardSetPostion").val());
	    //guard = $("#guardSetPostion").val();
	});

	$("#live_pf").change(function(){
		var freq = $(this).val()*1;
		//gVar.KCgi("cmd=setPwrFreq&freq="+freq);
        RfParamCallNoShadow("", "", "setPwrFreq&freq="+freq);
	})

	//HDR
	$("#live_HDR").change(function () {
	    var HDR = $(this).val() * 1;
	    RfParamCallNoShadow("", "", "setHdrMode&mode=" + HDR);
	});
    	//WDR
    	$("#liveVideo_WDR").change(function () {
              var WDR = $(this).val() * 1;
              RfParamCallNoShadow("", "", "setWdrMode&mode=" + WDR);
	});

	$("#preSetNameS").click(function(){
	    var text = $("#preSetNameTe").val();
        //check name not null
	    if (text == "") {
	        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_PRENAME"));
	        return;
	    }
        //check name has space
	    if (text.indexOf(' ') >= 0) {
	        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NAME_NOSPACE"));
	        return;
	    }
        //check format
    	if (IsLimitLength($("#preSetNameTe").val(), 20) && MatchReg(text))
	    {
            //check is maxpre
		    if($("#preset option").length*1 == 16)
		    {
		        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_MAXPRE"));
		        return;
		    }
    		
		    var isExists=false;
		    $("#preset option").each(function(){
			    if($(this).text()==text)
			    {
			        isExists=true;
			    }
		    });
		    if(isExists == true)
		    {
		        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_PREIS"));
		        return;
		    }

		    //gVar.KCgi("cmd=ptzAddPresetPoint&name="+$("#preSetNameTe").val());
            RfParamCallNoShadow("", "", "ptzAddPresetPoint&name="+$("#preSetNameTe").val());
		    $("#preSetNameT").css("display", "");
		    $("#preSetName,#preSetNameS,#preSetNameQ").css("display", "none");
		    $("#preSetNameTe").val("");
		}
		else {
		    if (gVar_first.N_language != 2) ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FORMAT_ERROR") + "!  " + lg.get("IDS_PTZ_CTRNAMETIP"));
		    else ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_FORMAT_ERROR") + "!  " + lg.get("IDS_PTZ_CTRNAMETIP2"));
		    return ;
		}

	});
			
	$("#preSetNameQ").click(function(){
		$("#preSetNameT").css("display", "");
		$("#preSetName,#preSetNameS,#preSetNameQ").css("display", "none");
		$("#preSetNameTe").val("");
	});

    function DeletePresetPointCall(xml) {
        var prePointDelResult = $(xml).find("deleteResult").text();
        if (prePointDelResult == 3) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PRESET_NO_DELETE"));
        }
        if (prePointDelResult == 4) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_PRESET_NO_DELETE_ISCRUISE"));
        }
    }

	$("#pre_sub").click(function () {
	    var svaPrepoint = OthToEnu(($("#preset")).find("option:selected").text());
	    if (svaPrepoint == "TopMost" || svaPrepoint == "BottomMost" || svaPrepoint == "LeftMost" || svaPrepoint == "RightMost") {
	        ShowPaop(lg.get("IDS_TIPS"), lg.get("PTZ_PRESET_POINT_DELETE_ERROR"));
	    }
	    else {
	        //gVar.KCgi("cmd=ptzDeletePresetPoint&name=" + ChsToEnu($("#preset").find("option:selected").text()));
	        var cgiRet = "";
	        var isHttps = 0;
	        if (gVar.httpver == "https") {
	            isHttps = 1;
	        }

	        RfParamCallNoShadow(DeletePresetPointCall, "", "ptzDeletePresetPoint&name=" + $("#preset").find("option:selected").text());
	    }
	});
	
	//提示语
	$(".liveBtnBt1").attr("title",lg.get("IDS_OPEN_ALL_CHANNEL"))
	$(".liveBtnBt2").attr("title",lg.get("IDS_CLOSE_ALL_CHANNEL"))
	$(".liveBtnBt3").attr("title",lg.get("IDS_TIP_PRE"))
	$(".liveBtnBt4").attr("title",lg.get("IDS_TIP_NEXT"))
	$(".liveBtnBt5").attr("title",lg.get("IDS_FULLSCREEN"))
	$(".liveBtnBt6").attr("title",lg.get("IDS_TIP_SPLITER"))
	$("#pbBtnBt10").attr("title",lg.get("IDS_TIP_PLAY"))
	$(".liveBtnBt11").attr("title",lg.get("IDS_TIP_TEMCLOSE"))
	$("#pbBtnBt12").attr("title",lg.get("IDS_TIP_STOP"))

	$("#live_yt2_5").attr("title",lg.get("IDS_PTZ_LEFTUP"))
	$("#live_yt1_1").attr("title",lg.get("IDS_PTZ_UP"))
	$("#live_yt3_6").attr("title",lg.get("IDS_PTZ_RIGHTUP"))
	$("#live_yt5_3").attr("title",lg.get("IDS_PTZ_LEFT"))
	$("#live_yt6_21").attr("title",lg.get("IDS_PTZ_AUTO"))
	$("#live_yt4_4").attr("title",lg.get("IDS_PTZ_RIGHT"))
	$("#live_yt2_7").attr("title",lg.get("IDS_PTZ_LEFTDOWN"))
	$("#live_yt1_2").attr("title",lg.get("IDS_PTZ_DOWN"))
	$("#live_yt3_8").attr("title",lg.get("IDS_PTZ_RIGHTDOWN"))
	
	
	$("#live_wd_sd1").attr("title",lg.get("IDS_SOUND")).mouseover(function(){this.style.cursor="pointer"})
	
	
	$("#pre_sub").attr("title",lg.get("IDS_DEl_PRESET"))
	$("#pre_add").attr("title",lg.get("IDS_BTN_ADD_PRESET"))
	$("#pre_goto").attr("title",lg.get("IDS_CALL_PRESET"))
	$("#preSetNameS").attr("title",lg.get("IDS_REBOOT_OK"))
	$("#preSetNameQ").attr("title",lg.get("IDS_REBOOT_CANCLE"))
	$("#cruise_stop").attr("title",lg.get("IDS_STOP_CURISE"))
	$("#cruise_start").attr("title",lg.get("IDS_CALL_CURISE"))
	$("#zoomIn").attr("title",lg.get("IDS_Z_ZOOMIN"))
	$("#zoomOut").attr("title",lg.get("IDS_Z_ZOOMOUT"))
	$("#focus_far").attr("title", lg.get("IDS_PTZ_FOCUS"))
	$("#focus_near").attr("title", lg.get("IDS_PTZ_FOCUS"))

    $("#music_play").attr("title",lg.get("IDS_TIP_PLAY"));
    $("#music_pause").attr("title",lg.get("IDS_TIP_TEMCLOSE"));
    $("#music_stop").attr("title",lg.get("IDS_TIP_STOP"));
    $("#music_prev").attr("title",lg.get("IDS_CHILD_MUSIC_PREV"));
    $("#music_next").attr("title",lg.get("IDS_CHILD_MUSIC_NEXT"));
    $("#music_singlerepeat").attr("title",lg.get("IDS_CHILD_MUSIC_PLAY_IN_TURN"));
    $("#music_allrepeat").attr("title",lg.get("IDS_CHILD_MUSIC_ONE_REPEAT"));
    $("#music_playlist").attr("title",lg.get("IDS_CHILD_MUSIC_ALL_REPEAT"));
	$("#music_10").attr("title",lg.get("IDS_CHILD_MUSIC_SLIP100"));
	$("#music_20").attr("title",lg.get("IDS_CHILD_MUSIC_SLIP10"));
	$("#music_30").attr("title",lg.get("IDS_CHILD_MUSIC_SLIP20"));
	$("#music_100").attr("title",lg.get("IDS_CHILD_MUSIC_SLIP30"));
}
function SilderGetCall(n,s,id){
	$("#clordir_"+n).css("width", s+"%");
	$("#clorbtn_"+n).css("margin-left", s);
	$("#clordiv_"+n).attr("speed", s);
	$("#"+id).attr("innerHTML",s);
}
function RfSc(){
	SilderGetCall(1,Struct.hue,"live_wd_sj");
	SilderGetCall(2,Struct.brightness,"live_wd_ld");
	SilderGetCall(3,Struct.contrast,"live_wd_dbd");
	SilderGetCall(4,Struct.saturation,"live_wd_bhd");
	SilderGetCall(5,Struct.sharpness,"live_wd_rd");
}

function GetStreamMode(mode) {
    switch (mode) {
        case 0: return lg.get("IDS_AV_BASE_DISTINCT_MODE"); break;
        case 1: return lg.get("IDS_AV_BASE_BALANCE_MODE"); break;
        case 2: return lg.get("IDS_AV_BASE_SMOOTH_MODE"); break;
        case 3: return lg.get("IDS_AV_BASE_CUSTOM_MODE"); break;
        default: return;
    }
}

function RfSpl(){
    if (gVar.nStreamType == 0) {  
	    $("#live_spl").empty();
	  //main stream
        for (var i = 0; i < 4; i++) {
            var resolt = "";
            var bitR = "";
            if (Struct.StreamParamInfo[i].resolution == 0)
                resolt = "720P";
            else if (Struct.StreamParamInfo[i].resolution == 1)
                resolt = "VGA";
            else if (Struct.StreamParamInfo[i].resolution == 2)
                resolt = "QVGA";
            else if (Struct.StreamParamInfo[i].resolution == 3)
                resolt = "VGA";
            else if (Struct.StreamParamInfo[i].resolution == 4)
                resolt = "QVGA";
            else if (Struct.StreamParamInfo[i].resolution == 6)
                resolt = "960P";
	    else if(Struct.StreamParamInfo[i].resolution == 7)
	    	resolt = "1080P";
            else if(Struct.StreamParamInfo[i].resolution == 8)
            resolt = "3M";
			else if(Struct.StreamParamInfo[i].resolution == 9)
			resolt="2K";
            else
                resolt = "QCIF";
	    if(Struct.StreamParamInfo[i].bitRate == 8388608)
		bitR = "8M"
	    else if(Struct.StreamParamInfo[i].bitRate == 6291456)
		bitR = "6M"
	        else if (Struct.StreamParamInfo[i].bitRate > 3145728)
                bitR = "4M"
            else if (Struct.StreamParamInfo[i].bitRate > 1572864 && Struct.StreamParamInfo[i].bitRate <= 3145728)
                bitR = "2M"
            else if (Struct.StreamParamInfo[i].bitRate > 786432 && Struct.StreamParamInfo[i].bitRate <= 1572864)
                bitR = "1M"
            else if (Struct.StreamParamInfo[i].bitRate > 393216 && Struct.StreamParamInfo[i].bitRate <= 786432)
                bitR = "512K"
            else if (Struct.StreamParamInfo[i].bitRate > 233472 && Struct.StreamParamInfo[i].bitRate <= 393216)
                bitR = "256K"
            else if (Struct.StreamParamInfo[i].bitRate > 167936 && Struct.StreamParamInfo[i].bitRate <= 233472)
                bitR = "200K"
            else if (Struct.StreamParamInfo[i].bitRate > 116736 && Struct.StreamParamInfo[i].bitRate <= 167936)
                bitR = "128K"
            else if (Struct.StreamParamInfo[i].bitRate > 76800 && Struct.StreamParamInfo[i].bitRate <= 116736)
                bitR = "100K"
            else if (Struct.StreamParamInfo[i].bitRate > 35840 && Struct.StreamParamInfo[i].bitRate <= 76800)
                bitR = "50K"
            else
                bitR = "20K"
            if (isEncy[IFs]) {
                $("#live_spl").append("<option value=" + i + ">" + GetStreamMode(i) + "/ " + resolt + "/ " + Struct.StreamParamInfo[i].frameRate + "fps/ " + bitR + "</option>");
            } else {
                $("#live_spl").append("<option value=" + i + ">" + i + "/ " + resolt + "/ " + Struct.StreamParamInfo[i].frameRate + "fps/ " + bitR + "</option>");
            }
        }
    }

    setTimeout(function () {
        if (gVar.nStreamType == 0) {
            $("#live_spl").val(gVar.nSelStreamType);
			HDR_WDR_DisabledSwitch();
        }
    }, 1);
}

function RfSplSub() {
   
    //sub stream
        if (gVar.nStreamType == 1) {
			 $("#live_spl").empty();
            for (var i = 0; i < 4; i++) {
                var resolt = "";
                var bitR = "";
                if (Struct.SubStreamParamInfo[i].resolution == 0)
                    resolt = "720P";
                else if (Struct.SubStreamParamInfo[i].resolution == 1)
                    resolt = "VGA";
                else if (Struct.SubStreamParamInfo[i].resolution == 2)
                    resolt = "QVGA";
                else if (Struct.SubStreamParamInfo[i].resolution == 3)
                    resolt = "VGA";
                else if (Struct.SubStreamParamInfo[i].resolution == 4)
                    resolt = "QVGA";
                else if (Struct.SubStreamParamInfo[i].resolution == 6)
                    resolt = "960P";
                else
                    resolt = "QCIF";
                if (Struct.SubStreamParamInfo[i].bitRate == 4194304)
                    bitR = "4M"
                else if (Struct.SubStreamParamInfo[i].bitRate == 2097152)
                    bitR = "2M"
                else if (Struct.SubStreamParamInfo[i].bitRate == 1048576)
                    bitR = "1M"
                else if (Struct.SubStreamParamInfo[i].bitRate > 393216)
                    bitR = "512K"
                else if (Struct.SubStreamParamInfo[i].bitRate > 233472 && Struct.SubStreamParamInfo[i].bitRate <= 393216)
                    bitR = "256K"
                else if (Struct.SubStreamParamInfo[i].bitRate > 167936 && Struct.SubStreamParamInfo[i].bitRate <= 233472)
                    bitR = "200K"
                else if (Struct.SubStreamParamInfo[i].bitRate > 116736 && Struct.SubStreamParamInfo[i].bitRate <= 167936)
                    bitR = "128K"
                else if (Struct.SubStreamParamInfo[i].bitRate > 76800 && Struct.SubStreamParamInfo[i].bitRate <= 116736)
                    bitR = "100K"
                else if (Struct.SubStreamParamInfo[i].bitRate > 35840 && Struct.SubStreamParamInfo[i].bitRate <= 76800)
                    bitR = "50K"
                else
                    bitR = "20K"
                if (isEncy[IFs]) {
                    $("#live_spl").append("<option value=" + i + ">" + GetStreamMode(i) + "/ " + resolt + "/ " + Struct.SubStreamParamInfo[i].frameRate + "fps/ " + bitR + "</option>");
                } else {
                    $("#live_spl").append("<option value=" + i + ">" + i + "/ " + resolt + "/ " + Struct.SubStreamParamInfo[i].frameRate + "fps/ " + bitR + "</option>");
                }
            }
        }
        setTimeout(function () {
            if (gVar.nStreamType == 1) {
                $("#live_spl").val(gVar.nSelStreamType);
            }
        }, 1);
}

function RfHdr() {
    setTimeout(function () {
        $("#live_HDR").val(Struct.hdrstate);
    }, 1);
}


function RfNAA(){
	setTimeout(function(){
		$("#liveVideo_NAA").val(Struct.naastate);
	},1);
}
	
function RfWdr() {
    setTimeout(function () {
        $("#liveVideo_WDR").val(Struct.wdrstate);
    }, 1);
}
function RfPf(){
	setTimeout(function(){
	$("#live_pf").val(Struct.pwrFreq)
	},1);
}
function RfRs(){
	if(gVar.nUserRight==2 || gVar.nUserRight >= 100){
	if(Struct.recordState == 0){
		if (isOpenR[0] == 1) {
            $("#LVRc").css("display", "");$("#LVRcA").css("display", "none");
        }else{
        	$("#LVRcA").css("display", "");$("#LVRc").css("display", "none");
        }
	}
	else {$("#LVRcA").css("display", "none");$("#LVRc").css("display", "");}
	}
}

function RfLs(){
    setTimeout(function() {
        $("#BsHmode").val(Struct.infraLedMode);
	},1);
    if (Struct.infraLedMode == 0) {
        $("#BsHwdManualSetting").css("display", "none");
	}
    else if (Struct.infraLedMode == 1) {
        $("#BsHwdManualSetting").css("display", "");

	    if (Struct.infraLedState == 1) {
	        $("#irOff").attr("checked", "checked");
		}
	    else {
		    $("#irOn").attr("checked", "checked");
		}
    }
    else if (Struct.infraLedMode == 2) {
        $("#BsHwdManualSetting").css("display", "none");
    }
	HDR_WDR_DisabledSwitch();
	
}

function RfpP(){
	$("#preset").empty();
	for (var i=1; i<=Struct.presetPointCnt; i++){
		//if(Struct.curPresetPoint == i){
			//$("#preset").append('<option class="option" selected="selected" value="'+i+'">'+EnuToOth(Struct.presetPointList[i])+'</option>');
		//}
		//else
	    $("#preset").append('<option class="option" value="' + Struct.presetPointList[i] + '">' + EnuToOth(Struct.presetPointList[i]) + '</option>');
	}
	/*setTimeout(function(){
		$("#preset").val(Struct.curPresetPoint)
	}, 1)*/
}
function RfgU() {
    $("#guardSetPostion").empty();
    var i = Struct.presetPointCnt;
    if (Struct.curPresetPoint == "None") {
        $("#guardSetPostion").append('<option id="guardNone" class="option" value="' + Struct.curPresetPoint + '">' + EnuToOth(Struct.curPresetPoint) + '</option>');
    }
    for (var i = 1; i <=Struct.presetPointCnt; i++) {
        $("#guardSetPostion").append('<option class="option" value="' + Struct.presetPointList[i] + '">' + EnuToOth(Struct.presetPointList[i]) + '</option>');
    }
    //if (Struct.curPresetPoint != guard) {
        //$("#guardSetPostion").val(guard);
   // }
  //  else {
        $("#guardSetPostion").val(Struct.curPresetPoint);
   // }
}
function RfcM(){
	$("#cruise").empty();
	for (var i=0; i<Struct.cruiseMapCnt; i++){
		if(Struct.curCruiseMap==Struct.cruiseMapList[i])
		    $("#cruise").append('<option selected="selected" class="option" value="'+i+'">'+EnuToOth(Struct.cruiseMapList[i])+'</option>');
		else 
		    $("#cruise").append('<option class="option" value="'+i+'">'+EnuToOth(Struct.cruiseMapList[i])+'</option>');
	}
	
	/*setTimeout(function(){
		$("#cruise").val(Struct.curCruiseMap)
	}, 1)*/
}
function Rfjx(){
	//if(Struct.isMirror*1 == 1) $("#live_jx").css("background-position","-62px 0px");
    if (Struct.isMirror * 1 == 1) $("#live_jx").attr("checked", "checked");
    else $("#live_jx").removeAttr("checked");
    //else $("#live_jx").css("background-position", "0px 0px");
}
function Rffz(){
	//if(Struct.isFlip*1 == 1) $("#live_fz").css("background-position","-62px 0px");
    if (Struct.isFlip * 1 == 1) $("#live_fz").attr("checked", "checked");
    else $("#live_fz").removeAttr("checked");
    //else $("#live_fz").css("background-position", "0px 0px");
}

function RfBabyMusicList(){
    $("#sel_music_list").empty();
    if(Struct.babyCurMusicListName != "" && Struct.babyListCnt != 0){
        for( var i = 0; i < Struct.babyListCnt; i++){
            if(Struct.babyCurMusicListName == Struct.babayMusicList[i].listName){
                $("#sel_music_list").append('<option selected="selected" class="option" value="'+Struct.babayMusicList[i].listName+'">'+Struct.babayMusicList[i].listName+'</option>');
            }else{
                $("#sel_music_list").append('<option class="option" value="'+Struct.babayMusicList[i].listName+'">'+Struct.babayMusicList[i].listName+'</option>');
            }
        }
    }
}


/*
function HDR_WDR_DisabledSwitch() 
2015/12/10 yangwei
constorl the "wdr" and "hdr" can been edited
*/
function HDR_WDR_DisabledSwitch()
{
	var resolution=0;
	if(gVar.nStreamType == 0)
	{
	 resolution=Struct.StreamParamInfo[$("#live_spl").val()||0].resolution||0;
	}
	else
	{
		resolution=Struct.SubStreamParamInfo[$("#live_spl").val()||0].resolution||0;
	}
	//if(Struct.infraLedState == 0||resolution == 8||resolution == 9||gVar.nUserRight==1||gVar.nUserRight==0)
	if(Struct.infraLedState == 0||gVar.nUserRight==1||gVar.nUserRight==0)	
	{
		$("#live_HDR").attr("disabled", "disabled");
		$("#liveVideo_WDR").attr("disabled","disabled");
	}
	else
	{
		$("#live_HDR").attr("disabled", "");
		$("#liveVideo_WDR").attr("disabled","");
	}
	
	
}

function Left_Multi1Click() {
    $("#left_multi1").attr("checked", "checked");
    gVar.multi = $("#left_multi1").val();
    setCookie("multi", gVar.multi);
    for (var i = 0; i < 9; i++) {
        $("#ipcamdiv" + i).css({ "width": "0%", "height": "0%" });
    }
    $("#ipcamdiv" + IFs).css({ "width": "100%", "height": "100%" });
}

function Left_Multi2Click() {
    $("#left_multi2").attr("checked", "checked");
    gVar.multi = $("#left_multi2").val();
    setCookie("multi", gVar.multi);
    if (IFs <= 5) {
        for (var i = 0; i < IFs; i++) {
            $("#ipcamdiv" + i).css({ "width": "0%", "height": "0%" });
        }
        for (var i = IFs; i < IFs + 4; i++) {
            $("#ipcamdiv" + i).css({ "width": "49.9%", "height": "49.9%" });
        }
        for (var i = IFs + 4; i < 9; i++) {
            $("#ipcamdiv" + i).css({ "width": "0%", "height": "0%" });
        }
    }
    else {
        for (var i = 0; i < 5; i++) {
            $("#ipcamdiv" + i).css({ "width": "0%", "height": "0%" });
        }
        for (var i = 5; i < 9; i++) {
            $("#ipcamdiv" + i).css({ "width": "49.9%", "height": "49.9%" });
        }
    }
}

function Left_Multi3Click() {
    $("#left_multi3").attr("checked", "checked");
    gVar.multi = $("#left_multi3").val();
    setCookie("multi", gVar.multi);
    for (var i = 0; i < 9; i++) {
        $("#ipcamdiv" + i).css({ "width": "33.3%", "height": "33.3%" });
    }
}

function Rfmulti(){
	gVar.multi = getCookie("multi") == null?1:getCookie("multi");
	setTimeout(function () {
	    if (gVar.multi == 1) {
	        $("#left_multi1").attr("checked", "checked");
	        //$("#left_multi1").change();
	        Left_Multi1Click();
	    }
	    else if (gVar.multi == 4) {
	        $("#left_multi2").attr("checked", "checked");
	        //$("#left_multi2").change();
	        Left_Multi2Click();
	    }
	    else if (gVar.multi == 9) {
	        $("#left_multi3").attr("checked", "checked");
	        //$("#left_multi3").change();
	        Left_Multi3Click();
	    }
	    else {
	        $("#left_multi1").attr("checked", "checked");
	        //$("#left_multi1").change();
	        Left_Multi1Click();
	    }
	    //$("#left_multi").val(gVar.multi);
	    //$("#left_multi").change();
	}, 1);
}


function RfQx(qx) {
    if (gVar.nUserRight == qx) return;
	gVar.nUserRight = qx;
	if (gVar.nUserRight >= 100) {	//MJPEG
	    $("#lab_zoomIn").css("display", "none"); $("#zoomIn").css("display", "none");
	    $("#lab_zoomOut").css("display", "none"); $("#zoomOut").css("display", "none");
	    $("#lab_focusFar").css("display", "none"); $("#focus_far").css("display", "none");
	    $("#lab_focusNear").css("display", "none"); $("#focus_near").css("display", "none");

	    $("#LVRcA,#LVRc").css("display", "").attr("disabled", "");
	    $(".volumeOff").css("display", "none");
	    $(".volumeOn").css("display", "none");
	    $("#live_sound").css("display", "none");
	    $("#liveHDR,#liveVideoWDR").css("display", "none");
	    if (gVar.nUserRight == 101) {
	        $("#livespltr,#left_jxfz,#pllive2,#left_powfre,#leftptz").css("display", "none");
            	if (gVar.nStreamType == 1) $("#livespltr").css("display", "none");
            }
	    else {
		    $("#livespltr,#left_jxfz,#pllive2,#left_powfre").css("display", "none");
		    if (gVar.ptFlag == 1) {
		        $("#leftptz").css("display", "");
		    }
            if(gVar.nStreamType == 1) $("#livespltr").css("display","none");
	    }
	}else{	//H264
	$("#livespltr,#left_jxfz,#pllive2,#leftptz,#left_powfre").css("display", "");
	if (gVar.nUserRight == 0) {
	    $("#liveNAA,#liveHDR,#liveVideoWDR,#pfonmouse,#splonmouse,#live_jx,#lab_live_jx,#live_fz,#lab_live_fz,#zoomIn,#lab_zoomIn,#zoomOut,#lab_zoomOut,#focus_far,#lab_focusFar,#focus_near,#lab_focusNear,#leftptz,#cruise_1,#m_1,#preset_2,#m_2,#LED_3,#m_3,#colar_4,#m_4,#LVRcA,#LVRc,#music_5,#m_5,#guard_6,#m_6,.volumeOn,.volumeOff,#live_sound").css("display", "none");      //#pfonmouse,#splonmouse
	    $("#LVRcA,#LVRc,#live_spl,#live_pf").attr("disabled", "disabled");
	}

	else if (gVar.nUserRight == 1) {
	    $("#live_jx,#lab_live_jx,#live_fz,#lab_live_fz,#pfonmouse,#splonmouse,#pre_add,#pre_sub,#LED_3,#m_3,#colar_4,#m_4,#LVRcA,#LVRc").css("display", "none");
	    $("#live_spl,#live_pf").attr("disabled", "disabled");
	    $("#zoomIn,#lab_zoomIn,#zoomOut,#lab_zoomOut,#leftptz,#cruise_1,#preset_2,#music_5,#guard_6").css("display", "");
	    $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "");
        if($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display","");
        else if ($("#preset_2").attr("isdown") == 0) $("#m_2").css("display", "");
        else if ($("#guard_6").attr("isdown") == 0) $("#m_6").css("display", "");
		else if($("#music_5").attr("isdown") == 0) $("#m_5").css("display","");
	}
	else {
	    $("#pfonmouse,#splonmouse,#live_jx,#lab_live_jx,#live_fz,#lab_live_fz,#zoomIn,#lab_zoomIn,#zoomOut,#lab_zoomOut,#leftptz,#cruise_1,#cruise_start,#cruise_stop,#preset_2,#pre_add,#pre_sub,#pre_goto,#LED_3,#colar_4,#LVRcA,#LVRc,#music_5,#guard_6").css("display", "");
	    $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "");
	    $("#LVRcA,#LVRc,#live_spl,#live_pf").attr("disabled", "");
		if($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display","");
		else if ($("#preset_2").attr("isdown") == 0) $("#m_2").css("display", "");
		else if ($("#guard_6").attr("isdown") == 0) $("#m_6").css("display", "");
		else if($("#LED_3").attr("isdown") == 0) $("#m_3").css("display","");
		else if($("#colar_4").attr("isdown") == 0) $("#m_4").css("display","");
		else if($("#music_5").attr("isdown") == 0) $("#m_5").css("display","");
	}
	
	}
	
}
function RfLiveItem(){
    RfSc();
    if (gVar.nStreamType == 0) {
        RfSpl();
    } else {
        RfSplSub();
    }
	RfRs();
	RfLs();
	RfpP();
	RfcM();
	RfPf();
	Rfjx();
	Rffz();
	RfgU();
	RfBabyMusicList();
	RfHdr();
	RfWdr();
}
function UserLoginEvent(msgID) {
    var userAg = navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);

    if (!(gVar.webLoginCall != -100 && gVar.pluginLoginCall != -100)) return;
    if (gVar.webLoginCall.toString() == "NaN") {
        if (matchs != null) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_RF"));
        }
        else {
            alert(lg.get("IDS_MAIN_RF"));
        }
    }
    else {
        MasklayerHide();
        if (gVar.webLoginCall == 0) {//login success
            try {
                //save cookie
                setCookie("userName", gVar.user); //set usrname,save to cookie 
                if ($("#remenberText").attr("checked") * 1) {
                    setCookie("pwd", urlEncode($("#passwd").val()));
                    setCookie("remenber", 1);
                } else {
                    setCookie("remenber", 0);
                    setCookie("pwd", "");
                    $("#remenberText").attr("checked", false);
                }
                try { gDvr.obj[0].LoginSuc() } catch (e) { }

                loginSucc = true;
                LoadLivePage();
            } catch (e) { }
        }
        else {
            if (gVar.webLoginCall != -7) {
                ErrorLogin(gVar.webLoginCall);
            }
        }
    }
}

function ErrorLogin(msg) {
    var userAg = navigator.userAgent.toLowerCase();
    chromes = /chrome\/([\d.]+)/;
    var matchs = chromes.exec(userAg);

	switch(msg){
		case -1:
		    if (matchs != null) {
		        ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_EFAILD"));
		        setTimeout(function () {
		            window.location.href = window.location.href
		        }, 3000);
            }
            else{
                alert(lg.get("IDS_LEFT_EFAILD"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 1000);
			}
            break ;
        case -2:
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_MUSRE"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 3000);
            }
            else {
                alert(lg.get("IDS_LOG_MUSRE"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 1000);
            }
            break;
        case -4:
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOUSRN"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 3000);
            }
            else{
                alert(lg.get("IDS_LOG_NOUSRN"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 1000);
            }
            break;
        case -5:
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_WPWD"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 3000);
                return;
            }
            else {
                alert(lg.get("IDS_LOG_WPWD"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 1000);
            }
            break;
        case -7:
            if (matchs != null) {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOLOG"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 3000);
            }
            else {
                alert(lg.get("IDS_LOG_NOLOG"));
                setTimeout(function () {
                    window.location.href = window.location.href
                }, 1000);
            }
            break;
		default:
			return;
	  }
}

function LoadLivePage() {
    if (gVar_first.model == 0 || !loginSucc) {
        return;
    } else {
    LoadLeftPage(function () {
        try {
            $("#login").remove();
            LoadLiveTile(); //load the head title
        } catch (e) { }
        try {
            $("#header").addClass("header").css("display", "");
            var obj = document.getElementById("content");
            $("#content").addClass("content");
            $("#mleft").addClass("mleft");
            $("#main").addClass("main");
            $("#objPC").addClass("objPC");
            $("#bottom").addClass("bottom");
            $("#plugin").css({ "width": "98%", "height": "100%" });
            $("#bottom,#header,#mleft").removeClass("undisplay");
            $("#ftpback").css("height", "36px");
        } catch (e) { }
        MasklayerHide();

        if (gVar.nOpenPreView) {
            $(".liveBtnBt1").mousedown();
			//gDvr.OpenAudio(IFs);
			gVar.bliveOpen = true;
        } else {
            $(".liveBtnBt2").mousedown();
            gVar.bliveOpen = false;
            cutdownalarmrecord[chid] == false;
        }
        Rfmulti();
        RfLiveItem();
        $("#playbackleft").css("display", "none");
        if (gVar_first.audioFlag == 0 && gVar_first.talkFlag == 0) {
            $(".liveBtnBt3").css("display", "none");
            $(".liveBtnBt4").css("display", "none");
            $(".liveBtnBt9").css("display", "none");
            $(".liveBtnBt109").css("display", "none");
        }
        else {
            $(".liveBtnBt3").css("display", "");
            $(".liveBtnBt4").css("display", "none");
            SetDefaultAudioDisplay();
        }
        if ((gVar_first.reserve3 & 0x01) == 0) {
            $("#Lullabies").css("display", "none");
            $("#live_sound").css("display", "none");
            $("#cfgmune_11").remove();
            $("#cfgpanel_11").remove();
        } else {
            $("#cfgmune_11").css("display", "");
            $("#Lullabies").css("display", "");
            $("#music_5").css("display", "");
            $("#live_sound").css("display", "none");
        }
        if ((gVar_first.reserve4 >> 6 & 0x01) == 1 || (gVar_first.reserve3 & 0x01) == 1) {
            $(".volumeOff").css("display", "");
            $(".volumeOn").css("display", "none");
        }
        else {
            $(".volumeOff").css("display", "none");
            $(".volumeOn").css("display", "none");
        }

        //window.location.reload = function(){Logout();}
        //	
        if (gVar.nUserRight == 0)       //visitor
        {
            $("#colar_4,#pfonmouse,#splonmouse,#live_jx,#live_fz,#lab_live_jx,#lab_live_fz,#LVRcA,#LVRcz,#LVRcA,#LVRc,#LED_3,#pre_add,#pre_sub,#pre_goto,#cruise_start,#cruise_stop,#zoomIn,#lab_zoomIn,#zoomOut,#lab_zoomOut,#leftptz,#cruise_1,#m_1,#preset_2,#m_2,#m_3,#m_4,#music_5,#m_5,#guard_6,#m_6").css("display", "none");
            $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
            $("#live_spl,#live_pf,#live_HDR,#liveVideo_WDR,#liveVideo_NAA").attr("disabled", "disabled");
            $("#cfgmune_9").remove();
            $("#cfgmune_10").remove();
            $("#PlayBackMenu").remove();
            $("#ConfigMenu").remove();
            $(".volumeOff").css("display", "none");
        } else if (gVar.nUserRight == 1)     //operator
        {
            $("#colar_4,#pfonmouse,#splonmouse,#LVRcA,#LVRc,#LED_3,#m_3,#m_4,#pre_add,#pre_sub,#live_jx,#live_fz,#lab_live_jx,#lab_live_fz").css("display", "none");
            $("#live_spl").attr("disabled", "disabled");
            $("#live_pf,#live_HDR,#liveVideo_WDR,#liveVideo_NAA").attr("disabled", "disabled");
            $("#cfgmune_9").remove();
            $("#cfgmune_10").remove();
            $("#PlayBackMenu").remove();
            $("#ConfigMenu").remove();
        }
        else {       //administrator
        }

        if (isFirstUse == 1) {
            gVar.ChangPage(3);
        } else {
            $("#cfgpanel_1").addClass("configpanel").css("display", "");
        }
    });
		if(gVar.nStreamType == 0){
            flashStreamType = "mainStream";
        }
        if(gVar.nStreamType == 1){
            flashStreamType = "subStream";
        }
		if (browserVer.browsers == "Internet Explorer" || browserVer.browsers == "IE11"|| browserVer.browsers == "safari") {
	        for (var i = 1; i < 9; i++) {
	            if (Struct.devInfo[i].ip != "" && Struct.devInfo[i].port != 0) {
	                try {
	                    gDvr.obj[i].UpdateFirstChannelUserRight(Qqx);
	                }
	                catch (e) { }
	                gDvr.obj[i].RegMy(Struct.devInfo[i].ip, Struct.devInfo[i].port * 1, Struct.devInfo[i].mediaport * 1, Struct.devInfo[i].user, Struct.devInfo[i].pwd, Struct.devInfo[i].devname, gVar.nStreamType, gVar.nDate * 1 + i, Struct.devInfo[i].type);
	            }
	        }
        }else if(IsEdge()){
        	setTimeout(function () {
    			gDvr.ScordLiveControler(gVar.httpver + "://" + "127.0.0.1", rtmpPort, "flashOpenLiveView", 'usr=' + user + '&pwd=' + pwd + '&liveViewType=' + flashStreamType + '&groupId=' + gVar.nDate + '&audioFlag=' + gVar_first.audioFlag, '', 0);
	        }, 1000);
        }else{
        	setTimeout(function () {
	        	gDvr.ScordLiveControler(gVar.httpver + "://" + "127.0.0.1", rtmpPort, "flashOpenLiveView", 'usr=' + user + '&pwd=' + pwd + '&liveViewType=' + flashStreamType + '&groupId=' + gVar.nDate + '&audioFlag=' + gVar_first.audioFlag, '', 0);
	        }, 1000);
        }
        /*$("#bottom").css("display", "none");
        $("#objPC").css("bottom", "0px");*/
    }
}

function LoadLiveTile()
{
	//alert(lg.get("IDS_HEARD_LIVE"))
	document.getElementById("LogoutMenu").title += lg.get("IDS_SERVER_LOGOUT");
	//live menu
	if (document.getElementById("LiveMenu").innerHTML.match(lg.get("IDS_HEARD_LIVE"))) 
	{
	    
	}
	else
	{
	    document.getElementById("LiveMenu").innerHTML=lg.get("IDS_HEARD_LIVE")+document.getElementById("LiveMenu").innerHTML;
	}
	//ConfigMenu
	if (document.getElementById("ConfigMenu").innerHTML.match(lg.get("IDS_SYS_SET"))) 
	{
	    
	}
	else
	{
	    document.getElementById("ConfigMenu").innerHTML=lg.get("IDS_SYS_SET")+document.getElementById("ConfigMenu").innerHTML;
	}
	//PlayBackMenu
	if (document.getElementById("PlayBackMenu").innerHTML.match(lg.get("IDS_REPLAY"))) 
	{
	    
	}
	else
	{
	    document.getElementById("PlayBackMenu").innerHTML=lg.get("IDS_REPLAY")+document.getElementById("PlayBackMenu").innerHTML;
	}
	
}

function  menutitle(n, m, x){
	var arr=['LiveMenu','PlayBackMenu','ConfigMenu'];
	var arr2=['LiveMenu_2','PlayBackMenu_2','ConfigMenu_2'];
	$("#"+arr[n-1]).css('background-position','-179px 0px').css("z-index", 30);
	
	$("#"+arr[m-1]).css('background-position','-179px 0px').css("z-index", 29);
	
	$("#"+arr[x-1]).css('background-position','-179px 0px').css("z-index", 28);
	
	var $o2;
	for(var i=0;i<3;i++){
		$o2 = $("#"+arr2[i]);
		//$o.css('background-position','-179px 0px').css("z-index", $o.css("z-index")*1-1);
		$o2.css("background-position","-"+(25+(i+1)*6+i*(i+1)/2)+"px 0px");
	}
	$("#"+arr2[n-1]).css("background-position","0px 0px");
	/*$o = $("#"+arr[n-1]);
	$o2 = $("#"+arr2[n-1]);
	
	$o.css("background-position","0px 0px").css("z-index", 30);*/
}

function auic(b) {
    if (0 == gVar.audioFlag) {
        $(".liveBtnBt9").css("display", "none");
        $(".liveBtnBt10").css("display", "none");
    }
    else {
        if (b) {
            $(".liveBtnBt9").css("display", "none").attr("name", "active");
            $(".liveBtnBt109").css("display", "").attr("name", "");
			gDvr.OpenAudio(IFs);
            isOpenA[IFs] = true;
        } else {
            $(".liveBtnBt9").css("display", "").attr("name", "");
            $(".liveBtnBt109").css("display", "none").attr("name", "active");
            isOpenA[IFs] = false;
        }
    }
}

function tuic(b) {
    if (0 == gVar.talkFlag) {
        $(".liveBtnBt3").css("display", "none");
        $(".liveBtnBt4").css("display", "none");
    }
    else 
    {
        if (b) {
            $(".liveBtnBt3").css("display", "none");
            $(".liveBtnBt4").css("display", "");
            isOpenT[IFs] = true;
        }else {
            $(".liveBtnBt3").css("display", "");
            $(".liveBtnBt4").css("display", "none");
            isOpenT[IFs] = false;
        } 
    }
}
function ShowVCFbutton() {  //show button OpenVidio,CloseVidio,LVcapture,FullScree
   
    $(".liveBtnBt2").css("display", "");
    $(".liveBtnBt1").css("display", "");
    $("#LVCapture").css("display", "");
    $(".liveBtnBt5").css("display", "");
}
function ShowSomeLeftptz() { //just for rs485,this button will be hidden,otherwise shown
    $("#live_yt2_ptzMoveTopLeft").css("display", "");
    $("#live_yt2_ptzMoveTopRight").css("display", "");
    $("#live_yt5_ptzMoveBottomLeft").css("display", "");
    $("#live_yt2_ptzMoveBottomRight").css("display", "");
}
function SelectChannel(ch, chQx, chDev, ip) {
    if (typeof chDev != 'undefined') {
        if (chQx < 100) {       //H264
            RfQx((chQx > Qqx ? Qqx : chQx));
        }
        else {      //MJ
            RfQx(chQx);
        }
        if (ip == "") {
            $("#LVRcA").css("display", "none");
            $("#LVRc").css("display", "none");
            $("#LVCapture").css("display", "none");
            $(".liveBtnBt1").css("display", "none");
            $(".liveBtnBt2").css("display", "none");
            $(".liveBtnBt3").css("display", "none");
            $(".liveBtnBt4").css("display", "none");
            $(".liveBtnBt5").css("display", "none");
            $(".liveBtnBt9").css("display", "none");
            $(".liveBtnBt109").css("display", "none");
            $(".volumeOff").css("display", "none");
            $(".volumeOn").css("display", "none");
            $("#liveHDR").css("display", "none");
            $("#liveVideoWDR").css("display", "none");
            return;
        }
        else {
            //gVar.selCh = arguments[1];
            ShowVCFbutton();
        }
        //chose 1st channl
        if (ch == 0) {
            if (gVar.audioFlag == 0 && gVar.talkFlag == 0) {
                $(".liveBtnBt3").css("display", "none");
                $(".liveBtnBt4").css("display", "none");
                $(".liveBtnBt9").css("display", "none");
                $(".liveBtnBt109").css("display", "none");
            }else{
                    if(isOpenT[ch]){
                        isOpenT[ch] = false;
                        gDvr.TalkCMD(ch,1);
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                      }else{
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                      }
                      
                     /*
                      if(isOpenA[ch]){
                        isOpenA[ch] = 0;
                        gDvr.CloseAudio(ch);
                        $(".liveBtnBt9").css("display", "");
                        $(".liveBtnBt109").css("display", "none"); 
                      }else{
                      */
                        $(".liveBtnBt109").css("display", "");
						gDvr.OpenAudio(IFs);
                        $(".liveBtnBt9").css("display", "none");
                      //}
            }

            if (Qqx != 0) {
                if (gVar.ptFlag == 1) {
                    $("#cruise_1").css("display", "");
                    $("#preset_2").css("display", "");
                    if ((gVar.reserveFlag2 >> 1 & 0x01) == 0) {
                        $("#guard_6").css("display", "none");
                        $("#m_6").css("display", "none");
                    }
                    else {
                        $("#guard_6").css("display", "");
                    }
                    $("#leftptz").css("display", "");
                    ShowSomeLeftptz();
					if($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display","");
					else if ($("#preset_2").attr("isdown") == 0) $("#m_2").css("display", "");
					else if ($("#guard_6").attr("isdown") == 0) $("#m_6").css("display", "");
                } else if (gVar.rs485Flag ==1) {
                    $("#cruise_1").css("display", "");
                    $("#leftptz").css("display", "");
                    $("#preset_2").css("display", "none");
                    $("#m_2").css("display", "none");
                    $("#guard_6").css("display", "none");
                    $("#m_6").css("display", "none");
                    if ($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display", "");
                    //dou
                    $("#live_yt2_ptzMoveTopLeft").css("display", "none");
                    $("#live_yt2_ptzMoveTopRight").css("display", "none");
                    $("#live_yt5_ptzMoveBottomLeft").css("display", "none");
                    $("#live_yt2_ptzMoveBottomRight").css("display", "none");
                } else {
                    $("#cruise_1").css("display", "none");
                    $("#preset_2").css("display", "none");
                    $("#leftptz").css("display", "none");
					$("#m_1").css("display", "none");
					$("#m_2").css("display", "none");
					$("#guard_6").css("display", "none");
					$("#m_6").css("display", "none");
                }

                if (gVar.zoomFlag == 1) {
                    $("#lab_zoomIn").css("display", ""); $("#zoomIn").css("display", "");
                    $("#lab_zoomOut").css("display", ""); $("#zoomOut").css("display", "");
                    if ((gVar.reserveFlag2 >> 1 & 0x01) == 0 && (gVar.reserveFlag2 >> 0 & 0x01) == 0) {
                        $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
                        $("#guard_6").css("display", "none");
                        $("#m_6").css("display", "none");
                    }
                    else {
                        $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "");
                        $("#guard_6").css("display", "");
                    }
                } else {
                    $("#lab_zoomIn").css("display", "none"); $("#zoomIn").css("display", "none");
                    $("#lab_zoomOut").css("display", "none"); $("#zoomOut").css("display", "none");
                    $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
                    $("#guard_6").css("display", "none");

                }
            }

            $("#livespltr").css("display", "");

            //administrator，Add schedule option for IR_CUT
            var IsScheduleOpt = false;
            $("#BsHmode option").each(function () {
                if ($(this).attr("value") * 1 == 2) {
                    IsScheduleOpt = true;
                }
            });

            if (IsScheduleOpt == false) {
                $("#BsHmode").append('<option id="BsHwdSchedule" value="2">' + lg.get("IDS_BS_TIMING") + '</option>');
            }

            //check function nursery rhymes
            if ((gVar.reserve3 & 0x01) == 0) {
                $("#Lullabies").css("display", "none");
                $("#live_sound").css("display", "none");
            }
            else{
                $("#Lullabies").css("display", "");
                $("#live_sound").css("display", "none");
            }
            if ((gVar.reserve4 >> 6 & 0x01) == 1 || (gVar.reserve3 & 0x01) == 1) {
                $(".volumeOff").css("display", "");
                $(".volumeOn").css("display", "none");
            }
            else {
                $(".volumeOff").css("display", "none");
                $(".volumeOn").css("display", "none");
            }
            if (gVar.nUserRight == 0) {
                $("#music_5").css("display", "none");
                $(".volumeOff").css("display", "none");
            }
            if ((gVar.ambarellaFlag >> 0 & 0x01) == 1) {
                 $("#liveVideoWDR").css("display", "");
            }
            else {
                $("#liveVideoWDR").css("display", "none");

            }
            if ((gVar.ambarellaFlag >> 1 & 0x01) == 1) {
                $("#liveVideoWDR").css("display", "");
            }
            else {
                $("#liveVideoWDR").css("display", "none");
            }
            if ((gVar.ambarellaFlag >> 2 & 0x01) == 1 && Struct.ptstate == 1) {
            	if(gVar.nUserRight !=0){
					$("#leftptz").show();
            	}else{
            		$("#leftptz").hide()
            	}
                
            }
            //irled
            if(gVar.nUserRight == 2){
		        if ((gVar.reserve3 >> 5 & 0x01) == 1 ) {
			    	$("#LED_3").css('display', 'none');
		        }
		        else{
					$("#LED_3").css('display', '');
				}
            }
        } else {//chose 2-9 channl
            //admin，operater，vistor login，if show audio and talk
            if (isappallDev) {//3 quanxian login ,if show audio and talk
                if (gVar.audioFlag ==0 && gVar.talkFlag ==0) {
                    $(".liveBtnBt3").css("display", "none");
                    $(".liveBtnBt4").css("display", "none");
                    $(".liveBtnBt9").css("display", "none");
                    $(".liveBtnBt109").css("display", "none");
                }else{
                    if (isOpenT[ch]) {
                        isOpenT[ch] = false;
                        gDvr.TalkCMD(ch, 1);
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                    } else {
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                    }

                    if (isOpenA[ch]) {
                        isOpenA[ch] = 0;
                        gDvr.CloseAudio(ch);
                        $(".liveBtnBt9").css("display", "");
                        $(".liveBtnBt109").css("display", "none");
                    } else {
                        $(".liveBtnBt109").css("display", "");
						gDvr.OpenAudio(IFs);
                        $(".liveBtnBt9").css("display", "none");
                    }
                }     
            }else{//3 quanxian not appallDev,check if show audio and talk 
                if (IsInArray(notTalkAudioDev, chDev)) {
                    $(".liveBtnBt3").css("display", "none");
                    $(".liveBtnBt4").css("display", "none");
                    $(".liveBtnBt9").css("display", "none");
                    $(".liveBtnBt109").css("display", "none");
                }else{
                    if(isOpenT[ch]){
                        isOpenT[ch] = false;
                        gDvr.TalkCMD(ch, 1);
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                    }else{
                        $(".liveBtnBt3").css("display", "");
                        $(".liveBtnBt4").css("display", "none");
                    }
                  
                    if(isOpenA[ch]){
                        isOpenA[ch] = 0;
                        gDvr.CloseAudio(ch);
                        $(".liveBtnBt9").css("display", "");
                        $(".liveBtnBt109").css("display", "none"); 
                    }else{
                        $(".liveBtnBt109").css("display", "none"); 
                        $(".liveBtnBt9").css("display", "");
                    }
                }   
            }
            
            if (Qqx != 0) {//if admin/operator login
                if (chQx < 100 && chQx > 0)  //H264
                {
                    //check if is allapp dev
                    if (!isappallDev) {//not allapp dev
                        if (IsInArray(ytDev, chDev)) {
                            $("#cruise_1").css("display", "");
                            $("#preset_2").css("display", "");
                            $("#leftptz").css("display", "");
                            $("#guard_6").css("display", "");
                            if ($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display", "");
                            else if ($("#preset_2").attr("isdown") == 0) $("#m_2").css("display", "");
                            else if ($("#guard_6").attr("isdown") == 0) $("#m_6").css("display", "");
                        } else if (IsInArray(is485ytDev, chDev)) {
                            $("#cruise_1").css("display", "");
                            $("#leftptz").css("display", "");
                            $("#preset_2").css("display", "none");
                            $("#m_2").css("display", "none");
                            $("#guard_6").css("display", "none");
                            $("#m_6").css("display", "none");
                            if ($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display", "");
                        } else {
                            $("#cruise_1").css("display", "none");
                            $("#preset_2").css("display", "none");
                            $("#leftptz").css("display", "none");
                            $("#m_1").css("display", "none");
                            $("#m_2").css("display", "none");
                            $("#guard_6").css("display", "none");
                            $("#m_6").css("display", "none");
                        }

                        if (IsInArray(zoomDev, chDev)) {
                            $("#lab_zoomIn").css("display", ""); $("#zoomIn").css("display", "");
                            $("#lab_zoomOut").css("display", ""); $("#zoomOut").css("display", "");
                            $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "");
                        } else {
                            $("#lab_zoomIn").css("display", "none"); $("#zoomIn").css("display", "none");
                            $("#lab_zoomOut").css("display", "none"); $("#zoomOut").css("display", "none");
                            $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
                        }

                        //only allapp may have nursery rhymes
                        $("#music_5").css("display", "none");
                        $("#m_5").css("display", "none");
                        $(".volumeOff").css("display", "none");
                        $(".volumeOn").css("display", "none");
                        $("#live_sound").css("display", "none");
                   }else{// is allapp dev
                        if (gVar.ptFlag == 1) {
                            ShowSomeLeftptz();
                            $("#cruise_1").css("display", "");
                            $("#preset_2").css("display", "");
                            $("#leftptz").css("display", "");
                            if ((gVar.reserveFlag2 >> 1 & 0x01) == 0) {
                                $("#guard_6").css("display", "none");
                            }
                            else {
                                $("#guard_6").css("display", "");
                            }
			                if($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display","");
			                else if ($("#preset_2").attr("isdown") == 0) $("#m_2").css("display", "");
			                else if ($("#guard_6").attr("isdown") == 0) $("#m_6").css("display", "");
                        }else if (gVar.rs485Flag ==1) {
                            $("#cruise_1").css("display", "");
                            $("#leftptz").css("display", "");
			                $("#preset_2").css("display", "none");
			                $("#m_2").css("display", "none");
			                $("#guard_6").css("display", "none");
			                $("#m_6").css("display", "none");
                            if ($("#cruise_1").attr("isdown") == 0) $("#m_1").css("display", "");
                            //dou
                            $("#live_yt2_ptzMoveTopLeft").css("display", "none");
                            $("#live_yt2_ptzMoveTopRight").css("display", "none");
                            $("#live_yt5_ptzMoveBottomLeft").css("display", "none");
                            $("#live_yt2_ptzMoveBottomRight").css("display", "none");

                        } else {
                            $("#cruise_1").css("display", "none");
                            $("#preset_2").css("display", "none");
                            $("#leftptz").css("display", "none");
			                $("#m_1").css("display", "none");
			                $("#m_2").css("display", "none");
			                $("#guard_6").css("display", "none");
			                $("#m_6").css("display", "none");
                        }

                        if (gVar.zoomFlag == 1) {
                            $("#lab_zoomIn").css("display", ""); $("#zoomIn").css("display", "");
                            $("#lab_zoomOut").css("display", ""); $("#zoomOut").css("display", "");
                            if ((gVar.reserveFlag2 >> 1 & 0x01) == 0) {
                                $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
                                $("#guard_6").css("display", "none");
                            }
                            else {
                                $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "");
                                $("#guard_6,#m_6").css("display", "");
                            }
                        } else {
                            $("#lab_zoomIn").css("display", "none"); $("#zoomIn").css("display", "none");
                            $("#lab_zoomOut").css("display", "none"); $("#zoomOut").css("display", "none");
                            $("#lab_focusFar,#focus_far,#lab_focusNear,#focus_near").css("display", "none");
                            $("#guard_6,#m_6").css("display", "none");
                        }

                        //check function nursery rhymes
                        if ((gVar.reserve3 & 0x01) == 0) {
                            $("#Lullabies").css("display", "none");
                            $("#live_sound").css("display", "none");
                        }
                        else{
                            $("#Lullabies").css("display", "");
                            $("#live_sound").css("display", "none");
                            if($("#music_5").attr("isdown") == 0) $("#m_5").css("display","");
                        }
                        if ((gVar.reserve4 >> 6 & 0x01) == 1 || (gVar.reserve3 & 0x01) == 1) {
                            $(".volumeOff").css("display", "");
                            $(".volumeOn").css("display", "none");
                        }
                        else {
                            $(".volumeOff").css("display", "none");
                            $(".volumeOn").css("display", "none");
                        }
                        if ((gVar.ambarellaFlag >> 0 & 0x01) == 1) {
                            $("#liveHDR").css("display", "");
                        }
                        else {
                            $("#liveHDR").css("display", "none");
							
                        }
                        if ((gVar.ambarellaFlag >> 1 & 0x01) == 1) {
                            $("#liveVideoWDR").css("display", "");
                        }
                        else {
                            $("#liveVideoWDR").css("display", "none");
                        }
                        if ((gVar.ambarellaFlag >> 2 & 0x01) == 1 && Struct.ptstate == 1) {
                            $("#leftptz").css("display", "");
                        }
                        //irled
                        if(gVar.nUserRight == 2){
					        if ((gVar.reserve3 >> 5 & 0x01) == 1 ) {
						    	$("#LED_3").css('display', 'none');
					        }
					        else{
								$("#LED_3").css('display', '');
							}
                        }
                    }
                }
            } 

            if (chQx < 100 && chQx >= 0)  //H264
            {
                //display none for stream type
               // if (gVar.nStreamType == 1) $("#livespltr").css("display", "none");
               	if ((gVar.ambarellaFlag >> 1 & 0x01) == 1) {
                    $("#liveVideoWDR").css("display", "");
                }
                else {
                    $("#liveVideoWDR").css("display", "none");
                }
                //delete schedule option for IR_CUT
                $("#BsHmode option").each(function () {
                    if ($(this).attr("value") * 1 == 2) {
                        $(this).remove();
                    }   
                });
            }
        }
        if(gVar.sPage == 1){
        	setTimeout(function (){
        		RfParamCallNoShadow(getNAACall,"", "getNetworkAutoAdaptability");
        	},300);
        }
    }
}
function showFlashMsg(msg) { 
    //console.log(msg); 
}
function browserAndPlatform(){
	if(browserVer.browsers == "Internet Explorer" || browserVer.browsers == "IE11" || browserVer.browsers == "Firefox" || browserVer.browsers == "Chrome"){
    	if(browserPlatform == "macintel"){
    		$(".pluginTips").css({
    			"display":"",
    			"text-align":"left",
    			"display":"inline-block",
    			"font-size":"16px"
    		});
            sH("pluginTip1","IDS_MAC_UNSUPPORTEDBROWSER_TIPS");
    		return;
    	}else if(browserPlatform == "win64"){
    		if(browserVer.browsers == "Internet Explorer" || browserVer.browsers == "IE11" || browserVer.browsers == "Firefox" && (FFversion < "52.0")){
	    		$(".pluginTips").css({
	    			"display":"",
	    			"text-align":"left",
	    			"display":"inline-block",
	    			"font-size":"16px"
	    		});
	            sH("pluginTip1","IDS_64BIT_BROWSER_TIPS");
	            return;
    		}
    	}
	}
}
function FAQs(){
	var obj = document.getElementById("downPlugins");
	var obj2 = document.getElementById("helpInformation");

	if(!isPlugin){
		if(browserVer.browsers == "Internet Explorer" || browserVer.browsers == "IE11"){
			obj.innerHTML = '<a id="down" href="IPCWebComponents.exe">' + lg.get("IDS_LOGIN_KJ") + '</a>';
    		obj2.innerHTML = '<a id="down2" href="https://www.foscam.com/faqs/view.html?id=14#ie" target="_blank">' + lg.get("IDS_PLUGINS_EXCEPTION_LINK") + '</a>';
		}
		return;
    }
}
function flashFullScreen(){
	try{
		var elem = $("#plugin").get(0);
		if(elem.requestFullscreen) { 
			elem.requestFullscreen(); 
		} else if(elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen(); 
		} else if(elem.webkitRequestFullscreen) { 
			elem.webkitRequestFullscreen(); 
		} else if(elem.msRequestFullscreen) { 
			elem.msRequestFullscreen();
		}
	}catch(e){}
}
//live页面事件处理
function PluginCallBack() {
    msgID = arguments[0];
    //console.log("msgID : "+msgID);
	switch(msgID){
	    case 100:
            {
	            Struct.result = arguments[1];
	            Struct.recordState = arguments[2];
	            Struct.isMute = arguments[3];
	            Struct.volume = arguments[4];
	            Struct.ledState = arguments[5];
	            Struct.presetPointCnt = arguments[6];
	            for (var i = 1; i < 18; i++)
	                Struct.presetPointList[i] = arguments[i + 6];

	            Struct.curPresetPoint = arguments[23];
	            Struct.cruiseMapCnt = arguments[24];
	            for (var i = 0; i < 8; i++)
	                Struct.cruiseMapList[i] = arguments[i + 25];
	            Struct.curCruiseMap = arguments[33];
	            Struct.mainStreamType = arguments[34];
	            //gVar.nSelStreamType = arguments[34];
	            Struct.subStreamType = arguments[35];
	            if (gVar.nStreamType == 0) {    //main stream
	                for (var i = 0; i < 4; i++) {
	                    Struct.StreamParamInfo[i].resolution = arguments[i * 5 + 36];
	                    Struct.StreamParamInfo[i].bitRate = arguments[i * 5 + 37];
	                    Struct.StreamParamInfo[i].frameRate = arguments[i * 5 + 38];
	                    Struct.StreamParamInfo[i].GOP = arguments[i * 5 + 39];
	                    Struct.StreamParamInfo[i].isVBR = arguments[i * 5 + 40];
	                }
	            }
	            else {          //sub main
	                for (var i = 0; i < 4; i++) {
	                    Struct.SubStreamParamInfo[i].resolution = arguments[i * 5 + 36];
	                    Struct.SubStreamParamInfo[i].bitRate = arguments[i * 5 + 37];
	                    Struct.SubStreamParamInfo[i].frameRate = arguments[i * 5 + 38];
	                    Struct.SubStreamParamInfo[i].GOP = arguments[i * 5 + 39];
	                    Struct.SubStreamParamInfo[i].isVBR = arguments[i * 5 + 40];
	                }
	            }
	            Struct.brightness = arguments[56];
	            Struct.contrast = arguments[57];
	            Struct.hue = arguments[58];
	            Struct.saturation = arguments[59];
	            Struct.sharpness = arguments[60];
	            Struct.isMirror = arguments[61];
	            Struct.isFlip = arguments[62];
	            Struct.isAlarming = arguments[63];
	            Struct.alarmType = arguments[64];
	            Struct.pwrFreq = arguments[65];
	            Struct.infraLedMode = arguments[66];
	            Struct.infraLedState = arguments[67];
	            gVar.nUserRight = arguments[68];
	            if (!gVar.bLogin) {
	                for (var i = 0; i < 9; i++) {
	                    Struct.devInfo[i].ip = arguments[i * 7 + 70];
	                    Struct.devInfo[i].port = arguments[i * 7 + 71];
	                    Struct.devInfo[i].mediaport = arguments[i * 7 + 72];
	                    Struct.devInfo[i].user = arguments[i * 7 + 73];
	                    Struct.devInfo[i].pwd = arguments[i * 7 + 74];
	                    Struct.devInfo[i].devname = arguments[i * 7 + 75];
	                    Struct.devInfo[i].type = arguments[i * 7 + 76];
	                }
	                gVar.bLogin = true;
	                gVar.pluginLoginCall = Struct.result;
	                if (gVar.nStreamType == 0) {
	                    gVar.nSelStreamType = Struct.mainStreamType;
	                } else {
	                    gVar.nSelStreamType = Struct.subStreamType;
	                }
	                SetPluginLanguage();/*mantis: 0002036 */
	                RfParamCall(LoginCall, "", "logIn&usrName=" + gVar.user + "&pwd=" + gVar.passwd + "&streamType=" + gVar.nStreamType + "&groupId=" + gVar.nDate);
	            } else {
	                if (arguments[69]) {
	                    switch (arguments[68] >> 16) {
	                        case 0:
	                            gJson = false;
	                            break;
	                        default:
	                            gJson = true;
	                            break;
	                    }
	                    var qx = arguments[68] & 0xffff;
	                    SelectChannel(gVar.selCh, qx, gVar.selChDev, gVar.ip);
	                    /*if (qx < 100) {         //H264
	                        RfQx((Qqx > qx ? qx : Qqx));
	                   }else {          //MJ
	                        RfQx(qx);
	                    }*/
	                }
					if (gVar.nStreamType == 0) {
		               		gVar.nSelStreamType = Struct.mainStreamType;
	               	} else {
		                   gVar.nSelStreamType = Struct.subStreamType;
	               	}
	               	/*if(gVar.user == "admin" && gVar.passwd == ""){
				    	if(IsChromeSupportNacl()){
			            	if(gVar_first.model>4000 && gVar_first.model<6000){
								stall = 1;
			            	}else{
			            		stall = 2;
			            	}
			            	RfParamCallNoShadow("", "", "setMainVideoStreamType&streamType=" + stall);
			            	setTimeout(function(){
			            		RfParamCallNoShadow("", "", "setSubVideoStreamType&streamType=0");
			            	},100);
				        }
				    }*/
	            }
	            RfLiveItem();
	            break;
   } 
   case 102:{
		//Struct.recordState = arguments[1];
		
		//RfRs();
		break;
	}
    case 103:{
		Struct.isMute = arguments[1];
		Struct.volume = arguments[2];break;
	}case 105:{
		Struct.ledState = arguments[1];
		Struct.infraLedMode = arguments[2];
		Struct.infraLedState = arguments[1];
		if (Struct.infraLedState == 1) {
		    $("#live_HDR").attr("disabled", "");
		}
		else {
		    $("#live_HDR").attr("disabled", "disabled");
		}
		RfLs();break;
	}case 106:{
		Struct.presetPointCnt = arguments[1];
		for (var i=1; i<17; i++)
			Struct.presetPointList[i] = arguments[i+1];
		//Struct.curPresetPoint = arguments[18];

		RfpP();
		RfgU();
        break;
    }case 303:
    {
        Struct.curPresetPoint = arguments[1];
        RfgU();
        break;
    }
    case 107:{
		Struct.cruiseMapCnt = arguments[1];
		
		for (var i=0; i<8; i++)
			Struct.cruiseMapList[i] = arguments[i+2];
		
		Struct.curCruiseMap = arguments[10];
		
		RfcM();break;
	}case 108:{
		Struct.isMirror = arguments[2];
		Struct.isFlip = arguments[1];
		Rfjx();
		Rffz();break;
	}case 109:{     //main stream
		Struct.mainStreamType = arguments[1];
		Struct.subStreamType = arguments[2];
        for (var i = 0; i < 4; i++) {
            if (arguments[i * 5 + 3] != Struct.StreamParamInfo[i].resolution || arguments[i * 5 + 4] != Struct.StreamParamInfo[i].bitRate || arguments[i * 5 + 5] != Struct.StreamParamInfo[i].frameRate || arguments[i * 5 + 6] != Struct.StreamParamInfo[i].GOP || arguments[i * 5 + 7] != Struct.StreamParamInfo[i].isVBR) {
                Struct.StreamParamInfo[i].resolution = arguments[i * 5 + 3];
                Struct.StreamParamInfo[i].bitRate = arguments[i * 5 + 4];
                Struct.StreamParamInfo[i].frameRate = arguments[i * 5 + 5];
                Struct.StreamParamInfo[i].GOP = arguments[i * 5 + 6];
                Struct.StreamParamInfo[i].isVBR = arguments[i * 5 + 7];
                RfSpl();
            }
        }  
        break;
	}case 110:{
		Struct.brightness = arguments[1];
		Struct.contrast = arguments[2];
		Struct.hue = arguments[3];
		Struct.saturation = arguments[4];
		Struct.sharpness = arguments[5];
		RfSc();break;
	}case 111:{
		//Struct.isAlarming = arguments[1];
		//Struct.alarmType = arguments[2];
        if(gVar.sPage == 1)
        {
            if (arguments[1] * 1 == 0)  //old protocal
            {
                if (typeof arguments[4] != 'undefined')  //except apple
                {
                    var chid = arguments[4] * 1;
                    var recordSec = arguments[5] * 1;
                    if(isOpenR[chid] == false)
                    {
                        if(isOpenAlarmR[chid] == false && cutdownalarmrecord[chid] == false)
                        {
                            isOpenAlarmR[chid] = 1;
                            gDvr.LocalAlarmRecord(true, chid);
                            window.clearTimeout(hRecord[chid]);
                            hRecord[chid] = setTimeout(function ()
                            {
                                gDvr.LocalAlarmRecord(false, chid);
                                isOpenAlarmR[chid] = 0;
                            }, recordSec * 1000);
                        }
                        else
                        {
                            gDvr.LocalAlarmRecord(false, chid);
                            window.clearTimeout(hRecord[chid]);
                            gDvr.LocalAlarmRecord(true, chid);
                            cutdownalarmrecord[chid] = true;
                            hRecord[chid] = setTimeout(function ()
                            {
                                gDvr.LocalAlarmRecord(false, chid);
                                isOpenAlarmR[chid] = 0;
                                cutdownalarmrecord[chid] = false;
                            }, recordSec * 1000);
                        }
                    }
                }
            }
            else if (arguments[1] * 1 == 1) {
                var chid = arguments[2] * 1;
                var isEnable = arguments[3] * 1;
                var recordSec = arguments[4] * 1;
                if(isOpenR[chid] == false)
                {
                    if (isEnable == 1) {
                        if (IFs == chid && (gVar.nUserRight == 2 || gVar.nUserRight >= 100)) {
                            $("#LVRcA").css("display", "none");
                            $("#LVRc").css("display", "");
                        }

                        if(isOpenAlarmR[chid] == false && cutdownalarmrecord[chid] == false)
                        {   
                            isOpenAlarmR[chid] = 1;
                            try { gDvr.LocalAlarmRecord(true, chid); } catch (e) { }
                            window.clearTimeout(hRecord[chid]);
                            hRecord[chid] = setTimeout(function ()
                            {
                                try { gDvr.LocalAlarmRecord(false, chid); } catch (e) { }
                                isOpenAlarmR[chid] = 0;
                                if (IFs == chid && (gVar.nUserRight == 2 || gVar.nUserRight >= 100)) {
                                    $("#LVRcA").css("display", "");
                                    $("#LVRc").css("display", "none");
                                    ShowCircle("Blue", 0);
                                }
                            }, recordSec * 1000);
                        }
                        else
                        {   
                            try { gDvr.LocalAlarmRecord(false, chid); } catch (e) { }
                            isOpenAlarmR[chid] = 0;
                            window.clearTimeout(hRecord[chid]);
                            try { gDvr.LocalAlarmRecord(true, chid); } catch (e) { }
                            isOpenAlarmR[chid] = 1;
                            cutdownalarmrecord[chid] = true;
                            hRecord[chid] = setTimeout(function ()
                            {
                                try { gDvr.LocalAlarmRecord(false, chid); } catch (e) { }
                                isOpenAlarmR[chid] = 0;
                                cutdownalarmrecord[chid] = false;
                                if (IFs == chid && (gVar.nUserRight == 2 || gVar.nUserRight >= 100)) {
                                    $("#LVRcA").css("display", "");
                                    $("#LVRc").css("display", "none");
                                    ShowCircle("Blue", 0);
                                }
                            }, recordSec * 1000);
                        }
                    }
                }
            }
        }
        break;
	}case 112:{
		Struct.pwrFreq = arguments[1];	
		RfPf();	break;
	}case 113:{     //main stream type change
		Struct.mainStreamType = gVar.nSelStreamType= arguments[1];
        if (gVar.nStreamType == 0) {
            setTimeout(function(){
				$("#live_spl").val(Struct.mainStreamType);
				HDR_WDR_DisabledSwitch();
				}, 1);
        }
        break;
	}case 119:{     //sub stream type change
        Struct.subStreamType = arguments[1];
        if (gVar.nStreamType != 0) {
            setTimeout(function(){
				$("#live_spl").val(Struct.subStreamType); 
				}, 1);
        }
        break;
    } case 120:{      //sub stream
        Struct.mainStreamType = arguments[1];
        Struct.subStreamType = arguments[2];
        for (var i = 0; i < 4; i++) {
            if (arguments[i * 5 + 3] != Struct.StreamParamInfo[i].resolution || arguments[i * 5 + 4] != Struct.StreamParamInfo[i].bitRate || arguments[i * 5 + 5] != Struct.StreamParamInfo[i].frameRate || arguments[i * 5 + 6] != Struct.StreamParamInfo[i].GOP || arguments[i * 5 + 7] != Struct.StreamParamInfo[i].isVBR) {
                Struct.SubStreamParamInfo[i].resolution = arguments[i * 5 + 3];
                Struct.SubStreamParamInfo[i].bitRate = arguments[i * 5 + 4];
                Struct.SubStreamParamInfo[i].frameRate = arguments[i * 5 + 5];
                Struct.SubStreamParamInfo[i].GOP = arguments[i * 5 + 6];
                Struct.SubStreamParamInfo[i].isVBR = arguments[i * 5 + 7];
                if (gVar.nStreamType == 1) {
                    RfSplSub();
                }
            }
        }
        break;
    }case 200:{	//打开视频出错误
		if(gVar.sPage == 1)
		    //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_AVOPENF"));
        break;
	}case 201:{	//ip格式错误
		if(gVar.sPage == 1)
		    //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_IPWR") + "," + lg.get("IDS_MAIN_AVOPENF"));
        break;
	}case 202:{ //connect失败
		if(gVar.sPage == 1)
		    //ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_NET_WIFININTE") + "," + lg.get("IDS_MAIN_RECONN"));
        break;
	}case 203:{//playback slider
		if (!gVar.pbMouseDown){
			var i=arguments[1]*document.getElementById("gsliderCov").a/10000;
			$("#gsliderBtn").css("margin-left", i-5);
			$("#gslider").css("width", i);break;
		}
	}case 204:{
		switch(arguments[1]){
		    case 0:
			break;
			case 1:
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOLOG"));
			break;
			case 2:
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_MUSRE"));
			break;
			case 3:
			//ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_AVI"));
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_OPENAVIFAIL"));
			break;
		}break;
	}case 205:
	{
	    if (gVar.dbOpenNew == true) {
	        $("#pbBtnBt10").mousedown();
	        gVar.dbOpenNew = false;
	        return;
	    }

	    if ($("#continCheck").attr("checked") * 1 == 1) {

	        if (gVar.bPbStop != true && gVar.pbRecord != true) {
	            $("#continCheck").attr("checked", 0);
	            gVar.bPbStop = true;
	            gVar.pbRecord = true;
	            $(".liveBtnBt11").css("display", "none");
	            $("#pbBtnBt10").css("display", "");
	            gDvr.PbPause();
	            return;
	        }
	        if (gVar.bPbStop != true) {
	            var ele = $(".rcChoseAC");
	            if (vPage != $("#rcListT").attr("page")) {
	                //判断播放页码与选中页码不一致;
	                if (ele.parent().parent().children().first().html() * 1 == gVar.totalRecord) {
	                    gVar.bPbStop = true;
	                    $(".liveBtnBt11").css("display", "none");
	                    $("#pbBtnBt10").css("display", "");
	                }
	                else {
	                    if (vList % 10 == 0) {
	                        //判断为最后一项记录;
	                        vPage = vPage + 1;
	                        $("#rcListT").attr("page", vPage);
	                        var numT = $(".fontColor").next("a").html() * 1 - 1;
	                        var isNan = $("#rcListT").attr("isNan") * 1;
	                        RfParamCall(function (xml) {
	                            $("#serword").css("display", "none");
	                            var res = XmlParser("result", xml) * 1;
	                            if (res != 0) {
	                                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_SERTCHF"))
	                            } else {
	                                var total = XmlParser("totalCnt", xml) * 1;
	                                gVar.totalRecord = total;
	                                if (total <= 0) { $("#rcListT").empty(); $("#rcListM > div:first").empty(); $("#rcListM > div:last").empty(); ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NORECORD")); return; }
	                                $("#rcListT, #rcListM").css("display", "");
	                                var num = XmlParser("curCnt", xml);
	                                var Page = ((total / 10) | 0) + ((total % 10 == 0) ? 0 : 1) - 1;
	                                if (Page >= 0) {
	                                    UI.FyHead("rcListM", ">div:first", ">div:last", Page, vPage, isNan);
	                                }
	                                $("#rcListT").attr("tPage", Page);
	                                var rcl;
	                                $("#rcListT").empty();
	                                var str = ' <thead height="20"><th width="34">NO.</th><th width="114">' + lg.get("IDS_LEFT_WNAME") + '</th><th>' + lg.get("IDS_TYPE") + '</th></thead>'
	                                $("#rcListT").append(str);
	                                gVar.recordPath.length = 0;
	                                for (var i = 0; i < num; i++) {
	                                    gVar.recordPath[i] = XmlParser("record" + i, xml);
	                                    rcl = XmlParser("record" + i, xml).split("/");
	                                    var rectyp = "";
	                                    if (rcl[2].toLowerCase().indexOf("alarm") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_ARM");
	                                    } else if (rcl[2].toLowerCase().indexOf("schedule") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_PLAN");
	                                    } else if (rcl[2].toLowerCase().indexOf("normal") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_NOMAL");
	                                    }
	                                    str = '<tr><td>' + (i + vPage * 10 + 1) + '</td><td title=' + rcl[2] + '><div>' + rcl[2].substring(0, 8) + "..." + rcl[2].substring(rcl[2].length - 8, rcl[2].length) + '</div></td><td>' + rectyp + '</td></tr>';
	                                    $("#rcListT").append(str);
	                                }
	                                //开启新的分页的播放功能;
	                                $("#rcListT tr td div:first").css("background-color", "transparent").removeClass("rcChoseAC");
	                                $("#rcListT tr td div:first").css("background-color", "#FAD");
	                                $("#rcListT tr td div:first").addClass("rcChoseAC");
	                                var fileName = $(".rcChoseAC").parent().attr("title");
	                                for (var index = 0; index < 10; index++) {
	                                    var path = gVar.recordPath[index].split("/");
	                                    if (path[2] == fileName) {
	                                        vVal = gVar.recordPath[index].split("/")[2];
	                                        fileName = gVar.recordPath[index];
	                                        break;
	                                    }
	                                }
	                                gDvr.PbVedioPlay(gVar_first.ip, $("#rcListT").attr("rDir"), fileName, 3);
	                                vList = vList + 1;
	                            }
	                        }, "", "getRecordList2&recordPath=" + $("#rcListT").attr("rDir") + "&startTime=" + gVar.recordStartTime + "&endTime=" + gVar.recordEndTime + "&recordType=" + $("#pbRcType").val() + "&startNo=" + vPage * 10);
	                    }
	                    else {
	                        //播放记录与播放页不一致，不是最后一条记录;
	                        $("#rcListT").attr("page", vPage);
	                        var numT = $(".fontColor").next("a").html() * 1 - 1;
	                        var isNan = $("#rcListT").attr("isNan") * 1;
	                        RfParamCall(function (xml) {
	                            $("#serword").css("display", "none");
	                            var res = XmlParser("result", xml) * 1;
	                            if (res != 0) {
	                                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_SERTCHF"))
	                            } else {
	                                var total = XmlParser("totalCnt", xml) * 1;
	                                gVar.totalRecord = total;
	                                if (total <= 0) { $("#rcListT").empty(); $("#rcListM > div:first").empty(); $("#rcListM > div:last").empty(); ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NORECORD")); return; }
	                                $("#rcListT, #rcListM").css("display", "");
	                                var num = XmlParser("curCnt", xml);
	                                var Page = ((total / 10) | 0) + ((total % 10 == 0) ? 0 : 1) - 1;
	                                if (Page >= 0) {
	                                    UI.FyHead("rcListM", ">div:first", ">div:last", Page, vPage, isNan);
	                                }
	                                $("#rcListT").attr("tPage", Page);

	                                var rcl;
	                                $("#rcListT").empty();
	                                var str = ' <thead height="20"><th width="34">NO.</th><th width="114">' + lg.get("IDS_LEFT_WNAME") + '</th><th>' + lg.get("IDS_TYPE") + '</th></thead>'
	                                $("#rcListT").append(str);
	                                gVar.recordPath.length = 0;
									if(vList>=gVar.totalRecord)
									{
									gVar.bPbStop = true;
	                                $(".liveBtnBt11").css("display", "none");
	                                $("#pbBtnBt10").css("display", "");
									}
	                                for (var i = 0; i < num; i++) {
	                                    gVar.recordPath[i] = XmlParser("record" + i, xml);
	                                    rcl = XmlParser("record" + i, xml).split("/");
	                                    var rectyp = "";
	                                    if (rcl[2].toLowerCase().indexOf("alarm") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_ARM");
	                                    } else if (rcl[2].toLowerCase().indexOf("schedule") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_PLAN");
	                                    } else if (rcl[2].toLowerCase().indexOf("normal") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_NOMAL");
	                                    }

	                                    str = '<tr><td>' + (i + vPage * 10 + 1) + '</td><td title=' + rcl[2] + '><div>' + rcl[2].substring(0, 8) + "..." + rcl[2].substring(rcl[2].length - 8, rcl[2].length) + '</div></td><td>' + rectyp + '</td></tr>';
	                                    $("#rcListT").append(str);
	                                }
	                                //开启新的分页的播放功能;
	                                $("#rcListT tr td div").css("background-color", "transparent").removeClass("rcChoseAC");
	                                var paths = "";
	                                for (var index = 0; index < 10; index++) {
	                                    var path = gVar.recordPath[index].split("/");
	                                    if (path[2] == vVal) {
	                                        vVal = gVar.recordPath[index + 1].split("/")[2];
	                                        paths = gVar.recordPath[index + 1];
	                                        break;
	                                    }
	                                }
	                                $("#rcListT tr:eq(" + (index + 2) + ")").find("div:first").css("background-color", "#FAD");
	                                $("#rcListT tr:eq(" + (index + 2) + ")").find("div:first").addClass("rcChoseAC");
	                                gDvr.PbVedioPlay(gVar_first.ip, $("#rcListT").attr("rDir"), paths, 3);
	                                vList = vList + 1;
	                            }
	                        }, "", "getRecordList2&recordPath=" + $("#rcListT").attr("rDir") + "&startTime=" + gVar.recordStartTime + "&endTime=" + gVar.recordEndTime + "&recordType=" + $("#pbRcType").val() + "&startNo=" + vPage * 10);
	                    }
	                }
	            }
	            else {
	                //当前播放页码;
	                if (ele.parent().parent().children().first().html() * 1 == gVar.totalRecord) {
	                    gVar.bPbStop = true;
	                    $(".liveBtnBt11").css("display", "none");
	                    $("#pbBtnBt10").css("display", "");
	                }
	                else {
	                    if (vList % 10 == 0) {
	                        //判断同一页时为最后一项记录;
	                        vPage = vPage + 1;
	                        //var numT = $(".fontColor").next("a").html() * 1 - 1;
	                        $("#rcListT").attr("page", vPage);
	                        var isNan = $("#rcListT").attr("isNan") * 1;
	                        RfParamCall(function (xml) {
	                            $("#serword").css("display", "none");
	                            var res = XmlParser("result", xml) * 1;
	                            if (res != 0) {
	                                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_SERTCHF"))
	                            } else {
	                                var total = XmlParser("totalCnt", xml) * 1;
	                                gVar.totalRecord = total;
	                                if (total <= 0) { $("#rcListT").empty(); $("#rcListM > div:first").empty(); $("#rcListM > div:last").empty(); ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LEFT_NORECORD")); return; }
	                                $("#rcListT, #rcListM").css("display", "");
	                                var num = XmlParser("curCnt", xml);
	                                var Page = ((total / 10) | 0) + ((total % 10 == 0) ? 0 : 1) - 1;
	                                if (Page >= 0) {
	                                    UI.FyHead("rcListM", ">div:first", ">div:last", Page, vPage, isNan);
	                                }
	                                $("#rcListT").attr("tPage", Page);

	                                var rcl;
	                                $("#rcListT").empty();
	                                var str = ' <thead height="20"><th width="34">NO.</th><th width="114">' + lg.get("IDS_LEFT_WNAME") + '</th><th>' + lg.get("IDS_TYPE") + '</th></thead>'
	                                $("#rcListT").append(str);
	                                gVar.recordPath.length = 0;
	                                for (var i = 0; i < num; i++) {
	                                    gVar.recordPath[i] = XmlParser("record" + i, xml);
	                                    rcl = XmlParser("record" + i, xml).split("/");
	                                    var rectyp = "";
	                                    if (rcl[2].toLowerCase().indexOf("alarm") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_ARM");
	                                    } else if (rcl[2].toLowerCase().indexOf("schedule") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_PLAN");
	                                    } else if (rcl[2].toLowerCase().indexOf("normal") != -1) {
	                                        rectyp = lg.get("IDS_LEFT_NOMAL");
	                                    }

	                                    str = '<tr><td>' + (i + vPage * 10 + 1) + '</td><td title=' + rcl[2] + '><div>' + rcl[2].substring(0, 8) + "..." + rcl[2].substring(rcl[2].length - 8, rcl[2].length) + '</div></td><td>' + rectyp + '</td></tr>';
	                                    $("#rcListT").append(str);
	                                }
	                                //开启新的分页的播放功能;
	                                $("#rcListT tr td div:first").css("background-color", "transparent").removeClass("rcChoseAC");
	                                $("#rcListT tr td div:first").css("background-color", "#FAD");
	                                $("#rcListT tr td div:first").addClass("rcChoseAC");
	                                var fileName = $(".rcChoseAC").parent().attr("title");
	                                for (var index = 0; index < 10; index++) {
	                                    var path = gVar.recordPath[index].split("/");
	                                    if (path[2] == fileName) {
	                                        vVal = gVar.recordPath[index].split("/")[2];
	                                        fileName = gVar.recordPath[index];
	                                        break;
	                                    }
	                                }
	                                gDvr.PbVedioPlay(gVar_first.ip, $("#rcListT").attr("rDir"), fileName, 3);
	                                vList = vList + 1;
	                            }
	                        }, "", "getRecordList2&recordPath=" + $("#rcListT").attr("rDir") + "&startTime=" + gVar.recordStartTime + "&endTime=" + gVar.recordEndTime + "&recordType=" + $("#pbRcType").val() + "&startNo=" + vPage * 10);
	                    }
	                    else {
	                        $("#rcListT tr td div").css("background-color", "transparent").removeClass("rcChoseAC");
	                        var paths = "";
	                        for (var index = 0; index < 10; index++) {
	                            var path = gVar.recordPath[index].split("/");
	                            if (path[2] == vVal) {
	                                vVal = gVar.recordPath[index + 1].split("/")[2];
	                                paths = gVar.recordPath[index + 1];
	                                break;
	                            }
	                        }
	                        $("#rcListT tr:eq(" + (index + 2) + ")").find("div:first").css("background-color", "#FAD");
	                        $("#rcListT tr:eq(" + (index + 2) + ")").find("div:first").addClass("rcChoseAC");
	                        gDvr.PbVedioPlay(gVar_first.ip, $("#rcListT").attr("rDir"), paths, 3);
	                        vList = vList + 1;
	                    }
	                }
	            }
	        }
	    }
	    else {
	        gVar.bPbStop = true;
	        $(".liveBtnBt11").css("display", "none");
	        $("#pbBtnBt10").css("display", "");
	    }
	    break;
	}                case 206:{//NET_MSG_TALK_OPEN
		switch(arguments[1]){
			case 0:
			break;
			case 1:
			$(".liveBtnBt4").css("display", "none");
	        $(".liveBtnBt3").css("display", "");
			isOpenT[IFs] = false;
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOLOG"));
			break;
			case 2:
			$(".liveBtnBt4").css("display", "none");
	        $(".liveBtnBt3").css("display", "");
			isOpenT[IFs] = false;
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_ANOUSR"));
			break;
			case 3:
			$(".liveBtnBt4").css("display", "none");
	        $(".liveBtnBt3").css("display", "");
			isOpenT[IFs] = false;
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_MAIN_ANOUSR"));
			break;
		}break;
	}case 207:{//NET_MSG_TALK_CLOSE
		switch(arguments[1]){
			case 0:
			break;
			case 1:
			$(".liveBtnBt3").css("display", "none");
	        $(".liveBtnBt4").css("display", "");
			isOpenT[IFs] = true;
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_LOG_NOLOG"));
			break;
		}break;
	}case 208:{
		gVar.ip = arguments[1];
		gVar.port = arguments[2];
		setTimeout(function(){
			if(gVar.httpver == "http"){
			    window.location = "http://"+gVar.ip+":"+gVar.port;
			}
			if(gVar.httpver == "https"){
			    window.location = "https://"+gVar.ip+":"+gVar.httpsPort;
			}
		}, 10);
		break;
	}case 209:
	{
	    if (IFs != arguments[1]) {
	        gDvr.obj[IFs].KillFocus();
	        IFs = arguments[1];
	        gVar.ip = arguments[2];
	        gVar.port = arguments[3];
	        gVar.user = arguments[4];
	        gVar.passwd = arguments[5];
	        for (var i = 0; i < 9; i++) {
	            if (isOpenT[i]) gDvr.TalkCMD(i, 1);
	            if (isOpenA[i]) gDvr.CloseAudio(i);
	        }

	        switch (arguments[7] >> 16) {
	            case 0:
	                gJson = false;
	                break;
	            default:
	                gJson = true;
	                break;
	        }
	        //if (Qqx != 0 && Qqx != 1) RfQx(arguments[7] & 0xffff);
	        if (typeof arguments[8] != 'undefined') {
	            tuic(arguments[8]);
	            auic(arguments[9]);
	        }
	        if (typeof arguments[12] != "undefined") {
	            isEncy[arguments[1]] = arguments[12];
	        }
	        if (typeof arguments[11] != 'undefined' && XmlParser2("result", arguments[11]) * 1 == 0) {//if is appall dev
	            isappallDev = 1;
	            gVar.model = XmlParser2("model", arguments[11]) * 1;
	            gVar.modelName = XmlParser2("modelName", arguments[11]);
	            gVar.N_language = XmlParser2("language", arguments[11]) * 1;
	            gVar.sensorType = XmlParser2("sensorType", arguments[11]) * 1;
	            gVar.wifiType = XmlParser2("wifiType", arguments[11]) * 1;
	            gVar.sdFlag = XmlParser2("sdFlag", arguments[11]) * 1;
	            gVar.outdoorFlag = XmlParser2("outdoorFlag", arguments[11]) * 1;
	            gVar.ptFlag = XmlParser2("ptFlag", arguments[11]) * 1;
	            gVar.zoomFlag = XmlParser2("zoomFlag", arguments[11]) * 1;
	            gVar.rs485Flag = XmlParser2("rs485Flag", arguments[11]) * 1;
	            gVar.ioAlarmFlag = XmlParser2("ioAlarmFlag", arguments[11]) * 1;
	            gVar.onvifFlag = XmlParser2("onvifFlag", arguments[11]) * 1;
	            gVar.p2pFlag = XmlParser2("p2pFlag", arguments[11]) * 1;
	            gVar.wpsFlag = XmlParser2("wpsFlag", arguments[11]) * 1;
	            gVar.audioFlag = XmlParser2("audioFlag", arguments[11]) * 1;
	            gVar.talkFlag = XmlParser2("talkFlag", arguments[11]) * 1;
	            gVar.reserve1 = XmlParser2("reserve1", arguments[11]) * 1;
	            gVar.reserve2 = XmlParser2("reserve2", arguments[11]) * 1;
	            gVar.reserve3 = XmlParser2("reserve3", arguments[11]) * 1;
	            gVar.reserve4 = XmlParser2("reserve4", arguments[11]) * 1;
	            gVar.reserveFlag1 = XmlParser2("reserveFlag1", arguments[11]) * 1;
	            gVar.reserveFlag2 = XmlParser2("reserveFlag2", arguments[11]) * 1;
	            gVar.reserveFlag3 = XmlParser2("reserveFlag3", arguments[11]) * 1;
	            gVar.reserveFlag4 = XmlParser2("reserveFlag4", arguments[11]) * 1;

	            gVar.hasPrivacyZone = XmlParser2("hasPrivacyZone", arguments[11]) * 1;
	            gVar.motionAreaRows = XmlParser2("motionAreaRows", arguments[11]) * 1;
	            gVar.motionAreaCols = XmlParser2("motionAreaCols", arguments[11]) * 1;
	            gVar.H264FrmRef = XmlParser2("H264FrmRef", arguments[11]) * 1;
	            gVar.HasSubStream = XmlParser2("HasSubStream", arguments[11]) * 1;
	            gVar.ambarellaFlag = XmlParser2("ambarellaFlag", arguments[11]) * 1;

	            gVar.selChDev = gVar.modelName;
	            
	        }
	        else {
	            isappallDev = 0;
	            gVar.selChDev = arguments[10];
	        }

	        gVar.selCh = arguments[1];
	        gVar.selChQx = arguments[7] & 0xffff;
	        SelectChannel(gVar.selCh, gVar.selChQx, gVar.selChDev, gVar.ip);

	        if (gVar.nUserRight >= 100) {
	            PTZPro = MJYT;
	        }
	        else {
	            PTZPro = H264YT;
	        }
	        //NAA
	        /*if(gVar.model>1000&&gVar.model<2000||gVar.model>3000&&gVar.model<4000||gVar.model>5000&&gVar.model<7000)
			{
				if(gVar.nUserRight != 0)
	            //if(gVar.reserve2 >> 5 == 1)
	            {
	            	$("#liveNAA").show();
	            }
			}*/

	        //humidity
	        if ((gVar.reserve2 >> 3 & 0x01) == 0) {
	            $("#liveHumidity").text("");
	        }
	        else {
	            $("#liveHumidity").text("H: " + humidity + "%");
	        }

	        if ((gVar.reserve2 >> 2 & 0x01) == 0) {
	            $("#liveTemperature").text("");
	        }
	        else {
	            $("#liveTemperature").text(temperature);
	        }

	        if ((gVar.reserve3 & 0x01) == 0) {
	            $("#Lullabies").css("display", "none");
	            $("#live_sound").css("display", "none");
	        }

	    }
		if(gVar.audioFlag!=0)
		{
		 SetDefaultAudioDisplay();
		}
		
		// get wdr hdr state 
		Struct.wdrstate = arguments[13];
        RfWdr();
		Struct.hdrstate = arguments[14];
        RfHdr();
		
	    break;
	}
    case 210:{
		var i = arguments[1];
		var r = arguments[2];
		if (gVar.nOpenPreView && r == 0){
			isOpenV[i]=true;
			if (gVar.sPage == 1)
				gDvr.VideoPlay(i, Struct.devInfo[i].ip,3);
		}else if (r != 0){
			gDvr.obj[i].UNRegMy();
			ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_DEV_DEVICE") + (i + 1) + lg.get("IDS_SERVER_LOGIN") + lg.get("IDS_BS_TESTFAIL") + r);
		}
        break;
    }
    case 211:{
		var SEname=arguments[1];
		if(SEname=="") SEname="anonymous";
		var strIP=arguments[2];
		var strOption="";
		if(strIP == ip || strIP == $("#bs2_hostput").val() || strIP == $("#bs3_hostput").val() || strIP == $("#bs4_hostput").val() || strIP == $("#bs5_hostput").val() || strIP == $("#bs6_hostput").val() || strIP == $("#bs7_hostput").val() || strIP == $("#bs8_hostput").val() || strIP == $("#bs9_hostput").val()){
			strOption='<option disabled="disabled" ip="'+strIP+'" dname="'+SEname+'" port="'+arguments[3]+'" mport="'+arguments[4]+'">'+SEname+'('+strIP+')</option>'}
		else{
			strOption='<option ip="'+strIP+'" dname="'+SEname+'" port="'+arguments[3]+'" mport="'+arguments[4]+'">'+SEname+"("+strIP+')</option>'}
		$("#bsmullist").append(strOption);
        break;
    }
    case 212:{
		//Logout();
		break;
	}
    case 213:{//record
		if(IFs == arguments[1]){
			Struct.recordState=1;
		//isOpenR[arguments[1]*1]=1;
		    if (gVar.nUserRight == 2 || gVar.nUserRight >= 100) {
		        $("#LVRcA").css("display", "none");
		        $("#LVRc").css("display", "");
		    }	
		}
		isOpenR[arguments[1]*1]=1;
		break;
	}case 214:{//record close
		if(IFs == arguments[1]){
			Struct.recordState=0;
//		isOpenR[arguments[1]*1]=0;
//        isOpenAlarmR[arguments[1]*1]=0;
            if (gVar.nUserRight == 2 || gVar.nUserRight >= 100) {
		        if(cutdownalarmrecord[IFs] == false){
		            $("#LVRcA").css("display", "");
		            $("#LVRc").css("display", "none");
		        }
		    }
		}
		isOpenR[arguments[1]*1]=0;
		if (cutdownalarmrecord[IFs] == false) {
		    isOpenAlarmR[arguments[1]*1]=0;
		}
        
		break;
	}case 215:{//no space
	    ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_PC_RC_NOSPACE"));
	    Struct.recordState=0;
	    for(var i = 0; i <= 8; i++){
	        isOpenR[i] = 0;
            isOpenAlarmR[i] = 0;
	    }
		if (gVar.nUserRight == 2 || gVar.nUserRight >= 100) {
		        if(cutdownalarmrecord[IFs] == false){
		$("#LVRcA").css("display", "");
		$("#LVRc").css("display", "none");
		        }
		    }
	    break;
	}case 216:{//no qx
	    //if no right write IE record file,show tip and change states in web 
	    ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_MAIN_NOFIHNT"));
	    //$("#LVRc").click(); //this will stop current web chose channel record
	                          //may not be the channel plugins push to web
	    try 
	    {   
		 if (gVar.nUserRight == 2 || gVar.nUserRight >= 100) {
		        if(cutdownalarmrecord[IFs] == false){
	        $("#LVRcA").css("display", "");
		    $("#LVRc").css("display", "none");
		        }
		    }
	        gDvr.obj[arguments[1]*1].Record(false,""); 
	        isOpenR[arguments[1]*1]=0;
	        isOpenAlarmR[arguments[1]*1]=0;             //get msg from plugins,no quanxian,chanle in the msg
	                                                    //stop record of the channel
	    }                       
        catch (e) 
        {
            
        }
	    
	    break;
	}case 300:{
		$(".liveBtnBt3").css("display", "");
	    $(".liveBtnBt4").css("display", "none");
		isOpenT[IFs]=false;break;
	}case 301:{
		tuic(arguments[1]);
		auic(arguments[2]);break;
	}case 302:{
		$("#LVRcA,#LVRc").css("display","none");
		Struct.recordState = arguments[1];setTimeout('RfRs()',1)
		break;
	}
    case 29:{
	            RfParamCallNoShadow("", "", "logIn&usrName=" + gVar.user + "&pwd=" + gVar.passwd + "&groupId=" + gVar.nDate);
	            break;
	}
    case 217:{
	    if ((isappallDev == true && gVar.talkFlag == 0 && gVar.audioFlag == 0) || (isappallDev == false && IsInArray(notTalkAudioDev, gVar.selChDev))) break;

	    $(".liveBtnBt3").css("display","");
	    $(".liveBtnBt9").css("display", "none");
	    $(".liveBtnBt4").css("display","none");
	    $(".liveBtnBt109").css("display","");
		gDvr.OpenAudio(IFs);
	    break;
	}
    case 218:{
	    if(arguments[1] == "1"){
	        User_defined_text("rcLocalAlarmResult",lg.get("IDS_PATH_SUCCESS"));
	    }
	    else{
	        ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_MAIN_NO_CONFIGPATH_RIGHT"));
	    }
	    break;
	}
    case 219:{
            if (arguments[1] == "0") {
                //gVar.KCgi("cmd=" + "ptzMoveTopLeft");
                RfParamCallNoShadow("", "", "ptzMoveTopLeft");
            }
            if (arguments[1] == "1") {
                //gVar.KCgi("cmd=" + "ptzMoveUp");
                RfParamCallNoShadow("", "", "ptzMoveUp");
            }
            if (arguments[1] == "2") {
                //gVar.KCgi("cmd=" + "ptzMoveTopRight");
                RfParamCallNoShadow("", "", "ptzMoveTopRight");
            }
            if (arguments[1] == "3") {
                //gVar.KCgi("cmd=" + "ptzMoveLeft");
                RfParamCallNoShadow("", "", "ptzMoveLeft");
            }
            if (arguments[1] == "4") {
                //gVar.KCgi("cmd=" + "ptzStopRun");
                RfParamCallNoShadow("", "", "ptzStopRun");
            }
            if (arguments[1] == "5") {
                //gVar.KCgi("cmd=" + "ptzMoveRight");
                RfParamCallNoShadow("", "", "ptzMoveRight");
            }
            if (arguments[1] == "6") {
                //gVar.KCgi("cmd=" + "ptzMoveBottomLeft");
                RfParamCallNoShadow("", "", "ptzMoveBottomLeft");
            }
            if (arguments[1] == "7") {
                //gVar.KCgi("cmd=" + "ptzMoveDown");
                RfParamCallNoShadow("", "", "ptzMoveDown");
            }
            if (arguments[1] == "8") {
                //gVar.KCgi("cmd=" + "ptzMoveBottomRight");
                RfParamCallNoShadow("", "", "ptzMoveBottomRight");
            }
        break;
    }
    case 220:{      
        mult_https_port[arguments[1]] = arguments[2];
        
        break;
    }
    case 221:{
        gVar.bPbStop = true;
        $(".liveBtnBt11").css("display", "none");
        $("#pbBtnBt10").css("display", "");
        ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_VIDEO_PLAYBACK_RECORD_INTERRUPT"));
        break;
    }
    case 500:
    {
        //gDvr.obj[IFs].KillFocus();
        IFs = arguments[1];
        if (typeof arguments[7] != 'undefined') gVar.ip = arguments[7];
        if (typeof arguments[8] != 'undefined') gVar.port = arguments[8];
        if (typeof arguments[9] != 'undefined') gVar.user = arguments[9];
        if (typeof arguments[10] != 'undefined') gVar.passwd = arguments[10];

        switch (arguments[3] >> 16) {
            case 0:
                gJson = false;
                break;
            default:
                gJson = true;
                break;
        }
        //if (Qqx != 0 && Qqx != 1) RfQx(arguments[7] & 0xffff);
        if (typeof arguments[4] != 'undefined') {
            tuic(arguments[4]);
            auic(arguments[5]);
        }

        if (typeof arguments[11] != 'undefined' && XmlParser2("result", arguments[11]) * 1 == 0) {
            isappallDev = 1;
            gVar.model = XmlParser2("model", arguments[11]) * 1;
            gVar.modelName = XmlParser2("modelName", arguments[11]);
            gVar.N_language = XmlParser2("language", arguments[11]) * 1;
            gVar.sensorType = XmlParser2("sensorType", arguments[11]) * 1;
            gVar.wifiType = XmlParser2("wifiType", arguments[11]) * 1;
            gVar.sdFlag = XmlParser2("sdFlag", arguments[11]) * 1;
            gVar.outdoorFlag = XmlParser2("outdoorFlag", arguments[11]) * 1;
            gVar.ptFlag = XmlParser2("ptFlag", arguments[11]) * 1;
            gVar.zoomFlag = XmlParser2("zoomFlag", arguments[11]) * 1;
            gVar.rs485Flag = XmlParser2("rs485Flag", arguments[11]) * 1;
            gVar.ioAlarmFlag = XmlParser2("ioAlarmFlag", arguments[11]) * 1;
            gVar.onvifFlag = XmlParser2("onvifFlag", arguments[11]) * 1;
            gVar.audioFlag = XmlParser2("audioFlag", arguments[11]) * 1;
            gVar.talkFlag = XmlParser2("talkFlag", arguments[11]) * 1;
            gVar.p2pFlag = XmlParser2("p2pFlag", arguments[11]) * 1;
            gVar.wpsFlag = XmlParser2("wpsFlag", arguments[11]) * 1;
            gVar.reserve1 = XmlParser2("reserve1", arguments[11]) * 1;
            gVar.reserve2 = XmlParser2("reserve2", arguments[11]) * 1;
            gVar.reserve3 = XmlParser2("reserve3", arguments[11]) * 1;
            gVar.reserve4 = XmlParser2("reserve4", arguments[11]) * 1;
            gVar.reserveFlag1 = XmlParser2("reserveFlag1", arguments[11]) * 1;
            gVar.reserveFlag2 = XmlParser2("reserveFlag2", arguments[11]) * 1;
            gVar.reserveFlag3 = XmlParser2("reserveFlag3", arguments[11]) * 1;
            gVar.reserveFlag4 = XmlParser2("reserveFlag4", arguments[11]) * 1;

            gVar.hasPrivacyZone = XmlParser2("hasPrivacyZone", arguments[11]) * 1;
            gVar.motionAreaRows = XmlParser2("motionAreaRows", arguments[11]) * 1;
            gVar.motionAreaCols = XmlParser2("motionAreaCols", arguments[11]) * 1;
            gVar.H264FrmRef = XmlParser2("H264FrmRef", arguments[11]) * 1;
            gVar.HasSubStream = XmlParser2("HasSubStream", arguments[11]) * 1;
            gVar.ambarellaFlag = XmlParser2("ambarellaFlag", arguments[11]) * 1;
            
            gVar.selChDev = gVar.modelName;
        } else {
            isappallDev = 0;
            gVar.selChDev = arguments[6];
        }
        gVar.selCh = arguments[1];
        gVar.selChQx = arguments[3] & 0xffff;
        SelectChannel(gVar.selCh, gVar.selChQx, gVar.selChDev,gVar.ip);

        if (gVar.nUserRight >= 100) {
            PTZPro = MJYT;
        }
        else {
            PTZPro = H264YT;
        }
    }
    break;
case 508:
    {
	
	    SetDefaultAudioDisplay();
	}
	break;
case 501:
    {
        Struct.babyPlayState = arguments[1];
        Struct.babyPlayMode = arguments[2];
        Struct.babyPlayPath = arguments[3];
        Struct.babySoundOpen = arguments[4];
        Struct.babySoundVolume = arguments[5];
        Struct.babyDomantTime = arguments[6];
        Struct.babyTemperature = arguments[7];
        Struct.babyListResult = arguments[8];
        Struct.babyListCnt = arguments[9];
        Struct.babyCurMusicListName = arguments[10];
        for (var i = 0; i < 3; i++) {
            Struct.babayMusicList[i].listName = arguments[11 + i];
        }
        Struct.babyHumidity = arguments[14];

        if (Struct.babyPlayState == 0) {
            $("#music_stop").css("display", "none");
            $("#music_play").css("display", "");
        } else if (Struct.babyPlayState == 1) {
            $("#music_stop").css("display", "");
            $("#music_play").css("display", "none");
        }

        if (Struct.babyPlayMode == 1) {        //顺序播放
            $("#music_singlerepeat").css("display", "");
            $("#music_allrepeat").css("display", "none");
            $("#music_playlist").css("display", "none");
        }
        else if (Struct.babyPlayMode == 2) {   //单曲循环
            $("#music_singlerepeat").css("display", "none");
            $("#music_allrepeat").css("display", "");
            $("#music_playlist").css("display", "none");
        }
        else if (Struct.babyPlayMode == 3) {       //列表循环
            $("#music_singlerepeat").css("display", "none");
            $("#music_allrepeat").css("display", "none");
            $("#music_playlist").css("display", "");
        }

        if (Struct.babyDomantTime == -1) {
            $("#music_10").css("display", "");
            $("#music_20").css("display", "none");
            $("#music_30").css("display", "none");
            $("#music_100").css("display", "none");
        }
        else if (Struct.babyDomantTime == 10) {
            $("#music_10").css("display", "none");
            $("#music_20").css("display", "");
            $("#music_30").css("display", "none");
            $("#music_100").css("display", "none");
        }
        else if (Struct.babyDomantTime == 20) {
            $("#music_10").css("display", "none");
            $("#music_20").css("display", "none");
            $("#music_30").css("display", "");
            $("#music_100").css("display", "none");
        }
        else if (Struct.babyDomantTime == 30) {
            $("#music_10").css("display", "none");
            $("#music_20").css("display", "none");
            $("#music_30").css("display", "none");
            $("#music_100").css("display", "");
        }
        var Temperature = parseInt(parseFloat(arguments[7]) * 9 / 5 + 32);
        Struct.babyTemperature = "T: " + String(arguments[7]) + "℃" + "(" + String(Temperature) + "°F)";

        //play list
        RfBabyMusicList();


        //湿度
        if ((gVar.reserve2 >> 3 & 0x01) == 0) {
            $("#liveHumidity").text("");
        }
        else {
            if (Struct.humidityType == 1) {
                $("#liveHumidity").text("H: " + Struct.babyHumidity + "%");
            }
            else {
                $("#liveHumidity").text("");
            }
        }
        //温度
        if ((gVar.reserve2 >> 2 & 0x01) == 0) {
            $("#liveTemperature").text("");
        }
        else {
            if (Struct.tempType == 1) {
                $("#liveTemperature").text(Struct.babyTemperature);
            }
            else {
                $("#liveTemperature").text("");
            }
        }
        //volume
        if (gVar.nUserRight == 0) {
            $(".volumeOn").css("display", "none");
            $(".volumeOff").css("display", "none");
        }

    }
    break;
case 502:
    {
        gVar_first.model = XmlParser2("model", arguments[1]); // $(xml).find("model").text() * 1;
        gVar_first.modelName = XmlParser2("modelName", arguments[1]); // $(xml).find("modelName").text();
        gVar_first.N_language = XmlParser2("language", arguments[1]); // $(xml).find("language").text() * 1;
        gVar_first.sensorType = XmlParser2("sensorType", arguments[1]); // $(xml).find("sensorType").text() * 1;
        gVar_first.wifiType = XmlParser2("wifiType", arguments[1]); // $(xml).find("wifiType").text() * 1;
        gVar_first.sdFlag = XmlParser2("sdFlag", arguments[1]); // $(xml).find("sdFlag").text() * 1;
        gVar_first.outdoorFlag = XmlParser2("outdoorFlag", arguments[1]); // $(xml).find("outdoorFlag").text() * 1;
        gVar_first.ptFlag = XmlParser2("ptFlag", arguments[1]); // $(xml).find("ptFlag").text() * 1;
        gVar_first.zoomFlag = XmlParser2("zoomFlag", arguments[1]); // $(xml).find("zoomFlag").text() * 1;
        gVar_first.rs485Flag = XmlParser2("rs485Flag", arguments[1]); // $(xml).find("rs485Flag").text() * 1;
        gVar_first.ioAlarmFlag = XmlParser2("ioAlarmFlag", arguments[1]); // $(xml).find("ioAlarmFlag").text() * 1;
        gVar_first.onvifFlag = XmlParser2("onvifFlag", arguments[1]); // $(xml).find("onvifFlag").text() * 1;
        gVar_first.p2pFlag = XmlParser2("p2pFlag", arguments[1]); // $(xml).find("p2pFlag").text() * 1;
        gVar_first.wpsFlag = XmlParser2("wpsFlag", arguments[1]); // $(xml).find("wpsFlag").text() * 1;
        gVar_first.audioFlag = XmlParser2("audioFlag", arguments[1]); // $(xml).find("audioFlag").text() * 1;
        gVar_first.talkFlag = XmlParser2("talkFlag", arguments[1]); // $(xml).find("talkFlag").text() * 1;
        gVar_first.reserve1 = XmlParser2("reserve1", arguments[1]); // $(xml).find("reserve1").text() * 1;
        gVar_first.reserve2 = XmlParser2("reserve2", arguments[1]); // $(xml).find("reserve2").text() * 1;
        gVar_first.reserve3 = XmlParser2("reserve3", arguments[1]); // $(xml).find("reserve3").text() * 1;
        gVar_first.reserve4 = XmlParser2("reserve4", arguments[1]); // $(xml).find("reserve4").text() * 1;
        gVar_first.reserveFlag1 = XmlParser2("reserveFlag1", arguments[1]); // $(xml).find("reserveFlag1").text() * 1;
        gVar_first.reserveFlag2 = XmlParser2("reserveFlag2", arguments[1]) * 1; // $(xml).find("reserveFlag2").text() * 1;
        gVar_first.reserveFlag3 = XmlParser2("reserveFlag3", arguments[1]); // $(xml).find("reserveFlag3").text() * 1;
        gVar_first.reserveFlag4 = XmlParser2("reserveFlag4", arguments[1]); // $(xml).find("reserveFlag4").text() * 1;
        gVar_first.appVer = XmlParser2("appVer", arguments[1]); // $(xml).find("appVer").text();
        gVar_first.hasPrivacyZone = XmlParser2("hasPrivacyZone", arguments[1]); // $(xml).find("hasPrivacyZone").text() * 1;
        gVar_first.motionAreaRows = XmlParser2("motionAreaRows", arguments[1]); // $(xml).find("motionAreaRows").text() * 1;
        gVar_first.motionAreaCols = XmlParser2("motionAreaCols", arguments[1]); // $(xml).find("motionAreaCols").text() * 1;
        gVar_first.H264FrmRef = XmlParser2("H264FrmRef", arguments[1]); // $(xml).find("H264FrmRef").text() * 1;
        gVar_first.HasSubStream = XmlParser2("HasSubStream", arguments[1]); // $(xml).find("HasSubStream").text() * 1;
        gVar_first.ambarellaFlag = XmlParser2("ambarellaFlag", arguments[1]); // $(xml).find("ambarellaFlag").text() * 1;

        gVar.selCh = 0;
        gVar.selChDev = cur_Dev;
        gVar.selChQx = Qqx;

        if (gVar.sPage == 1 && !gVar.bLogin) {
            LoadLivePage();
        }
    }
    break;
case 504:
    {
        Struct.hdrstate = arguments[1];
        RfHdr();
    }
    break;
case 505:
    {
        Struct.wdrstate = arguments[1];
        RfWdr();
    }
    break;
case 121:
    {
        Struct.naastate = arguments[1];
        RfNAA();
    }
    break;
case 506:
    {
        Struct.ptstate = arguments[1];
        if ((gVar_first.ambarellaFlag >> 2 & 0x01) == 1 && Struct.ptstate == 1) {
            $("#leftptz").show();
        }
        else {
            $("#leftptz").hide();
        }
    }
    break;
case 151:       //fosbaby-CONTROL_MSG_MUSIC_STATE_CHG
    {
        var playState = -1;
        if (typeof arguments[1] != 'undefined') playState = arguments[1];
        if (playState == 0) {       //stop
            $("#music_stop").css("display", "none");
            $("#music_play").css("display", "");
        }
        else if (playState == 1){          //play
            $("#music_stop").css("display", "");
            $("#music_play").css("display", "none");
        }
    }
    break;
case 152:       //fosbaby-CONTROL_MSG_MUSIC_FORMAT_ERR
    {
		var musicErr = arguments[1]*1;
		if(musicErr == 1) ShowPaop(lg.get("IDS_TIPS"),arguments[2]+":"+lg.get("IDS_FB_MUSIC_FORMAT_NO"));
        else ShowPaop(lg.get("IDS_TIPS"), arguments[2]+":"+lg.get("IDS_FB_MUSIC_FORMAT_ERR"));
    }
    break;
case 153:       //fosbaby-CONTROL_MSG_MUSIC_PLAY_MODE_CHG
    {
        if (typeof arguments[1] != 'undefined') Struct.babyPlayMode = arguments[1];
        if (Struct.babyPlayMode == 1) {        //顺序播放
            $("#music_singlerepeat").css("display", "");
            $("#music_allrepeat").css("display", "none");
            $("#music_playlist").css("display", "none");
        }
        else if (Struct.babyPlayMode == 2) {   //单曲循环
            $("#music_singlerepeat").css("display", "none");
            $("#music_allrepeat").css("display", "");
            $("#music_playlist").css("display", "none");
        }
        else if (Struct.babyPlayMode == 3) {       //列表循环
            $("#music_singlerepeat").css("display", "none");
            $("#music_allrepeat").css("display", "none");
            $("#music_playlist").css("display", "");
        }
    }
    break;
case 154:       //fosbaby-CONTROL_MSG_MUSIC_DORMANT_TIME_CHG
    {
        var DormanteTime = 0;
        if (typeof arguments[1] != 'undefined') DormanteTime = arguments[1];
        if (DormanteTime == 10) {      //休眠10分钟
            $("#music_20").css("display", "");
            $("#music_10").css("display", "none");
            $("#music_30").css("display", "none");
            $("#music_100").css("display", "none");
        }
        else if (DormanteTime == 20) {
            $("#music_30").css("display", "");
            $("#music_20").css("display", "none");
            $("#music_10").css("display", "none");
            $("#music_100").css("display", "none");
        }
        else if (DormanteTime == 30) {
            $("#music_100").css("display", "");
            $("#music_30").css("display", "none");
            $("#music_10").css("display", "none");
            $("#music_20").css("display", "none");
        }
        else {    //不休眠
            $("#music_10").css("display", "");
            $("#music_100").css("display", "none");
            $("#music_20").css("display", "none");
            $("#music_30").css("display", "none");
        }
    }
    break;
case 155:       //fosbaby-CONTROL_MSG_MUSIC_PATH_CHG
    {
    }
    break;
case 156:       //fosbaby-CONTROL_MSG_MUSIC_LISTS_CHG
    {
        Struct.babyListCnt = arguments[2];
        Struct.babyCurMusicListName = arguments[3];
        for (var index = 0; index < 3; index++) {
            Struct.babayMusicList[index].listName = arguments[4 + index];
        }
        RfBabyMusicList();
    }
    break;
case 157:       //fosbaby-CONTROL_MSG_AUDIO_VOLUME_CHG
    {
        var isMute = -1;
        var volume = -1;
        if (typeof arguments[1] != 'undefined') isMute = arguments[1];
        if (typeof arguments[2] != 'undefined') volume = arguments[2];
         Struct.babySoundVolume = volume;
      //   console.log("volume=%d",volume);
      //   if (isMute == 1) {      //静音
      //       $(".volumeOn").css("display", "none");
      //       $(".volumeOff").css("display", "");
      //       $("#live_sound").css("display", "none");
      //   }
      //   else if (isMute == 0) {
      //       //$(".volumeOn").css("display", "");
      //       $(".volumeOff").css("display", "none");

      //       if (gVar.nUserRight == 0) {
      //           $(".volumeOn").css("display", "none");
      //       }
      //       else {
       //         $(".volumeOn").css("display", "");
       //			 $("#live_sound").css("display", "");
       //   }
      //       if (volume >= 0) {
      //           $("#live_wd_video").attr("innerHTML", volume | 0);
      //           document.getElementById("clorbtn_6").style.marginLeft = volume + "px";
      //           document.getElementById("clordir_6").style.width = volume + "px";
      //       }
      //   }
            if (volume >= 0) {
                $("#live_wd_video").attr("innerHTML", volume | 0);
                document.getElementById("clorbtn_6").style.marginLeft = volume + "px";
                document.getElementById("clordir_6").style.width = volume + "px";
        }
    }
    break;
    case 158:
	{
	    var tmperatueF = parseInt(parseFloat(arguments[1]) * 9 / 5 + 32);
	    temperature = "T: " + String(arguments[1]) + "℃" + "(" + String(tmperatueF) + "°F)";
        if (Struct.tempType == "0") {
            $("#liveTemperature").text("");
        }
        else{
            $("#liveTemperature").text(temperature);
        }
	}
	break;
    case 159:
	{
	    if (!isSoftAPMode) {
	        var ftperr = arguments[1];
	        var channel = arguments[2];
	        if (ftperr == 1) {
	            ShowPaop(lg.get("IDS_TIPS"), "\</br\>\<center\>\<font style='color:red; font-weight:700;font-size:12px;'\>" + lg.get("IDS_CH") + " " + (channel + 1) + " " + lg.get("IDS_FTP_CONNECTERR") + "\</font\>\</center\>\</br\>" + lg.get("IDS_FTP_CONNECTERR1") + "\</br\>\</br\>" + lg.get("IDS_FTP_CONNECTERR2"));
	        }
	        else {
				// 新需求 更改FTP上传失败的提示				
	           // ShowPaop(lg.get("IDS_TIPS"), "\</br\>\<center\>\<font style='color:red; font-weight:700;font-size:12px;'\>" + lg.get("IDS_CH") + " " + (channel + 1) + " " + lg.get("IDS_FTP_GOTOERR") + "\</font\>\</center\>\</br\>" + lg.get("IDS_FTP_GOTOERR1") + "\</br\>\</br\>" + lg.get("IDS_FTP_CONNECTERR2"));
			    ShowPaop(lg.get("IDS_TIPS"), "\</br\>\<font style='color:red; font-weight:700;font-size:12px;'\>" + lg.get("IDS_CH") + " " + (channel + 1) + " " + lg.get("IDS_FTP_UPLOADERR"));
	        }
	    }
	}
	break;
    case 160: 
    {
        var errNo = arguments[1] * 1;
        if (errNo == 1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CLOUD_SPACE_ALARM_EMPTY"));
        } else if (errNo == 2) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CLOUD_SPACE_ALARM_200"));
        } else if (errNo == 3) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CLOUD_SPACE_ALARM_500"));
        }
    }
    break;
    case 163:
    {
        humidity = arguments[1] * 1;
        if (Struct.humidityType == "0") {
            $("#liveHumidity").text("");
        }
        else {
            $("#liveHumidity").text("H: " + humidity + "%");
        }
    }
    break;
    case 164:
    {
        Struct.tempType = arguments[1];
        if (Struct.tempType == "0") {
            $("#alarm_temperature").css("display", "none");
            ShowPaop2(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITY_TYPE1"));
        }
        else if (Struct.tempType == "1") {
            $("#alarm_temperature").css("display", "");
            ShowPaop2(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITYS_TYPE1"));
        }

    }
    break;
    case 165:
    {
        Struct.humidityType = arguments[1];
        if (Struct.humidityType == "0") {
            $("#alarm_humidity").css("display", "none");
            if (gVar_first.model == "1112") {
                ShowPaop3(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITY_TYPE2"));
            }
            else {
                ShowPaop2(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITY_TYPE2"));
            }
        }
        else if (Struct.humidityType == "1") {
            $("#alarm_humidity").css("display", "");
            if (gVar_first.model == "1112") {
                ShowPaop3(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITYS_TYPE2"));
            }
            else {
                ShowPaop2(lg.get("IDS_TIPS"), lg.get("IDS_HUMIDITYS_TYPE2"));
            }
        }
    }
    break;
    case 602:
    {
        var fileUpdateErrNo = arguments[1] * 1;
        if (fileUpdateErrNo == 1) {
            //数据格式问题
            if (lanPage == "sys_dr") {
                ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_FILEFIL") + ": " + lg.get("IDS_SYS_CONFIG_MODEL_NO_MATCH"));
            }
        } else if (fileUpdateErrNo == 2) {
            //未登录 无权限
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYSDR_NOLOGIN"));
        } else if (fileUpdateErrNo == 3) {
            //正在升级
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYSDR_STATION"));
        } else if (fileUpdateErrNo == 4) {
            //写文件失败
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYSDR_FAIL"));
        }
        clearTimeout(djsTimer);
        $("#sysDrResult").html("");
        $("#sysUpdataResult").html("");
        $("#sysUpdataResult_patch").html("");
        MasklayerHide();
    }
    break;
    case 604:
    {
        var firmUpdateResult = arguments[1] * 1;  //-1 - fail; 0 - success
        getDevIPandPort();
        var rebootTime = 70;
        if(gVar_first.model > 5000 && gVar_first.model < 6000){
        	rebootTime = 85;
        	if(IsInArray(needMoreTimeIPC,gVar_first.model)){
	        	rebootTime = 120;
	        }
        }
        if (firmUpdateResult == "0") { 
            if (lanPage == "sys_updata") {
                $("#Supresult").val(lg.get("IDS_SYS_UPSEC"));
                clearTimeout(djsTimer);
                Do_js_Time("sysUpdataResult", rebootTime, lg.get("IDS_SYS_UPSEC") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
            } else if (lanPage == "sys_patch") {
                $("#Supresult_patch").val(lg.get("IDS_SYS_UPSEC"));
                clearTimeout(djsTimer);
            	Do_js_Time("sysUpdataResult_patch", rebootTime, lg.get("IDS_SYS_UPSEC") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
            }
            $("#MaskError").fadeOut("fast");
        } else {
            if (lanPage == "sys_updata") {
                $("#Supresult").val(lg.get("IDS_SYS_UPFAIL"));
                clearTimeout(djsTimer);
            	Do_js_Time("sysUpdataResult", rebootTime, lg.get("IDS_SYS_UPFAIL") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
            } else if (lanPage == "sys_patch") {
                $("#Supresult_patch").val(lg.get("IDS_SYS_UPFAIL"));
                clearTimeout(djsTimer);
                Do_js_Time("sysUpdataResult_patch", rebootTime, lg.get("IDS_SYS_UPFAIL") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
            }
            $("#MaskError").fadeOut("fast");
        }
    }
    break;
    case 605:
    {
        var configUpdateResult = arguments[1] * 1;  //-1 - fail; 0 - success
		getDevIPandPort();
        if (configUpdateResult == 0) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_FILESEC"))
            clearTimeout(djsTimer);
            $("#MaskError").fadeOut("fast");
        	Do_js_Time("sysDrResult", 60, lg.get("IDS_SYS_FILESEC") + "," + lg.get("IDS_COM_RESTART"), "0", "55px");
        } else {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_FILEFIL"))
            clearTimeout(djsTimer);
            $("#MaskError").fadeOut("fast");
        	Do_js_Time("sysDrResult", 60, lg.get("IDS_SYS_FILEFIL"), "0", "55px");
            
        }
    }
    break;
    case 162:
    {
        var SDCardState = arguments[1] * 1;
        var chnnNo = arguments[2] * 1 + 1;
        if (SDCardState == 1) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SD_STORAGE_ALARM_128") + lg.get("IDS_CHANNEL_NO") + lg.get("IDS_BS_MUL" + chnnNo));
        } else if (SDCardState == 2) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SD_STORAGE_ALARM_256") + lg.get("IDS_CHANNEL_NO") + lg.get("IDS_BS_MUL" + chnnNo));
        } else if (SDCardState == 3) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SD_STORAGE_ALARM_384") + lg.get("IDS_CHANNEL_NO") + lg.get("IDS_BS_MUL" + chnnNo));
        } else if (SDCardState == 5) {
            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SD_STORAGE_ALARM_500") + lg.get("IDS_CHANNEL_NO") + lg.get("IDS_BS_MUL" + chnnNo));
        }
    }
    break;
    case 20002: 
    {
      fixCircelPos(arguments[1], arguments[2]); 
    }
    break;
    default:
    break;
	}
}
function getNAACall(xml)
{	
    if(xml != null && $(xml).find("result").text() == "0"){
        $("#liveNAA").css("display", "");
        $("#liveVideo_NAA").val($(xml).find("enable").text()*1);
    }else{
    	$("#liveNAA").css("display", "none");
    }
}
function Flv_load_video () {
    var url = "http://127.0.0.1:"+ livePort + "/live/playlist1.json";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
    	var xhrResponse = xhr.response;
        //console.log("xhrResponse : " + xhrResponse);
        var mediaDataSource = JSON.parse(xhr.response);
        var element = document.getElementsByName('videoElement')[0];
        if (typeof playerVideo !== "undefined") {
            if (playerVideo != null) {
                playerVideo.unload();
                playerVideo.detachMediaElement();
                playerVideo.destroy();
                playerVideo = null;
            }
        }
        playerVideo = flvjs.createPlayer(mediaDataSource, {
            enableWorker: false,
            enableStashBuffer: false,
            isLive:true,
            seekType: 'range',
            stashInitialSize: 128
        });
        playerVideo.attachMediaElement(element);
        playerVideo.load();
        //setTimeout(function() {
            playerVideo.play();
        //}, 1000);
    }
    xhr.onreadystatechange = function () {
        console.log("state == " + xhr.readyState);
    }
    xhr.send();
}
function Flv_load_audio () {
    var url = "http://127.0.0.1:"+ livePort + "/live/playlist2.json";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function (e) {
    	var xhrResponse = xhr.response;
        //console.log("xhrResponse : " + xhrResponse);
        var mediaDataSource = JSON.parse(xhr.response);
        var element = document.getElementsByName('audioElement')[0];
        if (typeof playerAudio !== "undefined") {
            if (playerAudio != null) {
                playerAudio.unload();
                playerAudio.detachMediaElement();
                playerAudio.destroy();
                playerAudio = null;
            }
        }
        playerAudio = flvjs.createPlayer(mediaDataSource, {
            enableWorker: false,
            enableStashBuffer: false,
            isLive:true,
            seekType: 'range',
            stashInitialSize: 128
        });
        playerAudio.attachMediaElement(element);
        playerAudio.load();
        //setTimeout(function() {
            playerAudio.play();
        //}, 1000);
		playerVideo.audioPlayer = playerAudio;
    }
    xhr.onreadystatechange = function () {
        console.log("state == " + xhr.readyState);
    }
    xhr.send();
}
function flv_destroy() {
    playerVideo.pause();
    playerVideo.unload();
    playerVideo.detachMediaElement();
    playerVideo.destroy();
    playerVideo = null;
    playerAudio.pause();
    playerAudio.unload();
    playerAudio.detachMediaElement();
    playerAudio.destroy();
    playerAudio = null;
}
var interval = 1000*60*60*4;
setInterval(function (){

},interval)
