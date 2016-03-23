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

//Right click menu
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");
    // return dataURL.replace("data:image/png;base64,", "");
    return dataURL
}

function imageOnClick(info, tab) {
  var img = document.createElement('img');
  img.src = info.srcUrl;
  img.onload = function() {
    var data = getBase64Image(img);
    var tmp = document.createElement("p")
    document.body.appendChild(tmp);
    tmp.innerHTML = data;

    var range = document.createRange();
    range.selectNode(tmp);
    window.getSelection().addRange(range);
    try {
        // Now that we've selected the anchor text, execute the copy command
        var result = document.execCommand('copy');
        tmp.parentNode.removeChild(tmp);
        var msg = result ? 'successful' : 'unsuccessful';
        alert('Parse image ' + msg + '\n\n' + info.srcUrl);
    } catch(err) {
        console.log('Oops, unable to copy');
    }
  }
}

var createProperties = {
    "title": "Base64编码当前图片",
    "contexts": ["image"],
    "onclick": imageOnClick
}

var id = chrome.contextMenus.create(createProperties);