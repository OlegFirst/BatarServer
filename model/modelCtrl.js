//This is the 'modelController'

var model_globalTables = null;
var model_goodsTable = null;

$(document).ready(function(){
	
	console.info("modelController");
	
	//Tables model creates
	model_globalTables = new Model_globalTables();
	model_goodsTable = new Model_goodsTable(model_globalTables);
	
	//Global tables model read
	var promise=new Promise((resolve, reject) => {
		
		var count = 0;
		function counter(){
			count++;
			if (count>=11){
				resolve("Global tables is read");
			}
		}		
		
		dataBaseReader("GET","translate","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "translate", message: JSON.parse(response.message)};
				counter();
			}
		});	
		dataBaseReader("GET","dimension","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "dimension", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","connector","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "connector", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","frame","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "frame", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","framecolor","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "framecolor", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","manufacturer","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "manufacturer", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","moduleefficiency","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "moduleefficiency", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","outputwarranty","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "outputwarranty", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","productwarranty","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "productwarranty", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","maker","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "maker", message: JSON.parse(response.message)};
				counter();
			}
		});
		dataBaseReader("GET","inverters_manufacturer","",function(response){
			if (response.success){
				model_globalTables.table = {tableName: "inverters_manufacturer", message: JSON.parse(response.message)};
				counter();
			}
		});
	});
	
	//Read goods table from DB
	promise.then((msg) => {
		console.info(msg);
		modelController_goodsUpdate(viewObj.goodsTableName[viewObj.topNavItemsIndex],viewObj.topNavItems[viewObj.topNavItemsIndex]);
	});
	
});

//Read goods table
function modelController_goodsUpdate(tableName,title){
	$("#section").empty();
	dataBaseReader("GET",tableName,"",function(response){
		if (response.success){
			model_goodsTable.table = {title: title, message: JSON.parse(response.message)};
			//'Main controller' updates
			mainController_update();
			//Show lef nav
			navController_leftNavShow();
		}
		else {
			// Goods table clear mark
			model_goodsTable.isTableClear = true;
			// DB reading error shows
			mainController_messageBox({status: "info", message: "Товар не прочитаний з бази даних"});
		}
	});
}

//Insert new goods to the DB
function modelController_goodsInsert(sendTable){
	var msg = JSON.stringify(sendTable);
	var tableName = viewObj.goodsTableName[viewObj.topNavItemsIndex];
	dataBaseReader("POST",tableName,msg,function(response){
		if (response.success){
			// - Show success message
			mainController_messageBox({message: "Товар доданий до бази даних", status: "success"});
			modelController_goodsUpdate(tableName);
		}
		else{
			// - Show error message
			mainController_messageBox({message: "Помилка. Товар не доданий до бази даних", status: "info"});
		}
	});
}

//Change goods in the DB
function modelController_goodsChange(editGoodsId,sendTable){	

	console.log(sendTable);

	var msg = JSON.stringify(sendTable);
	var tableName = viewObj.goodsTableName[viewObj.topNavItemsIndex];
	dataBaseReader("PUT",tableName+"/"+editGoodsId,msg,function(response){
		console.log(response);
		modelController_goodsUpdate(tableName);
	});	
}