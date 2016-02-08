/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e,t,i){var n=e+"="+i+(t?"; "+t:"");document.cookie=n}function i(e){var t=e+"=";if(document.cookie.length>0){var i=document.cookie.indexOf(t);if(-1!=i){i+=t.length;var n=document.cookie.indexOf(";",i);return-1==n&&(n=document.cookie.length),document.cookie.substring(i,n)}}return""}var n=!0;e.attachEvent("onBeforeViewChange",function(s,a,r,d){if(n&&e._get_url_nav){var o=e._get_url_nav();(o.date||o.mode||o.event)&&(n=!1)}var l=(e._obj.id||"scheduler")+"_settings";

if(n){n=!1;var _=i(l);if(_){e._min_date||(e._min_date=d),_=unescape(_).split("@"),_[0]=this.templates.xml_date(_[0]);var h=this.isViewExists(_[1])?_[1]:r,c=isNaN(+_[0])?d:_[0];return window.setTimeout(function(){e.setCurrentView(c,h)},1),!1}}var u=escape(this.templates.xml_format(d||a)+"@"+(r||s));return t(l,"expires=Sun, 31 Jan 9999 22:00:00 GMT",u),!0});var s=e._load;e._load=function(){var t=arguments;if(!e._date&&e._load_mode){var i=this;window.setTimeout(function(){s.apply(i,t)},1)}else s.apply(this,t);

}}()});