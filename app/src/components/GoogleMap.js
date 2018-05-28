import React, { Component } from 'react';
import PropTypes from 'react-prop-types'

class GoogleMap extends Component {

    componentDidMount(){
        this.loadMap();
    }

    loadMap(){
        let map;
        let lat = 18.47265;
        let lng = -69.886543;
        let map_center = new google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: map_center,
            zoom: 17,
        };
        let bounds = new google.maps.LatLngBounds();
        let mapCanvas = document.getElementById("map");
        map = new google.maps.Map(mapCanvas, mapOptions);
        this.props.locations.forEach((location) => {

            let marker = new google.maps.Marker({
                position: location.position,
                map: map,
                title: location.title
            })
            bounds.extend(marker.position);

        });

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        map.fitBounds(bounds);
    }

    render() {
        return (
            <div id="map">

            </div>
        );
    }
}

GoogleMap.propTypes = {

    locations : PropTypes.array
}

export default GoogleMap 