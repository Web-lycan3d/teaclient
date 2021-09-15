import React from 'react'

import './CartDropdownItem.styles.scss'

const CartDropdownItem = ({item : {name , price , quantity , imageURL}}) => {
    return (
        <div className="cart-item">
            <img src={imageURL} alt="item" />
            <div className="item-details">
                <span className="name">{name}</span>
                <span className="name">{quantity} x {price}</span>
            </div>
        </div>
    )
}

export default CartDropdownItem
