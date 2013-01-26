broadcastUrl = "http://www.google.com";
socket = io.connect("http://192.168.0.190:4000");
browser = {
    id : 0
};

var storage = chrome.storage.local;
storage.get('channel', function(channel) {
                if (channel) {
                    browser.channel = channel;
                }
            });


socket.on('connect', function() {
    	      socket.emit('client_connected', browser);
          });

socket.on('accepted', function(data) {
    	      browser.id = data.id;
          });

socket.on('open_url', function(url) {
    	      console.log('open url');
       	      chrome.tabs.create({url: url});
          });



chrome.browserAction.onClicked.addListener(
    function(){
        chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		          function(tabs){
		              broadcastUrl = tabs[0].url;
    	                      console.log('broadcast click');
    	                      socket.emit('broadcast', broadcastUrl);
		          });	
    });

	

