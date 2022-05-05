
    function geoloc() {
        d=document.getElementById("demo");
        if (navigator.geolocation){
          d.innerHTML="<p>Tu dispositivo soporta la geolocalización.</p>";
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      else {
          d.innerHTML="<p>Lo sentimos, tu dispositivo no admite la geolocaización.</p>";
        }
      }
      function showPosition(position){
        d.innerHTML+="<p>Latitud: "+position.coords.latitude+"</p>";
        d.innerHTML+="<p>Longitud: "+position.coords.longitude+"</p>";
        let map = L.map('map').setView([position.coords.latitude,position.coords.longitude], 3);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([position.coords.latitude,position.coords.longitude]).addTo(map)
            .bindPopup('Tu estas aqui')
            .openPopup();
      }