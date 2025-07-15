var chlist = [];

function addchannel(id)
{
	chlist.push(id);
}

function delchannel(id)
{
	var idx = chlist.indexOf(id);
	if (idx != -1) chlist.splice(idx,1);
}

function refresh_selection()
{
	var table = document.getElementById("selTable");
	var rowCount = table.rows.length;
	var text = "Selected streams ("+rowCount+")";
	if (rowCount>0) {
		for (var i=0; i<rowCount; i++) {       
			var row = table.rows[i];
			var ss = row.id;
			if (ss[0]=='C')
			if (ss[1]=='H')
				text = text + '<br>' + ss.substr(2);
		}
	}

	//document.getElementById("myDiv").innerHTML = text;
}

var selrow =-1;
function select_row(id)
{
	if (selrow!=-1) {
		var row = document.getElementById("CH"+selrow);
		if (row) row.style.backgroundColor = "";
	}
	var row = document.getElementById("CH"+id);
	if (row) {
		selrow = id;
		row.style.backgroundColor = "#FA0";
	}
}

function update_selection(el)
{
	var table = document.getElementById("selTable");
	if (el.checked==true) {
		var pos = table.rows.length;
		if (selrow!=-1) {
			var row = document.getElementById("CH"+selrow);
			if (row) pos = row.rowIndex+1;
		}
		var row = table.insertRow(pos);
		row.id = "CH"+el.value;
		var cell1 = row.insertCell(0);
		cell1.innerHTML = "<img src='/images/moveup.png' onclick='moveup("+el.value+");'> <img src='/images/moveup10.png' onclick='moveup10("+el.value+");'>";
		cell1.style.width = "50px";
		var cell2 = row.insertCell(1);
		cell2.onclick = function(){ select_row(el.value); };
		cell2.innerHTML = el.name;
		//cell2.style.width = "150px";
		var cell3 = row.insertCell(2);
		cell3.innerHTML = "<img src='/images/movedown10.png' onclick='movedown10("+el.value+");'> <img src='/images/movedown.png' onclick='movedown("+el.value+");'>";
		cell3.style.width = "50px";
		select_row(el.value);
		if (row.offsetTop < selDiv.scrollTop) selDiv.scrollTop = row.offsetTop;
		else if ( (selDiv.scrollTop+selDiv.offsetHeight-2*row.offsetHeight) < (row.offsetTop) ) selDiv.scrollTop = row.offsetTop-selDiv.offsetHeight+4*row.offsetHeight;

	}
	else {
		var rowIndex = document.getElementById("CH"+el.value).rowIndex;
		table.deleteRow(rowIndex);
	}	//else document.getElementById("myTable").deleteRow(el.value);

	refresh_selection();
}


function selectAll()
{
	var container = document.getElementById('itemDiv');
	var inputs = container.getElementsByTagName('input');
	var index;
	for (index = 0; index < inputs.length; ++index) {
		if (inputs[index].checked != true) {
			inputs[index].checked = true;
			update_selection( inputs[index] );
		}
	}
}

function deselectAll()
{
	var container = document.getElementById('itemDiv');
	var inputs = container.getElementsByTagName('input');
	var index;
	for (index = 0; index < inputs.length; ++index) {
		if (inputs[index].checked == true) {
			inputs[index].checked = false;
			update_selection( inputs[index] );
		}
	}
}


function moveup(id)
{
	var row = document.getElementById('CH'+id);
	var RowLocation = row.rowIndex;
	var table = document.getElementById('selTable');
	var rows = table.rows;
	if ( (RowLocation>0) && (RowLocation < rows.length) ) {
		if (table.moveRow) table.moveRow (rows[RowLocation], rows[RowLocation-1]);
		else row.parentNode.insertBefore( rows[RowLocation], rows[RowLocation-1]);
	}
}

function moveup10(id)
{
	for (i=0; i<10; i++) {
		var row = document.getElementById('CH'+id);
		var RowLocation = row.rowIndex;
		var table = document.getElementById('selTable');
		var rows = table.rows;
		if ( (RowLocation>0) && (RowLocation < rows.length) ) {
			if (table.moveRow) table.moveRow (rows[RowLocation], rows[RowLocation-1]);
			else row.parentNode.insertBefore( rows[RowLocation], rows[RowLocation-1]);
		}
	}
}

function movedown(id)
{
	var row = document.getElementById('CH'+id);
	var RowLocation = row.rowIndex;
	var table = document.getElementById('selTable');
	var rows = table.rows;
	if ((RowLocation < (rows.length - 1))) {
		if (table.moveRow) table.moveRow ( rows[RowLocation+1], rows[RowLocation] );
		else row.parentNode.insertBefore( rows[RowLocation+1], rows[RowLocation]);
	}
}


function movedown10(id)
{
	for (i=0; i<10; i++) {
		var row = document.getElementById('CH'+id);
		var RowLocation = row.rowIndex;
		var table = document.getElementById('selTable');
		var rows = table.rows;
		if ((RowLocation < (rows.length - 1))) {
			if (table.moveRow) table.moveRow ( rows[RowLocation+1], rows[RowLocation] );
			else row.parentNode.insertBefore( rows[RowLocation+1], rows[RowLocation]);
		}
	}
}

function dosubmit(myForm)
{
	var table = document.getElementById("selTable");
	var rowCount = table.rows.length;
	var text = "";
	if (rowCount>0) {
		for (var i=0; i<rowCount; i++) {       
			var row = table.rows[i];
			var ss = row.id;
			if (ss[0]=='C')
			if (ss[1]=='H')
				text = text+' '+ss.substr(2);
		}
	}
	// Create a hidden input element, and append it to the form:
 	var form = document.getElementById("myForm");
	var input = document.createElement('input');
	input.type = 'hidden';
	input.name = 'list';
	input.value = text;
	form.appendChild(input);
	form.submit();
}
