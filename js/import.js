function importStream(id,channelid)
{
	var row=document.getElementById(id);
	row.cells.item(2).innerHTML="<img src='/images/loading.gif'>";
	var stream=row.cells.item(3).innerHTML;
	var formElement=document.getElementById("streamForm");
	var data=new FormData(formElement);
	data.append('channel_id', channelid);
	data.append('stream_source', stream);

	var xhr=new XMLHttpRequest();
	xhr.open("POST", "/stream_add");
	xhr.onload=function(){
		if (this.status===200) {
			row.cells.item(2).innerHTML="<i class='fas fa-check icon icon-online'></i>";
			row.cells.item(3).innerHTML="<a href='/stream_edit?id="+this.responseText+"'>"+stream+"</a>";
		}
		else row.cells.item(2).innerHTML="<img src='/images/red_cross.png'>";
	};
	xhr.send(data);
}

function importChannel(id,addstream){
	var row=document.getElementById(id);
	row.cells.item(0).innerHTML="<img src='/images/loading.gif'>";
	var name=row.cells.item(1).innerHTML;
	var formElement=document.getElementById("channelForm");
	var data=new FormData(formElement);
	data.append('channel_name', name);
	var xhr=new XMLHttpRequest();
	xhr.open("POST", "/channel_add");
	xhr.onload=function(){
		if (this.status===200) {
			var channelid = this.responseText;
			row.cells.item(0).innerHTML="<i class='fas fa-check icon icon-online'></i>";
			row.cells.item(1).innerHTML="<a href='/channel_edit?id="+channelid+"'>"+name+"</a>";
			if (addstream) importStream(id, channelid);
			else {
				row.cells.item(2).onclick = function() { importStream(id,channelid); };
				row.cells.item(2).innerHTML="<i class='fas fa-video-plus icon'></i>";
			}
		}
		else row.cells.item(0).innerHTML="<img src='/images/red_cross.png'>";
	};
	xhr.send(data);
}

