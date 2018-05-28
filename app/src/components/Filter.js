import React, { Component } from 'react';

class Filter extends Component {
    state = {  }
    render() {
        return (
            <div>
                <input type="text" />
                <button>
                <i className="fa fa-filter"></i> 
                Filter
                </button>
            </div>
        );
    }
}

export default Filter;