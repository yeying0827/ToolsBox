links = document.getElementsByTagName('a');
var imgURL = chrome.extension.getURL("static/img/handCursor.png");
for (i=0;i<links.length;i++){
	if (links[i].target === "_blank"){
		links[i].style.cursor = 'url("' + imgURL + '"), pointer';
	}
}