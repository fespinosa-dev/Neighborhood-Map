import React, { Component } from 'react';
import LocationsView from './components/LocationsView'
import GoogleMap from './components/GoogleMap'
import './App.css';

class App extends Component {


    state = {
      locations : [
        {name: "Memorial Museum of Dominican Resistance", position: { lat: 18.471646, lng: -69.888085 }},
        {name: "Museo de La Porcelana", position: { lat: 18.471336, lng: -69.887338 }},
        {name: "Biblioteca La Trinitaria", position: { lat: 18.471713, lng: -69.888952 }},
        {name: "Museo Fernando Peña Defilló", position: { lat: 18.470914, lng: -69.887241 }},
        {name: "Gimnasio Colonial", position: { lat: 18.472868, lng: -69.888781 }}
      ],
      filterValue : ''
    }

  handleFilterChange = (event) => {
    this.setState({ filterValue : event.target.value})
  }



  render() {
    let filteredLocations = this.state.locations.filter((location) => {
      return location.name.match(this.state.filterValue);
    });
    return (
      <div className="grid">
        <div className="row">
          <div className="col-3 left-side">
              <header>
                <h1>Zona Colonial</h1>
              </header>
            <LocationsView handleFilterChange={this.handleFilterChange} locations={filteredLocations} />
            </div>
            <div className="col-9">
              <main>
                <div className="topnav" id="myTopnav">

                  <a className="icon">
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
              <GoogleMap locations={filteredLocations} />
              </main>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
