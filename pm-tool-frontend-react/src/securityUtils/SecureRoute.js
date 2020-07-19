import React, {Component} from 'react';
import {Redirect, Route} from "react-router-dom"
import PropTypes from "prop-types"
import {connect} from "react-redux";


const SecureRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps} render={props => security.isAuth === true ? (<Component {...props}/>) :
        (<Redirect to="/login"/>)
    }/>
)

SecureRoute.propTypes = {
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security
})

export default connect(mapStateToProps)(SecureRoute);
