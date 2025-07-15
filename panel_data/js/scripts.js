function imgrequest( url, el )
{
	var httpRequest;
	try { httpRequest = new XMLHttpRequest(); }
	catch (trymicrosoft) { try { httpRequest = new ActiveXObject('Msxml2.XMLHTTP'); } catch (oldermicrosoft) { try { httpRequest = new ActiveXObject('Microsoft.XMLHTTP'); } catch(failed) { httpRequest = false; } } }
	if (!httpRequest) { alert('Your browser does not support Ajax.'); return false; }
	if ( typeof(el)!='undefined' ) {
		el.onclick = null;
		el.style.opacity = '0.3';
		httpRequest.onreadystatechange = function()
		{
			if (httpRequest.readyState == 4) if (httpRequest.status == 200) el.style.opacity = '0.7';
		}
	}
	httpRequest.open('GET', url, true);
	httpRequest.send(null);
}

function selectvendor( sel )
{
	var value = sel.value;
	//alert('Selected Vendor: '+value);

	var httpRequest;
	try { httpRequest = new XMLHttpRequest(); }
	catch (trymicrosoft) { try { httpRequest = new ActiveXObject('Msxml2.XMLHTTP'); } catch (oldermicrosoft) { try { httpRequest = new ActiveXObject('Microsoft.XMLHTTP'); } catch(failed) { httpRequest = false; } } }
	if (!httpRequest) { alert('Your browser does not support Ajax.'); return false; }
	httpRequest.onreadystatechange = function()
	{
		if (httpRequest.readyState == 4) if (httpRequest.status == 200) location.reload();
	}
	httpRequest.open('GET', "vendor_set?id="+value+"&action=select", true);
	httpRequest.send(null);
}

function loadDiv(div, type, id, data) { var xhttp = new XMLHttpRequest(); xhttp.onreadystatechange = function() { if (this.readyState==4 && this.status==200) { document.getElementById(div).innerHTML=this.responseText; } }; xhttp.open("GET", "ajax.php?type="+type+"&id="+id+"&data="+data, true); xhttp.send(); }



