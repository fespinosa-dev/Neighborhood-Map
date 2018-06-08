import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as VenuesAPI from '../util/VenuesAPI'

class GoogleMap extends Component {

    markers = []
    map = {}
    bounds = {}
    mapElement = React.createRef();

    componentDidMount() {
        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap.bind(this, this.refs.mapElement);
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDX_glw0xmRsBOPwpqqz3LiztBCYlvzErs&callback=initMap");

    }


    componentDidUpdate() {
        this.reloadMarkers();
    }


    //Displays an info window when the user clicked a location from the list closing already opened ones.
    showInfoWindow = (locationName) => {
        let location = this.props.locations.filter((location) => location.name === locationName)[0];
        this.markers.forEach(m => m.infoWindow.close());
        let marker = this.findMarker(location.position);
        marker.infoWindow.open(this.map, marker);
        this.animateMarker(marker);

    }



    // Animates a maker on the map. Default animation is Bounce .
    animateMarker(marker) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1000);
    }

    // remove markers already on the map and load them again from updated location list
    reloadMarkers() {
        if (this.markers.length > 0 && this.map) {
            this.markers.forEach(m => m.setMap(null));
            this.props.locations.forEach(loc => {

                let marker = this.findMarker(loc.position);
                marker.setMap(this.map);
                this.bounds.extend(marker.position);
            });
        }
    }

    // finds a marker by given position
    findMarker(position) {
        return this.markers.find((m) => {
            return (m.position.lng().toFixed(6) == position.lng);
        });

    }

    onerror() {
        alert("This page didn't load Google Maps correctly. See the JavaScript console for technical details.");
    }

    // creates the map and markers with their corresponding info windows.
    initMap(mapElement) {
        if (!window.google) {
            return;
        }
        let lat = 18.47265;
        let lng = -69.886543
        let map_center = new window.google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: map_center,
            zoom: 25,
        };
        this.bounds = new window.google.maps.LatLngBounds();
        this.map = new window.google.maps.Map(mapElement, mapOptions);

        this.createMarkers();

        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = this.map.getCenter();
            window.google.maps.event.trigger(this.map, "resize");
            this.map.setCenter(center);
        });
        this.map.fitBounds(this.bounds);
    }

    

    createMarkers() {
        this.props.locations.forEach((location) => {
            let infoWindow = new window.google.maps.InfoWindow();

            let marker = new window.google.maps.Marker({
                position: location.position,
                map: this.map,
                title: location.title
            })
            marker.addListener("click", () => {
                marker.infoWindow.open(this.map, marker);
                this.animateMarker(marker)

            });
            marker.infoWindow = infoWindow;
            this.bounds.extend(marker.position);
            this.markers.push(marker);
        });

        // VenuesAPI.search(location.name)
        //     .then((venues) => {

        //         let venueFound = venues.find(venue => venue.name.toLowerCase() == location.name.toLowerCase());
        //         return VenuesAPI.get(venueFound.id);

        //     }).then((resjson) => {
        //         let venue = resjson.response.venue;

        //         infoWindow.content = this.createInfoWindow(venue);

        //     }).catch((err) => console.log(err));
    }

         createInfoWindow(venue){
            let photo = venue.photos.groups[0].items[0];
            let content = `
                        <div class="venueBlock">
                            <div class="venueIcon"><img height="100" alt="${venue.name} image" src=
                            "${photo.prefix}100x100${photo.suffix}" width="100"></div>
                            <div class="venueDetails">
                                <div class="venueName">
                                    <a href="${venue.canonicalUrl}" target="_blank">${venue.name}</a>
                                </div>
                                <div class="venueAddressData">
                                    <div class="venueAddress">
                                        ${venue.formattedAddress[0]}
                                    </div>
                                </div>
                            </div>
                        </div>
                  `;
         return content;
    }


    loadScript(src) {
        var ref = window.document.getElementsByTagName("script")[0];
        var script = window.document.createElement("script");
        script.src = src;
        script.async = true;
        script.onerror = this.onerror;
        ref.parentNode.insertBefore(script, ref);
    }

    render() {
        return (
            <div aria-label="Map with locations" id="map-container" role="application" tabIndex="4">
                <div ref="mapElement" id="map">

                </div>
            </div>
        );
    }
}

GoogleMap.propTypes = {

    locations: PropTypes.array
}

export default GoogleMap 