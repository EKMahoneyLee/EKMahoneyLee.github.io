(function(){
    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([44.650627, -63.597140], 14);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    let mapLayer = L.geoJson(null, {pointToLayer: configIcon}).addTo(map);

    function updateBuses(){
    fetch(`https://hrmbusapi.herokuapp.com/`)
        .then(response => response.json())
        .then(json => {
        console.log(json);   
        const geojsonFeature = json.entity.filter(function(element){
            return element.vehicle.trip.routeId <= 10000;
        }).map(element => {
            return {         
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [element.vehicle.position.longitude, element.vehicle.position.latitude]
                },
                "properties": {
                    "id": element.id,
                    "bearing": element.vehicle.position.bearing,
                    "routeId": element.vehicle.trip.routeId,
                    "tripId": element.vehicle.trip.tripId,
                }
            }
        })
        console.log(geojsonFeature);
        mapLayer.clearLayers()
        mapLayer.addData(geojsonFeature)
        })
        setTimeout(updateBuses, 3000);  
    };
    setTimeout(updateBuses, 3000);  

    let newIcon = new L.icon({
        iconUrl: 'bus.png',
        iconSize: [25,30],
        iconAnchor: [10,20],
        popupAnchor: [13,15]
    }); 

    function configIcon (feature, latlng) {
        return L.marker(latlng,{icon: newIcon, rotationAngle: feature.properties.bearing}).addTo(map)
        .bindPopup('Bus Id:' + feature.properties.id + '</br>' + 'route Id:' + feature.properties.routeId  + '</br>' + 'trip Id:' + feature.properties.tripId)
        // .openPopup();
    };
})(); 