function ajaxGet (url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load",function (){
    if (req.status >= 200 && req.status < 400) {
      callback(req.responseText);
    }else {
      console.error(req.status +" "+req.statusText);
    }
  });
  req.addEventListener("error", function () {
    console.error("Erreur réseau");
  });
  req.send(null);
}

function callback (reponse) {
  console.log(reponse);
}
