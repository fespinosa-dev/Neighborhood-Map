import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LocationsView extends Component {

    state = {
        selectedLocation : ''
    }

    handleLocationClick= (event) =>{
        let clickedLocation = event.target;
        this.setState({ selectedLocation: clickedLocation.innerText});
        let location = this.props.locations.filter((location) => location.name === clickedLocation.innerText)[0];
        this.showInfoWindow(location);
    }

    render() {
        return (
            <nav className="locations">
            <form className="pure-form">
                    <input tabIndex="0" placeholder="&#xf0b0; Filter locations" onChange={this.props.handleFilterChange} className="pure-input-1 filterIcon" type="text" />
            </form>
                <ul className="pure-menu-list" tabIndex="0">
                {this.props.locations.map((loc, index) => 
                        <li  className={this.state.selectedLocation == loc.name ? "pure-menu-item pure-menu-selected" :
                            "pure-menu-item"} key={index}>
                            <a tabIndex="0" onClick={this.handleLocationClick} className="pure-menu-link">
                        {loc.name}
                    </a>
                </li>)}
            </ul>
            </nav>
        );
    }
}

LocationsView.propTypes = {
    locations: PropTypes.array,
    handleFilterChange : PropTypes.func
}

export default LocationsView;