// Fade in and out element given by id.
function fadeInOut(id) {
  $(id).fadeIn();
  setTimeout(function() {
    $(id).fadeOut();
  }, 900);
}

// Save value to storage.
$('#save-index').click(function() {
  chrome.storage.local.set({
    'index-url': $('#index-loc').val(),
    'extension-active': $('#extension-active').prop('checked')
  }, function() {
    // Show success or failure.
    if (!chrome.runtime.lastError) {
      fadeInOut('#saved-text');
    } else {
      fadeInOut('#not-saved-text');
    }
  });
});

chrome.storage.local.get(['index-url', 'extension-active'], function(items) {
  if (!chrome.runtime.lastError) {
    $('#index-loc').val(items['index-url']);
    $('#extension-active').prop('checked', items['extension-active']);
  }
});
