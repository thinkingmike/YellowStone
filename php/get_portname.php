<?php //get_portname.php
header("Access-Control-Allow-Origin: *");

//selected value from listbox returned by 'get' method
//PHP security -> prefix name , in this case result : $find_portID
extract($_GET, EXTR_PREFIX_ALL, 'find');

//Database Connection
require_once 'login.php';
$conn = mysqli_connect($host, $user, $password, $dbName);
if($conn->connect_error) {
	trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
} 

$sql = "SELECT portName
		FROM ports 
		WHERE portID
		LIKE '$find_portID'";
$result = $conn->query($sql);
if($result === false) {
	//trap SQL error
	echo 'SQL error';
}
else {
	$rows_returned = $result->num_rows;
}

$result->data_seek(0);
$row = $result->fetch_array(MYSQLI_ASSOC);	

$portName = $row['portName'];

$result->close();
$conn->close();

//Return result to ajax script
echo $portName;

?>