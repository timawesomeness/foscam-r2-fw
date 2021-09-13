//hashmap -- 
//刷新整个哈希表数据时请先调用refresh()
//跟新数据时请调用up()
//删除对象请调用clear()
//zdy-2011/7/9
function HashmapCom(){
	Init(this);	//构造函数
	function Init(p){
		p.map  = new Hashmap();
	}
	
	function Hashmap(){ 
		this.length = 0;
		this.set = function(key, value){
			this[key] = value;
			this[this.length] = key;
			this.length++;
		}
		
		this.up = function(key, value){
			(typeof this[key] != 'undefined')?(this[key] = value):alert("hashmap: key "+key+" undefined");
		}
		
		this.get = function(key){
			return((typeof this[key] == 'undefined')?null:this[key]);
		}
	}
	
	this.refresh = function(){
		this.map.length = 0;
	}
	
	this.clear = function(){
		delete this.map;
	}
	
	this.length = function(){
		return (this.map.length);
	}
	
	this.set = function(key, value){
		this.map.set(key, value);
	}
	
	this.get = function(key){
		return(this.map.get(key));
	}
	
	this.up = function(key, value){
		this.map.up(key, value);
	}
}

function GD(id){return document.getElementById(id);}

function LgClass(){
	//多国语言
	this.mul = new Array;
	//默认语言
	this.defaultLg = "CHS";
	
	//版本
	this.version =  "";
	this.logo = "";
	this.mul = [["CHS", "简体中文"],["ENU", "English"]];
}
//UI类
function UIReg(){
	//Button按钮  
	//objStr:被注册按钮对象字符串
	//top:被注册按钮对象事件响应向上偏移量,如果只偏X ， top 为 null
	//left：被注册按钮对象事件响应向左偏移量,如果只偏Y， left 为 null
	//callback: 响应事件的回调，回调中return false，会取消该Button的注册效果
	//a
	//c
	this.Button = function(objStr, left, top, callback, a, c){
		var MouseDown = false;
		if (typeof left == 'undefined' || left==null||left==""||left==0) left=false;
		if (typeof top == 'undefined'||top==null||top==""||top==0) top = false;
		if (typeof c == 'undefined' || c == null) c=0;
		if (typeof a == 'undefined' || a == null) a=0;
		if (!($.isFunction(callback))){
			callback = function(a, b){
				return (true);
			}
		}
		$p = $(objStr);
		$p.attr("name", "");
		function nFF(x,y,o){
			if(top)$(o).css("background-position-y", y+"px");
			if(left)$(o).css("background-position-x",x+"px");
		}
		function FF(x,y,o){
			$o=$(o);
			if(!top)y=$o.css("background-position").split("px")[1]*1;
			if(!left)x=$o.css("background-position").split("px")[0]*1;
			if(isNaN(y)){y=0;}
			if(isNaN(x)){x=0;}
			$o.css("background-position",x+"px "+y+"px");
		}
		function jr(x,y,o){}
		if($.browser.mozilla){jr=FF}else{jr=nFF}
		$p.mouseover(function(e){
			$(this).css("cursor", "pointer");
			if (callback(e, this)){
				jr(-left*(a+1),top*(c+1),this);
				/*if(top)
					$(this).css("background-position-y", top*(c+1)+"px");
				if (left)
					$(this).css("background-position-x", "-"+left*(a+1)+"px");*/
			}
		}).mouseout(function(e){
			if (callback(e, this)){
				jr(left*a,top*c,this);
				/*if(top)
					$(this).css("background-position-y", top*c+"px");
				if (left)
				 	$(this).css("background-position-x", left*a+"px");*/
			}
		}).mousedown(function(e){
			if (callback(e, this)){
				jr(-left*(a+2),top*(c+2),this);/*
				if(top)
					$(this).css("background-position-y", top*(c+2)+"px");
				if (left)$(this).css("background-position-x", "-"+left*(a+2)+"px");*/
			}
		}).mouseup(function(e){
			if (callback(e, this)){
				jr(-left*(a+1),top*(c+1),this);/*
				if(top)
					$(this).css("background-position-y", top*(c+1)+"px");
				if (left) $(this).css("background-position-x", "-"+left*(a+1)+"px");*/
			}
		})
	}
	
	this.UIGroupBt = function(objstrs, os, n, left, fun){
		var $obj = $(os);
		function nFF(x,o){
			$(o).css("background-position-x",+x+"px");
		}
		function FF(x,o){
			$o=$(o);
			var y=$o.css("background-position").split("px")[1]*1;
			$o.css("background-position",x+"px "+y+"px");
		}
		function jr(x,o){}
		if($.browser.mozilla){jr=FF}else{jr=nFF}
		
		for(var i=1; i<=n; i++) $(os+i).slideUp(1);
		$(objstrs).attr("isDown", 1).mouseover(function(){
			if($(this).attr("isDown")*1){
				jr(-left,this);
				//$(this).css("background-position-x", "-"+left+"px");
			}
		}).mouseout(function(){
			if($(this).attr("isDown")*1 == 0){
				jr(-left*2,this);
				//$(this).css("background-position-x", "-"+left*2+"px");
			}else //$(this).css("background-position-x", "0px");
			jr(0,this);
		}).mousedown(function(){
			var s = $(this).attr("id");
			s = s.substring(s.length-1, s.length);
			if($obj.attr("id") == $(os+s).attr("id"))return;
			
			$obj.slideUp(10);
			$(objstrs).each(function(){
				jr(0,$(this));
				$(this).attr("isDown", 1);
			})
			//$(objstrs).attr("isDown", 1);
			//$(objstrs).css("background-position-x", "0px").attr("isDown", 1);
			//$(this).css("background-position-x", "-"+left+"px").attr("isDown", 0);
			jr(-left,$(this));
			$(this).attr("isDown", 0);
			$obj = $(os+s);
			$obj.slideDown("fast");
		})
	}
	
	this.Clor = function(sliderCov, sliderBtn, slider,m,fm,fu,fd,fcm){
		if(fm=='undefined'||fm==null){fm=function(){}}
		if(fd=='undefined'||fd==null){fd=function(){}}
		if(fu=='undefined'||fu==null){fu=function(){}}
		if(fcm=='undefined'||fcm==null){fcm=function(){return true;}}
		var $cov = $("#"+sliderCov);
		var $btn = $("#"+sliderBtn);
		var $sdr = $("#"+slider);
		var sizemax=$cov.css("width").split("px")[0]*1;
		var down = false;
		var percent = 0;
		var speed = 0;
		
		$cov.attr("speed", 0);
		var left = $cov.offset().left;//元素相当于窗口的左边的偏移量
		
		$("#"+sliderBtn+",#"+sliderCov).mouseover(function(){
			
			left = $cov.offset().left - $(document).scrollLeft();
			
			//$(this).css("cursor","pointer");
		});
		
		$("#"+sliderCov).bind("sChange", function(){
			var a = sizemax;
			var oldoffset=$btn.css("margin-left").split("px")[0]*1;
			speed=oldoffset/a*100;
			sizemax=$cov.css("width").split("px")[0]*1;
			if(sizemax == a) return;
			document.getElementById("gsliderCov").a = sizemax;
			var offset = speed*sizemax / 100;;
			$btn.css("margin-left", offset+"px");
			$sdr.css("width", offset+"px");
		})
		
		$("#"+sliderCov).mousedown(function(e){
		    if (!gVar.bPbStop) 
		    {
		        down = true;
			    $btn.css("margin-left", e.clientX - left);
			    var offset = $btn.css("margin-left").split("px")[0];
			    $sdr.css("width", offset+"px");
			    speed = offset / sizemax * 100;
			    $cov.attr("speed", speed);
			    fd($cov,speed);
		        
		    }
		}).mouseup(function(){
			fu($cov,speed);
		});
		
		$("#"+sliderBtn).mousedown(function(e){
			down = true;
			var offset = $btn.css("margin-left").split("px")[0];
			$sdr.css("width", offset+"px");
			speed = offset / sizemax * 100;
			$cov.attr("speed", speed);
			fd($cov,$cov.attr("speed"));
		}).mouseup(function(e){
			down = false;
			fu($cov,$cov.attr("speed"));
		});
		
		$(document).mousemove(function(e){
			if (down && fcm())
			{
				//sliderBtn value
				if($("#"+sliderBtn).attr("disslider") == 'unslider'){
					return;
				}
				if (e.clientX - left > 0 && e.clientX-left < sizemax)
				{
					$btn.css("margin-left", e.clientX - left);
				}
				else if (e.clientX - left <= 0)
				{
					$btn.css("margin-left", 0);
				}
				else
				{
					$btn.css("margin-left", sizemax );
				}
				var offset = $btn.css("margin-left").split("px")[0];
				$sdr.css("width", offset+"px");
				speed = offset / sizemax * 100;
				$cov.attr("speed", speed);
				fm($cov,speed);
				//如果值为0或100，都让按钮调用mouseup事件
				if (e.clientX - left < -20 || e.clientX-left > sizemax+20)
					$btn.mouseup();
			}
		}).mouseup(function(e){
			if (down)
			{
				down = false;
				fu($cov,$cov.attr("speed"));
			}
		});
		return sizemax;
	}

	this.Clors = function (sliderCov, sliderBtn, slider, m, fm, fu, fd, fcm) {
	    if (fm == 'undefined' || fm == null) { fm = function () { } }
	    if (fd == 'undefined' || fd == null) { fd = function () { } }
	    if (fu == 'undefined' || fu == null) { fu = function () { } }
	    if (fcm == 'undefined' || fcm == null) { fcm = function () { return true; } }
	    var $cov = $("#" + sliderCov);
	    var $btn = $("#" + sliderBtn);
	    var $sdr = $("#" + slider);
	    var sizemax = $cov.css("width").split("px")[0] * 1;
	    var down = false;
	    var percent = 0;
	    var speed = 10;
	    var offset = 0;

	    $cov.attr("speed", 10);
	    var left = $cov.offset().left; //元素相当于窗口的左边的偏移量

	    $("#" + sliderBtn + ",#" + sliderCov).mouseover(function () {

	        left = $cov.offset().left - $(document).scrollLeft();

	        //$(this).css("cursor","pointer");
	    });


	    $("#" + sliderBtn).mousedown(function (e) {
	        down = true;
	        var offset = $btn.css("margin-left").split("px")[0];
	        $sdr.css("width", offset + "px");
	        speed = offset / 2.5 + 10;
	        $cov.attr("speed", speed);
	        fd($cov, $cov.attr("speed"));
	    }).mouseup(function (e) {
	        down = false;
	        fu($cov, $cov.attr("speed"));
	    });

	    $(document).mousemove(function (e) {
	        if (down && fcm()) {
	            if (e.clientX - left > 0 && e.clientX - left < sizemax) {
	                //alert(e.clientX - left);
	                $btn.css("margin-left", e.clientX - left);
	            }
	            else if (e.clientX - left <= 0) {
	                $btn.css("margin-left", 0);
	            }
	            else {
	                $btn.css("margin-left", sizemax);
	            }
	            offset = $btn.css("margin-left").split("px")[0];
	            $sdr.css("width", offset + "px");


	            speed = (offset / 2.5) + 10;

	            $cov.attr("speed", speed);
	            fm($cov, speed);

	            //如果值为10或50，都让按钮调用mouseup事件
	            if (e.clientX - left < -40 || e.clientX - left > sizemax + 20)
	                $btn.mouseup();
	        }
	    }).mouseup(function (e) {
	        if (down) {
	            down = false;
	            fu($cov, $cov.attr("speed"));
	        }
	    });
	    return sizemax;
	}

	this.Slider = function(sliderCov, sliderBtn, slider){
		var sizemax=$("#"+sliderCov).css("width");
		if(sizemax>1000){
			sizemax=sizemax-290;
		}else{
			sizemax=710;
		}
		$("#"+sliderCov).css("width", sizemax);
		sizemax-=10;
		//var sizemax = $("#"+sliderCov).css("width").split("px")[0] - 10;
		var down = false;
		var percent = 0;
		$("#"+sliderCov).attr("speed", 0);
		var left = $("#"+sliderCov).offset().left;//元素相当于窗口的左边的偏移量
		$("#"+sliderBtn+",#"+sliderCov).mouseover(function(){
			left = $("#"+sliderCov).offset().left - $(document).scrollLeft();
			$(this).css("cursor","pointer");
		}).mouseout(function(){
			$(this).css("cursor","default");
		});
		
		$("#"+sliderCov).mousedown(function(e){
			down = true;
			var sizemax=document.documentElement.clientWidth;
			if(sizemax>1000){sizemax=sizemax-290;}else{sizemax=710;}
			$("#"+sliderCov).css("width", sizemax);
			sizemax-=10;
			$("#"+sliderBtn).css("margin-left", e.clientX - left);
			var offset = $("#"+sliderBtn).css("margin-left").split("px")[0];
			$("#"+slider).css("width", offset+"px");
			$("#"+sliderCov).attr("speed", (offset / sizemax * 100));
			
			gVar.pbMouseDown = true;
			
			gDvr.PbSeek($(this).attr("speed"));
		}).mouseup(function(){
			gVar.pbMouseDown = false;
		});
		
		$("#"+sliderBtn).mousedown(function(e){
			down = true;
			
			gVar.pbMouseDown = true;
			
			gDvr.PbSeek($("#"+sliderCov).attr("speed"));
		}).mouseup(function(e){
			down = false;
			gVar.pbMouseDown = false;
			//gDvr.PbSeek($("#"+sliderCov).attr("speed"));
		});
		
		$(document).mousemove(function(e){
			if (down)
			{

				var sizemax=document.documentElement.clientWidth;
				if(sizemax>1000){sizemax=sizemax-290;}else{sizemax=710;}
				$("#"+sliderCov).css("width", sizemax);
				sizemax-=10;
				if (e.clientX - left > 0 && e.clientX-left < sizemax)
				{
				    $("#" + sliderBtn).css("margin-left", e.clientX - left);
				    var offset = $("#" + sliderBtn).css("margin-left").split("px")[0];
				    $("#" + slider).css("width", offset + "px");
				    $("#" + sliderCov).attr("speed", offset / sizemax * 100);
				}
				else if (e.clientX - left <= 0)
				{
				    $("#" + sliderBtn).css("margin-left", 0);
				    var offset = $("#" + sliderBtn).css("margin-left").split("px")[0] + 10;
				    $("#" + slider).css("width", offset + "px");
				    $("#" + sliderCov).attr("speed", offset / sizemax * 100);
				}
				else
				{
				    $("#" + sliderBtn).css("margin-left", sizemax);
				    var offset = $("#" + sliderBtn).css("margin-left").split("px")[0];
				    $("#" + slider).css("width", offset + "px");
				    $("#" + sliderCov).attr("speed", offset / sizemax * 100);
				}

				//如果值为0或100，都让按钮调用mouseup事件
				if (e.clientX - left < -20 || e.clientX-left > sizemax+20)
					$("#"+sliderBtn).mouseup();
			}
		}).mouseup(function(e){
			if (down)
			{
				down = false;
			}
		});
		
		$(function(){
			$("#"+slider).css("width", "0%");
			$("#"+sliderBtn).css("margin-left", 0);
			$("#"+sliderCov).attr("speed", 0);
		})
		return sizemax;
	}
	
	this.Table = function(id,exp,o,n,f){
		if (typeof exp == "undefined") exp = " tr";
		if (!($.isFunction(f))){
			f = function(o,n){
				return (false);
			}
		}
		$("#"+id+exp).live("mouseover", function(){
			if($(this).attr("class") != id){
				$(this).css({"background-color":"#0A5", "cursor":"pointer"});
			}
		}).live("mouseout", function(){
			if($(this).attr("class") != id){
				$(this).css("background-color", "transparent");
			}
		}).live("click", function(){
			if (f(o,n, $(this))){
				$("."+id).removeClass(id).css({"background-color":"transparent", "height":o+"px"});
				$(this).addClass(id).css({"background-color":"#0f0", "height":n+"px"});
			}else{
				$("."+id).removeClass(id).css("background-color", "transparent");
				$(this).addClass(id).css("background-color","#0f0");
			}					
		});
	}
	
	this.FyHead = function(id,exp1,exp2,tPage, page, isNan){
		if (tPage < 0) return;
		$("#"+id+exp1).text(lg.get("IDS_CLASS_TOTOL") + (tPage + 1) + lg.get("IDS_CLASS_PAGE"));
		var strP = '<div style="height:20px;"><a><<</a>';
		var strT = '<a>>></a>&nbsp;&nbsp;<input id="'+id+'pageSel" style="width:20px;" maxlength="8" onkeyup="rpPos(this,/[^0-9]/g,\'\')"/>&nbsp;<b>Go</b></div>';
		var aColor = '<a class="fontColor">';
		if (!isNan){
			if (tPage > 2){
				if (page!=0&&page!=tPage){strP += ('<a>'+page+'</a>&nbsp;'+aColor+(page+1)+'</a>&nbsp;<a>'+(page+2)+'</a>');}
				else if(page==0){strP += (aColor+'1</a>&nbsp;<a>2</a>&nbsp;<a>3</a>');}
				else if(page==tPage){strP += ('<a>'+(page-1)+'</a>&nbsp;<a>'+page+'</a>&nbsp;'+aColor+(page+1)+'</a>');}
			}else if(tPage == 2){
				if(page==0){aColor=(aColor+'1</a>&nbsp;<a>2</a>&nbsp<a>');}
				else if(page==1){aColor=('<a>1</a>&nbsp;'+aColor+'2</a>&nbsp<a>');}
				else if(page==2){aColor=('<a>1</a>&nbsp;<a>2</a>&nbsp'+aColor);}
				strP = ('<div style="height:20px;">'+aColor+'3</a>');
				strT = "</div>";
			}else if(tPage == 1){
				if(page==0){aColor=(aColor+'1</a>&nbsp;<a>');}
				else if(page==1){aColor=('<a>1</a>&nbsp;'+aColor);}
				strP = '<div style="height:20px;">'+aColor+'2</a>';
				strT = "</div>";
			}else if(tPage == 0){
				strP = '<div style="height:20px;">';
				strT = "</div>";
			}
		}else{
			if (page == tPage){strP += '<a>'+(page-1)+'</a>&nbsp;<a>'+page+'</a>&nbsp;'+aColor+(page+1)+'</a>';}
			else{
				if (page+1==tPage){strP += aColor+(page+1)+'</a>&nbsp;<a>'+(page+2)+'</a>';}
				else{strP += aColor+(page+1)+'</a>&nbsp;<a>'+(page+2)+'</a>&nbsp;<a>'+(page+3)+'</a>'}
			}
		}
		$("#"+id+exp2).html(strP+strT);
	}
	
	this.FyHeadEvent = function(id, f1, f2, f3){
		$("#"+id+" a").live("mouseover", function(){
			$(this).css("cursor", "pointer")
		}).live("click", function(){
			var page = $(this).text();
			var isNan = false;
			if (isNaN(page)){
				isNan = true;
				var p = $("#"+id+" a:nth-child(2)").text()*1;
				if(page=="<<"){
					if (p-3>0){
						page=p-4;
					}else{
						page=0;
					}
				}
				else if(page==">>"){
					if(p+3>=f3()){
						page=f3();
					}else{
						page=p+2;
					}
				}
			}else{
				isNan = false;
				page = page*1 - 1;
			}
			f1(page, isNan);
		});
		 
		$("#"+id+" b").live("mouseover", function(){
			$(this).css("cursor", "pointer")
		}).live("click", function(){
			var isNan = false;
			var page = $("#"+id+"pageSel").val()*1-1;
			if (page>=0 && page<=f3()){
				$(this).addClass("fontColor");
				f2(page, isNan);
			}
            else{
                ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_LEFT_WRONG_PAGE"));
            }
		});
	}
	
	this.Shel = function(idDiv, idBox, idBoxT){
		var nBox = -1;
		$(idDiv).mousemove(function(e){
			if (nBox >= 0){
				var obj = $(idDiv+nBox);
				if(obj.attr("isDown") == "1"){
					var x = obj.attr("x")*1;
					var y = obj.attr("y")*1;
					var offx = e.clientX - x;
					var offy = e.clientY - y;
					var boxW = $(idDiv).css("width").split("px")[0]*1;
					var boxH = $(idDiv).css("height").split("px")[0]*1;
					
					if (offy < 0) offy = 0;
					else if (offy +obj.css("height").split("px")[0]*1 >= boxH) offy = boxH - obj.css("height").split("px")[0]*1;
					if (offx < 0) offx = 0;
					else if (offx +obj.css("width").split("px")[0]*1 >= boxW) offx = boxW - obj.css("width").split("px")[0]*1;

					obj.css("top", offy);
					obj.css("left", offx);
				}else if($(idDiv+nBox+"T").attr("isDown") == "1"){
					var x = obj.attr("x")*1;
					var y = obj.attr("y")*1;
					var _w = e.clientX - x;
					var _h = e.clientY - y;
					
					var boxW = $(idDiv).css("width").split("px")[0]*1;
					var boxH = $(idDiv).css("height").split("px")[0]*1;
					if(_w+obj.css("left").split("px")[0]*1>=boxW)
						_w = boxW-obj.css("left").split("px")[0]*1;
					if(_h+obj.css("top").split("px")[0]*1>=boxH)
						_h = boxH-obj.css("top").split("px")[0]*1;
					obj.css("width", _w);
					obj.css("height", _h);
					$("#box"+nBox+"T").css("margin", (_h-10)+"px "+(_w-10)+"px")
				}
			}
		})
		$(idBox).mousedown(function(e){
			$(idBox).css("border", "1px solid #FFF").css("z-index", 0);
			$(this).css("border", "2px solid #FF8").css("z-index", 10);;
			nBox = $(this).attr("id").split("box")[1]*1;
			if($(idDiv+nBox+"T").attr("isDown") == "1"){
				$(this).attr("x", e.clientX - $(this).css("width").split("px")[0]*1);
				$(this).attr("y", e.clientY - $(this).css("height").split("px")[0]*1);
				return;
			}
			$(this).attr("isDown", "1");
			$(this).attr("x", e.clientX - $(this).css("left").split("px")[0]*1);
			$(this).attr("y", e.clientY - $(this).css("top").split("px")[0]*1);
			
		}).mouseup(function(){
			
		})
		
		$(idBoxT).mousedown(function(e){
			$(this).attr("isDown", "1");
		})
		
		$(document).mouseup(function(e){
			nBox = -1;
			$(idBox).attr("isDown", "0");
			$(idBoxT).attr("isDown", "0");
		})
	}
	
	this.motion = function(idDiv, idBox){
		var ptStartX, ptStartY, ptEndX, ptEndY;
		var originX,originY;
		$(idDiv).mousedown(function(e){
			if ($(this).attr("isDown")*1 == 1) return;
			$(this).attr("isDown", 1);
			$(idBox).css("display", "");
			
			$(idBox).css("width", 0);
			$(idBox).css("height", 0);
			$(idBox).attr("x", e.clientX);
			$(idBox).attr("y", e.clientY);
			var w = $(idDiv+"_0_0").css("width").split("px")[0]*1;
			var h = $(idDiv+"_0_0").css("height").split("px")[0]*1;
			var y = $(e.srcElement).attr("id").split("_")[1]*1;
			var x = $(e.srcElement).attr("id").split("_")[2]*1;
			originX=ptStartX = x*w + e.layerX;
			originY=ptStartY = y*h + e.layerY;
			
			$(idBox).css("left", ptStartX);
			$(idBox).css("top", ptStartY);
			
			ptEndX = ptStartX+5;
			ptEndY = ptStartY+5;
		}).mousemove(function(e){
			if ($(this).attr("isDown")*1 == 1){
				var x = $(idBox).attr("x")*1;
				var y = $(idBox).attr("y")*1;
				var _w = e.clientX - x + 5;// + w+5;
				var _h = e.clientY - y + 5;// + h+5;
				
				
			
				
				
				var boxW = $(idDiv).css("width").split("px")[0]*1;
				var boxH = $(idDiv).css("height").split("px")[0]*1;
				if(_w+$(idBox).css("left").split("px")[0]*1>=boxW)
				{
					_w = boxW-$(idBox).css("left").split("px")[0]*1;
					
				}
				if(_h+$(idBox).css("top").split("px")[0]*1>=boxH)
					{_h = boxH-$(idBox).css("top").split("px")[0]*1;
					}
				if(_w<0)
				{
					ptStartX=originX+_w;
					ptEndX=originX;
					_w=-_w;
				
				}
				else
				{
					ptEndX = ptStartX + _w;
					ptStartX=originX;
				}
				if(_h<0)
				{
					ptStartY=originY+_h;
					ptEndY=originY;
					_h=-_h;
				}
				else
				{
					ptStartY=originY;
				     ptEndY = ptStartY + _h;
				}
				
				//ptStartX=ptStartX<0?10:ptStartX;
				//ptStartY=ptStartY<0?10:ptStartY;
				$(idBox).css("left",ptStartX);
				$(idBox).css("top",ptStartY);
				$(idBox).css("width", _w);
				$(idBox).css("height", _h);
				
				
			}
		}).mouseup(function(e){
			$(this).attr("isDown", 0);
			$(idBox).css("display", "none");
			var w = $(idDiv+"_0_0").css("width").split("px")[0]*1;
			var h = $(idDiv+"_0_0").css("height").split("px")[0]*1;
			var si = ptStartX / w | 0;
			var sj = ptStartY / h | 0;				
			var ei = ptEndX / w | 0;
			if (ptEndX % w > 0) ei += 1;
			var ej = ptEndY / h | 0;
			if (ptEndY % w > 0) ej += 1;
			if((gVar_first.reserve2 & 0x01) == 0||$("#AmOutMove").attr("checked")*1==0)
			{
			for(var i=sj;i<ej;i++){
				for(var j=si;j<ei;j++){
					if ($(idDiv+'_'+i+"_"+j).attr("check")*1 == 1){
						$(idDiv+'_'+i+"_"+j).attr("check", "0")
						$(idDiv+'_'+i+"_"+j).css("background", "transparent")
					}else{
						$(idDiv+'_'+i+"_"+j).attr("check", "1")
						$(idDiv+'_'+i+"_"+j).css("background", "#f00")
					}
					
				}
			}
			}
			else
			{
			for(var i=0;i<10;i++)
			 for(var j=0;j<10;j++)
			 {
				$(idDiv+'_'+i+"_"+j).attr("check", "1");
				$(idDiv+'_'+i+"_"+j).css("background", "#f00");
			 }	
				
				
			for(var i=sj;i<ej;i++){
				for(var j=si;j<ei;j++){
					
						$(idDiv+'_'+i+"_"+j).attr("check", "0")
						$(idDiv+'_'+i+"_"+j).css("background", "transparent")
					
					
				}
			}
				
			}
		})
		
		$(document).mouseup(function(e){
			$(idDiv).attr("isDown", 0);
			$(idBox).css("display", "none");
		})
	}
	this.motionAmb=function(panel){

	    var x1=0;
	    var y1=0;
	    var x2=0;
	    var y2=0;
	    var temp;
	    var isdown=false;
	    var ismove=false;
        var divs=$("<div class='rectShowdown'></div>");
        var panel=$(panel);
	    var  maxwidth=panel.css("width").split("px")[0]*1;
        var maxheight=panel.css("height").split("px")[0]*1;
	    var left=panel.offset().left;
	    var top=panel.offset().top;
		
		
		
	    panel.mousedown(function(e){
		  left=panel.offset().left;
	     top=panel.offset().top;
		if($(".rect").length>=3)
		{
			return;
		}
		x1=e.pageX-left;
		y1=e.pageY-top;
		isdown=true;
		 maxwidth=panel.css("width").split("px")[0]*1;
         maxheight=panel.css("height").split("px")[0]*1;

	}).mouseup(function(e){
         
        isdown=false;
		if($(".rect").length>=3||!ismove)
		{
			return;
		}
	

	x2=e.pageX-left;
	y2=e.pageY-top;
    if(x2<x1)
    {
    	 temp=x1;
    	x1=x2;
    	x2=temp;

    }
    if(y2<y1)
    {
    	temp=y2;
    	y2=y1;
    	y1=temp;
    }
   x1=x1<0?0:x1;
    y1=y1<0?0:y1;
    width=x2-x1;
    height=y2-y1;
    var option={};
    option.left=x1;
    option.top=y1;
    option.width=width;
    option.height=height;
    option.panel=panel;
    if(width<3||height<3)
    	return;
    //var div=$("<div class='rect'></div>");
	 option.height=(option.top+option.height)>maxheight?maxheight-option.top:option.height;
    option.width=(option.left+option.width)>maxwidth?maxwidth-option.left:option.width;
 
    drawMotionArea(option);



	})

$(document).mousemove(function(e){


if(isdown)
{
	ismove=true;
	var option={};
    x2=e.pageX-left;
	y2=e.pageY-top;
	option.left=x1;
    option.top=y1;
    if(x2<x1)
    {
    	width=x1-x2;
    	option.left=x2;

    }
    else
    {
    	width=x2-x1;
    }
    if(y2<y1)
    {height=y1-y2;
    	option.top=y2;
    	
    }
    else
    {
    	height=y2-y1;
    }

    
   
    
    option.width=width;
    option.height=height;
    option.style="rectShowdown"; 
    option.panel=panel;
    //context.fillRect(x1,y1,width,height);
    drawMotionArea(option,divs);

}
   


}).mouseup(function(event) {
	/* Act on the event */
	ismove=false;
	isdown=false;
	$(".rectShowdown").remove();
});



$(".rect").live("click",function(){
if($(this).hasClass("selectArea"))
{

    $(this).removeClass("selectArea");
}
else
{
	$(this).addClass("selectArea");
}
})

$("#delete").click(function(){
	$(".select").remove();
})

}
	
}

function StreamParamInfo(){
	this.resolution=0;
	this.bitRate=0;
	this.frameRate=0;
	this.GOP=0;
	this.isVBR=0;
	this.lbrRatio = 0;
}

function MultiDevInfo(){
	this.ip="";
	this.port=0;
	this.mediaport=0;
	this.user="";
	this.pwd="";
	this.devname = "";
	this.type = 1;
}

function BabyMusicListName(){
    this.listName = "";
}

function PluginStruct(){	
	this.result = -100;
	this.recordState = 0;
	this.isMute=0;
	this.volume=0;
	this.ledState=0;
	this.presetPointCnt=0;
	this.presetPointList = new Array(16);
	this.curPresetPoint=0;
	this.cruiseMapCnt=0;
	this.cruiseMapList = new Array(8);
	this.curCruiseMap=0;		
	this.mainStreamType=0;
	this.subStreamType = 0;
	this.musicPlayMode = 0;
	this.musicPlayIndex = 0;
	this.gurardName = 0;

	//humidity
	this.tempType = 1;
	this.humidityType = 1;

    //main stream
	this.StreamParamInfo = new Array(4);
	this.StreamParamInfo[0] = new StreamParamInfo();
	this.StreamParamInfo[1] = new StreamParamInfo();
	this.StreamParamInfo[2] = new StreamParamInfo();
	this.StreamParamInfo[3] = new StreamParamInfo();

    //sub stream
	this.SubStreamParamInfo = new Array(4);
	this.SubStreamParamInfo[0] = new StreamParamInfo();
	this.SubStreamParamInfo[1] = new StreamParamInfo();
	this.SubStreamParamInfo[2] = new StreamParamInfo();
	this.SubStreamParamInfo[3] = new StreamParamInfo();
	
	this.brightness=0;
	this.contrast=0;
	this.hue=0;
	this.saturation=0;
	this.sharpness=0;
	this.isMirror=0;
	this.isFlip=0;
	this.isAlarming=0;
	this.alarmType=0;
	this.pwrFreq=0;
	this.infraLedMode=0;
	this.infraLedState=0;
	this.hdrstate = 0; 
	this.wdrstate = 0;
	//电子PT
	this.ptstate = 0;

	this.devInfo = new Array(9);
	this.devInfo[0] = new MultiDevInfo();
	this.devInfo[1] = new MultiDevInfo();
	this.devInfo[2] = new MultiDevInfo();
	this.devInfo[3] = new MultiDevInfo();
	this.devInfo[4] = new MultiDevInfo();
	this.devInfo[5] = new MultiDevInfo();
	this.devInfo[6] = new MultiDevInfo();
	this.devInfo[7] = new MultiDevInfo();
	this.devInfo[8] = new MultiDevInfo();

    //fosbaby
    this.babayMusicList = new Array(3);
    this.babayMusicList[0] = new BabyMusicListName();
    this.babayMusicList[1] = new BabyMusicListName();
    this.babayMusicList[2] = new BabyMusicListName();
    this.babyPlayState = 0;
    this.babyPlayMode = 0;
    this.babyPlayPath = 0;
    this.babySoundOpen = 0;
    this.babySoundVolume = 0;
    this.babyDomantTime = 0;
    this.babyTemperature = 0;
    this.babyListResult = 0;
    this.babyListCnt = 0;
    this.babyCurMusicListName = "";
    this.babyHumidity = 0;
}

function GlobarVar(){
	this.nDate = 0;
	this.nStreamType = 0;
	this.nSelStreamType = 0;
	this.nUserRight = 0;
	this.bWebInit = false;
	
	this.ip = "";
	this.port = 80;
	this.mediaport = 0;
	this.webPort = 0;
	this.httpsPort = 0;
	this.user = "admin";
	this.passwd = "";

	this.selCh = 0;
	this.selChQx = Qqx;
	this.selChDev = cur_Dev;

	this.model = 0;
	this.modelName = "";
	this.N_language = 0;
	this.sensorType = 0;
	this.wifiType = 0;
	this.sdFlag = 0;
	this.outdoorFlag = 0;
	this.ptFlag = 0;
	this.zoomFlag = 0;
	this.rs485Flag = 0;
	this.ioAlarmFlag = 0;
	this.onvifFlag = 0;
	this.p2pFlag = 0;
	this.wpsFlag = 0;
	this.audioFlag = 0;
	this.talkFlag = 0;
	this.reserve1 = 0;
	this.reserve2 = 0;
	this.reserve3 = 0;
	this.reserve4 = 0;
	this.reserveFlag1 = 0;
	this.reserveFlag2 = 0;
	this.reserveFlag3 = 0;
	this.reserveFlag4 = 0;
	this.appVer = 0;
	    
	this.hasPrivacyZone =0;
	this.motionAreaRows =0;
	this.motionAreaCols =0;
	this.H264FrmRef =0;
	this.HasSubStream = 0;

	this.ambarellaFlag = 0;
	
	this.lg = 0;
	this.multi = 1;
		
	this.pluginLoginCall = -100;
	this.webLoginCall = -100;
	
	this.bLogin = false;
	this.bPbStop = true;
    this.dbOpenNew = false;
	this.sPage = 1;
	this.bJson = false;
	this.httpver = "http";
    this.totalRecord = 0;
    this.recordStartTime = 0;
    this.recordEndTime = 0;
    this.curLogin = false;
    this.playRecord = true;
    this.lastType = "";
    this.pbType = "";
    this.pbRecord = true;

    this.recordPath = new Array(10);

    this.XmlParsing = function (obj, xml, parent) {
        var $p;
        obj.refresh();
        if ($.browser.msie && $.browser.version * 1 >= 9) {
            $(xml).find("string").each(function () {
                $p = $(this);
                obj.set($p.attr("id"), $p.text());
            });
        } else {
            if ((typeof xml == 'string') && xml.constructor == String) {
                xml = ("<xml>" + xml + "</xml>");
            }
            $(xml).find(parent).children().each(function () {
                $p = $(this);
                obj.set($p.attr("id"), $p.text());
            });
        }
    }
	
	this.ajaxFileUpload = function(o,fileId, cmd){
		if($("#"+fileId).val()=="") return;
		MasklayerShow();
		if(cmd == "fwUpgrade")
            Do_js_Time(o, 210, lg.get("IDS_CLASS_UPDATA"), "0", "55px");
		else{
		        Do_js_Time(o,50,lg.get("IDS_CLASS_ZR"),"0", "55px");
		    }
		setTimeout(function(){
		$.ajaxFileUpload({
		  url:"\cgi-bin\\CGIProxy.fcgi?cmd="+cmd+"&usr="+urlEncode(gVar.user)+"&pwd="+urlEncode(gVar.passwd),
		  secureuri:false,
		  fileElementId:fileId,
		  dataType: 'text',
		  success: function (data, status)
		  {
			  data = data.split("&lt;").join("<").split("&gt;").join(">")
			  var xml;
			  if ( (typeof data=='string')&&data.constructor==String){
			    if ($.browser.msie){
				  xml = new ActiveXObject("Microsoft.XMLDOM");
				  xml.async = false;
				  xml.loadXML(data);
				}else
				  xml = ('<xml>'+data+'</xml>');
			  }
			  var result = $(xml).find("importResult").text();
			  var upresult = $(xml).find("upgradeResult").text();
              if(result == "1"){
                 ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_SYS_FILEFIL") + ": " + lg.get("IDS_SYS_CONFIG_MODEL_NO_MATCH"));
                 clearTimeout(djsTimer);
                 $("#"+o).html("");
                 MasklayerHide();
                 return;
              }
                    getDevIPandPort();
			  if(result != ""){
				  if(result == "0") {
					 ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_SYS_FILESEC"))
					 clearTimeout(djsTimer);
					 $("#MaskError").fadeOut("fast");
					 Do_js_Time(o,70,lg.get("IDS_SYS_FILESEC")+","+lg.get("IDS_COM_RESTART"),"0", "55px");
				  }
				  else {
					 ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_SYS_FILEFIL"))
					 clearTimeout(djsTimer);
					 $("#MaskError").fadeOut("fast");
					 Do_js_Time(o,70,lg.get("IDS_SYS_FILEFIL"),"0", "55px");
				  }
			  }
			  else if(upresult != ""){
				  if(upresult == "0"){
				  	 $("#Supresult").val(lg.get("IDS_SYS_UPSEC"));
				  	 $("#Supresult_patch").val(lg.get("IDS_SYS_UPSEC"));
					 clearTimeout(djsTimer);
					 $("#MaskError").fadeOut("fast");
					 Do_js_Time(o,70,lg.get("IDS_SYS_UPSEC")+","+lg.get("IDS_COM_RESTART"),"0", "55px");
					 }
				  else{
					 $("#Supresult").val(lg.get("IDS_SYS_UPFAIL"));
					 $("#Supresult_patch").val(lg.get("IDS_SYS_UPFAIL"));
					 clearTimeout(djsTimer);
					 $("#MaskError").fadeOut("fast");
					 Do_js_Time(o,70,lg.get("IDS_SYS_UPFAIL")+","+lg.get("IDS_COM_RESTART"),"0", "55px");
				 }
			  }
			 /* if(result == "0" && upresult == "0"){
				 PluginCallBack(50);
			  }*/
		  },
                error: function (data, status, e) {
			  ShowPaop(lg.get("IDS_TIPS"),lg.get("IDS_WEBF_FALSE"));
			  clearTimeout(djsTimer);
			  $("#MaskError").fadeOut("fast");
			  MasklayerHide();
		  }
            });
        }, 10000);
	}
	if ($.browser.version == "10.0"){
		this.KCgi=function(url){
			var httpv=gVar.httpver;
			if (httpv == "http") {
		    var str=httpv+"://"+this.ip+":"+this.port+"/cgi-bin/CGIProxy.fcgi?"+urlEncode("usr="+this.user+"&pwd="+this.passwd+"&"+url+"&"+(new Date()).getTime());
			}else{
			var str=httpv+"://"+this.ip+":"+mult_https_port[IFs]+"/cgi-bin/CGIProxy.fcgi?"+urlEncode("usr="+this.user+"&pwd="+this.passwd+"&"+url+"&"+(new Date()).getTime());		
			}
			$.ajax({type: "GET",url:str,timeout:5000,async:true,datatype:"text",success:function(data, state){},error:function(data, state){}});
		}
		this.MJKCgi=function(cmd){
		    $.ajax({
		        type:"GET",
		        url:"http://"+gVar.ip+":"+gVar.port+"/decoder_control.cgi?user="+gVar.user+"&pwd="+gVar.passwd+"&command="+cmd,
		        timeout:5000,
		        async:true,
		        datatype:"text",
		        success:function(data,state){},
		        error:function(data,state){}});
		}
	}else{
		this.KCgi=function(url){
		    var httpv=gVar.httpver;
		    if (httpv == "http") {
		        document.getElementById("cgiframe").src=httpv+"://"+this.ip+":"+this.port+"/cgi-bin/CGIProxy.fcgi?"+urlEncode("usr="+this.user+"&pwd="+this.passwd+"&"+url+"&"+(new Date()).getTime());
		    }else{
		        document.getElementById("cgiframe").src=httpv+"://"+this.ip+":"+mult_https_port[IFs]+"/cgi-bin/CGIProxy.fcgi?"+urlEncode("usr="+this.user+"&pwd="+this.passwd+"&"+url+"&"+(new Date()).getTime());
		    }
	    }
	    this.MJKCgi=function(cmd){
		    document.getElementById("cgiframe").src="http://"+gVar.ip+":"+gVar.port+"/decoder_control.cgi?user="+gVar.user+"&pwd="+gVar.passwd+"&command="+cmd;
		}
	}

	this._Cgi = function (option) {
	    var httpv = IFs == 0 ? gVar.httpver : "http";
	    var opts = $.extend({ type: "GET", url: "", timeout: 10000, async: true, cache: false, suc: function (data, state) { }, err: function (data, state) { }, dataType: ($.browser.msie) ? "text" : "xml", tUrl: true }, option);
	    var hide = true;
	    if (opts.tUrl) opts.url = httpv + "://" + this.ip + ":" + this.port + "/cgi-bin/CGIProxy.fcgi?" + urlEncode(("usr=" + this.user + "&pwd=" + this.passwd + "&" + opts.url + "&" + (new Date()).getTime()));
	    else opts.url = "/cgi-bin/CGIProxy.fcgi?" + urlEncode(("usr=" + this.user + "&pwd=" + this.passwd + "&" + opts.url + "&" + (new Date()).getTime()));
	    if (gJson) {
	        opts.dataType = "jsonp";
	    } else {
	        opts.dataType = "text";
	    }
	    $.ajax({
	        type: opts.type,
	        url: opts.url,
	        timeout: opts.timeout,
	        async: opts.async,
	        dataType: opts.dataType,
	        jsonp: "callbackJson",
	        success: function (data, state) {
	            var xml, d = data;
	            if (gJson) { d = data.key; state = "success" }
	            if ((typeof d == 'string') && d.constructor == String) {
	                if ($.browser.msie) {
	                    xml = new ActiveXObject("Microsoft.XMLDOM");
	                    xml.async = false;
	                    xml.loadXML(d);
	                } else
	                    xml = ('<xml>' + d + '</xml>');
	            }

	            if ($.isFunction(opts.suc)) {
	                hide = opts.suc(xml, state, data);
	            } else {
	                alert("Globar Ajax Error");
	            }
	        },
	        error: function (data, state) {
	            opts.err(data, state);
	            hide = "err";
	        }
	    });

	    return hide;
	}
	
	this.Cgi = function(option){
		MasklayerShow();
		var hide = this._Cgi(option);
		if(hide == "err"){
			MasklayerHide();
		}else if(hide != false)
			MasklayerHide();
	}
	
	var $plugin = $("#plugin");
	this.pluginW=0;
	this.pluginH=0;
	this.SetPluginPos = function(l,t,w,h,show){
		$plugin.css({"left":l,"top":t,"width":w,"height":h});
		this.pluginW=w||this.pluginW;
		this.pluginH=h||this.pluginH;
		var embed = document.getElementsByTagName("embed")[0];
		if(show){
			show = "block";
		}else{
			show = "none";
		}
		if(IsEdge()){
			embed.style.display = show;
		}
	}
	var $ftLive = $("#ftLive");
	var $bottom = $("#bottom");
	this.ChangPage = function (page) {
	    if (1 == page) {
	        if (gVar.sPage == page)
	            return false;
	        if (gVar.sPage == 2 && !gVar.bPbStop) {
	            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CUR_PLAY"))
	            return false;
	        }
	        gJson = this.bJson;
	        /*gDvr.RfLive();*/
	        gDvr.ChangeWndSize(-1);
	        $("#MotionRegion").css("display", "none");
	        $("#avSheDel").css("display", "none")
	        $("#avSheback").css("display", "none")
			$("#mboxamb").css("display","none");
			$(".rect").remove();
	        Rfmulti();
	        for (var i = 0; i < 9; i++) {
	            if (isOpenV[i]) gDvr.VideoPlay(i, gVar_first.ip, 3);
	            if (isOpenT[i]) gDvr.TalkCMD(i, 0);
	            if (isOpenA[i]) gDvr.OpenAudio(i);
			}
			/*if(IsFirefox() || IsChromeSupportNacl() ){
            	if(H5Live){
                    setTimeout( function() {
                        Flv_load_video();
                        Flv_load_audio();
                    }, 2000);
            	}
            }
            if(IsEdge()){
            	if(H5Live_Edge){
                    setTimeout( function() {
                        Flv_load_video();
                        Flv_load_audio();
                    }, 2000);
            	}
            }*/
			
	        gDvr.ChangeWndSize(0);
	        if (gVar_first.talkFlag == 0 && gVar_first.audioFlag == 0 ||gVar.talkFlag == 0 && gVar.audioFlag == 0) {
	            $(".liveBtnBt3").css("display", "none");
	            $(".liveBtnBt4").css("display", "none");
	            $(".liveBtnBt9").css("display", "none");
	            $(".liveBtnBt109").css("display", "none");
	        }
	        else {
	            $(".liveBtnBt4").css("display", "none");
	            $(".liveBtnBt3").css("display", "");
	            setTimeout(SetDefaultAudioDisplay,50);
				gDvr.OpenAudio(IFs);
	        }
	        gVar.SetPluginPos(0, 0, "98%", "100%",1);
	        $ftLive.css("height", 36);
	        $bottom.css("display", "");
	        if (gVar.sPage == 2) {
	            menutitle(1, 2, 3);
	        }
	        else {
	            menutitle(1, 3, 2);
	        }
	        gVar.sPage = page;
	        $("#configPage").css("display", "none");
	        $("#left").stop().animate({ marginLeft: "-24px" }, 300);
	        $("#liveleft").css("display", "");
	        $("#configleft").css("display", "none");
	        $("#playbackleft").css("display", "none");
			try{$(".mSel").css("display", "");}catch(e){}
	    } else if (2 == page) {
	        if (gVar.sPage == page)
	            return false;
	        if (!gVar.bPbStop) {
	            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CUR_PLAY"))
	            return false;
	        }
	        if (gVar.sPage == 1) this.bJson = gJson;
	        gDvr.ChangeWndSize(-1);
	        $("#MotionRegion").css("display", "none");
	        $("#avSheDel").css("display", "none")
	        $("#avSheback").css("display", "none");
	        $("#AmAlarmImg").css("display", "none");
			$("#mboxamb").css("display","none");
			$(".rect").remove();

	        //if(gVar.nOpenPrivew)gDvr.VideoPlay(gVar.ip,4);
	        //if(gVar.nOpenTalk) gDvr.TalkCMD(1);
	        //if(gVar.nOpenAudio) gDvr.CloseAudio();

	        for (var i = 0; i < 9; i++) {
	            if (isOpenV[i]) gDvr.VideoPlay(i, gVar_first.ip, 4);
	            if (isOpenT[i]) gDvr.TalkCMD(i, 1);
	            if (isOpenA[i]) gDvr.CloseAudio(i);
	            isOpenA[i] = false;
	            isOpenT[i] = false;
	            cutdownalarmrecord[i] = false;
	        }

	        gDvr.ChangeWndSize(1);

	        gVar.SetPluginPos(0, 0, "98%", "100%",1);
	        $ftLive.css("height", 0);
	        $bottom.css("display", "");
	        for (var i = 1; i < 9; i++) {
	            GD("ipcamdiv" + i).style.width = "0"
	            GD("ipcamdiv" + i).style.height = "0"
	        }
	        GD("ipcamdiv0").style.width = "100%"
	        GD("ipcamdiv0").style.height = "100%"

	        if (gVar.sPage == 1) menutitle(2, 1, 3);
	        else menutitle(2, 3, 1);
	        gVar.sPage = page;
	        $("#configPage").css("display", "none");
	        try { $("#gsliderCov").trigger("sChange"); } catch (e) { }
	        $("#left").stop().animate({ marginLeft: "-515px" }, 300)

	        $("#liveleft").css("display", "none");
	        $("#configleft").css("display", "none");
	        $("#playbackleft").css({ "display": "", "margin-left": "500px" });
	        if ((gVar_first.reserve2 >> 3 & 0x01) == 0) {
	            $("#liveHumidity").text("");
	        }
	        if ((gVar_first.reserve2 >> 2 & 0x01) == 0) {
	            $("#liveTemperature").text("");
	        }
			try{$(".mSel").css("display", "none");}catch(e){}
			$(".liveBtnBt9B").css("display","none");
			$(".liveBtnBt109B").css("display","");
			gDvr.OpenAudio(IFs);
	    } else if (3 == page) {
			$("#mboxamb").css("display","none");
			$(".rect").remove();
	        if ((gVar_first.reserve2 >> 3 & 0x01) == 0) {
	            $("#liveHumidity").text("");
	        }
	        if ((gVar_first.reserve2 >> 2 & 0x01) == 0) {
	            $("#liveTemperature").text("");
	        }
	        if (gVar.sPage == page)
	            return false;
	        if (gVar.sPage == 2 && !gVar.bPbStop) {
	            ShowPaop(lg.get("IDS_TIPS"), lg.get("IDS_CUR_PLAY"))
	            return false;
	        }
			
	        if (gVar.sPage == 1) this.bJson = gJson;
	        gVar.sPage = page;
	        gDvr.ChangeWndSize(4);
	        if ($("#configPage").attr("cssDown") != "cssDown") {
	            jQuery("head").append('<link href="html/cfg/css.css?' + this.nDate + '" rel=\"stylesheet\" type=\"text/css\" />');
	            $("#configPage").attr("cssDown", "cssDown");

	            if (isFirstUse == 1) {
	                $("#cfgpanel_12").addClass("configpanel").css("display", "");
	                $("#set_guid").click();
	            } else {
	                $("#cfgpanel_1").addClass("configpanel").css("display", "");
	                $("#dev_info").click();
	            }
	        } else {
	            $(".selectedb").click();
	        }

	        var name = $(".selectedb").attr("id");
	        if (!(name == "alarm_mv" || name == "alarm_sud" || name == "alarm_motion" || name == "alarm_sud" || name == "av_osd")) {
	          gVar.SetPluginPos(0, 0, 0, 0,0);
	        }

	        //if(gVar.nOpenPrivew)gDvr.VideoPlay(gVar.ip,4);
	        //if(gVar.nOpenTalk) gDvr.TalkCMD(1);
	        //if(gVar.nOpenAudio) gDvr.CloseAudio();
	        for (var i = 0; i < 9; i++) {
	            if (isOpenV[i]) gDvr.VideoPlay(i, gVar_first.ip, 4);
	            if (isOpenT[i]) gDvr.TalkCMD(i, 1);
	            if (isOpenA[i]) gDvr.CloseAudio(i);
	            isOpenA[i] = false;
	            isOpenT[i] = false;
	            cutdownalarmrecord[i] = false;
			}
			
	        if(IsFirefox() || IsChromeSupportNacl() ){
				if(H5Live){
					try{	
						flv_destroy();
					}catch(e){}
				}
	        }else if(IsEdge()){
	        	if(H5Live_Edge){
	        		try{	
						flv_destroy();
					}catch(e){}
	        	}
	        }else{
		        for (var i = 1; i < 9; i++) {
		            GD("ipcamdiv" + i).style.width = "0"
		            GD("ipcamdiv" + i).style.height = "0"
		        }
		        GD("ipcamdiv0").style.width = "100%"
		        GD("ipcamdiv0").style.height = "100%"
	        }


	        $bottom.css("display", "none");
	        if (gVar.sPage == 1) menutitle(3, 1, 2);
	        else menutitle(3, 2, 1);

	        $("#configPage").css("display", "block");
	        $("#left").stop().animate({ marginLeft: "-270px" }, 300);

	        $("#AmAlarmImg").css("display", "none");
	        $("#liveleft").css("display", "none");
	        $("#playbackleft").css("display", "none");
	        $("#configleft").css({ "display": "", "margin-left": "250px" });
			try{$(".mSel").css("display", "none");}catch(e){}
	    }
	}
}
