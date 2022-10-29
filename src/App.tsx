import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.scss';

import ShoppingCartPanel from './Cart/ShoppingCartPanel';
import CheckoutForm from './Checkout/CheckoutForm';
import PaymentInterface from './Payment/PaymentInterface';

export const App = () => {
    return (
        <Router basename='/'>
            <Routes>
                <Route
                    path='/'
                    element={<ShoppingCartPanel />}
                />
                <Route
                    path='/checkout'
                    element={<CheckoutForm />}
                />
                <Route
                    path='/payment'
                    element={<PaymentInterface />}
                />
            </Routes>
        </Router>
    );
}

export default App;
