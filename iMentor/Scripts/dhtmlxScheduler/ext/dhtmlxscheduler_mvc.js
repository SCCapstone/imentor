/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e){var t={};for(var a in e)0!==a.indexOf("_")&&(t[a]=e[a]);return d.use_id||delete t.id,t}function a(){clearTimeout(s),s=setTimeout(function(){e.updateView()},1)}function n(e){e._loading=!0,e._not_render=!0,e.callEvent("onXLS",[])}function i(e){e._not_render=!1,e._render_wait&&e.render_view_data(),e._loading=!1,e.callEvent("onXLE",[])}function r(e){return d.use_id?e.id:e.cid}var s,d={use_id:!1};e.backbone=function(s,o){function _(){l.length&&(e.parse(l,"json"),
l=[])}o&&(d=o),s.bind("change",function(t,n){var i=r(t),s=e._events[i]=t.toJSON();s.id=i,e._init_event(s),a()}),s.bind("remove",function(t,a){var n=r(t);e._events[n]&&e.deleteEvent(n)});var l=[];s.bind("add",function(t,a){var n=r(t);if(!e._events[n]){var i=t.toJSON();i.id=n,e._init_event(i),l.push(i),1==l.length&&setTimeout(_,1)}}),s.bind("request",function(t){t instanceof Backbone.Collection&&n(e)}),s.bind("sync",function(t){t instanceof Backbone.Collection&&i(e)}),s.bind("error",function(t){t instanceof Backbone.Collection&&i(e);

}),e.attachEvent("onEventCreated",function(t){var a=new s.model(e.getEvent(t));return e._events[t]=a.toJSON(),e._events[t].id=t,!0}),e.attachEvent("onEventAdded",function(a){if(!s.get(a)){var n=t(e.getEvent(a)),i=new s.model(n),d=r(i);d!=a&&this.changeEventId(a,d),s.add(i),s.trigger("scheduler:add",i)}return!0}),e.attachEvent("onEventChanged",function(a){var n=s.get(a),i=t(e.getEvent(a));return n.set(i),s.trigger("scheduler:change",n),!0}),e.attachEvent("onEventDeleted",function(e){var t=s.get(e);

return t&&(s.trigger("scheduler:remove",t),s.remove(e)),!0})}}()});