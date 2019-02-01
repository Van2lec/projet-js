
var stationSelect = false;

var status;
var name;
var adress;
var capacity;
var disponibility;

var marker;

var user_name;
var user_surname;
var timer;
var stationsElts

ajaxGet ("https://api.jcdecaux.com/vls/v1/stations?contract=Marseille&apiKey=6ef4b7c2e1b8be114b5f074dd34f989959d9bd9d", function(reponse){
  sessionStorage.setItem("objet", reponse);
});

var mymap = L.map('mapid').setView([43.285922, 5.38373], 16);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var t = setInterval(createStations, 1000);
function createStations() {
  if (sessionStorage.getItem("objet")) {
    stationsElts = sessionStorage.getItem("objet");
    stationsElts = JSON.parse(stationsElts);
    stationsElts.forEach(function(station){
      marker = L.marker([station.position.lat, station.position.lng]).addTo(mymap);
      marker.addEventListener("click",function(){
        if (station.status === "OPEN"){
          stationSelect = true;
          status = "Station Ouverte !";
          name = station.name.slice(5);
          adress = station.address.split('-');
          capacity = station.available_bike_stands;
          disponibility = station.available_bikes;
          document.getElementById("status").textContent = status;
          document.getElementById("name").textContent = name;
          document.getElementById("adress").textContent = adress[1];
          document.getElementById("capacity").textContent = capacity;
          document.getElementById("disponibility").textContent = disponibility;
        } else {
          document.getElementById("status").textContent = "Station Fermé !";
        }
      });
    });
  }
  clearInterval(t);
}


function menuV2 () {
  document.getElementById("validate").value ="retour";

  document.getElementById("canvas").style.display = "block";
  var test2 = document.getElementsByClassName("one");
  for (var i = 0; i < test2.length; i++) {
    test2[i].style.display = "none";
  }
  var test =document.getElementsByClassName("two");
  for (var i = 0; i < test.length; i++) {
    test[i].style.display = "contents"
  }
}

function menuV1 () {
  document.getElementById("canvas").style.display = "none";
  var test2 = document.getElementsByClassName("one");
  for (var i = 0; i < test2.length; i++) {
    test2[i].style.display = "list-item";
  }
  var test = document.getElementsByClassName("two");
  for (var i = 0; i < test.length; i++) {
    test[i].style.display = "none";
  }
  document.getElementById("validate").value = "valider";

}




document.getElementById("validate").addEventListener("click", function(){
  if ((document.getElementById("validate").getAttribute("value") == 'valider') && (stationSelect == true) && (disponibility > 0)) {
    menuV2();
  } else if (document.getElementById("validate").getAttribute("value") == 'retour') {
    menuV1();
  } else if (stationSelect == false) {

    alert("Veuillez sélectionner une station !");
  } else {
    alert("Aucun vélo disponible sur la station sélectionnée !");
  }
});




document.getElementById("reserved").addEventListener("click", function(){
  var reservationOk = true;

  var test3 = document.getElementsByClassName("resOk");
  for (var i = 0; i < test3.length; i++) {
    test3[i].style.display = "list-item";
  }
  document.getElementById("resNon").style.display = "none";
  sessionStorage.setItem("reservationOk", reservationOk);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("adress", adress[1]);
  document.getElementById("res_name").textContent = name + " (" + adress[1] + ")";
  user_name = document.getElementById("user_name").value;
  user_surname = document.getElementById("user_surname").value;
  document.getElementById("u_name").textContent = user_name;
  document.getElementById("u_surname").textContent = user_surname;
  localStorage.setItem("user_name", user_name);
  localStorage.setItem("user_surname", user_surname);
});

if (sessionStorage.getItem("reservationOk")) {
 var test3 = document.getElementsByClassName("resOk");
  for (var i = 0; i < test3.length; i++) {
    test3[i].style.display = "list-item";
  }
  document.getElementById("resNon").style.display = "none";
  name = sessionStorage.getItem("name");
  adress = sessionStorage.getItem("adress");
  document.getElementById("res_name").textContent = name + " (" + adress + ")";
  document.getElementById("u_name").textContent = localStorage.getItem("user_name");
  document.getElementById("u_surname").textContent = localStorage.getItem("user_surname");
  timer = 20;
}

var t2 = setInterval(timer, 60000);
function timer() {
  if (timer > 0) {
    timer --;
  } else {
    var test3 = document.getElementsByClassName("resOk");
  for (var i = 0; i < test3.length; i++) {
    test3[i].style.display = "none";
  }
    document.getElementById("resNon").style.display = "list-item";
    sessionStorage.clear();
  }
}



if (localStorage.getItem("user_surname")) {
  document.getElementById("user_name").value = localStorage.getItem("user_name");
  document.getElementById("user_surname").value = localStorage.getItem("user_surname");
}

$(document).ready(function () {

        //User Variables
        var canvasWidth = 400;                           //canvas width
        var canvasHeight = 60;                           //canvas height
        var canvas = document.getElementById('canvas');  //canvas element
        var context = canvas.getContext("2d");           //context element
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;

        canvas.addEventListener("mousedown", mouseDown, false);
        canvas.addEventListener("mousemove", mouseXY, false);
        document.body.addEventListener("mouseup", mouseUp, false);

              //For mobile
              canvas.addEventListener("touchstart", mouseDown, false);
              canvas.addEventListener("touchmove", mouseXY, true);
              canvas.addEventListener("touchend", mouseUp, false);
              document.body.addEventListener("touchcancel", mouseUp, false);

              function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas

            context.strokeStyle = "#000000";  //set the "ink" color
            context.lineJoin = "miter";       //line join
            context.lineWidth = 2;            //"ink" width

            for (var i = 0; i < clickX.length; i++) {
                context.beginPath();                               //create a path
                if (clickDrag[i] && i) {
                    context.moveTo(clickX[i - 1], clickY[i - 1]);  //move to
                  } else {
                    context.moveTo(clickX[i] - 1, clickY[i]);      //move to
                  }
                context.lineTo(clickX[i], clickY[i]);              //draw a line
                context.stroke();                                  //filled with "ink"
                context.closePath();                               //close path
              }
            }

        //Save the Sig
        $("#saveSig").click(function saveSig() {
          var sigData = canvas.toDataURL("image/png");
          $("#imgData").text(sigData);
        });

        //Clear the Sig
        $('#clearSig').click(
          function clearSig() {
            clickX = new Array();
            clickY = new Array();
            clickDrag = new Array();
            context.clearRect(0, 0, canvas.width, canvas.height);
            $("#imgData").html('');
          });

        function addClick(x, y, dragging) {
          clickX.push(x);
          clickY.push(y);
          clickDrag.push(dragging);
        }

        function mouseXY(e) {
         if (paint) {
          addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
          draw();
        }
      }

      function mouseUp() {
        paint = false;
      }

      function mouseDown(e)
      {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        draw();
      }

    });
