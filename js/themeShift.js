/* JavaScript written by MaoRX.cn */
var themeShiftEnabled=true;
var time=new Date().getHours();

function themeShift(){
	if(themeShiftEnabled){
		if(time>21 || time<7){
			shift(document.body);
			shift(splashScr);
			shift(splashInfo);
			shift(topBar);
			shift(emptyPlaceholder);
			shift(areaEdit);
			shift(textEdit);
			shift(postLoading);
			shift(loadingTip);
			classShift("btnRound");
			classShift("postItem");
			classShift("postContent");
			classShift("postTime");
		}
	}
}
function shift(targetId){
	targetId.classList.add("dark");
}
function classShift(targetClass){
	targetClass1=document.getElementsByClassName(targetClass);
	for(i=0; i<targetClass1.length; i++){ 
		targetClass1[i].classList.add("dark");
	}
}

