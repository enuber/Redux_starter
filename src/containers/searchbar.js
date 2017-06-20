import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        //we can do this instead of a fat arrow function in onChange this
        //binds 'this' to this function
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({
            term: event.target.value
        });
    }

    onFormSubmit(event) {
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState( {term: ''});

    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="Get A Five Day Forecast In Your Favorite Cities"
                    className="form-control"
                    value={this.state.term}
                    //could to () => this.onInputChange so the correct 'this' is bound
                    onChange={this.onInputChange}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ fetchWeather}, dispatch);
// }

export default connect(null, { fetchWeather })(SearchBar);