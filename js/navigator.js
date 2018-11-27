/* Class for reading file structure and getting file parameters
/
/	arg_ scanDir.php_path, photosFoldarPath, loadView
/	res_ this.pathImage
/
*/
class Load{
	constructor(scanDirPath,path,loadView,outputDiv){
		this.scanDirPath=scanDirPath;
		this.path=path;
		this.loadView=loadView;
		this.outputDiv=outputDiv;
		this.pathImage="";
	}
	
	//Start
	start(){
		view_show(this.loadView);
	}
	
	//Read dir structure
	readStructure(){
		let path=this.path;
		let loadView=this.loadView;
		readFolderStructure(this.scanDirPath+"/scanDir.php/"+path,function(callBack){
			if (callBack.success){
				makeStructure(JSON.parse(callBack.message));
				//Make breadcrumb
				breadcrumbBuild();
			}
			else{
				alert("Can`t read the dir structure");
			}
		});
		
		//Make structure
		function makeStructure(array){
			let tag=loadView.querySelector(".loader-result");
			$(tag).html("<ul class='loader-list'></ul>");
			let loaderList=tag.querySelector(".loader-list");
			array.forEach(function(element){
				if (element!==".")
					if (element===".."){
						//Add back point to the list
						$(loaderList).append("<li class='loader-list-element' onclick='imageLoader_back()'>"+element+"</li>");
						tag.querySelector(".loader-list-element");
					}
					else{
						let res=elementComprehending(element);
						if (res==="image"){
							//Add image & its caption to the list
							let imageURL="../"+path+"/"+element;
							let captionImage=element;
							$(loaderList).append("<li class='loader-list-imageOuter' onclick='imageLoader_select(this)'><img class='photos-list-image' src='"+imageURL+"' alt='image'><div class='photos-list-caption'>"+element+"</div></li>");
						}
						else{
							//Add go ahead point-folder to the list
							$(loaderList).append("<li class='loader-list-element' onclick='imageLoader_ahead(this)'>"+element+"</li>");
						}
						}
			});
		}
		
		//Breadcrumb
		function breadcrumbBuild(){
			let breadcrumb=[];
			let tag=loadView.querySelector(".breadcrumb");
			breadcrumb=path.split("/");
			$(tag).empty();
			breadcrumb.forEach(function(element){
				$(tag).append("<li>"+element+"</li>");
			});
		}
	}

	//Move ahead
	ahead(arg){
		this.pathImage="";
		let value=arg.innerHTML;
		//Is it image or file or folder?
		let res=elementComprehending(value);
		switch (res){
			case "image":
			break;
			case "file":
			break;
			case "folder":
				//pathImage=captionImage="";
				this.path+="/"+value;
			break;
		}
		return res;
	}
	
	//Move back
	back(){
		this.pathImage="";
		let letBack=false;
		let pos=this.path.lastIndexOf("/");
		if (pos>0){
			this.path=this.path.slice(0,pos);
			letBack=true;
		}
		return letBack;
	}

	//List element is selected
	select(element){
		let img=element.getElementsByClassName("photos-list-image")[0];
		$(".photos-list-image").removeClass("imageSelected");
		$(img).addClass("imageSelected");
		this.pathImage=$(img).attr("src");
	}

	//OK button pressed
	ok(){
		let isSelected=false;
		if (this.pathImage=="")
			alert ("Виберіть фотографію");
		else{
			view_hide(this.loadView);
			isSelected=true;
		}
		return {
			isSelected: isSelected,
			path: this.pathImage,
			outputDiv: this.outputDiv
		};
	}
	
	//'Cancel' button pressed
	cancel(){
		view_hide(this.loadView);
	}
	
}

//Other class methods
function view_show(loadView){
	$(loadView).fadeIn();
}
function view_hide(loadView){
	$(loadView).fadeOut();
	scanDirController_button(true);
}
//Element comprehending 
function elementComprehending(value){
	let res="";
	let pos=value.lastIndexOf(".");
	let ext=value.slice(pos+1,value.length);
	if (pos>0){
		if (ext==="jpg" || ext==="JPG" || ext==="png" || ext==="PNG" || ext==="gif" || ext==="GIF"){
			res="image";
		}
		else{
			res="file";
		}
	}
	else{
		res="folder";
	}
	return res;
}

//File load class ------------------------------------------------------
class File extends Load{
	
	//Read dir structure
	readStructure(){
		let path=this.path;
		let loadView=this.loadView;
		readFolderStructure(this.scanDirPath+"/scanDir.php/"+path,function(callBack){
			if (callBack.success){
				makeStructure(JSON.parse(callBack.message));
				//Make breadcrumb
				breadcrumbBuild();
			}
			else{
				alert("Can`t read the dir structure");
			}
		});
		
		//Make structure
		function makeStructure(array){
			let tag=loadView.querySelector(".loader-result");
			$(tag).html("<ul class='loader-list'></ul>");
			let loaderList=tag.querySelector(".loader-list");
			array.forEach(function(element){
				if (element!==".")
					if (element===".."){
						//Add back point to the list
						$(loaderList).append("<li class='loader-list-element' onclick='fileLoader_back()'>"+element+"</li>");
						tag.querySelector(".loader-list-element");
					}
					else{
						let res=elementComprehending(element);
						if (res==="image"){
							//Add image & its caption to the list
							let imageURL="../"+path+"/"+element;
							let captionImage=element;
							$(loaderList).append("<li class='loader-list-imageOuter'><img class='photos-list-image' src='"+imageURL+"' alt='image'><div class='photos-list-caption'>"+element+"</div></li>");
						}
						else if (res==="file"){
							//Add file event to the list
							let fileURL="../"+path+"/"+element;
							let captionImage=element;
							$(loaderList).append("<li class='loader-list-element' onclick='fileLoader_select(this)'>"+element+"</li>");
						}
						else{
							//Add go ahead point-folder to the list
							$(loaderList).append("<li class='loader-list-element' onclick='fileLoader_ahead(this)'>"+element+"</li>");
						}
						}
			});
		}
		
		//Breadcrumb
		function breadcrumbBuild(){
			let breadcrumb=[];
			let tag=loadView.querySelector(".breadcrumb");
			breadcrumb=path.split("/");
			$(tag).empty();
			breadcrumb.forEach(function(element){
				$(tag).append("<li>"+element+"</li>");
			});
		}
	}
	
	//List element is selected
	select(element){
		$(".loader-list-element").removeClass("fileSelected");
		$(element).addClass("fileSelected");
		this.pathImage=this.path+"/"+element.innerHTML;
	}
	
	//OK button pressed
	ok(){
		let isSelected=false;
		if (this.pathImage=="")
			alert ("Виберіть file");
		else{
			isSelected=true;
			view_hide(this.loadView);
		}
		return {
			isSelected: isSelected,
			path: this.pathImage,
			outputDiv: this.outputDiv
		};
	}
		
}