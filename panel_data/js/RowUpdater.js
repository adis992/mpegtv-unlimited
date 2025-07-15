var current_row = 0;
var last_row = 0;

var TimeoutID;
var requestError = 0;

function xmlupdateRow( xmlDoc, id )
{
	var row = document.getElementById(id);
	var cols = row.cells.length;
	for (i=0; i<cols; i++) {
		if (xmlDoc.getElementsByTagName('c'+i).length) row.cells.item(i).innerHTML = xmlDoc.getElementsByTagName('c'+i)[0].childNodes[0].nodeValue;
	}
	if ( xmlDoc.getElementsByTagName('class').length ) row.className = xmlDoc.getElementsByTagName('class')[0].childNodes[0].nodeValue;
}



function Updater(link)
{
	if (last_row!=current_row) {
		requestError = 0;
		last_row = current_row;
	}
	if ( !requestError && (current_row>0) ) {
		var httpRequest;
		try {
			httpRequest = new XMLHttpRequest();  // Mozilla, Safari, etc
		}
		catch(trymicrosoft) {
			try {
				httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch(oldermicrosoft) {
				try {
					httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch(failed) {
					httpRequest = false;
				}
			}
		}
		if (!httpRequest) {
			alert('Your browser does not support Ajax.');
			return false;
		}
		var saved_row = current_row;
		// Action http_request
		httpRequest.onreadystatechange = function()
		{
			if (httpRequest.readyState == 4) {
				if (httpRequest.status == 200) {
					requestError=0;
					xmlupdateRow( httpRequest.responseXML, 'Row'+saved_row );
				}
				else {
					requestError++;
					//TimeoutID = setTimeout("Updater("+link+")",1000);
				}
			}
		}
		httpRequest.open('GET', link+'?row='+saved_row, true);
		httpRequest.send(null);
		requestError++;
	}
}

function UpdateChannelRow(id)
{
	clearTimeout(TimeoutID);
	current_row = id;
	if (id>0) TimeoutID = setTimeout("Updater('channel_list')",1000);
}

function UpdateClientRow(id)
{
	clearTimeout(TimeoutID);
	current_row = id;
	if (id>0) TimeoutID = setTimeout("Updater('client_list')",1000);
}

function UpdateStreamRow(id)
{
	clearTimeout(TimeoutID);
	current_row = id;
	if (id>0) TimeoutID = setTimeout("Updater('stream_list')",1000);
}

function UpdateVendorRow(id)
{
	clearTimeout(TimeoutID);
	current_row = id;
	if (id>0) TimeoutID = setTimeout("Updater('vendor_list')",1000);
}


function UpdateVodRow(id)
{
	clearTimeout(TimeoutID);
	current_row = id;
	if (id>0) TimeoutID = setTimeout("Updater('vod_list')",1000);
}

