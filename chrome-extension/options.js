var storage = chrome.storage.local;

$(function() {
      if(localStorage.getItem('channel')){
          storage.get('channel', function(channel) {
                          if (channel) {
                              $('#new-channel-input').val(channel);
                          }
                      });
          
      }
      $('#new-channel-submit').click(
          function(){
              storage.set({'channel': $('#new-channel-input').val()}, function() {
                              console.log('Settings saved');
                          });
          });
});
