function sendData(DisplayID, DataID)
{
    function servletCallback()
    {
    	//make sure ready state = 4 and status = 200 (OK)
    	if ((req.readyState==4) &&(req.status==200))
        {
            console.log("callback received...");
            
            //decode the json and put it in an object
            var receivedJSON = JSON.decode(req.responseText);
            
            //create the new html from the json's data
            var newHtml = "<p>" + receivedJSON.Data + "</p>";
            console.log("new html = " + newHtml);
            
            //get the div id of a html element, and update its contents
            var MyDiv = document.getElementById(receivedJSON.DivId);
            MyDiv.innerHTML=newHtml;
        }
    }

    function callServlet()
    {
      //create the JSON object
      var dataElement = document.getElementById(DataID);
      var data = dataElement.value;
      var objJSON =
      {
        "DivId" : DisplayID,
        "Data" : dataElement.value
      };
      var strJSON = JSON.encode(objJSON);
      console.log("data = " + strJSON);
      
      //create and send the http request
      var QueryString = "content=" + strJSON;
      req.open("GET", "http://127.0.0.1:8888/bullygame/game?" + QueryString, true);
      req.send(null);
    }

    //create a new request & set its event handler
    req = new XMLHttpRequest();
    req.onreadystatechange = servletCallback;
    
    //send the request
    callServlet();
}
