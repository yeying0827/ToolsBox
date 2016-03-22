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
    if (info.srcUrl.indexOf("http") == 0){
        var data = getBase64Image(img);
    }else {
        var data = info.srcUrl;
    }
    var tmp = document.createElement("p")
    tmp.id = "tmp";
    $("body").append(tmp);
    var t = $("#tmp");
    t.html(data);

    var range = document.createRange();
    range.selectNode(tmp);
    window.getSelection().addRange(range);
    try {
        // Now that we've selected the anchor text, execute the copy command
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        alert(info.srcUrl + '\n\nParse image ' + msg);
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