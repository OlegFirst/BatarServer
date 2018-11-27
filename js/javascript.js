$(document).ready(function(){
	articleTop();
});

$(window).resize(function(){
	articleTop();
});

//Check if 'item' has 'Id'
function hasId(item){
	var res = false;
	let len = item.length;
	if (len>3) {
		let lastLetters = item.slice(len-2,len);
		if (lastLetters==="Id")
			res = true;
	}
	return res;
}

//Scrolling up
function scrollUp(){
	$("html,body").animate({
		scrollTop: 0}
	,500);
}

//Set article top
function articleTop(){
	var headerHeight = $("header").height();
	$("#content").css("margin-top",headerHeight+10+"px");
}