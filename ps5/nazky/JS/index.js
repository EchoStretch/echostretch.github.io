function ConsoleCheck() {

  var fwUA = navigator.userAgent.substring(navigator.userAgent.indexOf('5.0 (') + 32, navigator.userAgent.indexOf(') Apple'));
  var fwC = navigator.userAgent;

  let PS5C = navigator.userAgent.substring(navigator.userAgent.indexOf('5.0 ('), navigator.userAgent.indexOf(') Apple'));
  if (PS5C.includes("PlayStation 5") ) {
      if (fwUA.includes("3.00") || fwUA.includes("3.10") || fwUA.includes("3.20") || fwUA.includes("3.21") || fwUA.includes("4.02") || fwUA.includes("4.03") || fwUA.includes("4.50") || fwUA.includes("4.51")) {
          OSDetect(`OS : Playstation 5 <br> FW : ${fwUA}`, "success");
      } else if(fwUA.includes("2.") || fwUA.includes("3.") || fwUA.includes("4.00")) {
          OSDetect(`OS : Playstation 5 <br> FW : ${fwUA} <br> Not compatible yet !`, "warning");
      } else if(fwUA.includes("5.")){
          OSDetect(`OS : Playstation 5 <br> FW : ${fwUA} <br> Not compatible !`, "Error");
      } else {
          OSDetect(`OS : Playstation 5 <br> FW : N/A <br> Can't detect firmware !`, "warning");
      } 
  } else { 
      if (fwC.includes("Windows")) {
      OSDetect(`OS : Windows`, "success");
      } else if (fwC.includes("(iPhone;")) {
      OSDetect(`OS : iPhone`, "success");
      } else if (fwC.includes("Android")) {
      OSDetect(`OS : Android`, "success");
      } else if (fwC.includes("iPad")) {
      OSDetect(`OS : iPad`, "success");
      } else if (fwC.includes("Mac OS")) {
      OSDetect(`OS : MacOS`, "success");
      } else if (fwC.includes("Linux")) {
      OSDetect(`OS : Linux`, "success");
      } else {
      OSDetect(`OS : N/A <br> Can't detect OS`, "warning");
      }
  }
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
