/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.date.add_agenda=function(t){return e.date.add(t,1,"year")},e.templates.agenda_time=function(t,i,s){return s._timed?this.day_date(s.start_date,s.end_date,s)+" "+this.event_date(t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(i)},e.templates.agenda_text=function(e,t,i){return i.text},e.templates.agenda_date=function(){return""},e.date.agenda_start=function(){return e.date.date_part(e._currentDate())},e.attachEvent("onTemplatesReady",function(){function t(t){
if(t){var i=e.locale.labels;e._els.dhx_cal_header[0].innerHTML="<div class='dhx_agenda_line'><div>"+i.date+"</div><span style='padding-left:25px'>"+i.description+"</span></div>",e._table_view=!0,e.set_sizes()}}function i(){var t=(e._date,e.get_visible_events());t.sort(function(e,t){return e.start_date>t.start_date?1:-1});for(var i="<div class='dhx_agenda_area'>",s=0;s<t.length;s++){var a=t[s],n=a.color?"background:"+a.color+";":"",r=a.textColor?"color:"+a.textColor+";":"",d=e.templates.event_class(a.start_date,a.end_date,a);

i+="<div class='dhx_agenda_line"+(d?" "+d:"")+"' event_id='"+a.id+"' style='"+r+n+(a._text_style||"")+"'><div class='dhx_agenda_event_time'>"+e.templates.agenda_time(a.start_date,a.end_date,a)+"</div>",i+="<div class='dhx_event_icon icon_details'>&nbsp</div>",i+="<span>"+e.templates.agenda_text(a.start_date,a.end_date,a)+"</span></div>"}i+="<div class='dhx_v_border'></div></div>",e._els.dhx_cal_data[0].innerHTML=i,e._els.dhx_cal_data[0].childNodes[0].scrollTop=e._agendaScrollTop||0;var o=e._els.dhx_cal_data[0].childNodes[0],l=o.childNodes[o.childNodes.length-1];

l.style.height=o.offsetHeight<e._els.dhx_cal_data[0].offsetHeight?"100%":o.offsetHeight+"px";var _=e._els.dhx_cal_data[0].firstChild.childNodes;e._els.dhx_cal_date[0].innerHTML=e.templates.agenda_date(e._min_date,e._max_date,e._mode),e._rendered=[];for(var s=0;s<_.length-1;s++)e._rendered[s]=_[s]}var s=e.dblclick_dhx_cal_data;e.dblclick_dhx_cal_data=function(){if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(s)return s.apply(this,arguments)},e.attachEvent("onSchedulerResize",function(){
return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var a=e.render_data;e.render_data=function(e){return"agenda"!=this._mode?a.apply(this,arguments):void i()};var n=e.render_view_data;e.render_view_data=function(){return"agenda"==this._mode&&(e._agendaScrollTop=e._els.dhx_cal_data[0].childNodes[0].scrollTop,e._els.dhx_cal_data[0].childNodes[0].scrollTop=0),n.apply(this,arguments)},e.agenda_view=function(s){e._min_date=e.config.agenda_start||e.date.agenda_start(e._date),e._max_date=e.config.agenda_end||e.date.add_agenda(e._min_date,1),
e._table_view=!0,t(s),s&&i()}})});