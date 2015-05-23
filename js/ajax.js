  //ajax.js
var ajaxRequest;	// The variable that makes Ajax possible!

function ajaxGetCountries(cb){

	getHttpRequest();

 	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){		
			if(typeof cb === 'function')
				cb(JSON.parse(ajaxRequest.responseText));
			}
 		}

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_countries.php" , true);
	ajaxRequest.send(null); 
}

function ajaxGetPorts(countryID, cb){

	getHttpRequest();
		
 	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			if (typeof cb === 'function')
				cb(JSON.parse(ajaxRequest.responseText))
			}
		}

	var queryString = "?countryID=" + countryID ;

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_ports.php" + queryString , true);
	ajaxRequest.send(null); 
}


function ajaxGetCountryID(country, cb){

	getHttpRequest();	

 	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
				if(typeof cb === 'function')
					cb(ajaxRequest.response);		
			}
 		}

	var queryString = "?country=" + country ;

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_countryID.php" + queryString, true);
	ajaxRequest.send(null); 
}


function ajaxGetCountryName(countryID, cb){

	getHttpRequest();	
	
 	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
				if(typeof cb === 'function')
					cb(ajaxRequest.response);					
			}
 		}

	var queryString = "?countryID=" + countryID ;

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_countryname.php" + queryString, true);
	ajaxRequest.send(null); 
}

function ajaxGetPortName(portID,cb) {

	getHttpRequest();
	
	ajaxRequest.onreadystatechange = function() {
		if(ajaxRequest.readyState == 4) {
			if(typeof cb === 'function')
				cb(ajaxRequest.response);	
		}
	}
	
	var queryString = "?portID=" + portID ;

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_portname.php" + queryString, true);
	ajaxRequest.send(null); 
}



function ajaxGetPortID(port, cb){

	getHttpRequest();	

 	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			if(typeof cb === 'function')
			cb(ajaxRequest.response);
		}
 	}

	var queryString = "?port=" + port ;

	ajaxRequest.open("GET", "http://localhost/Yellowstone/php/get_portID.php" + queryString, true);
	ajaxRequest.send(null); 

}



function getHttpRequest() {

	try { // Opera 8.0+, Firefox, Safari	
		ajaxRequest = new XMLHttpRequest();
	} catch (err){ // Internet Explorer Browsers
	
	try {
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (err) {
		
			try { // Old Internet Explorer Browsers
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (err){
			
			// Something went wrong
			alert("Your browser broke!");
			return false;
			}
		}
	}
}