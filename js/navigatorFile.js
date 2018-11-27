//Create objects for file
let fileLoad=null;
function navigationFile_object(outputDiv){
	
	let loadView=document.querySelector("#fileLoadView");
	fileLoad=new File("../services/scanDir","photoes",loadView,outputDiv);
	fileLoad.start();
	fileLoad.readStructure();
	
};

//Events
function fileLoader_ahead(arg){
	if (fileLoad.ahead(arg)==="folder")
		fileLoad.readStructure();
}
function fileLoader_back(){
	if (fileLoad.back())
		fileLoad.readStructure();
}
function fileLoader_select(arg){
	fileLoad.select(arg);
}
function fileLoader_ok(){
	fileLoad.ok();
	let res=fileLoad.ok();
	if (res.isSelected){
		//Add selected file to the document
		let tag=res.outputDiv;
		res.path = res.path.replace("../","");
		$(tag).empty();
		document.getElementById(tag).innerHTML=res.path;		
	}
}
function fileLoader_cancel(){
	fileLoad.cancel();
}