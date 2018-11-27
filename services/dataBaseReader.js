//N. B.
//	link = "tableName" || "tableName/goodsId"
function dataBaseReader(method,link,msg,response){
	
	var res = {
		message: "",
		success: false
	};
	var link = "../services/dataBase.php/"+link;
	
	//Read data
	switch (method) {
		case "GET":
			//Read tables
			$.get(link,function(data,status){
				res.message = data;
				res.success = true;
				response(res);
			})
			.fail(function(data){
				res.message = "";
				res.success = false;
				response(res);
			});
		break;
		case "POST":
			//Insert new goods
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					res.message = this.resonseTex;
					res.success = true;
					response(res);
				}
			};
			xmlhttp.open("POST",link, true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("json=" + msg);
		break;
		case "DELETE":
			//Delete goods
			$.ajax({
				type: 'DELETE',
				url: link
			})
			.done(function(data){
				res.message=data;
				res.success=true;
				response(res);
			})
			.fail(function(data){
				res.message=data;
				res.success=false;
				response(res);
			});
		break;
		case "PUT":
			//Update goods			
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					res.message = this.resonseTex;
					res.success = true;
					response(res);
				}
			};
			xmlhttp.open("POST",link+"/PUT", true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("json=" + msg);
		break;
	}
	
}

//Belong to the 'navigator.js'. Working with folders
function readFolderStructure(link,response){
	var res = {};
	$.get(link,function(data){
		res.message = data;
		res.success = true;
		response(res);
	})
	.fail(function(data){
		res.message = data;
		res.success = false;
		response(res);
	});
}