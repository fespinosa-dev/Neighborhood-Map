import React, { Component } from 'react';
import LocationsView from './components/LocationsView'
import GoogleMap from './components/GoogleMap'

class App extends Component {

    leftSide = React.createRef();

    state = {
      locations : [
        {name: "Memorial Museum of Dominican Resistance", position: { lat: 18.471646, lng: -69.888085 },
          info: "<p>The Memorial Museum of the Dominican Resistance is a memorial museum in honor of all the men and women who fought in one way or another against the dictatorial regime of Rafael Leonidas Trujillo Molina...<a target='_blank' href='https://es.wikipedia.org/wiki/Museo_Memorial_de_la_Resistencia_Dominicana'>more</a></p>"},
        
         { name: "Museo de La Porcelana", position: { lat: 18.471336, lng: -69.887338 }, 
           info: "<p>It is  a two-level building where they exhibit various pieces of porcelain that...<a target='_blank' href='http://www.conectate.com.do/articulo/museo-de-la-porcelana-santo-domingo-republica-dominicana/'> more</a></p>"},
        
        { name: "Biblioteca La Trinitaria", position: { lat: 18.471713, lng: -69.888952 }, info: "<p>A collection of sources of information and similar resources, made accessible to a defined community for reference or borrowing</p>"},
        { name: "Museo Fernando Peña Defilló", position: { lat: 18.470914, lng: -69.887241 }, info: "<p>The Fernando Peña Defilló Museum was inaugurated in the Colonial City of Santo Domingo, in March of 2015, to make known the pictorial legacy of the artist of the same name</p>"},
        { name: "Gimnasio Colonial", position: { lat: 18.472868, lng: -69.888781 }, info: "<p>A gymnasium, a covered location for gymnastics, athletics, and gymnastic services.</p>"}
      ],
      filterValue : ''
    }

  handleFilterChange = (event) => {
    let filterValue = event.target.value;
    this.setState((prevState) => { return { filterValue: filterValue}});
    
  }

  openLeftSide = (e) =>{
    if (this.leftSide.current.className === "left-side") {
      this.leftSide.current.className += " open";
    } else {
      this.leftSide.current.className = "left-side";
    }
  }

  componentDidMount() {
    this.locView.showInfoWindow = this.map.showInfoWindow;
  }

  render() {
    let filteredLocations = this.state.locations.filter((location) => {
      return location.name.match(this.state.filterValue);
    });
    return (
      <div className="container">
          <div ref={this.leftSide} className="left-side">
              <header>
                <h1>Zona Colonial</h1>
              </header>
            <LocationsView ref={(locView) => this.locView = locView} handleFilterChange={this.handleFilterChange} locations={filteredLocations} />
            </div>
              <main>
                <div className="topnav" id="myTopnav">
                  <a onClick={this.openLeftSide}  className="icon">
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
              <GoogleMap  ref={(map)=> this.map = map} locations={filteredLocations} />
              </main>
      </div>
    );
  }
}

export default App;
