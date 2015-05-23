//main.js

//Global Variable
var blnPlaceHolder = false;
var portsInCountry = [];

//load dropdown with countries only after DOM is fully loaded
window.addEventListener("load", init, false);

function init(){		
	ajaxGetCountries(function(allcountries){
	
		//fill dropdown with countries
		var lst = document.getElementById('lstCountry');
	
		for(var i = 0 ; i < allcountries.length ; i++) {
			var opt = document.createElement('option');
				opt.innerHTML = allcountries[i];
				opt.value = allcountries [i];
			lst.appendChild(opt);
			}
			if(!blnPlaceHolder) {
				addPlaceHolder(lst,"Choose Country");
			}
	});
}


function getCountryName() {

	var lst = document.getElementById("lstCountry");
	var countryID = document.getElementById("lblCountryID").value;
	
	if(countryID.length == 2) {
		lblPortID.focus();
		ajaxGetCountryName(countryID, function(countryName) {

			if(blnPlaceHolder) {
				removePlaceHolder(lst);		
			}
						
			if(countryName.length > 0 ) {
				lst.value = countryName;
			}
			else { //TODO -> error icon
				addPlaceHolder(lst, "No country " + countryID.toUpperCase());
					lst.selectedIndex = 0;	
					lblCountryID.select();
			}			
			//getPorts(countryID);
			ajaxGetPorts(countryID, function (ports) {
				portsInCountry = ports;
				showPorts(portsInCountry);
			});
		});
	}
}

function getPortName() {
	
	var lst = document.getElementById("lstPort");
	var portID = document.getElementById("lblPortID").value;

	if(portID.length == 3) {	

		ajaxGetPortName(portID, function(portName) {
		
			if(blnPlaceHolder) {removePlaceHolder(lst);}
			
			addPlaceHolder(lst,portName);
		});
	}
}

//TODO -> IN PROGRESS
function getPortID() {

	var lst = document.getElementById("lstPort");	
	var portname = lst.options[lst.selectedIndex].text;
	var id = document.getElementById('lblPortID');

	if(blnPlaceHolder) {removePlaceHolder(lst);}
		
	ajaxGetPortID(portname, function(portID) {

		if(portID.length > 0) {
			id.value = portID;
			}
		else {
			id.value = "??";
		}
	});
}


function getCountryID() {
	var lst = document.getElementById("lstCountry");
	var countryname = lst.options[lst.selectedIndex].text;
	
	if(blnPlaceHolder) {removePlaceHolder(lst);}
	
	document.getElementById('lblPortID').value = "";
	
	ajaxGetCountryID(countryname, function(countryID) {	
		document.getElementById('lblCountryID').value = countryID;

		getPorts(countryID);
	});
}



function showPorts(allports) {
	//ajaxGetPorts(countryID, function (allports) {
	
		var lst = document.getElementById('lstPort');
		lst.options.length = 0;	//remove list
		
		if(allports.length > 0) {
	
			for(var i = 0 ; i < allports.length ; i++) {
				var opt = document.createElement('option');
					opt.innerHTML = allports[i].toUpperCase();
					opt.value = allports [i];
				lst.appendChild(opt);
			}
			addPlaceHolder(lst,"Select port");
		}
		else {
			addPlaceHolder(lst, "No ports found");
		}
	//});
}

function addPlaceHolder(lst, string) {
	var opt = document.createElement('option');	//add PlaceHolder
		opt.text = string;
		lst.add(opt, lst[0]);	
	blnPlaceHolder = true;
	}
	
function removePlaceHolder(lst) {
	var opt = document.createElement('option');
		lst.remove(opt, lst[0]);
	blnPlaceHolder = false;	
}



//TODO
function OnSearch (searchstring) {
	if(!searchstring.value == "") {
		alert ("The current value of the search field is\n" + searchstring.value);
	 }
	 else {
		//alert("search cancelled..");
	 }
}
	



function showPortID(portID) {
		var g = document.getElementById('lblPortID');
		g.setAttribute ("value", portID);
}










