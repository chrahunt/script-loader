// Remove self.
function removeScript() {
  this.parentNode.removeChild(this);
}

// Inject script given by path into page.
function injectScript(path) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.src = path;
  script.onload = removeScript;
  (document.head||document.documentElement).appendChild(script);
}

// If we're in a game, as evidenced by there being a port number, inject the scripts.
if(document.URL.search(/\.\w+:/) >= 0) {
  // Get scripts from index link.
  chrome.storage.local.get(['index-url', 'extension-active'], function(items) {
    if (!chrome.runtime.lastError) {
      // Only inject if extension is active.
      if (items['extension-active']) {
        var listLink = items['index-url'];
        // No changes needed for json, parsed automatically
        $.get(listLink, function(scripts) {
          console.log("Injecting " + scripts.length + " scripts.");
          scripts.forEach(injectScript);
        }, "json");
      }
    }
  });
}
