import {createSelector} from 'reselect';

const selectCart = state =>  state.cart;

export const selectCartItem = createSelector(
    [selectCart] ,
    (cart) => cart.cartitems
)

export const selectCartItemCount = createSelector(
    [selectCartItem] ,
    (cartitems) => cartitems.reduce((acc, cartitem) => acc + cartitem.quantity , 0)
)

export const selectCartItemTotal = createSelector(
    [selectCartItem] ,
    cartitems => cartitems.reduce((acc, cartitem) => acc + cartitem.quantity * cartitem.price , 0)
)

export const selectCartItemTotalWithDelivery = createSelector(
    [selectCartItem] ,
    cartitems => cartitems.reduce((acc, cartitem) => acc + cartitem.quantity * cartitem.price , 150)
)