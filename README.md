# GeoPlus

GeoPlus is a location tracking application that allows users to track each other on a map using WebSocket communication.
This application showcases the use of Spring WebSocket on the backend and plain HTML, CSS, and JavaScript on the
frontend.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Components](#Components)
    - [Backend](#Backend)
        - [WebSocket Configuration](#WebSocketConfiguration)
        - [Location Controller](#LocationController)
        - [Location Entity](#LocationEntity)
    - [Frontend](#Frontend)
        - [HTML](#HTML)
        - [JavaScript](#JavaScript)
        - [CSS](#CSS)

## Features

- Real-time location tracking on an interactive map.
- WebSocket communication for seamless updates.
- Simple and intuitive user interface.
- Customizable marker popups with user information.

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/geoplus.git
   cd geoplus
2. **Run the Backend:**

open the project in your favorite Java IDE.
Run the WebSocketConfig and LocationController classes.
The WebSocket server will be accessible at http://localhost:8080/ws.

3. **Run the Frontend:**

- Open index.html in a web browser.
- Enter your ID and the ID of the person you want to track.
- Enjoy real-time location updates on the map!

### Components

#### Backend

##### WebSocketConfiguration

Configures Spring WebSocket, specifying message prefixes and STOMP endpoints for WebSocket communication.

##### LocationController

Handles WebSocket messages related to location updates. Receives location data, logs it, and broadcasts it to the
intended recipient.

##### LocationEntity

A Java class representing the structure of a location, including sender, recipient, latitude, and longitude.

#### Frontend

##### HTML

Defines the structure of the application, includes references to external libraries (Leaflet, SockJS, Stomp).

##### JavaScript

Manages WebSocket connections, initializes the map, handles real-time location updates, and sends the user's current
location periodically.

##### CSS

Applies styles to HTML elements, ensuring a visually appealing and responsive user interface.