import React from 'react';
import CartTable from './CartTable';
import AddItemForm from './AddItemForm';

import { connect } from 'react-redux';
import { getItemCodes, getCartItems, deleteCartItem, getTotal, checkoutFunction, createAddForm, exitForm } from '../actions/getAction';

import PropTypes from 'prop-types';



class BillingCart extends React.Component {

    componentWillMount() {
        this.props.getItemCodes();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const itemName = this.itemName.value;
        const qty = parseFloat(this.qty.value);
        const cartItem = {
            itemName,
            qty,
        };

        this.props.getCartItems(cartItem);

        this.itemName.value = 'SELECT';
        this.qty.value = '';


        setTimeout(() => {
            this.props.getTotal(this.props.cartItems);
        }, 200)
    }

    handleDeleteRow = (index) => {
        let items = this.props.cartItems;
        items.splice(index, 1)
        this.props.deleteCartItem(items);
        this.props.getTotal(items);
    }

    handleCheckout = () => {
        let items = this.props.cartItems;
        let cartData = [];
        items.map((element) => (
            cartData.push(element.items)
        ))
        cartData.forEach(function (e, index) { cartData[index].bulkprice = 0 });
        this.props.checkoutFunction(cartData);
    }

    createForm = () => {
        if (this.props.flag === 1) {
            this.props.createAddForm(this.props.itemArray);
        }

    }

    handleExit = () => {
        this.props.exitForm();
    }

    handleEditRow = (event) => {
        console.log("in edit");
        console.log(event.target.value);
    }

    render() {
        return (
            <div className="Add">
                <div className="cart-items">
                    <CartTable rows={this.props.cartItems}
                        handleDeleteRow={this.handleDeleteRow}
                        handleEditRow={this.handleEditRow}
                        grandTotal={this.props.grandTotal}
                    />
                </div>
                <button onClick={this.createForm} className="btn btn-dark" >ADD</button>
                <button className="btn btn-dark" onClick={this.handleCheckout}>CHECKOUT</button>
                <div>
                    {this.props.itemArray.map((item, index) => {
                        return (
                            <div className="addForm" key={index}>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>

                                <AddItemForm handleSubmit={this.handleSubmit}
                                    handleExit={this.handleExit}
                                    itemName={select => this.itemName = select}
                                    qty={input => this.qty = input}
                                    itemCodes={this.props.getItems} />
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}


BillingCart.propTypes = {
    getItemCodes: PropTypes.func.isRequired,
    getItems: PropTypes.array.isRequired,
    getCartItems: PropTypes.func.isRequired,
    cartItems: PropTypes.array.isRequired,
    deleteCartItem: PropTypes.func.isRequired,
    getTotal: PropTypes.func.isRequired,
    grandTotal: PropTypes.number.isRequired,
    checkoutFunction: PropTypes.func.isRequired,
    createAddForm: PropTypes.func.isRequired,
    itemArray: PropTypes.array.isRequired,
    exitForm: PropTypes.func.isRequired,
    flag: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    getItems: state.data.codes,
    cartItems: state.data.items,
    grandTotal: state.data.total,
    flag: state.data.flag,
    itemArray: state.data.itemArray
})


export default connect(mapStateToProps, { getItemCodes, getCartItems, deleteCartItem, getTotal, checkoutFunction, createAddForm, exitForm })(BillingCart);
