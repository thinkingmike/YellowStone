<?php //get_ports.php
header("Access-Control-Allow-Origin: *");

//selected value from listbox returned by 'get' method
//PHP security -> prefix name , in this case result : $find_countryID
extract($_GET, EXTR_PREFIX_ALL, 'find');

//Database Connection
require_once 'login.php';
$conn = mysqli_connect($host, $user, $password, $dbName);
if($conn->connect_error) {
	trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
} 

$sql = "SELECT portName
		FROM allPorts 
		WHERE countryID
		LIKE '$find_countryID'
		ORDER BY portName ASC";
$result = $conn->query($sql);

if($result === false) {
	//trap SQL error
}
else {
	$rows_returned = $result->num_rows;
}

//create array for results
$ports = array();
//$ports[0] = ' Choose a Port';
	
for ($j = 0 ; $j < $rows_returned ; ++$j)
{
	$result->data_seek($j);
	$row = $result->fetch_array(MYSQLI_ASSOC);	
	//add results to array
	$ports[$j] = $row['portName'];
}

$result->close();
$conn->close();

$jsondata = json_encode($ports);
echo $jsondata;
?>