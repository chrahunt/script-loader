/*
 * Check for presence of an element, execute callback when found or try again.
 */
function delayedCheck(element, callback) {
  //console.debug("Checking for " + element); // DEBUG
  var elt = document.querySelector(element);
  if (elt) {
    if (callback) {
      callback(elt);
      return;
    } else {
      return elt;
    }
  }

  if (times < 50) {
    times++;
    setTimeout(function() {delayedCheck(element, callback)}, 25);
  }
} 

// Execute function after global game is loaded to prevent conflicts.
function checkForGlobalGame(callback) {
  delayedCheck("script[src*='socket']", callback);
}

// Remove self.
function removeScript() {
  this.parentNode.removeChild(this);
}

// Inject require.js into page and set data-main to path.
function injectRequireScript(path) {
  var script = document.createElement('script');
  script.setAttribute("type", "text/javascript");
  script.src = path;
  
  //script.onload = removeScript;
  (document.head||document.documentElement).appendChild(script);
}

// If we're in a game, as evidenced by there being a port number, inject the scripts.
if(document.URL.search(/\.\w+:/) >= 0) {
  // Get scripts from index link.
  chrome.storage.local.get(['index-url', 'extension-active'], function(items) {
    if (!chrome.runtime.lastError) {
      // Only inject if extension is active.
      if (items['extension-active']) {
        var requirementLink = items['index-url'];
        checkForGlobalGame(function() {
          setTimeout(function() {
            injectRequireScript(requirementLink);
          }, 100);
        });
        /*
        // No changes needed for json, parsed automatically
        $.get(listLink, function(scripts) {
          console.log("Injecting " + scripts.length + " scripts.");
          scripts.forEach(injectScript);
        }, "json");
        */
      }
    }
  });
}

var times = 0;
