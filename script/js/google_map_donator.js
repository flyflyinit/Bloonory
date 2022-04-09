function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 48.52, lng: 2.19 },
    });

    const onChangeHandler = function () {
        if (document.getElementById("start").value !== "" && document.getElementById("end").value !== "") {
            directionsRenderer.setMap(map);
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        } else {
            directionsRenderer.setMap(null);
        }
    };

    document.getElementById("start").addEventListener("change", onChangeHandler);
    document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService
        .route({
            origin: {
                query: document.getElementById("start").value,
            },
            destination: {
                query: document.getElementById("end").value,
            },
            travelMode: google.maps.TravelMode.DRIVING,
        })
        .then((response) => {
            directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
}