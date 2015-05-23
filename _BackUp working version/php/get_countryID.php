<?php //get_countryID.php
header("Access-Control-Allow-Origin: *");

//selected value from listbox returned by 'get' method
//PHP security -> prefix name , in this case result : $find_country
extract($_GET, EXTR_PREFIX_ALL, 'find');

//Database Connection
require_once 'login.php';
$conn = mysqli_connect($host, $user, $password, $dbName);
if($conn->connect_error) {
	trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
} 

$sql = "SELECT countryID
		FROM countries 
		WHERE countryName
		LIKE '$find_country'";
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

$countryID = $row['countryID'];

$result->close();
$conn->close();

//Return result to ajax script
echo $countryID;

?>