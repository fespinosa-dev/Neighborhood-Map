import React, { Component } from 'react';
import PropTypes from 'prop-types'

class GoogleMap extends Component {

        markers = []
        map = {}
        bounds = {}

    componentDidMount() {
        this.loadMap();
    }


    reloadMarkers() {
        if (this.markers.length > 0 && this.map) {
            this.markers.forEach(m => m.setMap(null));
            this.props.locations.forEach(loc => { 
            
              let marker =  this.markers.find((m) => {
                  return (m.position.lng().toFixed(6) == loc.position.lng);
                                   
                                                            
                    });
                    console.log(marker.setMap(this.map))
                    this.bounds.extend(marker.position);

            });
        }
    }

    componentDidUpdate(){
        this.reloadMarkers();
    }

    loadMap(){
        let map;
        let lat = 18.47265;
        let lng = -69.886543;
        let map_center = new window.google.maps.LatLng(lat, lng);
        let mapOptions = {
            center: map_center,
            zoom: 17,
        };
        let bounds = new window.google.maps.LatLngBounds();
        let mapCanvas = document.getElementById("map");
        map = new window.google.maps.Map(mapCanvas, mapOptions);
        this.props.locations.forEach((location) => {

            let marker = new window.google.maps.Marker({
                position: location.position,
                map: map,
                title: location.title
            })
            bounds.extend(marker.position);
            this.markers.push(marker);
        });
        
        window.google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            window.google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        map.fitBounds(bounds);
        this.map = map;
        this.bounds = bounds;
    } 

    
        


    render() {
        return (
            <div  id="map">

            </div>
        );
    }
}

GoogleMap.propTypes = {

    locations : PropTypes.array
}

export default GoogleMap 