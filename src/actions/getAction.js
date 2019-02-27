import { GET_ITEMCODES, NEW_CARTITEM, DELETE_CARTITEM, GET_TOTAL, CART_CHECKOUT, CREATE_FORM, EXIT_FORM } from './types';

export const getItemCodes = () => dispatch => {
    console.log('fetching');
    fetch('http://localhost:8080/billing/itemCodes')
        .then(res => res.json())
        .then(codes =>
            dispatch({
                type: GET_ITEMCODES,
                payload: codes
            }));
}

export const getCartItems = (cartItem) => dispatch => {
    console.log('new cart item');
    fetch(`http://localhost:8080/billing/calcPrice/${cartItem.qty}/${cartItem.itemName}`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: NEW_CARTITEM,
                payload: {
                    itemName: cartItem.itemName,
                    qty: cartItem.qty,
                    price: data,
                }
            })
        })
}

export const deleteCartItem = (items) => dispatch => {
    console.log('deleting');
    dispatch({
        type: DELETE_CARTITEM,
        payload: items
    });
}

export const getTotal = (items) => dispatch => {
    console.log('calculating cart total'); 
    let grandTotal = 0;
    items.map((element) => (
        grandTotal = grandTotal + parseFloat(element.items.price)
    ));
    dispatch({
        type: GET_TOTAL,
        payload: grandTotal
    });
}

export const checkoutFunction = (items) => dispatch => {
    console.log('inside checkout');
    console.log(JSON.stringify(items));
    fetch('http://localhost:8080/billing/editQuantity', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            items
        ),
    })
    dispatch({
        type: CART_CHECKOUT,
    })

}

export const createAddForm = (itemArray) => dispatch => {
    const title = 'Add Item to Cart';
    itemArray.push({ title });
    dispatch({
        type: CREATE_FORM,
        payload: itemArray
    });

}

export const exitForm = () => dispatch => {
    dispatch({
        type: EXIT_FORM
    })
}
