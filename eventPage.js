// Google searchEngine
chrome.storage.local.get('searchEngine', function(items) {
  if (!items.searchEngine){
    chrome.storage.local.set({'searchEngine': "https://gg.ruanjiadeng.com"}, function(){console.log('Saved: '+value)});
  }
});

chrome.omnibox.onInputEntered.addListener(omniboxFunc);
function omniboxFunc(text){
    chrome.storage.local.get('searchEngine', function(items){
        window.open(items.searchEngine + "/search?q=" + text, "_blank");
    });
}

Right click menu
var createProperties = {
    "type": "normal",
    "id": "007",
    "title": "Base64编码当前图片",
    "onclick": "function(){console.log('llll')}",
    "contexts": ["image"]
}
chrome.contextMenus.create(createProperties, function(){
    console.log('chrom ')
    alert('sb');
})