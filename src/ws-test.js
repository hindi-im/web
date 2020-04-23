const exampleSocket = new WebSocket("wss://leit.cc:8443/ws?peer=71989769-4dcb-4bd7-9ed6-c6b8a30cabfb", "protoo");


exampleSocket.onopen = function (event) {
    exampleSocket.send(JSON.stringify({"request":true,"id":2697513,"method":"join","data":{"rid":"room1","uid":"71989769-4dcb-4bd7-9ed6-c6b8a30cabfb","info":{"name":"sas"}}}));
  };

exampleSocket.onmessage = function (event) {
    console.log(event.data);
  }