/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._temp_key_scope=function(){function t(e){e=e||window.event,d.x=e.clientX,d.y=e.clientY}function i(){for(var t=document.elementFromPoint(d.x,d.y);t&&t!=e._obj;)t=t.parentNode;return!(t!=e._obj)}function n(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}e.config.key_nav=!0;var a,r,s=null,d={};document.body?dhtmlxEvent(document.body,"mousemove",t):dhtmlxEvent(window,"load",function(){dhtmlxEvent(document.body,"mousemove",t)}),e.attachEvent("onMouseMove",function(t,i){
a=e.getActionData(i).date,r=e.getActionData(i).section}),e._make_pasted_event=function(t){var i=t.end_date-t.start_date,s=e._lame_copy({},t);if(n(s),s.start_date=new Date(a),s.end_date=new Date(s.start_date.valueOf()+i),r){var d=e._get_section_property();s[d]=e.config.multisection?t[d]:r}return s},e._do_paste=function(t,i,n){e.addEvent(i),e.callEvent("onEventPasted",[t,i,n])},e._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1},dhtmlxEvent(document,_isOpera?"keypress":"keydown",function(t){
if(!e._is_key_nav_active())return!0;if(t=t||event,37==t.keyCode||39==t.keyCode){t.cancelBubble=!0;var n=e.date.add(e._date,37==t.keyCode?-1:1,e._mode);return e.setCurrentView(n),!0}var a=e._select_id;if(t.ctrlKey&&67==t.keyCode)return a&&(e._buffer_id=a,s=!0,e.callEvent("onEventCopied",[e.getEvent(a)])),!0;if(t.ctrlKey&&88==t.keyCode&&a){s=!1,e._buffer_id=a;var r=e.getEvent(a);e.updateEvent(r.id),e.callEvent("onEventCut",[r])}if(t.ctrlKey&&86==t.keyCode&&i(t)){var r=e.getEvent(e._buffer_id);if(r){
var d=e._make_pasted_event(r);if(s)d.id=e.uid(),e._do_paste(s,d,r);else{var o=e.callEvent("onBeforeEventChanged",[d,t,!1,r]);o&&(e._do_paste(s,d,r),s=!0)}}return!0}})},e._temp_key_scope()});