import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LocationsView extends Component {

    state = {
        selectedLocation : ''
    }

    handleLocationClick= (event) =>{
        let clickedLocation = event.target;
        this.setState({ selectedLocation: clickedLocation.innerText})
        this.showInfoWindow(clickedLocation.innerText)
    }

    render() {
        return (
            <div className="locations">
            <form className="pure-form">
                    <input placeholder="&#xf0b0; Filter locations" onChange={this.props.handleFilterChange} className="pure-input-1 filterIcon" type="text" />
            </form>
            <ul className="pure-menu-list">
                {this.props.locations.map((loc, index) => 
                        <li className={this.state.selectedLocation == loc.name ? "pure-menu-item pure-menu-selected" :
                            "pure-menu-item"} key={index}>
                            <a onClick={this.handleLocationClick} className="pure-menu-link">
                        {loc.name}
                    </a>
                </li>)}
            </ul>
            </div>
        );
    }
}

LocationsView.propTypes = {
    locations: PropTypes.array
}

export default LocationsView;