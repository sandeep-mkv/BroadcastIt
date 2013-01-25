    

	var broadcastUrl = "http://www.google.com";
    var socket = io.connect("http://192.168.0.190:4000");
    var browser = {
    	id : 0
    };

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



$(document).ready(function(){

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
		function(tabs){
			broadcastUrl = tabs[0].url;
		}
	);	

    $('.broadcast').click(function(){
    	console.log('broadcast click');
    	socket.emit('broadcast', broadcastUrl);
    })
	
});

