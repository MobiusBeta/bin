/* JavaScript written by MaoRX.cn */
var version="19w30b";
console.info("Version "+version);
var backend="https://maorx.cn/bin_backend/main.php";
var postBtnEnabled=true;

window.onload=function(){
	//hide(splashScr);
}
function addSplashInfo(){
	splashInfo.innerHTML="&copy; Mao Ruoxin | "+version;
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
	setTimeout(function(){
		btnPic.style.bottom="50px";
	},350);
}
function goBack(){
	btnSend.style.bottom="-60px";
	setTimeout(function(){
		btnPic.style.bottom="-60px";
	},100);
	hide(areaEdit);
	hide(btnBack);
	setTimeout(function(){
		btnNew.style.bottom="50px";
	},250);
}
function loading(tipText){
	loadingTip.innerText=tipText;
	show(postLoading);
}
function post(){
	if(textEdit.value!=""){
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
					setTimeout(function(){
						btnPic.style.bottom="-60px";
					},100);
				}
				postBtnEnabled=true;
			},1250);
			loading("posting...");

			postContent=textEdit.value;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", backend);
			xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
			xhr.send("action=post&postContent="+postContent);
			xhr.onreadystatechange = function(){ 
				if(xhr.readyState==4){
					if(xhr.status==200){
						hide(postLoading);
						textEdit.value="";
						goBack();
						getPosts();
						setTimeout(function(){
							loading("refreshing...");
						},300);
						//console.log(xhr.responseText);
					}else{
						loadingTip.innerText="error :(";
						btnSend.style.bottom="50px";
						setTimeout(function(){
							btnPic.style.bottom="50px";
						},100);
						setTimeout(function(){
							hide(postLoading);
						},2000);
					}
				}
			}
		}
	}else{
		alert("此时无声胜有声？");
	}
}
function getPosts(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", backend);
	xhr.setRequestHeader('Content-Type',' application/x-www-form-urlencoded');
	xhr.send("action=getPosts");
	xhr.onreadystatechange = function(){ 
		if(xhr.readyState==4){
			if(xhr.status==200){
				postList.innerHTML=xhr.responseText;
				themeShift();
				if(xhr.responseText!=""){
					hide(emptyPlaceholder);
				}
				showPostsAnimation();
				//console.log(xhr.responseText);
			}else{
				//hide(splashScr);
			}
			hide(splashScr);
			hide(postLoading);
		}
	}
}
function showPostsAnimation(){
	postItem=document.getElementsByClassName("postItem");
	for(let i=0; i<postItem.length; i++){ 
		setTimeout(function(){
			postItem[i].style.opacity="1";
			postItem[i].style.transform="scale(1.05)";
		},100+100*i);
		setTimeout(function(){
			postItem[i].style.transform="scale(1)";
		},350+100*i);
	}
}
function attachPic(){
	//alert("working on it");
	browsePic.click();
}
function uploadPic(){
	//alert("working on it");
	frmUplPic.submit();
}
