import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';


class AuthenticatedRoute extends Component {
    render() {
        const {exact, path, component: ComponentToRender, isLoggedIn} = this.props;

        return (
            <Route
                exact={exact}
                path={path}
                render={() => (isLoggedIn ? <ComponentToRender/> : <Redirect to='/login'/>)}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
