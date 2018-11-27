//This is the 'createController'. Create table in DB

function createController_start(){
	$("#create").fadeIn();
	scrollUp();
	$("#create h3").text(viewObj.topNavItems[viewObj.topNavItemsIndex]);
	// - Create table pattern
	var tableTag = document.querySelector("#create .table-outer-next");
	var pattern = model_goodsTable.goodsTable[0];
	$(tableTag).empty();
	tableTag.appendChild(tableCreator(pattern));
	
	//Create pattern table
	function tableCreator(goodsTable){
		var div=document.createElement("div");
		$(div).addClass('container section-tableOuter');
		var table=document.createElement("table");
		$(table).addClass('table table-bordered');
		div.appendChild(table);
		//<thead>
		var thead=document.createElement("thead");
		$(thead).addClass('section-thead');
		table.appendChild(thead);
		var tr=document.createElement("tr");
		thead.appendChild(tr);
		var th=document.createElement("th");
		th.innerHTML = "Назва";
		tr.appendChild(th);
		th=document.createElement("th");
		th.innerHTML = "Розмірність";
		tr.appendChild(th);
		th=document.createElement("th");
		th.innerHTML = "Значення";
		tr.appendChild(th);
		//<tbody>
		var tbody=document.createElement("tbody");
		table.appendChild(tbody);
		goodsTable.forEach(function(item,i){
			tableBody(tbody,i,item)
		});		
		return div;
		
		//'Tag-id' equals index='i' in the 'model_goodsTable.goodsTable[i]'
		function tableBody(tbody,i,item){
			//<tr>
			var tr=document.createElement("tr");
			$(tr).attr("id",'index'+i);
			tbody.appendChild(tr);
			//<tr>. Item translate
			var td = document.createElement("td");
			td.innerHTML = (item.itemName==="id") ? item.itemName : item.itemTranslate;
			tr.appendChild(td);
			//<td>. Item dimension
			td = document.createElement("td");
			td.innerHTML = item.itemDimension;
			tr.appendChild(td);
			//<td>. Item values. If has 'Id' then create select otherwise create input or button (for getting image`s or file`s path)
			td = document.createElement("td");
			if (item.itemName==="id")
				td.innerHTML = "Не призначений ще";
			else
				td.appendChild(elementCreator(item.itemName));
			tr.appendChild(td);
		}

		//Create select or input or button tag
		function elementCreator(itemName){
			var tag=document.createElement("span");
			$(tag).addClass("itemValues");
			if (hasId(itemName)){
				//Create select tag
				let res = model_globalTables.itemsList(itemName);
				if (res.isPresent){
					let itemsList = res.table;
					tag = document.createElement("select");
					itemsList.array.forEach(function(item){
						var option = document.createElement("option");
						$(option).attr("value",'id'+item.id);
						option.innerHTML = item.value;
						tag.appendChild(option);
					});
				}
				else{
					console.log("Not");
					tag.innerHTML = "Таблиця не знайдена";
				}
				$(tag).addClass("itemValues");
			}
			else if (itemName==="imageURL1" || itemName==="imageURL2" || itemName==="imageURL3"){
				//Create button for get image path
				// - outer
				tag = document.createElement("div");
				$(tag).addClass("getPathImage-outer");
				// - image
				var div = document.createElement("div");
				$(div).addClass("getPathImage-image itemValues");
				$(div).attr("id",itemName);
				tag.appendChild(div);
				// - path
				div = document.createElement("div");
				$(div).addClass("getPathImage-path");
				tag.appendChild(div);
				// - button
				button = document.createElement("button");
				button.innerHTML = "Вибрати";
				$(button).addClass("getPathButton");
				$(button).attr("onclick","scanDirController_getImage(this)");
				tag.appendChild(button);				
			}
			else if (itemName==="file"){
				//Create button for get file path
				// - outer
				tag = document.createElement("div");
				$(tag).addClass("getPathFile-outer");
				// - file path
				div = document.createElement("div");
				$(div).attr("id","file");
				$(div).addClass("getPathFile-path itemValues");
				tag.appendChild(div);
				// - button
				var button = document.createElement("button");
				button.innerHTML = "Вибрати";
				$(button).attr("onclick","scanDirController_getFile()");
				$(button).addClass("getPathButton");
				tag.appendChild(button);
			}
			else if (itemName==="caption"){
				//Create textarea for remark
				tag = document.createElement("textarea");
				$(tag).addClass("caption itemValues");
			}
			else{
				tag=document.createElement("input");
				$(tag).attr("type","text");
				$(tag).addClass("itemValues");				
			}
			return tag;
		}
	}
}

//Submit. Using by 'editController' & 'createController'
function createController_OK(sectionTag = "#create", editGoodsId = undefined){
	var createdTable = [];
	createdTable = model_goodsTable.goodsTable[0];
	createdTable.forEach(function(item){
		item.itemValues = "none";
	});
	// - Get data from the created table and put them in the 'createdTable'-collection
	var section = document.querySelector(sectionTag);
	var tableTag = section.querySelector(".table");
	var tbodyTag = tableTag.querySelector("tbody");
	var trows = tbodyTag.childNodes;
	trows.forEach(function(tr,i){
		//INDEX checks
		let tiId = $(tr).attr('id');
		tiId = +tiId.replace("index","");
		//Create collection ('i' is correct and item.Name!=="id")
		if (i>0 && i==tiId){
			var itemValues = getValue(tr);
			if (itemValues!==null)
				createdTable[i].itemValues = itemValues;
		}
	});
	// - Check 'createdTable' data values
	var isChecked = true;
	createdTable.forEach(function(item){
		if (item.itemValues==="none" && item.itemName!=='id'){
			isChecked = false;
		}
	});
	if (isChecked){
		// - Create 'sendTable'-collection for sending data into the DB
		var sendTable = [];
		createdTable.forEach(function(item){
			if (item.itemName!=='id'){
				var obj = {};
				obj.id = item.itemName;
				obj.value = item.itemValues;
				sendTable.push(obj);
			}
			else {
				goodsId = item.itemValues;
			}
		});
		// - Hide created table
		$(sectionTag).fadeOut();
		navController_leftNavShow();		
		scrollUp();
		$(".list-group-item").removeClass('leftNav-active');
		if (sectionTag==="#create"){
			// - Insert new table to the 'model_goodsTable'
			modelController_goodsInsert(sendTable);
		}
		if (sectionTag==="#edit"){
			// - Change table in the 'model_goodsTable'
			modelController_goodsChange(editGoodsId, sendTable);
		}
	}
	else{
		console.log("Some table field is empty or not valid");
		if (sectionTag==="#create")
			createController_info("Заповніть усі поля валідним значенням");
		if (sectionTag==="#edit")
			editController_info("Заповніть усі поля валідним значенням");
	}
	
	//Get 'itemValues' from the created table and validate it. Get data from 'itemValues'-class
	function getValue(tr){
		let tag = tr.querySelector(".itemValues");
		var res = null;
		if (tag!==null){
			// - If 'tag' is present
			var value = null;
			switch (tag.nodeName) {
				case "INPUT":
					value = tag.value;
				break;
				case "SELECT":
					value = +tag.value.replace("id","");
				break;
				case "DIV":
					var id = $(tag).attr("id");
					if (id==="file") {
						// - 'file' tag
						value = tag.innerHTML;
					}
					if (id==="imageURL1" || id==="imageURL2" || id==="imageURL3") {
						// - 'image' tag
						var values = tag.getElementsByTagName("div")[0]
						if (values!=undefined)
							value = values.innerHTML;							
					}
				break;
				case "TEXTAREA":
					value = tag.value;
				break;
			}
			res = valueValidation(value);
		}
		return res;
	}

	//Value validation
	function valueValidation(arg){
		var res = null;
		if (arg!==null){
			if (arg!=="")
				res = arg;
		}
		return res;
	}
}

//Cancel
function createController_cancel(){
	$("#create").fadeOut();
	scrollUp();
	$("#leftNav").fadeIn();
	$(".list-group-item").removeClass('leftNav-active');
}

//Messages information
function createController_info(msg){
	$("#createInfo").text(msg);
	$("#createInfo").fadeIn();
	setTimeout(function(){
		$("#createInfo").fadeOut();
	},3000);
}