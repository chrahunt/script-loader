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
    'index': $('#index-loc').val()
  }, function() {
    // Show success or failure.
    if (!chrome.runtime.lastError) {
      fadeInOut('#saved-text');
    } else {
      fadeInOut('#not-saved-text');
    }
  });
});

chrome.storage.local.get('index', function(items) {
  if (!chrome.runtime.lastError) {
    $('#index-loc').val(items.index);
  }
});
