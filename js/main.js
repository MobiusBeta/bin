/* JavaScript written by MaoRX.cn */
var version="19w27a3";
console.info("Version "+version);

function show(ele){
	ele.style.display="block";
	setTimeout(function(){
		ele.style.opacity="1";
	},10);
}
function hide(ele){
	ele.style.opacity="0";
	setTimeout(function(){
		ele.style.display="none";
	},250);
}
function newDraft(){
	btnNew.style.bottom="-60px";
	show(areaEdit);
	show(btnBack);
	textEdit.focus();
	setTimeout(function(){
		btnSend.style.bottom="50px";
	},250);
}
function goBack(){
	btnSend.style.bottom="-60px";
	hide(areaEdit);
	hide(btnBack);
	setTimeout(function(){
		btnNew.style.bottom="50px";
	},250);
}