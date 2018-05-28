var markers = [
{
    title: "Memorial Museum of Dominican Resistance",
    position : {lat: 18.471646,lng: -69.888085}
},
{
    title: "Museo de La Porcelana",
    position : {lat : 18.471336, lng : -69.887338}
},
{
    title: "Biblioteca La Trinitaria",
    position : {lat: 18.471713,lng: -69.888952}
},
{
    title: "Museo Fernando Peña Defilló",
    position : {lat: 18.470914,lng: -69.887241}
},
{
    title: "Gimnasio Colonial",
    position : {lat: 18.472868,lng: -69.888781}
}]


// function myFunction (e) {
//     var leftSide = document.querySelector(".left-side");
//     leftSide.classList.toggle('open');
//     e.stopPropagation();
// };


function initMap() {
    let map;
    let lat = 18.47265;
    let lng = -69.886543;
    let map_center = new google.maps.LatLng(lat, lng);
    let mapOptions = {
        center: map_center,
        zoom: 17,
    };
    let  bounds = new google.maps.LatLngBounds();
    let mapCanvas = document.getElementById("map");
     map = new google.maps.Map(mapCanvas, mapOptions);
    markers.forEach((markerInfo) => {

     let marker =   new google.maps.Marker({
            position: markerInfo.position,
            map: map,
            title: markerInfo.title
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