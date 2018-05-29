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
      ]
    }

  handleFilterChange = (event) => {
    
  }


  render() {
    return (
      <div className="grid">
        <div className="row">
          <div className="col-3 left-side">
              <header>
                <h1>Zona Colonial</h1>
              </header>
              <LocationsView locations={this.state.locations} />
            </div>
            <div className="col-9">
              <main>
                <div className="topnav" id="myTopnav">

                  <a className="icon">
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
              <GoogleMap locations={this.state.locations} />
              </main>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
