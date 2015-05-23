<?php //get_countryID.php
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

$sql = "SELECT countryName
		FROM countries 
		WHERE countryID
		LIKE '$find_countryID'";
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

$countryName = $row['countryName'];

$result->close();
$conn->close();

//Return result to ajax script
echo $countryName;

?>