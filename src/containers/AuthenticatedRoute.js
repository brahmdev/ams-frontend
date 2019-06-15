import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';


class AuthenticatedRoute extends Component {
    render() {
        const {exact, path, component: ComponentToRender, isLoggedIn, authorities, loginError} = this.props;
        return (
            <Route
                exact={exact}
                path={path}
                render={() => ((isLoggedIn && authorities.length > 0 && !loginError) ? <ComponentToRender/> : <Redirect to='/login'/>)}
            />
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, authorities, loginError } = state.user;
    return { isLoggedIn, authorities, loginError };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
