 <?php //get_countries.php
header("Access-Control-Allow-Origin: *");

//Database Connection
require_once 'login.php';
$conn = mysqli_connect($host, $user, $password, $dbName);
if($conn->connect_error) {
	trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
} 

$sql = "SELECT *
		FROM countries
		ORDER BY countryName ASC";
$result = $conn->query($sql);
if($result === false) {
	//trap SQL error
	echo 'SQL error';
}
else {
	$rows_returned = $result->num_rows;
}

//create array for results
$countries = array();
	
for ($j = 0 ; $j < $rows_returned ; ++$j)
{
	$result->data_seek($j);
	$row = $result->fetch_array(MYSQLI_ASSOC);	
	//add results to array
	$countries[$j] = $row['countryName'];
}

$result->close();
$conn->close();

$jsondata = json_encode($countries);
echo $jsondata;

?>