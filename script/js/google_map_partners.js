let map;
let marker;
let geocoder;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: { lat: 48.86, lng: 2.34 },
        mapTypeControl: false,
    });

    geocoder = new google.maps.Geocoder();

    const data = JSON.parse(document.getElementById('data').textContent)

    for (const iterator in data) {
        geocode({ address: data[iterator]["address"] + ", " + data[iterator]["city"] }, data[iterator]["name"])
    }
}

function geocode(request, hospital_name) {
    geocoder
        .geocode(request)
        .then((result) => {
            const { results } = result;
            marker = new google.maps.Marker({
                map,
                title: hospital_name,
            });
            marker.setPosition(results[0].geometry.location);
            marker.setMap(map);
            return results;
        })
        .catch((e) => {
            alert("Geocode was not successful for the following reason: " + e);
        });
}