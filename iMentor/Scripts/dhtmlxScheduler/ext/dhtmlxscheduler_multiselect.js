/*
@license
dhtmlxScheduler.Net v.3.3.12 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.form_blocks.multiselect={render:function(e){for(var t="<div class='dhx_multi_select_"+e.name+"' style='overflow: auto; height: "+e.height+"px; position: relative;' >",a=0;a<e.options.length;a++)t+="<label><input type='checkbox' value='"+e.options[a].key+"'/>"+e.options[a].label+"</label>",convertStringToBoolean(e.vertical)&&(t+="<br/>");return t+="</div>"},set_value:function(t,a,n,i){function r(e){for(var a=t.getElementsByTagName("input"),n=0;n<a.length;n++)a[n].checked=!!e[a[n].value];

}for(var s=t.getElementsByTagName("input"),d=0;d<s.length;d++)s[d].checked=!1;var o={};if(n[i.map_to]){for(var _=(n[i.map_to]+"").split(i.delimiter||e.config.section_delimiter||","),d=0;d<_.length;d++)o[_[d]]=!0;r(o)}else{if(e._new_event||!i.script_url)return;var l=document.createElement("div");l.className="dhx_loading",l.style.cssText="position: absolute; top: 40%; left: 40%;",t.appendChild(l),dhtmlxAjax.get(i.script_url+"?dhx_crosslink_"+i.map_to+"="+n.id+"&uid="+e.uid(),function(e){for(var a=e.doXPath("//data/item"),n={},s=0;s<a.length;s++)n[a[s].getAttribute(i.map_to)]=!0;

r(n),t.removeChild(l)})}},get_value:function(t,a,n){for(var i=[],r=t.getElementsByTagName("input"),s=0;s<r.length;s++)r[s].checked&&i.push(r[s].value);return i.join(n.delimiter||e.config.section_delimiter||",")},focus:function(e){}}});