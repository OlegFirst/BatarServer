//This is the 'navController'

//View global object
var viewObj = {
	//Top nav items
	topNavItems: ["SERVER","Готові електростанції","Сонячні панелі","Інвертори","Монтажні конструкції","Вітрові електростанції","Додаткове обладнання"],
	topNavItemsIndex: 0,
	//Goods DB tables name. Equals 'topNavItems'
	goodsTableName: ["none","none","solarpanel_goods","inverters_goods","none","none","none"]
}

//'leftNav' status. If equals '-1' - not activated yet
var leftNavStatus = {
	itemActive: -1
}

$(document).ready(function(){
	console.info("navController");
	//Create top menu
	let items=document.querySelectorAll('.topNav-item-element');
	items.forEach(function(item,index){
		item.innerHTML=viewObj.topNavItems[index];
	});
	//Select solar panels within menu and show title
	viewObj.topNavItemsIndex = 2;
	$("#title").text(viewObj.topNavItems[viewObj.topNavItemsIndex]);
	$(document.querySelectorAll('.topNav-item-element')[viewObj.topNavItemsIndex]).addClass('topNav-active');
});

//Top navigation item is clicked
function navController_topNav(number){
	$(".list-group-item").removeClass('leftNav-active');
	let table = viewObj.goodsTableName[number];
	if (table==="none")
		mainController_messageBox({message: "База даних з цим товаром відсутня", status: "info"});
	else {
		viewObj.topNavItemsIndex = number;
		$("#title").text(viewObj.topNavItems[number]);
		$("#section").empty();
		//Cancelling 'leftNav' status
		leftNavCancel();
		// - Selected
		$(".topNav-item-element").removeClass('topNav-active');
		$(document.querySelectorAll('.topNav-item-element')[number]).addClass('topNav-active');
		// - Show created tables from DB
		modelController_goodsUpdate(table,number);
	}
	
	function leftNavCancel(){
		switch (leftNavStatus.itemActive){
			case 2:
				$("#deleteCancel").trigger("click");
			break;
			case 4:
				$("#editCancel").trigger("click");
		}
		leftNavStatus.itemActive = -1;
	}
}

//Left navigation item is clicked
function navController_leftNav(number){
	//Left navigation item state 1- show; 2 - hide
	var item = {
		createTable: 1,
		deleteTable: 1,
		deleteTableCancel: 2,
		editTable: 1,
		editTableCancel: 2
	}
	//Check if 'model_goodsTable' has at least one table with goods
	if (!model_goodsTable.isTableClear){
		//Selected
		$(".list-group-item").removeClass('leftNav-active');
		$(document.querySelectorAll('.list-group-item')[number-1]).addClass('leftNav-active');
		//Save status
		leftNavStatus.itemActive = number;
		//Recognizing
		switch (number){
			case 1:
				//Create table
				navController_leftNavHide();
				createController_start();
			break;
			case 2:
				//Delete table
				item = {
					createTable: 2,
					deleteTable: 1,
					deleteTableCancel: 1,
					editTable: 2,
					editTableCancel: 2
				}
				navController_leftNavItem(item);
				deleteController_start();
			break;
			case 3:
				//Delete table. Cancel 
				item = {
					createTable: 1,
					deleteTable: 1,
					deleteTableCancel: 2,
					editTable: 1,
					editTableCancel: 2
				}
				navController_leftNavItem(item);
				deleteController_cancel();
			break;
			case 4:
				//Edit table
				item = {
					createTable: 2,
					deleteTable: 2,
					deleteTableCancel: 2,
					editTable: 1,
					editTableCancel: 1
				}
				navController_leftNavItem(item);
				editController_start();
			break;
			case 5:
				//Edit table. Cancel
				item = {
					createTable: 1,
					deleteTable: 1,
					deleteTableCancel: 2,
					editTable: 1,
					editTableCancel: 2
				}
				navController_leftNavItem(item);
				editController_removeHover();
			break;
		}
		}
		else{
			mainController_messageBox({status: 'info', message: 'У БД має бути хоча б один товар цього типу'});
		}
}

//Show left navigation tag
function navController_leftNavShow(){
	$("#leftNav").fadeIn();
}
//Hide left navigation tag
function navController_leftNavHide(){
	$("#leftNav").fadeOut();
}

//Show(hide) new item in the left navigation. 1- show; 2 - hide
function navController_leftNavItem({createTable, deleteTable, deleteTableCancel, editTable, editTableCancel}){
	// 'createTable'
	if (createTable==1)
		show("#leftNavCreate");
	if (createTable==2)
		hide("#leftNavCreate");
	// 'deleteTable'
	if (deleteTable==1)
		show("#leftNavDelete");
	if (deleteTable==2)
		hide("#leftNavDelete");
	// 'deleteTableCancel'
	if (deleteTableCancel==1)
		show("#deleteCancel");
	if (deleteTableCancel==2)
		hide("#deleteCancel");
	// 'editTable'
	if (editTable==1)
		show("#leftNavEdit");
	if (editTable==2)
		hide("#leftNavEdit");
	// 'editTableCancel'
	if (editTableCancel==1)
		show("#editCancel");
	if (editTableCancel==2)
		hide("#editCancel");
	
	function show(tagId){
		$(tagId).fadeIn();
	}
	function hide(tagId){
		$(tagId).fadeOut();
	}
}