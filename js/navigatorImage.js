//Create objects for image
function navigationImage_object(outputDiv){
	
	let loadView=document.querySelector("#imageLoadView");
	imageLoad=new Load("../services/scanDir","photoes",loadView,outputDiv);
	imageLoad.start();
	imageLoad.readStructure();
	
}

//Events
function imageLoader_ahead(arg){
	if (imageLoad.ahead(arg)==="folder")
		imageLoad.readStructure();
}
function imageLoader_back(){
	if (imageLoad.back())
		imageLoad.readStructure();
}
function imageLoader_select(arg){
	imageLoad.select(arg);
}
function imageLoader_ok(){
	let res=imageLoad.ok();
	if (res.isSelected){
		//Add selected image to the document
		let tag="#"+res.outputDiv;
		res.path = res.path.replace("../","");
		$(tag).empty();
		$(tag).append("<img src=../"+res.path+" alt='selectedPhoto'><div>"+res.path+"</div>");
	}
}
function imageLoader_cancel(){
	imageLoad.cancel();
}