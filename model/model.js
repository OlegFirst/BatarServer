//Global tables model is belong to all type of goods
class Model_globalTables{
	constructor(){
		//Global tables
		this.globalTables = [];
		//Search table using its name
		Array.prototype.search = function(arg){
			arg = arg.toLowerCase();
			var items = this;
			//console.log(items);
			var res = -1;
			for (var i = 0; i<items.length; i++){
				if (arg===items[i].tableName){
					res = i;
					break;
				}
			}
			return res;
		}
	}
		
	//Insert new global table to the collection
	set table(arg){
		let obj = Object.create(null);
		obj.tableName = arg.tableName;
		obj.array = arg.message;
		this.globalTables.push(obj);
	}
	
	//Translate from English in to Ukraine
	translate(itemName){
		itemName = this.idCorrection(itemName);
		var res="";
		let index = this.globalTables.search("translate");
		if (index!=-1){
			this.globalTables[index].array.forEach(function(item){
				if (itemName===item.itemName)
					res = item.itemTranslate;
			});
		}
		else{
			console.error(`Global table ${itemName} isnt found`);
		}
		return res;
	}

	//Value
	value(tableName,valuesIs){
		//Search necessary table for itemName
		tableName = this.idCorrection(tableName);
		var res="";
		let index = this.globalTables.search(tableName);
		if (index!=-1){
			//Search value
			this.globalTables[index].array.forEach(function(item){
				if (valuesIs===item.id)
					res = item.value;
			});
		}
		return res;
	}
	
	//Dimension
	dimension(itemName){
		itemName = this.idCorrection(itemName);
		var res="";
		let index = this.globalTables.search("dimension");
		if (index!=-1){
			this.globalTables[index].array.forEach(function(item){
				if (itemName===item.itemName)
					res = item.value;
			});
		}
		return res;
	}
	
	//Return all items from the table
	itemsList(tableName){
		tableName = this.idCorrection(tableName);
		var res = {isPresent: false, table: []};
		let index = this.globalTables.search(tableName);
		if (index!=-1){
			res.isPresent = true;			
			res.table = this.globalTables[index];
		}
		return res;
	}
	
	//Cut 'Id'
	idCorrection(item){
		let len = item.length;
		if (len>3) {
			let lastLetters = item.slice(len-2,len);
			if (lastLetters==="Id")
				item = item.slice(0,len-2);
		}
		return item;
	}
	
	get table(){
		return this.globalTables[0].array;
	}	
}

//Goods table model
class Model_goodsTable{
	constructor(model_globalTables){
		//Goods table
		this.goodsTable = [];
		this.title = "";
		var model_globalTables = model_globalTables;
		//Mark if table is clear
		this.isTableClear = true;
	}

	//Insert new table & prepare it
	set table(arg){
		this.isTableClear = false;
		this.goodsTable = [];
		this.title = arg.title;
		var index = 0;
		for (var i= 0; i<arg.message.length; i++){
			let goodsTable = arg.message[i];
			var element = [];
			// - Loop through each goods table
			let index = null;
			for (index in goodsTable){
				let item = {
					itemName: index,
					itemTranslate: "",
					itemValues: "",
					itemDimension: ""
				}
				// - Item translate
				item.itemTranslate = model_globalTables.translate(index);
				// - Item value
				item.itemValues = model_globalTables.value(item.itemName,goodsTable[index]);
				if (item.itemValues=="")
					item.itemValues = goodsTable[index];
				// - Item dimension
				item.itemDimension = model_globalTables.dimension(item.itemName);
				//Insert item to the array
				element.push(item);
			}
			this.goodsTable.push(element);
		}
	}
	
	//Search table with necessary 'id'
	getTableWithId(id){
		var res = null;
		this.goodsTable.forEach(function(table){
			table.forEach(function(item){
				if (item.itemName==="id"){
					if (+item.itemValues==id)
						res = table;
				}
			});
		});		
		return res;
	}
	
}