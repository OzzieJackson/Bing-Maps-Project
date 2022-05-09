



//var lat = document.getElementById("Latitude")
//var  lon = document.getElementById("Longitude") 



        

        function loadMapScenario() {
            map = new Microsoft.Maps.Map(document.getElementById("myMap"), {});
            credentials: 'Ausb5oPsNgwvhkyOgS_h9mkXvbR2I2L2trnvcFuyL2UONG-vFRu16dw-iaTAtc-C'

        }

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPos)
}



function getPos(position) {
    lat = position.coords.latitude
    lon = position.coords.longitude
    console.log(lat, lon)


   

}



        //Marking the users Location
        navigator.geolocation.getCurrentPosition(function (position) {
            var loc = new Microsoft.Maps.Location(
                position.coords.latitude,
                position.coords.longitude);
            

            var pin = new Microsoft.Maps.Pushpin(loc);
          
            map.entities.push(pin);

            map.setView({ center: loc, zoom: 15 });
        });

        function requestData() {
            var responseStatusOk = this.status === 200;   //STATUS 200 means OK
            var responseComplete = this.readyState === 4; //readyState 4 means response is ready

            if (responseStatusOk && responseComplete) {
               // console.log(this.responseText); //debug

                //PARSE THE RESPONSE
                let responseData = JSON.parse(this.responseText);
                //GET THE data FROM THE RESPONSE TEXT
                //let locations = responseData.value;

                //resourceSet = responseData.resourceSets[0].resources;

                console.log(responseData); //this has the data inside of it
                
                
                PoiSaveData(responseData);
            }//end if
            
        }



        function APIRequest() {

            const Usersoption = document.getElementById("points-of-interest").value // Saving the Users input into the option variable
            

            
            const ajax = new XMLHttpRequest
            const requestUrl = 'https://dev.virtualearth.net/REST/v1/LocalSearch/?query=' + Usersoption + '&userLocation=' + lat + ',' + lon + '&key=Ausb5oPsNgwvhkyOgS_h9mkXvbR2I2L2trnvcFuyL2UONG-vFRu16dw-iaTAtc-C'
            const requestMethod = 'GET'
            let asyncRequest = true

            //SEND AJAX REQUEST TO THE URL
            ajax.open(requestMethod, requestUrl, asyncRequest);

            //SET CALLBACK FUNCTION (this function gets called automatically when the response gets back)
            ajax.onreadystatechange = requestData;

            //SEND REQUEST
            var data = ajax.send();

         
}



var locationData = [];
function PoiSaveData(responseData) {


    for (var index = 0; index < responseData.resourceSets[0].resources.length; index++) {
        //const PoiName = resourceSet[index].name
        //const PoiAddress = resourceSet[index].Address
        //const PoiPhoneNumber = resourceSet[index].PhoneNumber
        //lat = resourceSet[index].geocodepoints.coordinates
        //lon = resourceSet[index].geocodepoints.coordinates
        //
        //
        //console.log(PoiName)
        //console.log(PoiAddress)
        var name = responseData.resourceSets[0].resources[index].name;
        var address = responseData.resourceSets[0].resources[index].Address.formatAddress;
        var phonenumber = responseData.resourceSets[0].resources[index].PhoneNumber;
        var latitude = responseData.resourceSets[0].resources[index].geocodePoints[0].coordinates[0];
        var longitude = responseData.resourceSets[0].resources[index].geocodePoints[0].coordinates[1];
        locationData[index] = { name, address, phonenumber, latitude, longitude } // Saving all the Json data to one variable

        console.log(locationData[index].phonenumber, locationData[index].name, locationData[index].Address)
        // Logging the Phone number and address of each entity
       
        
    }

    AddPoiPushPins(); // calling the AddPoiPushPins function 
    
   
}
    function AddPoiPushPins() {
        //for (var index = 0; index < resourceSet.length; index++) {
        //    var poiPin = new Microsoft.Maps.Pushpin({ latitude: lat, longitude: lon }, null);
        //        
        //       
        //    map.entities.push(poiPin);
        //    
        //}
        


        for (var index = 0; index < locationData.length; index++) { // adding  
            var pushpin = new Microsoft.Maps.Pushpin({ latitude: locationData[index].latitude, longitude: locationData[index].longitude }, {title:locationData[index].name});
            map.entities.push(pushpin);
        }
      
       
    }

function deletePoiPins() { // Making a function deleteing the point of intrests pins
    for (var i = map.entities.getLength() - 1; i >= 0; i-- ) {  
        var deletePushPin = map.entities.get(i);
        if (deletePushPin instanceof Microsoft.Maps.Pushpin) {
            map.entities.removeAt(i);
        }
    }

  
} // end deletePoiPins function 


   
    

Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
    var directionsManager = new Microsoft.Maps.Directions.DirectionsManager();
    directionsManager.setRenderOptions({ itineraryContainer: document.getElementById('printoutPanel') });
    directionsManager.showInputPanel('directionsInputContainer');
});
   

   







