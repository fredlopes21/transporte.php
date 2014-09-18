(function(a,b){a.widget("ui.datetime",{ready:false,childChain:false,widgetEventPrefix:"datetime",options:{value:null,format:"yy-mm-dd hh:ii",altField:null,altFormat:null,inline:"auto",withDate:true,minDate:null,maxDate:null,showWeek:false,numMonths:1,withTime:true,stepHours:1,stepMins:5,chainTo:null,chainFrom:null,chainOptions:{}},_create:function(){this._insert();this._position();this._prepare();this._update();this._generate();this._events();this._chain()},_prepare:function(){var c=this.options;this.today=this._clean(new Date());if(!c.altFormat){this.options.altFormat=c.format}value=(!c.value)?(c.altField)?a(c.altField).val():this.element.val():c.value;format=(!value||value==c.value||value==this.element.val())?c.format:c.altFormat;this.date=(!value)?new Date():this._parse(value,format);this._limits();if(value){this.options.value=this.date.format(c.format)}},_limits:function(){var d=this.options,c=null;this.minDate=(d.minDate)?this._parse(d.minDate,d.format):new Date(1970,0,1,0,0,0,0);this.maxDate=(d.maxDate)?this._parse(d.maxDate,d.format):new Date(9999,11,31,23,59,59,0);c=(this.current)?this._clean(this.current):this._clean(this.date);c.setTime(Math.max(Math.max(c.getTime(),this.minDate.getTime()),Math.min(c.getTime(),this.maxDate.getTime())));c.setHours(this.date.getHours());c.setMinutes(this.date.getMinutes());if(!this.current||this.current!=c.getTime()){this.date.setTime(c.getTime())}this.current=c.getTime()},_insert:function(){this.tag=this.element.get(0).tagName.toLowerCase();this.inline=(this.options.inline!="auto")?this.options.inline:(a.inArray(this.tag,["input"])>-1)?false:true;this.container=(this.tag=="div")?this.element.addClass("ui-datetime"):a("<div>").addClass("ui-datetime").insertAfter(this.element);if(this.inline){this.container.addClass("ui-datetime-inline ui-helper-clearfix")}else{this.container.hide()}},_position:function(){var c=0;if(this.inline){c=this.element.position().left-this.container.position().left;this.container.css("marginLeft",c)}else{c=this.element.position().left;this.container.css("left",c)}},_generate:function(){this.calendar=a("<div>").addClass("ui-datetime-calendar ui-widget ui-widget-content ui-corner-all").appendTo(this.container);this.calendar.css("width",(17*this.options.numMonths).toString()+"em");withDate=(this.options.withDate)?this._calendar():this.calendar.hide();this.clock=a("<div>").addClass("ui-datetime-clock ui-widget ui-widget-content ui-corner-all").appendTo(this.container);withTime=(this.options.withTime)?this._clock():this.clock.hide()},_chain:function(){var d=a.extend({},this.options,{value:null,chainTo:null,chainFrom:this.element,altField:null,minDate:this.options.value},this.options.chainOptions),c=(this.options.chainTo)?(this.options.chainTo=="self")?this.element:a(this.options.chainTo):null;if(c!=null&&c.get(0)===this.element.get(0)){this.childChain=true;this.options.chainTo=a("<div>").appendTo(this.container);d.inline=true}this.chainedTo=(c)?a(this.options.chainTo).datetime(d):null;this.chainedFrom=(this.options.chainFrom)?a(this.options.chainFrom).datetime("widget"):null;if(this.chainedFrom){this.container.addClass("ui-datetime-to");this.chainedFrom.datetime("option",{maxDate:this.options.value})}},_calendar:function(){var c=this.options,e=null,k="",n=null,l=null,j=null,h=0,m=0,f=this._clean(new Date(this.current)).getTime(),g=this._clean(this.minDate).getTime(),p=this._clean(this.maxDate).getTime(),q=new Date(this.date.getFullYear(),this.date.getMonth(),0);if(q.getTime()<this.minDate.getTime()){this.date.setMonth(this.minDate.getMonth())}n=this.date.getFullYear(),l=this.date.getMonth();for(h=0;h<c.numMonths;h++){e=new Date(n,l);e.setDate(e.getDate()-e.getDay());className=((c.numMonths==1)?"all":(h==0)?"first":(h==c.numMonths-1)?"last":"middle");corners="ui-corner-"+((c.numMonths==1)?"all":(h==0)?"left":(h==c.numMonths-1)?"right":"none");k+='<div class="ui-datetime-calendar-'+className+'"><div class="ui-datetime-header ui-widget-header '+corners+'"><div class="ui-datetime-title">';k+=(a.inArray(className,["last","middle"])>-1)?"":'<a title="Prev" class="ui-datetime-prev ui-corner-all'+((g>(new Date(n,l)).getTime())?" ui-state-disabled":"")+'"><span class="ui-icon ui-icon-circle-triangle-w">Prev</span></a>';k+=(a.inArray(className,["first","middle"])>-1)?"":'<a title="Next" class="ui-datetime-next ui-corner-all'+((p<(new Date(n,l+1)).getTime())?" ui-state-disabled":"")+'"><span class="ui-icon ui-icon-circle-triangle-e">Next</span></a>';k+='<span class="ui-datetime-month">'+Date.monthNames[l]+'</span>&nbsp;<span class="ui-datetime-year">'+n+"</span></div></div>";k+="<table><thead><tr>";if(c.showWeek){k+="<th><span>Wk</span></th>"}a.each(Date.dayNamesMin,function(d,i){k+="<th><span>"+i+"</span></th>"});k+="</tr></thead><tbody>";for(m=0;m<42;m++){other=(e.getMonth()!=l||e.getTime()<g||e.getTime()>p);k+=((m%7==0)?"<tr>"+((c.showWeek)?'<td class="ui-datetime-week">'+e.getWeek()+"</td>":""):"");k+='<td class="'+((other)?"ui-datetime-unselectable ui-state-disabled":"")+'">';j=(e.getTime()==this.today.getTime())?" ui-state-highlight":(e.getTime()==f)?" ui-state-active":"";if(other){k+='<span class="ui-state-default">'+e.getDate()+"</span>"}else{k+='<a class="ui-state-default'+j+'" day="'+e.getDate()+'" month="'+e.getMonth()+'">'+e.getDate()+"</a>"}k+="</td>"+((m%7==6)?"</tr>":"");e.setDate(e.getDate()+1)}k+="</tbody></table></div>";if(l==11){n+=1}l=(l==11)?0:l+1}this.calendar.html(k);this._calendarEvents();return this},_calendarEvents:function(){var c=this;this.calendar.find(".ui-datetime-prev:not('.ui-state-disabled'), .ui-datetime-next:not('.ui-state-disabled'), td a").bind("mouseout",function(){a(this).removeClass("ui-state-hover")}).bind("mouseover",function(){a(this).addClass("ui-state-hover")});this.calendar.find(".ui-datetime-prev:not('.ui-state-disabled')").click(function(){c._calendarUpdate("months",-1)});this.calendar.find(".ui-datetime-next:not('.ui-state-disabled')").click(function(){c._calendarUpdate("months",1)});this.calendar.find("td a").click(function(d){d.preventDefault();c.date.setDate(a(this).attr("day"));c.date.setMonth(a(this).attr("month"));c._value(c.date)})},_calendarUpdate:function(c,d){switch(c){case"months":this.date.setMonth(this.date.getMonth()+d);break;case"years":this.date.setFullYear(this.date.getFullYear()+d);break}this._calendar()},_clock:function(){var d=this.options,c='<div class="ui-datetime-header ui-widget-header ui-corner-all"><div class="ui-datetime-title ui-datetime-time">'+this.date.format("'<span class=\"ui-datetime-time-hour\">'hh'</span>:<span class=\"ui-datetime-time-mins\">'ii'</span>'")+'</div></div><table><thead><tr><th><span>Hr</span></th><th><span>Mn</span></th></tr></thead><tbody><tr><td class="ui-datetime-slider-hour"></td><td class="ui-datetime-slider-mins"></td></tr></tbody></table>';this.clock.html(c).height(this.options.withDate?this.calendar.height():"14.2em");if(this.options.withDate){this.clock.css("marginLeft",".2em")}this._clockSlider(this.date.getHours(),0,(24-d.stepHours),d.stepHours,"hour");this._clockSlider(this.date.getMinutes(),0,(60-d.stepMins),d.stepMins,"mins");return this},_clockSlider:function(j,f,h,e,i){var k=this,c=null,d=a("<div>").addClass("ui-datetime-slider ui-datetime-slider-vertical ui-widget ui-widget-content ui-corner-all"),g=a("<a>").addClass("ui-datetime-slider-handle ui-state-default ui-corner-all").css("top","0").appendTo(d);this.clock.find(".ui-datetime-slider-"+i).html(d);d.height(this.clock.height()-(d.parent().offset().top-this.clock.offset().top)-6);increment=(d.height()-g.height())/((h-f)/e);value=(j>h)?h:(j<f)?f:j;g.css("top",Math.round((value-f)/e)*increment);g.mousedown(function(l){l.preventDefault();a("body").css("cursor","move");increment=(d.height()-g.height())/((h-f)/e);c=l.pageY-d.offset().top-(g.height()/2)-l.pageY;a(document).bind("mousemove.datetimeclock",function(n){value=Math.round((c+n.pageY)/increment)*e+f;value=(value>h)?h:(value<f)?f:value;g.css("top",(value-f)/e*increment);k._clockUpdate(i,value)}).bind("mouseup.datetimeclock",function(m){a("body").css("cursor","auto");a(document).unbind(".datetimeclock");k._timeUpdate(i,value)})});return d},_clockUpdate:function(d,c){c=("0"+c).substrOffset(-2);this.clock.find(".ui-datetime-time-"+d).html(c)},_timeUpdate:function(c,d){if(c=="hour"){this.date.setHours(d)}else{if(c=="mins"){this.date.setMinutes(d)}}date=new Date(this.current);date.setHours(this.date.getHours());date.setMinutes(this.date.getMinutes());this._value(date)},_events:function(){var c=this;if(!this.inline){this.element.bind("click",function(){c.show()})}a(window).resize(function(){c._position()})},_update:function(){if(!this.options.value){return true}var c=new Date(this.current);if(this.options.altField){a(this.options.altField).val(c.format(this.options.altFormat))}if(this.tag=="input"){this.element.val(c.format(this.options.format))}if(this.chainedTo){this.chainedTo.datetime("option",{minDate:this.options.value})}if(this.chainedFrom){this.chainedFrom.datetime("option",{maxDate:this.options.value})}this._trigger("change",null,{value:this.options.value});return this},_value:function(c){this.current=c.getTime();this.options.value=c.format(this.options.format);this._update()._calendar()._clock();return this},_clean:function(c){if(typeof c!="object"){c=new Date(c)}return new Date(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0,0)},_parse:function(c,d){if(c.constructor==Date){return c}return Date.strtodate(c,d)},value:function(c){if(c!==b){this.date=this._parse(c,this.options.format);this._limits();return this._value(this.date)}return new Date(this.current).format(this.options.format)},timestamp:function(){return this.current},show:function(){var c=this;if(this.option("disabled")){return}this.container.fadeIn();a(document).bind("mousedown.datetimecalendar",function(d){if(a(d.target).parents(".ui-datetime").length==0){c.hide()}}).bind("keydown.datetimecalendar",function(d){if(d.which==27){c.hide()}});this._calendar()._clock();if(this.chainedTo&&this.childChain){this.chainedTo.datetime("show")}this._trigger("show",null,{value:this.options.value});this.ready=true;return this},hide:function(){a(document).unbind(".datetimecalendar");this.container.fadeOut("fast");this._trigger("hide",null,{value:this.options.value});return this},disable:function(){a.Widget.prototype.disable.apply(this,arguments);this.element.attr("disabled","disabled");this.container.hide()},enable:function(){a.Widget.prototype.enable.apply(this,arguments);this.element.attr("disabled","");if(this.inline){this.container.show()}},destroy:function(){a.Widget.prototype.destroy.apply(this,arguments);if(arguments[0]!=b&&arguments[0]["unchain"]!==false){if(this.chainedTo){this.chainedTo.datetime("destroy")}if(this.chainedFrom){this.chainedFrom.datetime("destroy")}}this.container.remove()},_setOption:function(c,d){a.Widget.prototype._setOption.apply(this,arguments);switch(c){case"value":this.value(d);break;case"format":this._update();break;case"showWeek":this._calendar();break;case"minDate":case"maxDate":this._limits();this._calendar();break}return this}});a.extend(Date,{W3CDTF:"yy-mm-dd hh:ii",ISO8601:"yy-mm-dd hh:ii O",RFC822:"D, d M yy hh:ii",RFC1123:"D, d M yy hh:ii",RFC2822:"D, d M yy hh:ii",RFC1036:"D, d M y hh:ii",RFC850:"DD, dd-M-y hh:ii",USASCII:"mm/dd/yy g:ii A",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],strtodate:function(f,h){var d=new Date(),c={MM:[Date.monthNames,"Month"],M:[Date.monthNamesShort,"Month"],DD:[Date.dayNames,"Day"],D:[Date.dayNamesShort,"Day"],yyyy:[4,"FullYear"],mm:[2,"Month"],dd:[2,"Date"],hh:[2,"Hours"],ii:[2,"Minutes"],m:[1,"Month",12],d:[1,"Date",31],h:[1,"Hours",59],i:[1,"Minutes",59]};var e=new RegExp("([+-])[ ]{0,1}([0-9]+)[ ]{0,1}(min|hour|day|week|month|year)","gi");if((match=e.exec(f))){match[2]=parseInt(match[2]);var g=(match[1]=="+")?match[2]:match[2]*-1;switch(match[3]){case"min":d.setMinutes(d.getMinutes()+g);break;case"hour":d.setHours(d.getHours()+g);break;case"day":d.setDate(d.getDate()+g);break;case"week":d.setDate(d.getDate()+(g*7));break;case"month":d.setMonth(d.getMonth()+g);break;case"year":d.setFullYear(d.getFullYear()+g);break}}else{h=h.replace(/yyyy/g,"yy").replace(/yy/g,"yyyy");a.each(c,function(m,j){var p=0,o=0,k=0,l=false,n=0;while((p=h.indexOf(m,((p)?p+1:0)))>-1){l=false,n=0;h=h.replace(new RegExp("('[^']*)?("+m+"|')","g"),function(q,i){if(i&&(hide=q.replace(m,m.replace(/./g,"?")))!=q){l=true}if(!l){o=p-h.substrCount("'",0,p);if(typeof j[0]==="object"){a.each(j[0],function(s,r){if(f.indexOf(r)>-1&&(q=r)){f=f.replace("/"+r+"/g",m);d["set"+j[1]](s)}})}else{if(typeof j[0]==="number"){if(j[0]==1){k=parseInt(f.substr(o,2).replace(/[^0-9]/g,""),10);if(k>j[2]){k=parseInt(f.substr(o,1).replace(/[^0-9]/g,""),10)}}else{k=parseInt(f.substr(o,j[0]).replace(/[^0-9]/g,""),10)}f=f.splice(o,Math.max(k.toString().length,j[0]),m);if(!isNaN(k)){d["set"+j[1]]((j[1]=="Month")?k-1:k)}else{d["set"+j[1]](0)}}}}return i?hide:(!l&&(n+=1)==1)?q.replace(/./g,"?"):q})}})}d.setSeconds(0,0);return d},strtotime:function(c,d){return Date.strtodate(c,d).getTime()}});a.extend(Date.prototype,{format:function(d){var c=this;d=d.replace(new RegExp("('[^']*)?((yy|y|mm|m|MM|M|dd|d|DD|D|hh|h|gg|g|ii|i|a|A|O)|')","g"),function(f,e){if(!e){switch(f){case"yy":return c.getFullYear();case"y":return c.getShortYear();case"mm":return("0"+(c.getMonth()+1)).substrOffset(-2);case"m":return c.getMonth()+1;case"MM":return Date.monthNames[c.getMonth()];case"M":return Date.monthNamesShort[c.getMonth()];case"dd":return("0"+c.getDate()).substrOffset(-2);case"d":return c.getDate();case"DD":return Date.dayNames[c.getDay()];case"D":return Date.dayNamesShort[c.getDay()];case"hh":return("0"+c.getHours()).substrOffset(-2);case"h":return c.getHours();case"gg":return("0"+c.get12Hours()).substrOffset(-2);case"g":return c.get12Hours();case"ii":return("0"+c.getMinutes()).substrOffset(-2);case"i":return c.getMinutes();case"a":return c.getMeridiem();case"A":return c.getMeridiem().toUpperCase();case"O":return c.getUTCTimezone()}}return f});return d.replace(/'/g,"")},setDay:function(c){if(c<7&&this.getDay()!=c){diff=c-this.getDay();if(diff>0){return this.setDate(this.getDate()+diff)}return this.setDate(this.getDate()+diff)}},setShortYear:function(d,c){var e=new Date().getFullYear().toString().substr(0,2);e=(parseInt(d)<=parseInt(c))?e:parseInt(e)-1;this.setFullYear(e+d)},setMeridiem:function(c){},get12Hours:function(){return(this.getHours()==0)?12:(this.getHours()>12)?this.getHours()-12:this.getHours()},getMeridiem:function(){return(this.getHours()>=12)?"pm":"am"},getShortYear:function(){return this.getFullYear().toString().substrOffset(-2)},getWeek:function(){var c=new Date(this.getFullYear(),0,1);first=(c.getDay()==0||c.getDay()>4)?0:1;return Math.ceil(this.getOrdinal()/7)+first},getOrdinal:function(){var c=new Date(this.getFullYear(),0,1);return Math.ceil((this.getTime()-c.getTime())/86400000)},getUTCTimezone:function(){offset=this.getTimezoneOffset();mins=("0"+(offset%60*-1)).substrOffset(-2);hours=("0"+((offset-mins)/60*-1)).substrOffset(-2);return"+"+hours+mins}});a.extend(String.prototype,{splice:function(c,e,d){return this.substr(0,c)+d+this.substr(c+e)},substrCount:function(g,h,f){var c=0,e=0,d=this.substr(h,f);while((c=d.indexOf(g,c)+1)>0){e++}return e},substrOffset:function(c){return this.substr(this.length+c,this.length)}})})(jQuery);