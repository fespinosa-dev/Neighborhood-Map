import React, { Component } from 'react';
import PropTypes from 'react-prop-types'

class LocationsView extends Component {
    state = {  }
    render() {
        return (
            <ul>
                {this.props.locations.map((loc)=> <li>loc.title</li>)}
            </ul>
        );
    }
}

LocationsView.propTypes = {
    locations : PropTypes.array
}

export default LocationsView;