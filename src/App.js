import React, { Component } from 'react';
import LocationsView from './components/LocationsView'
import GoogleMap from './components/GoogleMap'

class App extends Component {

  leftSide = React.createRef();
  hamburgerBnt = React.createRef();

  state = {
    locations: [
      {name: "Museo Memorial de la Resistencia Dominicana", position: { lat: 18.471646, lng: -69.888085 }},
      { name: "Museo de La Porcelana", position: { lat: 18.471336, lng: -69.887338 } },
      { name: "Biblioteca La Trinitaria", position: { lat: 18.471713, lng: -69.888952 } },
      { name: "Museo Fernando Peña Defilló", position: { lat: 18.470914, lng: -69.887241 } },
      { name: "Gimnasio Colonial", position: { lat: 18.472868, lng: -69.888781 } }
    ],
    filterValue: ''
  }

  handleFilterChange = (event) => {
    let filterValue = event.target.value;
    this.setState((prevState) => { return { filterValue: filterValue } });

  }

  openLeftSide = (e) => {
    if (this.leftSide.current.className === "left-side") {
      this.leftSide.current.className += " open";
      this.hamburgerBnt.current.setAttribute("aria-expanded", "true");
    } else {
      this.leftSide.current.className = "left-side";
      this.hamburgerBnt.current.setAttribute("aria-expanded", "false");
    }
  }

  componentDidMount() {
    this.locView.showInfoWindow = this.map.showInfoWindow;
  }

  render() {
    let filteredLocations = this.state.locations.filter((location) => {
      console.log(location.name.ignoreCase);
      return location.name.toLowerCase().match(this.state.filterValue.toLowerCase());
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
            <a ref={this.hamburgerBnt} tabIndex="3" role="button" aria-expanded="false" onClick={this.openLeftSide} className="icon">
              <i className="fa fa-bars"></i>
            </a>
          </div>
          <GoogleMap ref={(map) => this.map = map} locations={filteredLocations} />
        </main>
      </div>
    );
  }
}

export default App;
