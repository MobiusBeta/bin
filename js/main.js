/* JavaScript written by MaoRX.cn */
var version = "21w23a2";
console.info("Version " + version);
var backend = "https://maorx.cn/bin_backend/main.php";
var postBtnEnabled = true;
var postPicUrl = "";
var postPicDelUrl = "";

addSplashInfo();
getPosts();

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
btnNew.onclick = function () {
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
btnBack.onclick = function () {
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
btnSend.onclick = function () {
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
			xhr.send("action=post&postContent="+postContent+"&postPicUrl="+postPicUrl+"&postPicDelUrl="+postPicDelUrl);
			xhr.onreadystatechange = function(){ 
				if(xhr.readyState==4){
					if(xhr.status==200){
						hide(postLoading);
						textEdit.value="";
						postPicUrl="";
						postPicDelUrl="";
						btnPic.style.backgroundImage="";
						iconPic.style.opacity="1";
						btnBack.onclick();
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
				postList.innerHTML = xhr.responseText.replace(/<script>/g, "&lt;script&gt;").replace(/<style>/g, "&lt;style&gt;").replace(/<input>/g, "&lt;input&gt;");
				themeShift();
				if(xhr.responseText!=""){
					hide(emptyPlaceholder);
				}
				if(document.getElementsByClassName("toDel")){
					toDelClass=document.getElementsByClassName("toDel");
					for(i=0; i<toDelClass.length; i++){ 
						toDelPicUrl=toDelClass[i].id;
						fetch(toDelPicUrl);
					}
				}
				showPostsAnimation();
				//console.log(xhr.responseText);
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
btnPic.onclick = function () {
	alert("上传图片的功能坏掉了，我还没有修...");
	// if(iconPic.style.opacity==="0"){
	// 	fetch(postPicDelUrl);
	// 	postPicUrl="";
	// 	postPicDelUrl="";
	// 	btnPic.style.backgroundImage="";
	// 	iconPic.style.opacity="1";
	// }else{
	// 	browsePic.click();
	// }
}
browsePic.onchange = function () {
	loading("uploading...");
	var f=browsePic.files[0];
    var formData=new FormData();
    formData.append('smfile',f);

    fetch("https://sm.ms/api/upload",{
	    "method":"POST",
	    "body":formData
	}).then(response=>{
	    if(response.ok||response.status==200){
	        return response.json()
	    }else{
	        //返回了错误的HTTP状态码
	    }
	}).then(data=>{
	    console.log(data);
	    postPicUrl=data.data.url;
	    postPicDelUrl=data.data.delete;
	    btnPic.style.backgroundImage="url("+data.data.url+")";
	    iconPic.style.opacity="0";
	    hide(postLoading);
	}).catch(error=>{
	    console.log(error);
	    loadingTip.innerText="error :(";
	    setTimeout(function(){
			hide(postLoading);
		},2000);

	})

	/*$.ajax({
	    url: 'https://sm.ms/api/upload',
	    method: 'POST',
	    success: function(data){
	        console.log(data);
	        $('#res').html(JSON.stringify(data.data.url));
	        console.log(data);
	    },
	    error: function(data){
	        console.log(data);
	    },
	    
	    data:formData,
	    cache: false,
	    contentType: false,
	    processData: false
	});*/

	//frmUplPic.submit();
}
