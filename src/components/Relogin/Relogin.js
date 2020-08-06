import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Relogin extends Component {

    componentDidMount() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default withRouter(Relogin);