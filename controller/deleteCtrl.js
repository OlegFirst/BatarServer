//This is the 'deleteController'

var tableId = null;

function deleteController_tableId(id){
	var tableId = id;
	return function getTableId(){
		return tableId;
	}
}

function deleteController_start(){
	//Table hovered show
	$("#section table").addClass("hoverEffect");
	//Insert delete function in the tables
	var tables = document.querySelector("#section").getElementsByClassName("hoverEffect");
	for (i=0; i<tables.length; i++)
		tables[i].addEventListener("click",deleteController_removeTable);
}

//Remove table from DB
function deleteController_removeTable(){
	var id = +this.querySelector(".id").innerHTML;
	tableId = deleteController_tableId(id);
	$("#section .hoverEffect").removeClass("selectEffect");
	$(this).addClass("selectEffect");
	mainController_messageBox({status: 'delete', message: 'Видалити таблицю з id='+id+' ?'});
}

//Delete table
function deleteController_OK(){
	var tableCount = model_goodsTable.goodsTable.length;
	if (tableCount>1){
		var id = tableId();
		dataBaseReader("DELETE",viewObj.goodsTableName[viewObj.topNavItemsIndex]+"/"+id,"",function(response){
			$("#section table").removeClass("selectEffect");
			$("#section table").removeClass("hoverEffect");
			$("#messageBoxDelete").fadeOut();
			$(document.querySelectorAll('.list-group-item')).removeClass('leftNav-active');		
			if (response.success){
				//Success
				mainController_messageBox({status: 'success', message: 'Таблиця видалена'});
				modelController_goodsUpdate(viewObj.goodsTableName[viewObj.topNavItemsIndex]);
			}
			else{
				//Error
				mainController_messageBox({status: 'info', message: 'Помилка: таблиця не видалена'});
			}		
		});
	}
	else{
		//Error
		mainController_messageBox({status: 'info', message: 'Залишилась одна таблиця'});
	}
}

//Delete table cancel
function deleteController_cancel(){
	$("#section table").removeClass("selectEffect");
	var tables = document.querySelector("#section").getElementsByClassName("hoverEffect");
	for (i=0; i<tables.length; i++)
		tables[i].removeEventListener("click",deleteController_removeTable);
	$("#section table").removeClass("hoverEffect");
	$("#messageBoxDelete").fadeOut();
}