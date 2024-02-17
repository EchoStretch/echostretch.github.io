var i = 0;

var fwUA = navigator.userAgent.substring(navigator.userAgent.indexOf('5.0 (') + 19, navigator.userAgent.indexOf(') Apple'));
var fwC = navigator.userAgent;
var FwUAR = fwUA.replace("layStation 4/","");

function Menu() {
    var x = document.getElementById("Menu");
    if (x.className === "topmenu") {
      x.className += " responsive";
    } else {
      x.className = "topmenu";
    }
}

function ConsoleCheck() {
    var images;
    let currentDate = new Date();
    let cMonth = currentDate.getMonth() +1;

    if(cMonth == "12") {
      images = [
        'Christmas/BG.jpg',
      ]
    }else if (cMonth == "10"){
      images = [
        'Halloween/BG.jpg',
      ]
    }else{
      images = [
        'BG.jpg',
        'BG1.jpg',
        'BG3.jpg',
        'BG4.jpg',
        'BG7.jpg',
        'BG8.jpg',
        'BG9.jpg',
        'BG10.jpg',
        "BG11.jpg",
        "BG12.jpg",
        "BG13.jpg",
        "BG15.jpg",
        "BG16.jpg",
        "BG17.jpg",
        "BG18.jpg",
        "BG19.jpg",
        "BG20.jpg"
      ]
    }
    
    var length = images.length;
    var rand = Math.floor(length*Math.random());
    document.getElementById('BG').src="../CSS/Images/" + images[rand];

    let PS4C = navigator.userAgent.substring(navigator.userAgent.indexOf('5.0 ('), navigator.userAgent.indexOf(') Apple'));
    //alert(PS4C);
    if (PS4C.includes("5.0 (Play") ) {
    //alert("ps4 detect");
    document.getElementById("pc").style.display = "none";
    document.getElementById("ps4").style.display = "block";
    document.getElementById("ButtonCredit").style.display = "none";
    document.getElementById("ButtonJailbreak").style.display = "none";


    const params = new URLSearchParams(document.location.search);
    const J = params.get("J");
    if (J == "P") {
      document.getElementById("pc").style.display = "block";
      document.getElementById("ps4").style.display = "none";
      document.getElementById("psip").style.visibility = "hidden";
      document.getElementById("psip").value = "127.0.0.1";
      document.getElementById("cb").style.visibility = "hidden";
      removeOptions(document.getElementById("cb"));
      addOption(document.getElementById("cb"), fwUA, fwUA);
      //alert(fwUA);
      //document.getElementById("cb").value = fwUA;
      document.getElementById("ButtonCredit").style.display = "block";
      document.getElementById("ButtonCredit").style.width = "10%";
      document.getElementById("ButtonCredit").style.marginLeft = "30%";
      document.getElementById("ButtonJailbreak").style.display = "block";

      if (fwC.includes("5.05") || fwC.includes("6.72") || fwC.includes("7.50") || fwC.includes("7.51") || fwC.includes("7.55") || fwC.includes("9.00")) {
        OSDetect(`OS : Playstation 4 <br> FW : ${FwUAR}`, "success");
      } else if (fwUA == "5.50" || fwUA == "5.53" || fwUA == "5.55" || fwUA == "5.56" || fwUA == "6.00" || fwUA == "6.02" || fwUA == "6.20" || fwUA == "6.50" || fwUA == "6.51" || fwUA == "6.70" || fwUA == "6.71") {
        OSDetect(`OS : Playstation 4 <br> FW : ${fwUA}<br> Please update to 6.72 !`, "warning");
      } else if (fwUA == "7.00" || fwUA == "7.01" || fwUA == "7.02") {
        OSDetect(`OS : Playstation 4 <br> FW : ${fwUA} <br> Please update to 7.55 !`, "warning");
      } else if (fwUA == "8.00" || fwUA == "8.01" || fwUA == "8.03" || fwUA == "8.50" || fwUA == "8.52") {
        OSDetect(`OS : Playstation 4 <br> FW : ${fwUA}<br> Please update to 9.00 !`, "warning");
      } else {
        OSDetect(`OS : Playstation 4 <br> FW : N/A <br> Can't detect firmware !`, "warning");
      } 
    } 
  } else {
    document.getElementById("pc").style.display = "block";
    document.getElementById("ButtonCredit").style.width = "25%";
    document.getElementById("ButtonCredit").style.marginLeft = "37%";
    
    if (PS4C.includes("Windows")) {
      OSDetect(`OS : Windows`, "success");
    } else if (PS4C.includes("(iPhone;")) {
      OSDetect(`OS : iPhone`, "success");
    } else if (PS4C.includes("Android")) {
      OSDetect(`OS : Android`, "success");
    } else if (PS4C.includes("iPad")) {
      OSDetect(`OS : iPad`, "success");
    } else if (PS4C.includes("Mac OS")) {
      OSDetect(`OS : MacOS`, "success");
    } else if (PS4C.includes("Linux")) {
      OSDetect(`OS : Linux`, "success");
    } else {
      OSDetect(`OS : N/A <br> Can't detect OS`, "warning");
    }
  }
}


function addOption(selectbox,text,value )

  {var optn = document.createElement("OPTION");

  optn.text = text;

  optn.value = value;

  selectbox.options.add(optn);

}

function removeOptions(selectElement) {
  var i, L = selectElement.options.length - 1;
  for(i = L; i >= 0; i--) {
     selectElement.remove(i);
  }
}

//------BIG THANKS TO SISTRO FOR THIS !!!!!--------


var getPayload = function(payload, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open('GET', payload);
  req.send();
  req.responseType = "arraybuffer";
  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

var sendPayload = function(url, data, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.send(data);

  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

function LoadpaylodsGhen20(PLfile){ //Loading Payload via Payload Param.
  var PS4IP = document.getElementById("psip").value;
	  
		// First do an initial check to see if the BinLoader server is running, ready or busy.
		var req = new XMLHttpRequest();
    if (PS4IP == "127.0.0.1") {
      req.open("POST", `http://${PS4IP}:9090/status`);
    } else {
      req.open("GET", `http://${PS4IP}:9090/status`);
    }
		req.send();
		req.onerror = function(){
			//alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
      ServerStatus("Cannot Load Payload Because The BinLoader Server Is Not Running");
			return;
		};
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		  getPayload(PLfile, function (req) {
				if ((req.status === 200 || req.status === 304) && req.response) {
				   //Sending bins via IP POST Method
           sendPayload(`http://${PS4IP}:9090`, req.response, function (req) {
            if (req.status === 200) {
              alert("Payload sent !");
					   }else{
               ErrorNotif();
               return;
              }
					})
				}
			});
      PleaseWait();
			}
			else {
				//alert("Cannot Load Payload Because The BinLoader Server Is Busy");//<<If server is busy, alert message.
        ErrorNotif3();
				return;
		  }
	  };
  }

//--------------------------------------------------

function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          document.getElementById(element).style.display = 'none';
      }
      document.getElementById(element).style.opacity = op;
      document.getElementById(element).style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 1;
  }, 0);
}

function unfade(element) {
  var op = 0.1;  // initial opacity
  document.getElementById(element).style.display = 'block';
  var timer = setInterval(function () {
      if (op >= 1){
          clearInterval(timer);
      }
      document.getElementById(element).style.opacity = op;
      document.getElementById(element).style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 1;
  }, 0);
}

function SucessNotif() {
  new Notify({
    status: 'success',
    title: 'Sucess',
    text: "Payload Loaded !",
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 500,
    gap: 25,
    distance: 35,
    type: 2,
    position: 'top right'
  })
}

function ErrorNotif() {
  new Notify({
    status: 'Error',
    title: 'Error',
    text: "Can't send the payload !",
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 500,
    gap: 25,
    distance: 35,
    type: 3,
    position: 'top right'
  })
}

function ErrorNotif2() {
  new Notify({
    status: 'Error',
    title: 'Error',
    text: "Payload Not Found !",
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 500,
    gap: 25,
    distance: 35,
    type: 3,
    position: 'top right'
  })
}

function ErrorNotif3() {
  new Notify({
    status: 'Error',
    title: 'Error',
    text: "Server busy !",
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: true,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 500,
    gap: 25,
    distance: 35,
    type: 3,
    position: 'top right'
  })
}

function PleaseWait() {
  new Notify({
    status: 'warning',
    title: 'PLEASE WAIT',
    text: "If nothing happend check if you have activated the 'BinLoader Server' in the setting !",
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 1000,
    gap: 25,
    distance: 35,
    type: 2,
    position: 'top right'
  })
}

function ServerStatus(str) {
  new Notify({
    status: 'warning',
    title: 'Server Status',
    text: str,
    effect: 'fade',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout: 1000,
    gap: 25,
    distance: 35,
    type: 2,
    position: 'top right'
  })
}


function OSDetect(str,tpe) {
  new Notify({
    status: tpe,
    title: "Operating System Detected",
    text: str,
    effect: 'slide',
    speed: 300,
    customClass: null,
    customIcon: null,
    showIcon: false,
    showCloseButton: false,
    autoclose: true,
    autotimeout : 10000,
    gap: 25,
    distance: 35,
    type: 1,
    position: 'top right'
  })
}
