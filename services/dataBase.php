<?php
	include "../config.php";
	$method=$_SERVER['REQUEST_METHOD'];//Request method
	$request=explode('/',trim($_SERVER['PATH_INFO'],'/'));
	$data=file_get_contents('php://input');//Request data
	$input=json_decode($data,true);
	$key1=array_shift($request);
	$key2=array_shift($request);
	$key3=array_shift($request);
	
	/*echo "0_".$method."<br>";
	echo "1_".$key1."<br>";
	echo "2_".$key2."<br>";
	echo "3_".$key3."<br>";	*/
	
	//Request handler
	if ($method==="GET"){
		//Read table
		echo json_encode(readTable($key1));
	}
	if ($method==="POST"){
		if ($key3!=="PUT"){
			//echo header("HTTP/1.1 400 OK");
			tableInsert($key1,json_decode($_POST["json"],true));
		}
		if ($key3==="PUT"){
			tableUpdate($key1,$key2,json_decode($_POST["json"],true));
		}		
	}
	if ($method==="DELETE"){
		//Delete table
		echo "Delete";
		deleteSolarPanel($key1,$key2);
	}
	//$msg = '[{"id":"model","value":"12"},{"id":"makerId","value":1},{"id":"manufacturerId","value":1},{"id":"productWarrantyId","value":1},{"id":"outPutWarrantyId","value":1},{"id":"checkedQuality","value":"1"},{"id":"voltageOfMaximumPower","value":"1"},{"id":"maximumPower","value":"1"},{"id":"moduleEfficiencyId","value":1},{"id":"panelHeight","value":"1"},{"id":"panelWidth","value":"1"},{"id":"panelThickness","value":"1"},{"id":"panelWeight","value":"1"},{"id":"frameId","value":1},{"id":"frameColorId","value":1},{"id":"cable","value":"1"},{"id":"connectorId","value":1},{"id":"caption","value":"1"},{"id":"file","value":"NU RD 295.pdf"},{"id":"imageURL1","value":"../photoes/FOTO1.jpg"},{"id":"imageURL2","value":"FOTO2.jpg"},{"id":"imageURL3","value":"FOTO3.jpg"},{"id":"price1","value":"1"},{"id":"price2","value":"1"}]';
		
//Read table from DB
function readTable($tableName){
	$conn=new mysqli($GLOBALS['serverName'],$GLOBALS['userName'],$GLOBALS['password'],$GLOBALS['dbName']);
	if ($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}
	
	//UTF-8
	$sql="SET NAMES 'utf8' COLLATE 'utf8_general_ci'";
	$conn->query($sql);
	$sql="SET CHARACTER SET 'utf8'";
	$conn->query($sql);		
	
	$sql="SELECT * FROM $tableName";
	$result=$conn->query($sql);
	$matrix=array();
	if ($result->num_rows>0){
		while ($row=$result->fetch_assoc()){
			$matrix[]=$row;
		}
	}
	else {
		header("HTTP/1.1 400 Bad request parameters");
		echo "error";
	}
	//echo "0 results";
	$conn->close();
	return $matrix;
}	

//Insert new goods in to the table
function tableInsert($tableName,$obj){
	$columns=$values="";
	foreach ($obj as $index){
		if ($columns==="")
			$columns=$index['id'];
		else
			$columns=$columns.", ".$index['id'];
		$valueI=$index['value'];
		if ($values==="")
			$values="'$valueI'";
		else
			$values=$values.", '$valueI'";
	}
	$conn=new mysqli($GLOBALS['serverName'],$GLOBALS['userName'],$GLOBALS['password'],$GLOBALS['dbName']);
	if ($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}
	utf($conn);
	$sql="INSERT INTO $tableName ($columns) VALUES ($values)";
	if ($conn->query($sql)===TRUE){
		echo "OK";
	}
	else{
		echo "Error: ".$conn->error;
	}
	$conn->close();
}

//Update
function tableUpdate($tableName,$id,$obj){
	//Create update query
	$objects="";
	foreach ($obj as $index){
		$objects=$objects.$index['id']."='".$index['value']."', ";
	}
	$objects=chop($objects,", ");
	$conn=new mysqli($GLOBALS['serverName'],$GLOBALS['userName'],$GLOBALS['password'],$GLOBALS['dbName']);
	if ($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}
	//UTF-8
	utf($conn);
	//Updating
	$sql="UPDATE $tableName SET ".$objects." WHERE id=$id";
	if ($conn->query($sql)===TRUE){
		echo "Data base has been updated";
	}
	else{
		echo "Error updating record: ".$conn-error;
	}
	$conn->close();
}

//Delete solar panel row with id
function deleteSolarPanel($tableName,$id){
	echo $tableName."_".$id;
	//$tableName="solarpanel_goods";
	$conn=new mysqli($GLOBALS['serverName'],$GLOBALS['userName'],$GLOBALS['password'],$GLOBALS['dbName']);
	if ($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}
	$sql="DELETE FROM $tableName WHERE id=$id";
	if ($conn->query($sql)===TRUE)
		echo "Solar panel with id=$id was deleted successfully";
	else
		echo "Error deleting record: ".$conn->error;
	$conn->close();
}

//SEt server UTF-8 parameters
function utf($conn){
	$sql="SET NAMES 'utf8' COLLATE 'utf8_general_ci'";
	$conn->query($sql);
	$sql="SET CHARACTER SET 'utf8'";
	$conn->query($sql);
}

?>