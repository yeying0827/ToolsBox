$("#saveSearch").click(saveEngine);

function saveEngine(){
  value = $("#searchEngine").val();
  chrome.storage.local.set({'searchEngine':value}, function(){console.log('Saved: '+value)});
}

chrome.storage.local.get('searchEngine', function(items) {
  if (!items.searchEngine){
    $("#searchEngine").val("https://gg.ruanjiadeng.com");
    saveEngine();
  } else {
    $("#searchEngine").val(items.searchEngine);
  }
});
