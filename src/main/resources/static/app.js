document.addEventListener("DOMContentLoaded", function () {
    // Connect to WebSocket
    const socket = new SockJS('/ws');
    const stompClient = Stomp.over(socket);

    let map;
    let senderMarker;
    let receiverMarker;

    // Prompt user for sender and receiver IDs
    const senderId = prompt("Enter your ID:");
    const receiverId = prompt("Enter the ID of the person you want to share your location with:");

    stompClient.connect({}, onConnect, onError);

    function onConnect() {
        // Subscribe to the user's location updates
        const destination = `/app/${receiverId}/user-locations`;
        console.log("Subscribe to the user's location updates " + destination);
        stompClient.subscribe(destination, onMessageReceived);

        // Get and send the current location every 60 seconds (for testing purposes)
        setInterval(() => {
            getCurrentLocation().then((location) => {
                // Attach sender and receiver IDs to the location object
                location.sender = senderId;
                location.recipient = receiverId;
                stompClient.send(`/geoplus/location`, {}, JSON.stringify(location));
            });
        }, 60000); // 60-second interval (adjust for your needs)

        // Leaflet Map Initialization
        map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Initialize receiver marker
        receiverMarker = L.marker([0, 0]).addTo(map);
    }

    function onMessageReceived(message) {
        const location = JSON.parse(message.body);
        updateMap(location);
    }

    function onError() {
        console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
    }

    function updateMap(location) {
        // Handle sender's marker
        if (location.sender === senderId) {
            if (!senderMarker) {
                senderMarker = createMarker(location);
            } else {
                updateMarker(senderMarker, location);
            }
        }

        // Handle receiver's marker
        if (location.sender === receiverId) {
            updateMarker(receiverMarker, location);
        }

        // Adjust map bounds only if necessary
        if (shouldAdjustBounds(senderMarker, receiverMarker)) {
            const bounds = L.latLngBounds([senderMarker.getLatLng(), receiverMarker.getLatLng()]);
            map.fitBounds(bounds, { padding: [10, 10] });
        }
    }

    function createMarker(location) {
        const marker = L.marker([location.latitude, location.longitude])
            .addTo(map)
            .bindPopup(`${location.sender}'s Location`);
        return marker;
    }

    function updateMarker(marker, location) {
        marker.setLatLng([location.latitude, location.longitude]);
        marker.bindPopup(`${location.sender}'s Location`).update();
    }

    function shouldAdjustBounds(marker1, marker2) {
        if (marker1 && marker2) {
            const distance = marker1.getLatLng().distanceTo(marker2.getLatLng()); // Calculate distance in meters
            const thresholdDistance = 100; // Adjust this threshold as needed
            return distance > thresholdDistance; // Return true if distance exceeds threshold
        }
        return false;
    }

    async function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                    resolve(location);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }
});
