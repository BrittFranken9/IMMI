import './style.css'

let ws = new WebSocket('ws://10.150.197.78:1880/websocket');

ws.onopen = function() {
    console.log('Connected to server');
}

ws.onmessage = function(event) {
  console.log('Message from server ', event.data);

  if (typeof event.data === 'object') {
    // Assuming the message is a blob
    var reader = new FileReader();
    reader.onload = function() {
        var base64data = reader.result;
        // Use the base64 data as image src
        var img = document.querySelector('#image');
        img.src = base64data;
    };
    reader.readAsDataURL(event.data);
}

 
}