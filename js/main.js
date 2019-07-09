/* JavaScript written by MaoRX.cn */
var version="19w28c1";
console.info("Version "+version);
var backend="https://maorx.cn/bin_backend/main.php";
var postBtnEnabled=true;

window.onload=function(){
	hide(splashScr);
}
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
function post(){
	if(postBtnEnabled){
		postBtnEnabled=false;
		iconSend.style.top="-20px";
		iconSend.style.left="70px";
		setTimeout(function(){
			iconSend.style.transition="none";
			iconSend.style.top="70px";
			iconSend.style.left="-20px";
		},500);
		setTimeout(function(){
			iconSend.style.transition="transform 0.25s, color 0.25s, top 0.5s, left 0.5s";
			iconSend.style.top="50%";
			iconSend.style.left="50%";
		},550);
		setTimeout(function(){
			if(loadingTip.innerText==="posting..."){
				btnSend.style.bottom="-60px";
			}
			postBtnEnabled=true;
		},1250);
		loadingTip.innerText="posting...";
		show(postLoading);

		postContent=textEdit.value;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", backend);
		xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
		xhr.send("action=post&postContent="+postContent);
		xhr.onreadystatechange = function(){ 
			if (xhr.readyState==4 && xhr.status==200){
				hide(postLoading);
				textEdit.value="";
				goBack();
			}else{
				setTimeout(function(){
					loadingTip.innerText="error :(";
					btnSend.style.bottom="50px";
				},250);
				setTimeout(function(){
					hide(postLoading);
				},2250);
			}
		}
	}
}
function getPost(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", backend);
	xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
	xhr.send("action=getPosts");
	xhr.onreadystatechange = function(){ 
		if (xhr.readyState==4 && xhr.status==200){ 
			console.log(xhr.responseText);
		}
	}
}
