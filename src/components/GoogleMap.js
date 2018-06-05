import React, { Component } from 'react';
import PropTypes from 'prop-types'

class GoogleMap extends Component {

        markers = []
        map = {}
        bounds = {}

    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate() {
        this.reloadMarkers();
    }


    showInfoWindow = (locationName)=>{
        let location = this.props.locations.filter((location)=> location.name === locationName)[0];
        this.markers.forEach(m => m.infoWindow.close());
        let marker = this.findMarker(location.position);
        marker.infoWindow.open(this.map, marker);
        this.animateMarker(marker);

    } 

    animateMarker(marker){
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1000);
    }

    reloadMarkers() {
        if (this.markers.length > 0 && this.map) {
            this.markers.forEach(m => m.setMap(null));
            this.props.locations.forEach(loc => { 
            
              let marker =  this.findMarker(loc.position);
              marker.setMap(this.map);
              this.bounds.extend(marker.position);  
            });
        }
    }
    
    findMarker(position) {
        return this.markers.find((m) => {
            return (m.position.lng().toFixed(6) == position.lng);
        });
    
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
            let infoWindow = new window.google.maps.InfoWindow({
                content: location.info
            });
            let marker = new window.google.maps.Marker({
                position: location.position,
                map: map,
                title: location.title
            })
            marker.addListener("click", () => {
                marker.infoWindow.open(this.amp, marker);
                this.animateMarker(marker)
            
            });
            marker.infoWindow = infoWindow;
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