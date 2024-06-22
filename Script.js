document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([49.187500, -122.849000], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const kpuLocation = L.latLng(49.187500, -122.849000);
    L.marker(kpuLocation).addTo(map)
        .bindPopup('KPU Surrey Library')
        .openPopup();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const userLocation = L.latLng(position.coords.latitude, position.coords.longitude);
            L.marker(userLocation).addTo(map)
                .bindPopup('Your Location')
                .openPopup();

            const distance = userLocation.distanceTo(kpuLocation) / 1000; // Distance in km
            document.getElementById('distance').innerText = `${distance.toFixed(2)} km`;
        });
    } else {
        document.getElementById('distance').innerText = 'Geolocation is not supported by your browser.';
    }
});
