var goodsId = undefined;

//This is the 'mainController'

//Create 'article'-content after MODEL has been ready
function mainController_update(){
	console.info('mainController update');
	$("#section").empty();	
	//Create goods table
	var section=document.querySelector("#section");
	model_goodsTable.goodsTable.forEach(function(goodsTable){
		section.appendChild(tableCreator(goodsTable));
	});
	
	//Create goods table
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
		goodsTable.forEach(function(item){
			tableBody(tbody,item)
		});		
		return div;
		
		function tableBody(tbody,item){
			//<tr>
			var tr=document.createElement("tr");
			tbody.appendChild(tr);
			//<td>
			var td = document.createElement("td");
			td.innerHTML = (item.itemName==="id") ? item.itemName : item.itemTranslate;
			tr.appendChild(td);
			//<td>
			td = document.createElement("td");
			td.innerHTML = item.itemDimension;
			tr.appendChild(td);
			//<td>
			// - image
			if (item.itemName==="imageURL1" || item.itemName==="imageURL2" || item.itemName==="imageURL3") {
				td = document.createElement("td");
				$(td).addClass("section-tbody-imageOuter");
				tr.appendChild(td);
				var image = document.createElement("img");
				$(image).addClass("section-tbody-image");
				$(image).attr("alt","Фото не знайдене");
				$(image).attr("src","../"+item.itemValues);
				td.appendChild(image);
				var path = document.createElement("p");
				$(path).addClass("section-tbody-path");
				path.innerHTML = item.itemValues;
				td.appendChild(path);
			}
			// - file
			else if (item.itemName==="file") {
				td = document.createElement("td");
				tr.appendChild(td);
				path = document.createElement("a");
				$(path).attr("href","../"+item.itemValues);
				$(path).attr("target","_blank");
				path.innerHTML = item.itemValues;
				td.appendChild(path);
			}
			else {
				td = document.createElement("td");
				if (item.itemName==="id") {
					// - id
					$(td).addClass("id");
				}
				td.innerHTML = item.itemValues;
				tr.appendChild(td);
			}
		}	
	}
}

//Server events informing
function mainController_messageBox(obj){
	var id = null;
	var timeout = false;
	if (obj.status==="success"){
		id = "#messageBoxSuccess";
		timeout = true;
	}
	if (obj.status==="info"){
		id = "#messageBoxInfo";
		timeout = true;
	}
	if (obj.status==="delete"){
		$("#messageBoxDelete>button").text(obj.message);
		$("#messageBoxDelete").fadeIn();
	}
	if (timeout){
		$(id).text(obj.message);
		$(id).fadeIn();
		setTimeout(function(){
			$(id).fadeOut();
		},4000);
	}
}

//This is the 'editController'. Edit table
function editController_start(){
	//Table hovered show
	$("section table").addClass("hoverEffect");
	var tables = document.querySelector("#section").getElementsByClassName("hoverEffect");
	for (var i=0; i<tables.length; i++)
		tables[i].addEventListener("click",editController_editTable);
}

//Edit table
function editController_editTable(){
	var id = +this.querySelector(".id").innerHTML;
	goodsId = id;
	$("#edit").fadeIn();
	scrollUp();
	$("#edit h3").text(viewObj.topNavItems[viewObj.topNavItemsIndex]+". Таблиця id="+id);
	// - Create table pattern
	var tableTag = document.querySelector("#edit .table-outer-next");
	var pattern = model_goodsTable.getTableWithId(goodsId);	
	$(tableTag).empty();
	tableTag.appendChild(tableCreator(pattern));
	
	function tableCreator(goodsTable){
		var div = document.createElement("div");
		$(div).addClass("sectionTable");
		var table = $("<table class='table table-bordered'></table>");
		$(div).append(table);
		//<thead>
		var thead = $("<thead class='section-head'></thead>");
		$(table).append(thead);
		var tr = $("<tr></tr>");
		$(thead).append(tr);
		var th = $("<th>Назва</th>");
		$(tr).append(th);
		th = $("<th>Розмірність</th>");
		$(tr).append(th);
		th = $("<th>Значення</th>");
		$(tr).append(th);
		//<tbody>
		var tbody = document.createElement("tbody");
		$(table).append(tbody);
		goodsTable.forEach(function(item,i){
			tableBody(tbody,i,item);
		});		
		return div;
		
		//<tbody> content
		function tableBody(tbody,i,item){
			//<tr>
			var tr = $("<tr id=index"+i+"></tr>");
			$(tbody).append(tr);
			//<td>. Item translate
			var td = document.createElement("td");
			td.innerHTML = (item.itemName==="id") ? item.itemName : item.itemTranslate;
			$(tr).append(td);
			//<td>. Item dimension
			td = $("<td></td>").text(item.itemDimension);
			$(tr).append(td);
			//<td>. Item values
			td = document.createElement("td");
			if (item.itemName==="id"){
				$(td).text(item.itemValues);
				$(tr).append(td);
			}
			else{
				td.appendChild(elementCreator(item));
				$(tr).append(td);
			}
		}
		
		//Create fields
		function elementCreator(item){
			var itemName = item.itemName;
			var tag = document.createElement("span");
			$(tag).addClass("itemValues");
			if (hasId(itemName)){
				// Create SELECT tag
				var res = model_globalTables.itemsList(itemName);
				if (res.isPresent){
					var itemsList = res.table;
					tag = document.createElement("select");
					itemsList.array.forEach(function(item){
						var option = document.createElement("option");
						$(option).attr("value",'id'+item.id);
						option.innerHTML = item.value;
						tag.appendChild(option);
					});
				}
				else{
					tag.innerHTML = "Таблиця не знайдена";
				}
				$(tag).addClass("itemValues");
			}
			else {
				switch (itemName) {
					case "imageURL1":
						// Create BUTTON tag for getting image1
						tag = imageSelector(tag, item);
					break;	
					case "imageURL2":
						// Create BUTTON tag for getting image2
						tag = imageSelector(tag, item);
					break;	
					case "imageURL3":
						// Create BUTTON tag for getting image3
						tag = imageSelector(tag, item);
					break;
					case "file":
						// Create BUTTON for getting file path
						tag = document.createElement("div");
						$(tag).addClass("getPathFile-outer");
						// - file path
						var div = document.createElement("div");
						$(div).attr("id","file");
						$(div).addClass("getPathFile-path itemValues");
						div.innerHTML = item.itemValues;
						tag.appendChild(div);
						// - button
						var button = document.createElement("button");
						button.innerHTML = "Вибрати";
						$(button).attr("onclick","scanDirController_getFile()");
						$(button).addClass("getPathButton");
						tag.appendChild(button);
					break;
					case "caption":
						// Create TEXTAREA tag for remark
						tag = document.createElement("textarea");
						tag.innerHTML = item.itemValues;
						$(tag).addClass("caption itemValues");
					break;
					default:
						// Create INPUT tag
						tag = document.createElement("input");
						tag.value = item.itemValues;
						$(tag).addClass("inputField itemValues");
				}
			}			
			return tag;
		}
		
		// Create tag for get image
		function imageSelector(tag, item){
			tag = document.createElement("div");
			$(tag).addClass("getPathImage-outer");
			// - image
			var div = document.createElement("div");
			$(div).addClass("getPathImage-image itemValues");
			$(div).attr("id",item.itemName);			
			var image = document.createElement("img");
			image.src = "../"+item.itemValues;
			div.appendChild(image);			
			var imagePath = document.createElement("div");
			imagePath.innerHTML = item.itemValues;			
			div.appendChild(imagePath);			
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
			return tag;
		}
		
	}	
}

//Edit OK
function editController_OK(){
	createController_OK("#edit", goodsId);
}

//Edit cancel
function editController_cancel(){
	$("#edit").fadeOut();
	scrollUp();
}

//Remove hover effects
function editController_removeHover(){
	var tables = document.querySelector("#section").getElementsByClassName("hoverEffect");
	for (var i=0; i<tables.length; i++)
		tables[i].removeEventListener("click",editController_editTable);
	$("section table").removeClass("hoverEffect");
}

//Messages information
function editController_info(msg){
	$("#editInfo").text(msg);
	$("#editInfo").fadeIn();
	setTimeout(function(){
		$("#editInfo").fadeOut();
	},3000);
}