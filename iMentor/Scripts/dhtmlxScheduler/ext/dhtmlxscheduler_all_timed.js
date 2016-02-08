/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){e.config.all_timed="short";var t=function(e){return!((e.end_date-e.start_date)/36e5>=24)};e._safe_copy=function(t){var i=null,s=null;return t.event_pid&&(i=e.getEvent(t.event_pid)),i&&i.isPrototypeOf(t)?(s=e._copy_event(t),delete s.event_length,delete s.event_pid,delete s.rec_pattern,delete s.rec_type):s=e._lame_clone(t),s};var i=e._pre_render_events_line;e._pre_render_events_line=function(s,a){function n(e){var t=r(e.start_date);return+e.end_date>+t}function r(t){
var i=e.date.add(t,1,"day");return i=e.date.date_part(i)}function d(t,i){var s=e.date.date_part(new Date(t));return s.setHours(i),s}if(!this.config.all_timed)return i.call(this,s,a);for(var o=0;o<s.length;o++){var l=s[o];if(!l._timed)if("short"!=this.config.all_timed||t(l)){var _=this._safe_copy(l);_.start_date=new Date(_.start_date),n(l)?(_.end_date=r(_.start_date),24!=this.config.last_hour&&(_.end_date=d(_.start_date,this.config.last_hour))):_.end_date=new Date(l.end_date);var h=!1;_.start_date<this._max_date&&_.end_date>this._min_date&&_.start_date<_.end_date&&(s[o]=_,
h=!0);var c=this._safe_copy(l);if(c.end_date=new Date(c.end_date),c.start_date=c.start_date<this._min_date?d(this._min_date,this.config.first_hour):d(r(l.start_date),this.config.first_hour),c.start_date<this._max_date&&c.start_date<c.end_date){if(!h){s[o--]=c;continue}s.splice(o+1,0,c)}}else s.splice(o--,1)}var u="move"==this._drag_mode?!1:a;return i.call(this,s,u)};var s=e.get_visible_events;e.get_visible_events=function(e){return this.config.all_timed&&this.config.multi_day?s.call(this,!1):s.call(this,e);

},e.attachEvent("onBeforeViewChange",function(t,i,s,a){return e._allow_dnd="day"==s||"week"==s,!0}),e._is_main_area_event=function(e){return!!(e._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&t(e))};var a=e.updateEvent;e.updateEvent=function(t){var i,s=e.config.all_timed&&!(e.isOneDayEvent(e._events[t])||e.getState().drag_id);s&&(i=e.config.update_render,e.config.update_render=!0),a.apply(e,arguments),s&&(e.config.update_render=i)}}()});