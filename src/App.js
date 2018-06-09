import React, { Component } from 'react';
import LocationsView from './components/LocationsView'
import GoogleMap from './components/GoogleMap'
import * as VenuesAPI from './util/VenuesAPI'
class App extends Component {

  leftSide = React.createRef();
  hamburgerBnt = React.createRef();

  state = {
    locations: [],
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
    VenuesAPI.search("Zona Colonial").then(venues => {
      this.setState({locations : venues.slice(0,5)});
    }).catch(err=>{
      console.log(err+" - Couldn't fetch locations ");
    });
  }

  render() {
    let filteredLocations = this.state.locations.filter((location) => {
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
