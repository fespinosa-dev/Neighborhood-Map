import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as VenuesAPI from '../util/VenuesAPI'

class GoogleMap extends Component {

    markers = []
    map = {}
    mapElement = React.createRef();


    componentDidUpdate() {
        if (this.markers.length === 0){
            this.createMarkers();
        }else{
            this.reloadMarkers();
        }
    }

    componentDidMount() {

        // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap.bind(this, this.refs.mapElement);
        // Asynchronously load the Google Maps script, passing in the callback reference
        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDX_glw0xmRsBOPwpqqz3LiztBCYlvzErs&callback=initMap");

    }

    // creates the map and markers with their corresponding info windows.
    initMap(mapElement) {
        if (!window.google) {
            return;
        }
        var colonialZone = new window.google.maps.LatLng(18.47265, -69.886543);
        this.map = new window.google.maps.Map(mapElement, {
            center: colonialZone,
            zoom: 18,
        });
        window.map = this.map;
        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = this.map.getCenter();
            window.google.maps.event.trigger(this.map, "resize");
            this.map.setCenter(center);
        });

    }


    //creates the markers along with their info windows
    createMarkers() {
        let bounds = new window.google.maps.LatLngBounds();
        this.props.locations.forEach((venue) => {
                 let infoWindow = new window.google.maps.InfoWindow();
                let marker = new window.google.maps.Marker({
                    position: { lat: venue.location.lat, lng: venue.location.lng },
                    map: this.map,
                    title: venue.name
                })
                marker.addListener("click", () => {
                    this.showInfoWindow(venue);
                });
                marker.infoWindow = infoWindow;
                this.markers.push(marker);
                this.fitBoundsToVisibleMarkers();
       
            });
    }

    fitBoundsToVisibleMarkers() {
        let bounds = new window.google.maps.LatLngBounds();
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].getVisible()) {
                bounds.extend(this.markers[i].getPosition());
            }
        }

        this.map.fitBounds(bounds);

    }

    createInfoWindowContent(venue) {
        let photo = {};
        if (venue.photos.count > 0) {
            photo = venue.photos.groups[0].items[0]
        }
        let content = `
                        <div class="venueBlock">
                            <div class="venueIcon">
                                <img height="100" alt="${venue.name} image" src="${photo.prefix}100x100${photo.suffix}" width="100">
                            </div>
                            <div class="venueDetails">
                                <div class="venueName">
                                    <a href="${venue.canonicalUrl}" target="_blank">${venue.name}</a>
                                </div>
                                <div class="venueAddressData">
                                    <div class="venueAddress">  
                                    ${venue.location.formattedAddress.join(" ")}
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


    //Displays the info window
    showInfoWindow = (location) => {
            VenuesAPI.get(location.id).then(venueWithDetail => {
                let marker = this.findMarker(venueWithDetail.name);
                marker.infoWindow.setContent(this.createInfoWindowContent(venueWithDetail));
                this.markers.forEach(m => m.infoWindow.close());
                marker.infoWindow.open(this.map, marker);
                this.animateMarker(marker);
            }).catch(error => {
                console.log(error + " - Couldn't get location details");
            });
    }

    // finds a marker by given position
    findMarker(locationName) {
        return this.markers.find((m) => {
            return (m.title == locationName);
        });

    }

    // Animates a maker on the map. Default animation is Bounce .
    animateMarker(marker) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1000);
    }

    // hides markers already on the map and show them again from updated location list
    reloadMarkers() {
        if (this.markers.length > 0 && this.map) {
            this.markers.forEach(m => m.setVisible(false));
            this.props.locations.forEach(loc => {
                let marker = this.findMarker(loc.name);
                marker.setVisible(true);
            });
        }
    }

    

    onerror() {
        alert("This page didn't load Google Maps correctly. See the JavaScript console for technical details.");
    }

  

    render() {
        return (
            <div aria-label="Map with locations" id="map-container" role="application" tabIndex="4">
                <div  ref="mapElement" id="map">

                </div>
            </div>
        );
    }
}

GoogleMap.propTypes = {

    locations: PropTypes.array
}

export default GoogleMap 