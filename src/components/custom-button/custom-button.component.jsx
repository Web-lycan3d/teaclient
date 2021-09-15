import React from 'react'

import './custom-button.styles.scss'

function CustomButton({ children, shopNow, ...otherprops }) {
    return (
        <button className={`${shopNow ? "shopnow" : ""}  custom-button`} {...otherprops}>
            {children}
        </button>
    )
}

export default CustomButton
