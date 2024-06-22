// Initialize and display the map
function initMap() {
    // KPU Surrey Library coordinates
    const kpuSurreyLibrary = { lat: 49.187275, lng: -122.851376 };

    // Create map centered at current location
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: kpuSurreyLibrary,
    });

    // Try HTML5 geolocation to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Display user's location marker on the map
                new google.maps.Marker({
                    position: userLocation,
                    map,
                    title: "Your Location",
                });

                // Calculate distance to KPU Surrey Library
                const distance = google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(userLocation),
                    new google.maps.LatLng(kpuSurreyLibrary)
                );

                // Convert distance to kilometers and update UI
                const distanceKm = (distance / 1000).toFixed(2);
                document.getElementById("distance").textContent = `Distance to KPU Surrey Library: ${distanceKm} km`;
            },
            () => {
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, map.getCenter());
    }
}

// Handle geolocation errors
function handleLocationError(browserHasGeolocation, pos) {
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
            "Error: The Geolocation service failed." :
            "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
