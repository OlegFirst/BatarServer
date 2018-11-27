<?php
	include "../../config.php";
	$method=$_SERVER['REQUEST_METHOD'];//Request method
	$request=explode('/',trim($_SERVER['PATH_INFO'],'/'));
	$data=file_get_contents('php://input');//Request data
	$input=json_decode($data,true);
	//Request parameters
	$keys=array();
	while(count($request)>0){
		$keys[]=array_shift($request);
	}
							
	switch ($method){
		case "GET":
			$path=makePath($keys,"../../");
			getFolderStructure($path);
		break;
	}
	
	//Making request path
	function makePath($keys,$photosFolder){
		$path=$photosFolder;
		foreach ($keys as $element){
			$path=$path."/".$element;
		}
		return $path;
	}
	
	//Read and show content within current folder
	function getFolderStructure($path){
		$content=scandir($path);
		$json=json_encode($content);
		echo $json;
	}
	
?>