export const addItem = (cartitems , cartitemToAdd) => {
    const existingcartitem = cartitems.find(cartitem => cartitem.id === cartitemToAdd.id);

    if(existingcartitem) {
        return cartitems.map(cartitem => cartitem.id === cartitemToAdd.id ? { ...cartitem , quantity: cartitem.quantity + 1 } : cartitem )
    }

    return [...cartitems , {...cartitemToAdd , quantity: 1 }]
}

export const removeItem = (cartitems , cartitemToRemove) => {
    const existingcartitem = cartitems.find(cartitem => cartitem.id === cartitemToRemove.id);

    if(existingcartitem.quantity === 1) {
        return cartitems.filter(cartitem => cartitem.id !== cartitemToRemove.id)
    }

    return cartitems.map(cartitem => cartitem.id === cartitemToRemove.id ? {...cartitem , quantity : cartitem.quantity - 1} : cartitem )
}