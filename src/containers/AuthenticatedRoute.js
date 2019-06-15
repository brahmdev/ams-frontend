import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';


class AuthenticatedRoute extends Component {
    render() {
        const {exact, path, component: ComponentToRender, isLoggedIn, authorities} = this.props;
        return (
            <Route
                exact={exact}
                path={path}
                render={() => ((isLoggedIn && authorities.length > 0) ? <ComponentToRender/> : <Redirect to='/login'/>)}
            />
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn, authorities } = state.user;
    return { isLoggedIn, authorities };
}

export default connect(mapStateToProps)(AuthenticatedRoute);
