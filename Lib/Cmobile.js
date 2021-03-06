/**
 * Created by ZheChen on 2015/3/20.
 * 自用。欢迎指正不足。
 * 不依赖任何第三方类库，兼容主流浏览器，不支持IE8及以下版本
 **/
(function(doc,win){
    function GetMobileObj(one)
    {
        //Init mobile core API,mobile核心库（实例化MobileObj对象并加载核心库）。ps:核心库和功能库完全独立
        function MobileObj()
        {
            this.css=function(cssobj){
                var cssstr="",obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    for(var name in cssobj)
                    {
                        cssstr+=(name+":"+cssobj[name]+";");
                    }
                    obj[i].style.cssText=obj[i].getAttribute("style")?obj[i].getAttribute("style")+cssstr:cssstr;
                }
                return obj;
            };
            this.css1=function(cssstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].style.cssText=obj[i].getAttribute("style")?obj[i].getAttribute("style")+cssstr:cssstr;
                }
                return obj;
            };
            this.addClass=function(classstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].className=obj[i].className.indexOf(classstr)>-1?obj[i].className:obj[i].className+" "+classstr;
                    obj[i].className=obj[i].className.trim();
                }
                return obj;
            };
            this.removeClass=function(classstr){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].className=obj[i].className?obj[i].className.indexOf(classstr)>-1?obj[i].className.replace(classstr,"").trim():obj[i].className:"";
                }
                return obj;
            };
            this.hasClass=function(classstr){
                var obj=this[0];
                if(obj.className.indexOf(classstr)>-1)
                    return true;
                else return false;
            };
            this.parents=function(selector){
                var e=this[0],parent,mobj=this;
                mobj.length=0;
                if(!selector)
                {
                    mobj.push(e.parentNode);
                    return mobj;
                }
                parent=doc.querySelector(selector);
                if(e==parent) return mobj;
                while(e!==parent)
                {
                    e= e.parentNode;
                    if(!e)
                        return mobj;
                }
                mobj.push(e);
                return mobj;
            };
            this.children=function(){
                var e=this[0],children=e.children,mobj=this;
                mobj.length=0;
                Array.prototype.push.apply(mobj,children);
                return mobj;
            };
            this.find=function(selector){
                var e=this[0],mobj=this;
                mobj.length=0;
                var children=e.querySelectorAll(selector);
                Array.prototype.push.apply(mobj,children);
                return mobj;
            };
            this.next=function(){
                var e=this[0],nextElem=e.nextSibling,mobj=this;
                mobj.length=0;
                while(nextElem&&nextElem.nodeType===3)
                {
                    nextElem=nextElem.nextSibling;
                    mobj.push(nextElem);
                }
                return mobj;
            };
            this.prev=function(){
                var e=this[0],prevElem=e.previousSibling,mobj=this;
                mobj.length=0;
                while(prevElem&&prevElem.nodeType===3)
                {
                    prevElem=prevElem.previousSibling;
                    mobj.push(prevElem);
                }
                return mobj;
            };
            this.html=function(htmlstr){
                var elem=this;
                if(htmlstr!==undefined)
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].innerHTML=htmlstr;
                    }
                }
                else return elem[0].innerHTML;
                return elem;
            };
            this.append=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    elem[0].appendChild(htmlstr);
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("beforeend",htmlstr);
                    }
                }
            };
            this.prepend=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node)
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].prependChild(htmlstr);
                    }
                }
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("afterbegin",htmlstr);
                    }
                }
            };
            this.after=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node) elem[0].parentNode.insertBefore(htmlstr,elem[0].nextSibling);
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("afterend",htmlstr);
                    }
                }
            };
            this.before=function(htmlstr){
                var elem=this;
                if(htmlstr instanceof Node) elem[0].parentNode.insertBefore(htmlstr,elem[0]);
                else
                {
                    for(var i=0;i<elem.length;i++)
                    {
                        elem[i].insertAdjacentHTML("beforebegin",htmlstr);
                    }
                }
            };
            this.contains=function(elem){
                var obj=this[0];
                if(obj.contains(elem)) return true;
                return false;
            };
            this.hide=function(){
                this.css1("display:none");
                return this;
            };
            this.show=function(){
                this.css1("display:block");
                return this;
            };
            this.attr=function(attribute,value){
                var obj=this;
                if(value)
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        obj[i].setAttribute(attribute,value);
                    }
                    return obj;
                }
                else
                {
                    return obj[0].getAttribute(attribute);
                }
            };
            this.val=function(value){
                var obj=this;
                if(value)
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        obj[i].value=value;
                    }
                    return obj;
                }
                else return obj[0].value;
            };
            this.remove=function(){
                var obj=this;
                for(var i=0;i<obj.length;i++)
                {
                    obj[i].parentNode.removeChild(obj[i]);
                }
                return obj;
            };
            this.on=function(event,target,fun){
                var obj=this;
                if(target.constructor==Function)
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        obj[i].removeEventListener(event,eventBind,false);
                        obj[i].addEventListener(event,eventBind,false);
                    }
                }
                else
                {
                    for(var i=0;i<obj.length;i++)
                    {
                        var o=obj[i];
                        o.removeEventListener(event,eventHandle,false);
                        o.addEventListener(event,eventHandle,false);
                    }
                }
                function eventBind(e)
                {
                    target(e);
                }
                function eventHandle(e)
                {
                    var t=e.target,all=o.querySelectorAll(target);
                    for(var i=0;i<all.length;i++)
                    {
                        if(t==all[i])
                        {
                            fun(e);
                        }
                    }
                }
            };
            this.off=function(event,target,fun){

            };
            this.serializeJSON=function(){
                var obj=this,all_name=obj[0].querySelectorAll("[name]"),form_json={};
                for(var i= 0;i<all_name.length;i++)
                {
                    form_json[all_name[i].name]=all_name[i].value;
                }
                return form_json;
            }
        }
        MobileObj.prototype=one?new Array(one):new Array();
        return new MobileObj();
    }

    function mobile(flg)
    {
        //Init mobile selector API,mobile选择器
        this.dom=function(selector){
            if(selector)
                return doc.querySelector(selector);
            else
                return undefined;
        };
        this.one=function(selector){
            var one,mobileobj;
            if (!selector) return undefined;
            if(selector instanceof Node)
                one=selector;
            else
                one=doc.querySelector(selector);
            mobileobj=new GetMobileObj(one);//返回mobileObj对象
            return mobileobj;
        };
        this.all=function(selector){
            var all,mobileobj;
            if (!selector) return undefined;
            if(selector instanceof Node)
            {
                mobileobj=new GetMobileObj(selector);
            }
            else
            {
                mobileobj=new GetMobileObj();
                all=doc.querySelectorAll(selector);
                Array.prototype.push.apply(mobileobj,all);
            }
            return  mobileobj;
        };
        if(!flg)
            mobileFunctions.call(this);
    }
    //Init mobile function API,mobile功能库
    function mobileFunctions()
    {
        this.preventPenetration=function(configobj){
            var obj=this;
            var elem=obj.dom(configobj.targetStr);
            elem.addEventListener("touchmove",function(e){
                var touch= e.changedTouches[0];
                var target=touch.target;
                if(obj.one(target).parents(configobj.targetStr).length>0)
                {
                    if(!configobj.specialStr||(obj.one(target).parents(configobj.specialStr).length==0&&target!=obj.dom(configobj.specialStr)))
                        e.preventDefault();
                }
                else if(target==elem)
                    e.preventDefault();
            });
        };
        this.autoChange=function(maxWidth,originSize){
            var width=document.documentElement.clientWidth;
            var Standard=originSize/(maxWidth*1.0/width);
            Standard=Standard>100?100:Standard;
            this.dom("html").style.fontSize=Standard+"px";
            window.font_size=Standard;
            return;
        };
        this.slide=function(slidetype,elem,number,urlarray,linkarray,obj,timestr,auto,autotime){//样式自己添加
            var div=doc.createElement("div"),index=doc.createElement("div"),imgstr="",oldX,mobile=this,indexOfSlide=0;
            elem.style.cssText="overflow:hidden;position:relative";
            div.style.display="-webkit-box";
            div.style.webkitTransition="-webkit-transform "+timestr;
            if(slidetype==1)
            {
                this.one(index).css1("width:"+obj.width+"px;text-align:right;position:absolute;bottom:0;color:white;padding-bottom:5px");
                index.innerHTML="<span style='padding-right: 15px;'><span class='index'></span>/"+number+"</span>";
            }
            else
            {
                this.one(index).css1("width:"+obj.width+"px;text-align:center;position:absolute;bottom:0;color:white;");
                for(var i=0;i<number;i++)
                {
                    index.innerHTML+="<span style='display: inline-block;width: 13px;height: 13px;background-color: #5c5c5c;border-radius: 50% 50%;margin-right: 6px;' class='index'></span>";
                }
            }
            for (var i = 0; i < number; i++) {
                var link=linkarray[i]?linkarray[i]:"";
                imgstr+="<img src='"+urlarray[i]+"' alt='' style='display: block;width:"+obj.width+"px;height:"+obj.height+"px;' link='"+link+"' />"
            }
            div.innerHTML=imgstr;
            elem.appendChild(div);
            elem.appendChild(index);
            if(slidetype==1)
            {
                index=doc.querySelector(".index");
                index.innerHTML=indexOfSlide+1;
            }
            else
            {
                index=doc.querySelectorAll(".index");
                index[indexOfSlide].style.backgroundColor="#fff";
            }
            elem.addEventListener("touchstart",function(e){
                e.preventDefault();
                var touch= e.changedTouches[0];
                oldX=touch.pageX;
                clearInterval(tt);
            });
            elem.addEventListener("touchend",function(e){
                e.preventDefault();
                var touch= e.changedTouches[0];
                if(oldX-touch.pageX>10)//right
                {
                    fnext();
                }
                else if(touch.pageX-oldX>10)
                {
                    fprev();
                }
                tt=auto&&setInterval(autoSlide,autotime);
            });
            function fprev(bool)
            {
                if(!bool)
                {
                    if (indexOfSlide !== 0)
                    {
                        indexOfSlide--;
                        if(slidetype==1)
                            index.innerHTML=indexOfSlide+1;
                        else
                        {
                            mobile.all('.index').css1("background-color:#5c5c5c;");
                            index[indexOfSlide].style.backgroundColor="#fff";
                        }
                        div.style.webkitTransform = "translate(-" + obj.width * indexOfSlide + "px,0px)";
                    }
                }
                else
                {
                    indexOfSlide=0;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    if(slidetype==1)
                        index.innerHTML="1";
                    else
                    {
                        mobile.all('.index').css1("background-color:#5c5c5c;");
                        index[indexOfSlide].style.backgroundColor="#fff";
                    }
                }
            }
            function fnext()
            {
                if(indexOfSlide!==number-1)
                {
                    indexOfSlide++;
                    div.style.webkitTransform="translate(-"+obj.width*indexOfSlide+"px,0px)";
                    if(slidetype==1)
                        index.innerHTML=indexOfSlide+1;
                    else
                    {
                        mobile.all('.index').css1("background-color:#5c5c5c;");
                        index[indexOfSlide].style.backgroundColor="#fff";
                    }
                }
            }
            function autoSlide(){
                if(indexOfSlide!==number-1)
                    fnext();
                else
                    fprev(true);
            }
            var tt=auto&&setInterval(autoSlide,autotime);
        };
        this.lazyLoad=function(imgarr){
            var mobile=this,height=document.documentElement.clientHeight;
            bottom=document.body.scrollTop+height;
            loadImg();
            mobile.dom("body").addEventListener("touchmove",movefun,false);
            function movefun(){
                bottom=document.body.scrollTop+height;
                loadImg();
            }
            function loadImg()
            {
                for(var i=0;i<imgarr.length;i++)
                {
                    if(imgarr[i].offsetTop<=bottom)
                    {
                        imgarr[i].src=imgarr[i].getAttribute("data-src");
                        imgarr[i].setAttribute("haveLoaded",'1');
                        imgarr.splice(i,1);
                        i--;
                    }
                }
                if(imgarr.length==0)
                {
                    mobile.dom("body").removeEventListener("touchmove",movefun,false);
                }
            }
        };
        this.countDown=function(enddate,showobj){//样式可自己修改
            var obj=this;
            function timeout(){
                var nowdate=new Date();
                var lasttime=enddate.valueOf()-nowdate.valueOf();
                var lastd=parseInt(lasttime/(1000*60*60*24));
                var lasth=parseInt(lasttime/(1000*60*60)-lastd*24);
                var lastm=parseInt(lasttime/(1000*60)-lastd*24*60-lasth*60);
                var lasts=parseInt(lasttime/(1000)-lastd*24*60*60-lasth*60*60-lastm*60);
                lastd=lastd.addZeroNumber();
                lasth=lasth.addZeroNumber();
                lastm=lastm.addZeroNumber();
                lasts=lasts.addZeroNumber();
                if(!showobj)
                {
                    obj.dom(".day").innerHTML=lastd;
                    obj.dom(".hour").innerHTML=lasth;
                    obj.dom(".minute").innerHTML=lastm;
                    obj.dom(".second").innerHTML=lasts;
                }
                else
                {
                    if(showobj.day)
                        obj.dom(".day").innerHTML=lastd;
                    if(showobj.hour)
                        obj.dom(".hour").innerHTML=lasth;
                    if(showobj.minute)
                        obj.dom(".minute").innerHTML=lastm;
                    if(showobj.second)
                        obj.dom(".second").innerHTML=lasts;
                }
            };
            setInterval(timeout,1000);
        };
        this.autoLoadMore=function(configobj){
            var mobile=this, height=document.documentElement.clientHeight,loadflg=true,
                bottom=document.body.scrollTop+height,
                loadElement=mobile.dom(configobj.loadElement),offsetBottom,
                pageElement=mobile.one(configobj.pageElement),url=configobj.url,
                cancelElement=mobile.one(configobj.cancelElement);
            mobile.dom("body").addEventListener("touchmove",ajaxLoad,false);
            function ajaxLoad()
            {
                if(cancelElement.val()==='1')
                {
                    mobile.dom("body").removeEventListener("touchmove",ajaxLoad,false);
                    return;
                }
                bottom=document.body.scrollTop+height;
                offsetBottom=loadElement.offsetTop+loadElement.offsetHeight;
                console.log(bottom+","+offsetBottom);
                if(bottom>=offsetBottom-20&&loadflg)
                {
                    configobj.data["page"]=pageElement.val();
                    loadflg=false;
                    mobile.one(loadElement).append("<p style='text-align: center;color: #666;' class='loading'>加载中...</p>");
                    mobile.ajax({
                        url:url,
                        type:"get",
                        dataType:configobj.dataType,
                        data:configobj.data,
                        success: function(data){
                            mobile.one(".loading").remove();
                            configobj.success(data);
                            loadflg=true;
                        },
                        error: function(){
                            configobj.error();
                        },
                        timeout:configobj.timeout
                    });
                }
            }
        };
        this.pop=function(configObj){
            var obj=this;
            var bodywidth=document.documentElement.clientWidth,elem=obj.dom(configObj.elementStr),closeelem;
            if(!document.querySelector(".pop_bg"))
            {
                var div=document.createElement('div');
                div.className="pop_bg";
                var stylestr=configObj.opacity?configObj.opacity/100 :.5;
                div.setAttribute("style","width: 100%;height: 100%;position: fixed;top:0;left: 0;z-index:60;margin:0;background-color: rgba(168,173,176,"+stylestr+");");
                obj.one("body").append(div);
            }
            elem.style.display=configObj.elementDisplay;
            var havepoplist=obj.all(".havePop");
            if(havepoplist.length>0)
                obj.one(elem).css1("position: fixed;z-index:"+(parseInt(havepoplist[havepoplist.length-1].style.zIndex)+1)+";left:"+(bodywidth-elem.offsetWidth)/2+"px;top:"+configObj.top+"px");
            else
                obj.one(elem).css1("position: fixed;z-index:65;left:"+(bodywidth-elem.offsetWidth)/2+"px;top:"+configObj.top+"px");
            obj.one(elem).addClass("havePop");
            if(configObj.closeElementStr&&obj.dom(configObj.closeElementStr))
            {
                closeelem=obj.dom(configObj.closeElementStr);
                closeelem.onclick=function(e){
                    if(configObj.closeModel==="one")
                    {
                        elem.style.display="none";
                        obj.one(elem).removeClass("havePop");
                    }
                    else
                    {
                        obj.all(".havePop").css1("display:none");
                        obj.all(".havePop").removeClass("havePop");
                    }
                    if(obj.all(".havePop").length==0) obj.one(".pop_bg").remove();
                }
            }
            //obj.preventPenetration({"targetStr":configObj.elementStr,"specialStr":''});
            obj.preventPenetration({"targetStr":'.pop_bg',"specialStr":''});
            return configObj;
        };
        this.removePop=function(configObj){
            var mobile=this;
            mobile.one(configObj.elementStr).css1("display:none").removeClass("havePop");
            mobile.all(".havePop").length==0&&(mobile.one(".pop_bg").remove());
        };
        this.alert=function(alertStr,type,fun) {
            var obj=this,mobile_alert_bg=doc.createElement("div"),pageWidth=doc.documentElement.clientWidth,
                pageHeight=doc.documentElement.clientHeight,
                innerhtmlstr,
                divCssText="width:55%;padding:10px;position: fixed;z-index:1000;top:40%;border-radius: 6px 6px;text-align: center;background-color: rgba(25,24,24,.9);color:#fff;font-size:14px;display:block;word-break:break-all;word-wrap:break-word;";
            if(obj.dom(".mobile_alert")) return;
            var div=doc.createElement("div");
            div.className="mobile_alert";
            if(type==1)
            {
                innerhtmlstr = "<p style='color:#fff;'>"+alertStr+"</p><div style='margin-top: 10px;'><span class='alert_sure' style='font-size: 15px;background-color: ;letter-spacing: 2px;padding: 5px 7px;'>确定</span></div>";
            }
            else if(type==2)
            {
                innerhtmlstr = "<p style='color:#fff;'>"+alertStr+"</p><div style='margin-top: 10px;'><span class='alert_cancel' style='font-size: 15px;background-color: ;letter-spacing: 2px;margin-right: 15px;padding: 5px 7px;'>取消</span><span class='alert_sure' style='font-size: 15px;background-color: ;letter-spacing: 2px;padding: 4px 6px;'>确定</span></div>";
            }
            div.style.cssText=divCssText;
            div.innerHTML=innerhtmlstr;
            obj.one("body").append(div);
            var width=obj.dom(".mobile_alert").offsetWidth;
            obj.dom(".mobile_alert").style.left=(pageWidth-width)/2+"px";
            obj.dom(".alert_sure").addEventListener("touchend",function(e){
                e.preventDefault();
                fun&&fun();
                obj.one(".mobile_alert").remove();
                obj.one(mobile_alert_bg).remove();
            });
            if(type==2){
                obj.dom(".alert_cancel").addEventListener("touchend",function(e){
                    e.preventDefault();
                    obj.one(".mobile_alert").remove();
                    obj.one(mobile_alert_bg).remove();
                });
            }
            mobile_alert_bg.style.cssText="position:fixed;top:0;left:0;z-index:999;background-color: rgba(25,24,24,0.1);height:"+pageHeight+"px;width:"+pageWidth+"px";
            mobile_alert_bg.className="mobile_alert_bg";
            obj.one("body").append(mobile_alert_bg);
            obj.preventPenetration({"targetStr":'.mobile_alert_bg',"specialStr":''});
        };
        this.calendar=function(selector,obj){//样式可自己修改
            var mobile=this,element=mobile.dom(selector),
                today=new Date(),
                year=today.getFullYear(),
                month=today.getMonth(),
                date=today.getDate(),
                day=today.getDay();
            var mobile_calendar=mobile.one(".mobile_calendar");
            var popconfigobj={
                "elementStr":'.mobile_calendar',//必传
                "top":100,//必传
                "elementDisplay":"block",//必传
                "opacity":20//非必传，默认50
            };
            if(mobile_calendar.length>0)
            {
                loadCalendarHead(year,month);
                loadMonth(year,month,date);
                mobile.pop(popconfigobj);
                mobile_calendar.addClass("animated bounceIn");
                return;
            }
            else loadBasicHtml();

            loadCalendarHead(year,month);
            loadMonth(year,month,date);
            loadCalendarEvent();

            mobile.dom(".mobile_calendar .prev_month").onclick=function(e){
                var target=e.target,
                    year=mobile.one(".mobile_calendar .mon").attr("year"),
                    month=mobile.one(".mobile_calendar .mon").attr("month");
                if(month==1)
                    month=(year--,12);
                else month--;
                loadCalendarHead(year,month-1);
                if(today.getMonth()+1==month) loadMonth(year,month-1,today.getDate());
                else loadMonth(year,month-1,null)
            };
            mobile.dom(".mobile_calendar .next_month").onclick=function(e){
                var target=e.target,
                    year=mobile.one(".mobile_calendar .mon").attr("year"),
                    month=mobile.one(".mobile_calendar .mon").attr("month");
                if(month==12)
                {
                    month=(year++,1);
                }
                else month++;
                loadCalendarHead(year,month-1);
                if(today.getMonth()+1==month) loadMonth(year,month-1,today.getDate());
                else loadMonth(year,month-1,null)
            };
            element.onclick=function(e){
                mobile.pop(popconfigobj);
                mobile.one(".mobile_calendar").addClass("animated bounceIn");
            };
            function loadMonth(year,month,date)
            {

                var month_dates_arr=[31,28,31,30,31,30,31,31,30,31,30,31],
                    firstdate=new Date(year,month,1),
                    li_str='',
                    d=firstdate.getDay(),
                    dd=firstdate.getDate(),
                    day_li=mobile.all(".calendar_day li"),
                    dates;
                if((year%4==0&&year%100!=0)||(year%400==0))
                    month_dates_arr[1]=29;
                dates=month_dates_arr[month];
                for(var i=0;i<7;i++)//确定该月起始点
                {
                    if(day_li[i].getAttribute("i")==d)
                    {
                        li_str+=("<li date='1' i="+d+" class='canclick'>1</li>");
                        break;
                    }
                    else li_str+=("<li date='' i='' class=''></li>");
                }
                for(var i=1;i<dates;i++)
                {
                    d=d==6?0:d+1;
                    li_str+=("<li date='"+(i+1)+"' i='"+d+"' class='canclick'>"+(i+1)+"</li>");
                }
                mobile.one(".dates_table").html("").append(li_str);
                if(date) mobile.all("li[date='"+date+"']").addClass("today");
            }
            function loadCalendarHead(year,month)
            {
                mobile.one(".mon").attr("year",year).attr("month",month+1);
                mobile.one(".calendar_year").html(year);
                mobile.one(".calendar_month").html(month+1);
            }
            function loadCalendarEvent()
            {
                var formatStr=obj.format;
                mobile.dom(".dates_table").addEventListener("click",function(e){
                    var target=e.target;
                    var year=mobile.one(".mobile_calendar .mon").attr("year"),
                        month=mobile.one(".mobile_calendar .mon").attr("month");
                    if(mobile.one(target).hasClass("canclick"))
                    {
                        var dayCN;
                        switch (target.getAttribute("i"))
                        {
                            case "1":dayCN="一";break;
                            case "2":dayCN="二";break;
                            case "3":dayCN="三";break;
                            case "4":dayCN="四";break;
                            case "5":dayCN="五";break;
                            case "6":dayCN="六";break;
                            case "0":dayCN="日";break;
                        }
                        var date_val=formatStr.replace('yy',year).replace('MM',month).replace('dd',target.getAttribute("date")).replace("day",dayCN);
                        element.value=date_val;
                        mobile.removePop(popconfigobj);
                    }
                },false);
            }
            function loadBasicHtml()
            {
                var htmlstr="<div class='mobile_calendar'><div class='mon' year='' month=''><span class='month_ctrl prev_month'><span></span></span><span class='calendar_year'></span><span>年</span><span class='calendar_month'></span><span>月</span><span class='month_ctrl next_month'><span></span></span></div><ul class='calendar_day'><li i='1'>一</li><li i='2'>二</li><li i='3'>三</li><li i='4'>四</li><li i='5'>五</li><li i='6'>六</li><li i='0'>日</li></ul><ul class='dates_table'></ul></div>";
                mobile.one("body").append(htmlstr);
            }
        };
        this.ajax=function(configobj){
            if(!XMLHttpRequest) return ;
            var xhr = new XMLHttpRequest (),type=configobj.type,url=configobj.url,d=configobj.data;
            xhr.onreadystatechange = function () {
                var data;
                if (xhr.readyState === 4) {
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
                        clearTimeout(timeout);
                        switch(configobj.dataType)
                        {
                            case "xml":data=xhr.responseXML;break;
                            case "text":
                            case "html":
                            case "script":data=xhr.responseText;break;
                            case "json":data=eval("("+xhr.responseText+")");break;

                        }
                        configobj.success(data);
                        return;
                    }
                    else configobj.error&&configobj.error();
                }
            };
            if(type.toUpperCase()==="GET")
            {
                getRequest();
            }
            else if(type.toUpperCase()==="POST")
            {
                postRequest();
            }
            else return;
            var timeout = setTimeout( function () {
                xhr.abort(); // call error callback
            }, configobj.timeout*1000);
            function getRequest()
            {
                for(var i in d)
                {
                    if(url.contain("?"))
                    {
                        url+=("&"+i+"="+d[i]);
                    }
                    else url+=("?"+i+"="+d[i]);
                }
                xhr.open(type, encodeURI(url), true);
                xhr.send(null);
            }
            function postRequest()
            {
                var param='';
                for(var i in d)
                {
                    param+=("&"+i+"="+d[i]);
                }
                xhr.open(type,encodeURI(url),true);
                if(param.length>0)
                {
                    param=param.substr(1,param.length-1);
                    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    xhr.send(param);
                }
                else xhr.send();
            }
        };
        this.areaChose=function (provinceadd,cityadd,districtadd){
            var mobile=this;
            var citySelector = function () {
                var province = mobile.one("#province");
                var city = mobile.one("#city");
                var district = mobile.one("#district");
                var preProvince = mobile.one("#pre_province");
                var preCity = mobile.one("#pre_city");
                var preDistrict = mobile.one("#pre_district");

                var jsonProvince = provinceadd;//当前数据文件地址
                var jsonCity = cityadd;
                var jsonDistrict = districtadd;
                var hasDistrict = true;
                var initProvince = "<option value=''>省</option>";
                var initCity = "<option value=''>市</option>";
                var initDistrict = "<option value=''>县</option>";
                return {
                    Init: function () {
                        var that = this;
                        that._LoadOptions(jsonProvince, preProvince, province, null, 0, initProvince);
                        that._LoadOptions(jsonCity, preCity, city, province, 2, initCity);
                        that._LoadOptions(jsonDistrict, preDistrict, district, city, 4, initDistrict);
                        province.on("change",(function () {
                            that._LoadOptions(jsonCity, preCity, city, province, 2, initCity);
                        }));
                        if (hasDistrict) {
                            city.on("change",(function () {
                                that._LoadOptions(jsonDistrict, preDistrict, district, city, 4, initDistrict);
                            }));
                            province.on("change",(function () {
                                city.on("change",function(){});
                            }));
                        }
                        province.on("change",function(){});
                    },
                    _LoadOptions: function (datapath, preobj, targetobj, parentobj, comparelen, initoption) {
                        mobile.ajax({
                            url: datapath,
                            type: 'get',
                            dataType: "json",
                            success: function (r) {
                                var t = ''; // t: html容器
                                var s; // s: 选中标识
                                var pre; // pre: 初始值
                                if (preobj === undefined) {
                                    pre = 0;
                                } else {
                                    pre = preobj.val();
                                }
                                for (var i = 0; i < r.length; i++) {
                                    s = '';
                                    if (comparelen === 0) {
                                        if (pre !== "" && pre !== 0 && r[i].code === pre) {
                                            s = ' selected=\"selected\" ';
                                            pre = '';
                                        }
                                        t += '<option value=' + r[i].code + s + '>' + r[i].name + '</option>';
                                    }
                                    else {
                                        var p = parentobj.val();
                                        if (p.substring(0, comparelen) === r[i].code.substring(0, comparelen)) {
                                            if (pre !== "" && pre !== 0 && r[i].code === pre) {
                                                s = ' selected=\"selected\" ';
                                                pre = '';
                                            }
                                            t += '<option value=' + r[i].code + s + '>' + r[i].name + '</option>';
                                        }
                                    }

                                }
                                if (initoption !== '') {
                                    targetobj.html(initoption + t);
                                } else {
                                    targetobj.html(t);
                                }

                            },
                            error:function(){
                            },
                            timeout:60
                        });
                    }
                };
            } ();
            citySelector.Init();
        };
        this.doT= function () {
            "use strict";
            var doT = {
                version: "1.0.3",
                templateSettings: {
                    evaluate:    /\{\{([\s\S]+?(\}?)+)\}\}/g,
                    interpolate: /\{\{=([\s\S]+?)\}\}/g,
                    encode:      /\{\{!([\s\S]+?)\}\}/g,
                    use:         /\{\{#([\s\S]+?)\}\}/g,
                    useParams:   /(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,
                    define:      /\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,
                    defineParams:/^\s*([\w$]+):([\s\S]+)/,
                    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
                    iterate:     /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
                    varname:	"it",
                    strip:		true,
                    append:		true,
                    selfcontained: false,
                    doNotSkipEncoded: false
                },
                template: undefined, //fn, compile template
                compile:  undefined  //fn, for express
            }, _globals;
            doT.encodeHTMLSource = function(doNotSkipEncoded) {
                var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': "&#34;", "'": "&#39;", "/": "&#47;" },
                    matchHTML = doNotSkipEncoded ? /[&<>"'\/]/g : /&(?!#?\w+;)|<|>|"|'|\//g;
                return function(code) {
                    return code ? code.toString().replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : "";
                };
            };
            _globals = (function(){ return this || (0,eval)("this"); }());
            if (typeof module !== "undefined" && module.exports) {
                module.exports = doT;
            } else if (typeof define === "function" && define.amd) {
                define(function(){return doT;});
            } else {
                _globals.doT = doT;
            }
            var startend = {
                append: { start: "'+(",      end: ")+'",      startencode: "'+encodeHTML(" },
                split:  { start: "';out+=(", end: ");out+='", startencode: "';out+=encodeHTML(" }
            }, skip = /$^/;
            function resolveDefs(c, block, def) {
                return ((typeof block === "string") ? block : block.toString())
                    .replace(c.define || skip, function(m, code, assign, value) {
                        if (code.indexOf("def.") === 0) {
                            code = code.substring(4);
                        }
                        if (!(code in def)) {
                            if (assign === ":") {
                                if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
                                    def[code] = {arg: param, text: v};
                                });
                                if (!(code in def)) def[code]= value;
                            } else {
                                new Function("def", "def['"+code+"']=" + value)(def);
                            }
                        }
                        return "";
                    })
                    .replace(c.use || skip, function(m, code) {
                        if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
                            if (def[d] && def[d].arg && param) {
                                var rw = (d+":"+param).replace(/'|\\/g, "_");
                                def.__exp = def.__exp || {};
                                def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
                                return s + "def.__exp['"+rw+"']";
                            }
                        });
                        var v = new Function("def", "return " + code)(def);
                        return v ? resolveDefs(c, v, def) : v;
                    });
            }
            function unescape(code) {
                return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
            }
            doT.template = function(tmpl, c, def) {
                c = c || doT.templateSettings;
                var cse = c.append ? startend.append : startend.split, needhtmlencode, sid = 0, indv,
                    str  = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl;
                str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
                    .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""): str)
                    .replace(/'|\\/g, "\\$&")
                    .replace(c.interpolate || skip, function(m, code) {
                        return cse.start + unescape(code) + cse.end;
                    })
                    .replace(c.encode || skip, function(m, code) {
                        needhtmlencode = true;
                        return cse.startencode + unescape(code) + cse.end;
                    })
                    .replace(c.conditional || skip, function(m, elsecase, code) {
                        return elsecase ?
                            (code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
                            (code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
                    })
                    .replace(c.iterate || skip, function(m, iterate, vname, iname) {
                        if (!iterate) return "';} } out+='";
                        sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
                        return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
                            +vname+"=arr"+sid+"["+indv+"+=1];out+='";
                    })
                    .replace(c.evaluate || skip, function(m, code) {
                        return "';" + unescape(code) + "out+='";
                    })
                + "';return out;")
                    .replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
                    .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
                if (needhtmlencode) {
                    if (!c.selfcontained && _globals && !_globals._encodeHTML) _globals._encodeHTML = doT.encodeHTMLSource(c.doNotSkipEncoded);
                    str = "var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("
                        + doT.encodeHTMLSource.toString() + "(" + (c.doNotSkipEncoded || '') + "));"
                        + str;
                }
                try {
                    return new Function(c.varname, str);
                } catch (e) {
                    if (typeof console !== "undefined") console.log("Could not create a template function: " + str);
                    throw e;
                }
            };
            doT.compile = function(tmpl, def) {
                return doT.template(tmpl, null, def);
            };
        }
    }
    function deviceInfo(doc,win)
    {
        this.UA=win.navigator.userAgent;
        this.PhoneWidth=win.screen.width;
        this.PhoneHeight=win.screen.height;
        //this.Scroll={"top":doc.body.scrollTop,"left":doc.body.scrollLeft};
    }
    function mobileCommon(meta)
    {
        this.metaelem=doc.querySelectorAll("meta");
        this.mobilemeta="<meta name='apple-mobile-web-app-capable' content='yes' \/>"+
            "<meta name='apple-mobile-web-app-status-bar-style' content='black' \/>"+
            "<meta content='telephone=no' name='format-detection' \/>"+
            "<meta name='viewport' content='initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui' \/>"
        this.f=function(){
            for(var i=0;i<this.metaelem.length;i++)
            {
                if(this.metaelem[i].getAttribute("mobile")==="true")
                {
                    doc.querySelector("head").innerHTML=this.mobilemeta+doc.querySelector("head").innerHTML;
                    break;
                }
            }
            return;
        };
        this.f();
    }
    (function addAPI()
    {
        function numberAPI()
        {
            Number.prototype.addZeroNumber=function(){
                var numstr=this.toString();//this指向调用该方法的对象
                if(numstr.length==1)
                {
                    numstr='0'+numstr;
                }
                return numstr;
            }
        }
        function stringAPI()
        {
            String.prototype.contain=function(str){
                if(this.indexOf(str)>-1) return true;
                else return false;
            }
        }
        numberAPI();
        stringAPI();
    })();
    mobile.prototype.mobilecommon=new mobileCommon();
    mobile.prototype.deviceinfo=new deviceInfo(doc,win);
    var mobile=new mobile();
    mobile.autoChange(640,100);
    mobile.readOnly=true;
    win.mobile=mobile;
    win.onresize=function(){
        mobile.autoChange(640,100);
    };
    mobile.doT();
})(document,window);

