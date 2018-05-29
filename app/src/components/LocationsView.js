import React, { Component } from 'react';
import PropTypes from 'prop-types'

class LocationsView extends Component {
    render() {
        return (
            <div className="locations">
            <form className="pure-form">
                <input onChange={this.props.handleFilterChange} className="pure-input-1-1" type="text" />
                <button className="pure-button">
                    <i className="fa fa-filter"></i>
                    Filter
                </button>
            </form>
            <ul className="pure-menu-list">
                {this.props.locations.map((loc, index) => <li className="pure-menu-item" key={index}>
                    <a href="" class="pure-menu-link">{loc.name}</a>
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