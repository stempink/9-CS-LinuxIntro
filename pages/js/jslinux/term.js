/* 
   Javascript Terminal

   Copyright (c) 2011 Fabrice Bellard

   Redistribution or commercial use is prohibited without the author's
   permission.
*/
"use strict";function Term(aa,ba,ca){this.w=aa;this.h=ba;this.cur_h=ba;this.tot_h=1000;this.y_base=0;this.y_disp=0;this.x=0;this.y=0;this.cursorstate=0;this.handler=ca;this.convert_lf_to_crlf=false;this.state=0;this.output_queue="";this.bg_colors=["#000000","#ff0000","#00ff00","#ffff00","#0000ff","#ff00ff","#00ffff","#ffffff"];this.fg_colors=["#000000","#ff0000","#00ff00","#ffff00","#0000ff","#ff00ff","#00ffff","#ffffff"];this.def_attr=(7<<3)|0;this.cur_attr=this.def_attr;this.is_mac=(navigator.userAgent.indexOf("Mac")>=0)?true:false;this.key_rep_state=0;this.key_rep_str="";}Term.prototype.open=function(){var y,da,i,ea,c;this.lines=new Array();c=32|(this.def_attr<<16);for(y=0;y<this.cur_h;y++){da=new Array();for(i=0;i<this.w;i++)da[i]=c;this.lines[y]=da;}document.writeln('<table border="0" cellspacing="0" cellpadding="0">');for(y=0;y<this.h;y++){document.writeln('<tr><td class="term" id="tline'+y+'"></td></tr>');}document.writeln('</table>');this.refresh(0,this.h-1);document.addEventListener("keydown",this.keyDownHandler.bind(this),true);document.addEventListener("keypress",this.keyPressHandler.bind(this),true);ea=this;setInterval(function(){ea.cursor_timer_cb();},1000);};Term.prototype.refresh=function(fa,ga){var ha,y,da,ia,c,w,i,ja,ka,la,ma,na,oa;for(y=fa;y<=ga;y++){oa=y+this.y_disp;if(oa>=this.cur_h)oa-=this.cur_h;da=this.lines[oa];ia="";w=this.w;if(y==this.y&&this.cursor_state&&this.y_disp==this.y_base){ja=this.x;}else{ja=-1;}la=this.def_attr;for(i=0;i<w;i++){c=da[i];ka=c>>16;c&=65535;if(i==ja){ka=-1;}if(ka!=la){if(la!=this.def_attr)ia+='</span>';if(ka!=this.def_attr){if(ka==-1){ia+='<span class="termReverse">';}else{ia+='<span style="';ma=(ka>>3)&7;na=ka&7;if(ma!=7){ia+='color:'+this.fg_colors[ma]+';';}if(na!=0){ia+='background-color:'+this.bg_colors[na]+';';}ia+='">';}}}switch(c){case 32:ia+="&nbsp;";break;case 38:ia+="&amp;";break;case 60:ia+="&lt;";break;case 62:ia+="&gt;";break;default:if(c<32){ia+="&nbsp;";}else{ia+=String.fromCharCode(c);}break;}la=ka;}if(la!=this.def_attr){ia+='</span>';}ha=document.getElementById("tline"+y);ha.innerHTML=ia;}};Term.prototype.cursor_timer_cb=function(){this.cursor_state^=1;this.refresh(this.y,this.y);};Term.prototype.show_cursor=function(){if(!this.cursor_state){this.cursor_state=1;this.refresh(this.y,this.y);}};Term.prototype.scroll=function(){var y,da,x,c,oa;if(this.cur_h<this.tot_h){this.cur_h++;}if(++this.y_base==this.cur_h)this.y_base=0;this.y_disp=this.y_base;c=32|(this.def_attr<<16);da=new Array();for(x=0;x<this.w;x++)da[x]=c;oa=this.y_base+this.h-1;if(oa>=this.cur_h)oa-=this.cur_h;this.lines[oa]=da;};Term.prototype.scroll_disp=function(n){var i,oa;if(n>=0){for(i=0;i<n;i++){if(this.y_disp==this.y_base)break;if(++this.y_disp==this.cur_h)this.y_disp=0;}}else{n=-n;oa=this.y_base+this.h;if(oa>=this.cur_h)oa-=this.cur_h;for(i=0;i<n;i++){if(this.y_disp==oa)break;if(--this.y_disp<0)this.y_disp=this.cur_h-1;}}this.refresh(0,this.h-1);};Term.prototype.write=function(pa){function qa(y){fa=Math.min(fa,y);ga=Math.max(ga,y);}function ra(s,x,y){var l,i,c,oa;oa=s.y_base+y;if(oa>=s.cur_h)oa-=s.cur_h;l=s.lines[oa];c=32|(s.def_attr<<16);for(i=x;i<s.w;i++)l[i]=c;qa(y);}function sa(s,ta){var j,n;if(ta.length==0){s.cur_attr=s.def_attr;}else{for(j=0;j<ta.length;j++){n=ta[j];if(n>=30&&n<=37){s.cur_attr=(s.cur_attr&~(7<<3))|((n-30)<<3);}else if(n>=40&&n<=47){s.cur_attr=(s.cur_attr&~7)|(n-40);}else if(n==0){s.cur_attr=s.def_attr;}}}}var ua=0;var va=1;var wa=2;var i,c,fa,ga,l,n,j,oa;fa=this.h;ga=-1;qa(this.y);if(this.y_base!=this.y_disp){this.y_disp=this.y_base;fa=0;ga=this.h-1;}for(i=0;i<pa.length;i++){c=pa.charCodeAt(i);switch(this.state){case ua:switch(c){case 10:if(this.convert_lf_to_crlf){this.x=0;}this.y++;if(this.y>=this.h){this.y--;this.scroll();fa=0;ga=this.h-1;}break;case 13:this.x=0;break;case 8:if(this.x>0){this.x--;}break;case 9:n=(this.x+8)&~7;if(n<=this.w){this.x=n;}break;case 27:this.state=va;break;default:if(c>=32){if(this.x>=this.w){this.x=0;this.y++;if(this.y>=this.h){this.y--;this.scroll();fa=0;ga=this.h-1;}}oa=this.y+this.y_base;if(oa>=this.cur_h)oa-=this.cur_h;this.lines[oa][this.x]=(c&65535)|(this.cur_attr<<16);this.x++;qa(this.y);}break;}break;case va:if(c==91){this.esc_params=new Array();this.cur_param=0;this.state=wa;}else{this.state=ua;}break;case wa:if(c>=48&&c<=57){this.cur_param=this.cur_param*10+c-48;}else{this.esc_params[this.esc_params.length]=this.cur_param;this.cur_param=0;if(c==59)break;this.state=ua;switch(c){case 65:n=this.esc_params[0];if(n<1)n=1;this.y-=n;if(this.y<0)this.y=0;break;case 66:n=this.esc_params[0];if(n<1)n=1;this.y+=n;if(this.y>=this.h)this.y=this.h-1;break;case 67:n=this.esc_params[0];if(n<1)n=1;this.x+=n;if(this.x>=this.w-1)this.x=this.w-1;break;case 68:n=this.esc_params[0];if(n<1)n=1;this.x-=n;if(this.x<0)this.x=0;break;case 72:{var xa,oa;oa=this.esc_params[0]-1;if(this.esc_params.length>=2)xa=this.esc_params[1]-1;else xa=0;if(oa<0)oa=0;else if(oa>=this.h)oa=this.h-1;if(xa<0)xa=0;else if(xa>=this.w)xa=this.w-1;this.x=xa;this.y=oa;}break;case 74:ra(this,this.x,this.y);for(j=this.y+1;j<this.h;j++)ra(this,0,j);break;case 75:ra(this,this.x,this.y);break;case 109:sa(this,this.esc_params);break;case 110:this.queue_chars("\x1b["+(this.y+1)+";"+(this.x+1)+"R");break;default:break;}}break;}}qa(this.y);if(ga>=fa)this.refresh(fa,ga);};Term.prototype.writeln=function(pa){this.write(pa+'\r\n');};Term.prototype.keyDownHandler=function(ya){var pa;pa="";switch(ya.keyCode){case 8:pa="";break;case 9:pa="\t";break;case 13:pa="\r";break;case 27:pa="\x1b";break;case 37:pa="\x1b[D";break;case 39:pa="\x1b[C";break;case 38:if(ya.ctrlKey){this.scroll_disp(-1);}else{pa="\x1b[A";}break;case 40:if(ya.ctrlKey){this.scroll_disp(1);}else{pa="\x1b[B";}break;case 46:pa="\x1b[3~";break;case 45:pa="\x1b[2~";break;case 36:pa="\x1bOH";break;case 35:pa="\x1bOF";break;case 33:if(ya.ctrlKey){this.scroll_disp(-(this.h-1));}else{pa="\x1b[5~";}break;case 34:if(ya.ctrlKey){this.scroll_disp(this.h-1);}else{pa="\x1b[6~";}break;default:if(ya.ctrlKey){if(ya.keyCode>=65&&ya.keyCode<=90){pa=String.fromCharCode(ya.keyCode-64);}else if(ya.keyCode==32){pa=String.fromCharCode(0);}}else if((!this.is_mac&&ya.altKey)||(this.is_mac&&ya.metaKey)){if(ya.keyCode>=65&&ya.keyCode<=90){pa="\x1b"+String.fromCharCode(ya.keyCode+32);}}break;}if(pa){if(ya.stopPropagation)ya.stopPropagation();if(ya.preventDefault)ya.preventDefault();this.show_cursor();this.key_rep_state=1;this.key_rep_str=pa;this.handler(pa);return false;}else{this.key_rep_state=0;return true;}};Term.prototype.keyPressHandler=function(ya){var pa,za;if(ya.stopPropagation)ya.stopPropagation();if(ya.preventDefault)ya.preventDefault();pa="";if(!("charCode"in ya)){za=ya.keyCode;if(this.key_rep_state==1){this.key_rep_state=2;return false;}else if(this.key_rep_state==2){this.show_cursor();this.handler(this.key_rep_str);return false;}}else{za=ya.charCode;}if(za!=0){if(!ya.ctrlKey&&((!this.is_mac&&!ya.altKey)||(this.is_mac&&!ya.metaKey))){pa=String.fromCharCode(za);}}if(pa){this.show_cursor();this.handler(pa);return false;}else{return true;}};Term.prototype.queue_chars=function(pa){this.output_queue+=pa;if(this.output_queue)setTimeout(this.outputHandler.bind(this),0);};Term.prototype.outputHandler=function(){if(this.output_queue){this.handler(this.output_queue);this.output_queue="";}};