import React from 'react';
import BillingCart from './components/BillingCart';

import { Provider } from 'react-redux';
import store from './store';



class BillingView extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="billing">
                    <div className="cart">
                        <BillingCart />
                    </div>
                </div>
            </Provider>
        );
    }
}

export default BillingView;