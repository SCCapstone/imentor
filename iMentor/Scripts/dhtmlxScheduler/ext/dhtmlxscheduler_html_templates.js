/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.attachEvent("onTemplatesReady",function(){for(var t=document.body.getElementsByTagName("DIV"),i=0;i<t.length;i++){var n=t[i].className||"";if(n=n.split(":"),2==n.length&&"template"==n[0]){var a='return "'+(t[i].innerHTML||"").replace(/\"/g,'\\"').replace(/[\n\r]+/g,"")+'";';a=unescape(a).replace(/\{event\.([a-z]+)\}/g,function(e,t){return'"+ev.'+t+'+"'}),e.templates[n[1]]=Function("start","end","ev",a),t[i].style.display="none"}}})});