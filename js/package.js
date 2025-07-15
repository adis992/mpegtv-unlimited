function addHidden(theForm, name, value ) {
    // Create a hidden input element, and append it to the form:
    var input = document.createElement('input');
    input.type = 'hidden';
    input.id = name;
    input.name = value;
    input.value = 1;
    theForm.appendChild(input);
}

function refresh_selection()
{
	var inputElems = document.getElementsByTagName("input");
	var count = 0;
	var text = "";
	for (var i=0; i<inputElems.length; i++) {       
		if (inputElems[i].type == "hidden") {
			count++;
			text = text + '<br>' + inputElems[i].id;
		}
	}
	if (count==0) document.getElementById("selection").innerHTML = "Please select ctegories";
	else if (count>0) document.getElementById("selection").innerHTML = count+" selected categories<br>"+text;
}

function update_selection(el)
{
	var theForm = document.forms['detParameterForm'];

	if (el.checked==true) {
		addHidden(theForm, el.name, el.value);
	}
	else {
		var inp = document.getElementById( el.name );
		if (inp) inp.remove();
	}

	refresh_selection();
}

