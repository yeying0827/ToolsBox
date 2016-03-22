chrome.omnibox.onInputEntered.addListener(omniboxFunc);
function omniboxFunc(text){
    chrome.storage.local.get('searchEngine', function(items){
        window.open(items.searchEngine + "/search?q=" + text, "_blank");
    });
}