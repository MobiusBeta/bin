/* JavaScript written by MaoRX.cn */
var themeShiftEnabled=true;
var time=new Date().getHours();

if(themeShiftEnabled){
	if(time>21 || time<7){
		document.body.classList.add("dark");
		splashScr.classList.add("dark");
		topBar.classList.add("dark");
		btnNew.classList.add("dark");
		btnSend.classList.add("dark");
		emptyPlaceholder.classList.add("dark");
		areaEdit.classList.add("dark");
		textEdit.classList.add("dark");
	}
}
