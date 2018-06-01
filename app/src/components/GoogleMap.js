import React, { Component } from 'react';
import PropTypes from 'prop-types'

class GoogleMap extends Component {

        markers = []

    componentDidMount() {
        this.loadMap();
    }


    addMarkers(map){

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

    } 

    refreshMarkers(){
       this.markers.forEach((m)=>{

          this.props.locations.forEach((l)=>{

                    

          });

       });
        
        // filteredMarkers.forEach((marker)=> marker.setDefault(null));

    }

    render() {
        this.refreshMarkers();
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