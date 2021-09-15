import React from 'react'
import PropTypes from 'prop-types'
import {Route , Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({component : Component , user : {isAuthenticated , loading} , ...rest}) => (
    <Route {...rest} render={props => !isAuthenticated && !loading  ? (<Redirect to='/login' /> ) : (<Component {...props} />) } />
)

PrivateRoute.propTypes = {
user : PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    user : state.user
})


export default connect(mapStateToProps)(PrivateRoute)
