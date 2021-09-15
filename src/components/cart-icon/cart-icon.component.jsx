/** @format */

import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {ReactComponent as ShoppingIcon} from '../svg/shopping-bag.svg'
import {togglecartHidden} from '../../redux/cart/cart.action'
import { selectCartItemCount } from '../../redux/cart/cart.selector'

import './cart-icon.styles.scss'

const CartIcon = ({togglecartHidden , itemcount}) => {
    return (
        <div className="cart-icon" onClick={togglecartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemcount}</span>
        </div>
    )
}

CartIcon.propTypes = {
    togglecartHidden:PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    itemcount : selectCartItemCount(state)
})

export default connect(mapStateToProps , {togglecartHidden})(CartIcon)
