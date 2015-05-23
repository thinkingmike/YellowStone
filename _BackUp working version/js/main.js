//main.js

//load dropdown with countries after DOM is fully loaded
window.addEventListener("load", init, false);

function init(){	
	//fill dropdown with countries
	ajaxGetCountries(function(response){
		showCountries(response);
	});
}

function getCountryName(countryID) {
	if(countryID.value.length == 2) {
		ajaxGetCountryName(countryID.value, function(countryName) {
			lblPortID.focus();
			document.getElementById("lstCountry").value = countryName;
			//alert(countryName);
			getCountryID();
		});
	}
}

function portSearch(portID) {
	if(portID.value.length == 3) {
	//TODO
		alert("yess..");
	}
}

function test() {
	alert("test");
}

function OnSearch (searchstring) {
	if(!searchstring.value == "") {
		//TODO
		alert ("The current value of the search field is\n" + searchstring.value);
	 }
	 else {
		//TODO
		//alert("search cancelled..");
	 }
}
	
function showCountries(allcountries) {
	
	var lst = document.getElementById('lstCountry');
	
	for(var i = 0 ; i < allcountries.length ; i++) {
		var opt = document.createElement('option');
			opt.innerHTML = allcountries[i];
			opt.value = allcountries [i];
		lst.appendChild(opt);
		}
}

function getPortID() {

var e = document.getElementById("lstPort");
var port = e.options[e.selectedIndex].text;

ajaxGetPortID(port, function(portID) {
		showPortID(portID);
	});
}

function getCountryID() {

var e = document.getElementById("lstCountry");
var country = e.options[e.selectedIndex].text;

// 1)
ajaxGetCountryID(country, function(countryID) {	
	showCountryID(countryID);
	
		// 2)
		ajaxGetPorts(countryID, function (arrPorts) {
			showPorts(arrPorts);
		});
	});
}

function showCountryID(countryID) {		
		var f = document.getElementById('lblCountryID');
		f.setAttribute ("value", countryID);
}

function showPortID(portID) {
		var g = document.getElementById('lblPortID');
		g.setAttribute ("value", portID);
}

function showPorts(allports) {

var lst = document.getElementById('lstPort');
lst.innerHTML = "";		//remove former values from list
	
if(allports.length > 0) {
	lst.style.display = 'inline';
	
	for(var i = 0 ; i < allports.length ; i++) {
		var opt = document.createElement('option');
			opt.innerHTML = allports[i];
			opt.value = allports [i];
		lst.appendChild(opt);
		}
	}
else {
		var opt = document.createElement('option');
			opt.innerHTML = "No ports found";
			opt.value = 0;
		lst.appendChild(opt);
	}
}









