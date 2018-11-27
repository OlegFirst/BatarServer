//This is the 'scanDirController'. Get path of image/file from folder

//Get image path
function scanDirController_getImage(e){
	var outputDiv = e.parentNode.querySelector(".getPathImage-image");
	scanDirController_button(false);	
	navigationImage_object($(outputDiv).attr("id"));
}

//Get file path
function scanDirController_getFile(){
	scanDirController_button(false);
	navigationFile_object("file");
}

//Show or hide button group
function scanDirController_button(isEnabled){
	var buttons=document.querySelectorAll(".getPathButton");
	buttons.forEach(function(button){
		button.disabled=(isEnabled) ? false : true;
	});	
}