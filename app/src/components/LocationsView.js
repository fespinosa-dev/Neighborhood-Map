import React, { Component } from 'react';
import PropTypes from 'react-prop-types'

class LocationsView extends Component {
    state = {  }
    render() {
        return (
            <ul>
                {this.props.locations.map((loc, index)=> <li key={index}>{loc.name}</li>)}
            </ul>
        );
    }
}

// LocationsView.propTypes = {
//     locations: PropTypes.array
// }

export default LocationsView;