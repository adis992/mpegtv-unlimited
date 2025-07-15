function init(){initf=1,stb.InitPlayer();var a=stb.RDir('Model ');try{cur_volume=parseInt(stb.RDir('getenv audio_initial_volume'));}catch(e){log(e);cur_volume=100;stb.RDir('setenv audio_initial_volume 70');}isNaN(cur_volume)&&(cur_volume=100,stb.RDir('setenv audio_initial_volume 70')),stb.EnableServiceButton(!0),stb.EnableVKButton(!0),stb.SetTopWin(0);switch(screen.height){case 480:document.body.style.zoom='0.56';break;case 576:document.body.style.zoom='0.56';break;case 720:break;case 1080:document.body.style.zoom='1.5';break;}document.body.style.display='block',document.getElementById('msg').style.display='none',document.getElementById('msg').innerHTML='',document.cookie.MW_SSID===undefined?(user=stb.GetDeviceSerialNumber(),pass=stb.GetDeviceMacAddress().toUpperCase(),user&&pass&&fetch()):fetch_ch();}
function fetch(){
	var a=new XMLHttpRequest();
	a.onload=function(c){
		var b=JSON.parse(a.responseText);
		b.error?(document.getElementById('msg').style.display='block',document.getElementById('msg').innerHTML='<br><h1>Invalid user or pass</h1><h1>User:'+user+'</h1><h1>Pass:'+pass+'</h1><br><div style="width: 40px;height: 20px;background: #f00; margin: 0 190px; text-align: center;"><div style=" margin: 0 60px; ">RESTART</div></div>'):(document.cookie='MW_SSID='+b.sid,MW_SSID=b.sid,fetch_ch());
	},a.open('GET','/napi/login?login='+user+'&pass='+pass,!0),a.send();
}

function fetch_ch(){
	var a=new XMLHttpRequest();
	a.onload=function(f){
		var b=JSON.parse(a.responseText);
		if(b.error)document.cookie='MW_SSID=',document.getElementById('msg').style.display='block',document.getElementById('msg').innerHTML='<br><h1>Invalid channel list</h1><<h1>User:'+user+'</h1><h1>Pass:'+pass+'</h1><br><div style="width: 40px;height: 20px;background: #f00; margin: 0 190px; text-align: center;"><div style=" margin: 0 60px; ">RESTART</div></div>';
		else {
			var d=0;
			for(var c in b.groups) {
				entries[d] = [];
				entries[d].id = b.groups[c].i;
				entries[d].type = b.groups[c].t;
				entries[d].name = b.groups[c].n;
				entries[d].list = [];
				for(var e in b.groups[c].l) entries[d].list.push({id:b.groups[c].l[e].i,title:b.groups[c].l[e].n});
				d++;
			}
			drawInit(),drawPlaylist();
		}
	},a.open('GET','/napi/channel_list?MW_SSID='+MW_SSID,!0),a.send();
}

function fepgday(){ if (entries[selCat].type==1) return;var a=new XMLHttpRequest();a.onload=function(m){var e=JSON.parse(a.responseText);var d=new Date();var f=d.getHours();var g=d.getMinutes();var b=(f<10?'0':'')+f;b+=(g<10?':0':':')+g;var h=d.getDate();var i=d.getMonth()+1;var k=d.getFullYear();b+=(h<10?' 0':' ')+h,b+=(i<10?'.0':'.')+i,b+='.'+k,clearTimeout(timer1);var l=parseInt(new Date().getTime()/1000);var j='<h1>'+b+'</h1><br>';var c;for(c=0;c<e.epg.length;c++)if(j+='<p><b>'+e.epg[c].t_start+'</b> '+e.epg[c].progname+'</p><br><br>',c>11)break;document.getElementById('pepg').innerHTML=j;},a.open('GET','/napi/epg?cid='+entries[selCat].list[cursor].id+'&MW_SSID='+MW_SSID,!0),a.send();}
function fepgh(){if (entries[selCat].type==1) return;var a=new XMLHttpRequest();a.onload=function(m){var e=JSON.parse(a.responseText);var b=new Date();var f=b.getHours();var g=b.getMinutes();var c=(f<10?'0':'')+f;c+=(g<10?':0':':')+g;var h=b.getDate();var i=b.getMonth()+1;var k=b.getFullYear();c+=(h<10?' 0':' ')+h,c+=(i<10?'.0':'.')+i,c+='.'+k,clearTimeout(timer1);var l=parseInt(new Date().getTime()/1000);var j='<p>';var d;for(d=0;d<e.epg.length;d++)j+='<b>'+e.epg[d].t_start+'</b> '+e.epg[d].progname+'<br>';document.getElementById('tepg').innerHTML=j+'</p>';},a.open('GET','/napi/epg_next?cid='+entries[selCat].list[cursor].id+'&MW_SSID='+MW_SSID,!0),a.send();}
function drawInit(){document.getElementById('channels-list').style.display='block',document.getElementById('channels-cat').style.display='block',document.getElementById('pepg').style.display='block';}
function drawPlaylist(){var b='';for(var a in entries[selCat].list){var c=('00'+(Number(a)+1)).slice(-3);b+='<div id="'+a.toString()+'" class="channel" ><span class="numt"><b>'+c+'</b></span><span class="title"><b>'+entries[selCat].list[a].title+'</b></span></div>';}document.getElementById('channels-cat').innerHTML='<div id="cat" class="channel" ></div>',document.getElementById('channels-list-wrap').innerHTML=b,drawCurrent(),drawCursor();}
function hasClass(a,b){return a.getAttribute('class').indexOf(b)>-1;}
function addClass(a,b){a.classList?a.classList.add(b):hasClass(a,b)||a.setAttribute('class',a.getAttribute('class')+' '+b);}
function removeClass(a,b){a.classList?a.classList.remove(b):hasClass(a,b)&&a.setAttribute('class',a.getAttribute('class').replace(b,' '));}
function drawCurrent(){var a=document.getElementsByClassName('current');if(a[0]!=undefined){var b=document.getElementById(a[0].id);removeClass(b,'current');}var c=document.getElementById(selChn);addClass(c,'current');}
function drawCursor(){var a=document.getElementsByClassName('cursor');if(a[0]!=undefined){var b=document.getElementById(a[0].id);removeClass(b,'cursor');}var c=document.getElementById(cursor);addClass(c,'cursor'),document.getElementById('channels-cat').innerHTML='<div id="cat" class="channel" ><div><h1 class="list-scroll-l" ></h1></div><div><h1 class="list-scroll-r" ></h1></div><span class="title"><b>'+entries[selCat].name+'</b></span><div class="osd"><div class="red">RESET</div><div class="green">VOD</div><div class="yellow">PPV</div><div class="blue">TS</div></div></div>';var d=Math.floor(cursor/pageSize);var e='-'+entryHeight*pageSize*d+'px';document.getElementById('channels-list-wrap').style.marginTop=e,document.getElementById('channels-list-wrap').focus();}
function setChannel(b){for(var a in entries[selCat].list)entries[selCat].list[a].id===b&&(cursor=a,setCurrentUnderCursor(),drawCurrent(),drawCursor());}
function switchNext(){selChn+1 in entries[selCat].list&&selChn++,drawCurrent();}
function switchPrev(){selChn-1 in entries[selCat].list&&selChn--,drawCurrent();}
function cursorNext(){cursor+1 in entries[selCat].list&&cursor++,drawCursor();}
function cursorPrev(){cursor-1 in entries[selCat].list&&cursor--,drawCursor();}
function cursorNextPage(){for(var a=0;a<pageSize;a++)cursor+1 in entries[selCat].list&&cursor++;drawCursor();}
function cursorPrevPage(){for(var a=0;a<pageSize;a++)cursor-1 in entries[selCat].list&&cursor--;drawCursor();}
function getCurrentChannel(){return entries[selCat].list[selChn];}
function getUnderCursorChannel(){return entries[selCat].list[cursor];}
function setCurrentUnderCursor(){selChn=cursor,drawCurrent();}
function setCurrentChannel(a){selChn=a,cursor=a,playChn=a,playCat=selCat,drawCurrent(),drawCursor();}
function showList(){document.getElementById('channels-list').style.display='block',document.getElementById('channels-cat').style.display='block',document.getElementById('pepg').style.display='block',visible=!0,stb.SetTopWin(0);}
function hideList(){document.getElementById('channels-list').style.display='none',document.getElementById('channels-cat').style.display='none',document.getElementById('pepg').style.display='none',visible=!1,stb.SetTopWin(1);}
function showBar(){document.getElementById('info_footer').style.display='block';var a=('000'+(selChn+1)).slice(-4);document.getElementById('info_footer').innerHTML='<div class="box"><span class="inner">'+a+'</span></div><div class="tex"><b>'+entries[selCat].list[selChn].title+'</b></div><div id="tepg" class="tepg"></div>',fepgh(),stb.SetTopWin(0),clearTimeout(window.timer2),timer2=window.setTimeout(function(){document.getElementById('info_footer').style.display='none';},10000);}
function hideBar(){document.getElementById('info_footer').style.display='none',stb.SetTopWin(1);}

function loadToVideo(id){
	var b = '/napi/get_url?cid='+id+'&MW_SSID='+MW_SSID;
	if (entries[selCat].type==1) b = '/napi/get_url?vid='+id+'&MW_SSID='+MW_SSID;
	var a=new XMLHttpRequest();
	a.onload=function(h){
		var e=JSON.parse(a.responseText);
		if(!e.error){
			clurl=e.url,stb.Play(e.url);
		}
	},a.open('GET',b,!0),a.send();
}

function body_keyDown(c){
	var d=c.keyCode||c.which;
	if(button_blocked){c.preventDefault();return;}
	switch(d){
		case 9:c.shiftKey?visible?(cursorNext(),fepgday()):(switchPrev(),setCurrentChannel(selChn),loadToVideo(entries[selCat].list[selChn].id),showBar()):visible?(cursorPrev(),fepgday()):(switchNext(),setCurrentChannel(selChn),loadToVideo(entries[selCat].list[selChn].id),showBar());break;
		// Back=8
		case 8:case 27:case 83:stb.Stop();hideBar();showList();break;
		// ok
		case 13:c.preventDefault();setCurrentUnderCursor();
			if ((selChn!=playChn)||(playCat!=selCat)) {
				playChn=selChn,playCat=selCat,loadToVideo(entries[selCat].list[selChn].id),stb.SetTopWin(0);
			}
			else {
				visible?hideList():(hideBar(),showList());
			}
			break;
		// left
		case 37:visible&&(selChn=0,cursor=0,selCat<=0?selCat=entries.length-1:selCat--,drawPlaylist());break;
		// right
		case 39:visible&&(selChn=0,cursor=0,selCat>=entries.length-1?selCat=0:selCat++,drawPlaylist());break;
		// up
		case 38:visible?(cursorPrev(),fepgday()):(switchNext(),setCurrentChannel(selChn),loadToVideo(entries[selCat].list[selChn].id),showBar());break;
		// dn
		case 40:visible?(cursorNext(),fepgday()):(switchPrev(),setCurrentChannel(selChn),loadToVideo(entries[selCat].list[selChn].id),showBar());break;
		// PgUP=33
		case 33:if (visible) cursorPrevPage();break;
		// PgDN=34
		case 34:if (visible) cursorNextPage();break;

		//case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:channel_set=!0;clearTimeout(chan_tmo);var b=d-48;document.getElementById('chan_num').innerHTML+=b;parseInt(document.getElementById('chan_num').innerHTML)>entries[selCat].list.length&&(document.getElementById('chan_num').innerHTML=entries[selCat].list.length);parseInt(document.getElementById('chan_num').innerHTML)<1&&(document.getElementById('chan_num').innerHTML=1);chan_tmo=window.setTimeout(function(){b=parseInt(document.getElementById('chan_num').innerHTML)-1,setCurrentChannel(b),loadToVideo(entries[selCat].list[b].id),visible||showBar(),document.getElementById('chan_num').innerHTML='',channel_set=!1;},3000);break;

		case 85:event.altKey&&(standby==0?(standby=!0,stb.StandBy(!0),stb.ExecAction('front_panel led-on')):(stb.StandBy(!1),standby=!1,stb.ExecAction('front_panel led-off'),init()));break;

		case 112:stb.Stop();window.location.href='index.html';break;
		// Vol-
		case 109:stb.SetTopWin(0);clearTimeout(volume_timer);var a=stb.GetMute();a==1&&(clearTimeout(volume_timer),document.getElementById('volume_form').style.display='block',document.getElementById('volume_cont').style.display='block',window.setTimeout(function(){document.getElementById('volume_form').style.display='none';},2000),document.getElementById('mute').style.display='none');cur_volume>4&&(cur_volume-=5);stb.SetVolume(cur_volume);document.getElementById('volume_form').style.display='block';document.getElementById('volume_line').style.width=cur_volume*2-5+'px';document.getElementById('volume_cnt').innerHTML=cur_volume+'%';volume_timer=window.setTimeout(function(){document.getElementById('volume_form').style.display='none';},2000);break;
		// Vol+
		case 107:stb.SetTopWin(0);clearTimeout(volume_timer);var a=stb.GetMute();a==1&&(clearTimeout(volume_timer),document.getElementById('volume_form').style.display='block',document.getElementById('volume_cont').style.display='block',window.setTimeout(function(){document.getElementById('volume_form').style.display='none';},2000),document.getElementById('mute').style.display='none');cur_volume<96&&(cur_volume+=5);stb.SetVolume(cur_volume);document.getElementById('volume_form').style.display='block';document.getElementById('volume_line').style.width=cur_volume*2-5+'px';document.getElementById('volume_cnt').innerHTML=cur_volume+'%';volume_timer=window.setTimeout(function(){document.getElementById('volume_form').style.display='none';},2000);break;
		case 192:stb.SetTopWin(0);var a=stb.GetMute();stb.SetMute(1-a);a==1?(clearTimeout(volume_timer),document.getElementById('volume_form').style.display='block',document.getElementById('volume_cont').style.display='block',window.setTimeout(function(){document.getElementById('volume_form').style.display='none';},2000),document.getElementById('mute').style.display='none'):(clearTimeout(volume_timer),document.getElementById('volume_form').style.display='block',document.getElementById('volume_cont').style.display='none',document.getElementById('mute').style.display='block');break;
		//RED=112
		//GREEN=113
		//Yellow=114
		//Blue=115
	}
}

var stb=gSTB,v_idx=0,h_idx=0,cur_page=0,cur_volume=0,standby=!1,channel_set=!1,button_blocked=!1,user='',pass='',MW_SSID='',entries=[],visible=!0,selCat=0,selChn=0,cursor=0,pageSize=10,entryHeight=47,playCat=-1,playChn=-1,chan_tmo=0,volume_timer=0,timer1=0,timer2=0,timer3=0,clurl='',ev_c=0,initf=0;
var stbEvent={onEvent:function(b){if(b==5){var a=1000;a*=ev_c<=2?1:30,timer3=window.setTimeout(function(){stb.Play(clurl);},a),ev_c++;}b==4&&(ev_c=0);},event:0};

=1000;a*=ev_c<=2?1:30,timer3=window.setTimeout(function(){stb.Play(clurl);},a),ev_c++;}b==4&&(ev_c=0);},event:0};

