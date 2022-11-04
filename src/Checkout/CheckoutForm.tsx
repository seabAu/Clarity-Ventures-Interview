import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import {
    BrowserRouter,
    BrowserRouter as Router,
    Link,
    Location,
} from "react-router-dom";

// Import dummy data.
// import productData from "../Data/Products";

interface Product {
    _id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
    image: string;
}

const CheckoutForm = ( props: any ): JSX.Element =>
{
    const productData = useLocation().state as Product[];

    const [ code, setCode ] = useState( 0 );
    const [promos, setPromos] = useState([
        {
            code: "EXAMPLECODE",
            discount: 5,
            active: true,
        },
        {
            code: "EXAMPLECODE2",
            discount: 15,
            active: false,
        },
    ] );
    
    function handlePromoChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const newcode = event.target.value;
        
        promos.forEach( (promo, promoIndex) => {
            if ( promo.code === newcode )
            {
                setCode( promoIndex ); // Valid code, set code state to its index. 
                return;
            }
        } );
    }

    function handlePromoSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (code !== null && code > -1) {
            const promoCodeSelected = promos[code].code;
            let temp = promos;
            temp.forEach((promo) => {
                if (promo.code === promoCodeSelected) {
                    promo.active = !promo.active;
                }
            });
            setPromos(temp);
        }
    }
    
    function getTotal(): number {
        // Run through each product and add up the price.
        let total: number = 0;
        productData.forEach((product) => {
            total += product.price * product.quantity;
        } );
        // Sum up discounts.
        let promoTotal: number = 0;
        promos.forEach( ( promo ) =>
        {
            promo.active ? promoTotal += promo.discount : promoTotal += 0;
        })
        return total - promoTotal;
    }

    function updatePromos( newcode: string ) {
        // Just for now, toggle whether the provided code's promo is active or not. 
        if ( newcode !== null && newcode !== '' )
        {
            let temp = promos;
            temp.forEach( (promo) => {
                if (promo.code === newcode) {
                    promo.active = !promo.active;
                }
            } );
            setPromos( temp );
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">{productData.length}</span>
                        <span className="badge badge-secondary badge-pill">
                            3
                        </span>
                    </h4>
                    <ul className="list-group mb-3">
                        {productData.map((product, productIndex) => {
                            return (
                                <li className="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 className="my-0">{product.name}</h6>
                                        <small className="text-muted">
                                            {product.description}
                                        </small>
                                    </div>
                                    <span className="text-muted">
                                        {product.quantity}
                                        <small> x </small>${product.price}
                                    </span>
                                </li>
                            );
                        })}
                        { promos.map( ( promo ) =>
                        {
                            if ( promo.active ) {
                                return (
                                    <li className="list-group-item d-flex justify-content-between bg-light">
                                        <div className="text-success">
                                            <h6 className="my-0">Promo code</h6>
                                            <small>{promo.code}</small>
                                        </div>
                                        <span className="text-success">
                                            -${promo.discount}
                                        </span>
                                    </li>
                                );
                            } else
                            { 
                                return (<></>);
                            }
                        })}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${getTotal()}</strong>
                        </li>
                    </ul>

                    <form className="card p-2" onSubmit={(e) => handlePromoSubmit(e)}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Promo code"
                                onChange={handlePromoChange}
                            />
                            <div className="input-group-append">
                                <button
                                    type="submit"
                                    className="btn btn-secondary">
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation was-validated" noValidate>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="firstName"
                                    placeholder=""
                                    value=""
                                    required
                                    style={{
                                        backgroundImage:
                                            "url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;);",
                                        backgroundRepeat: "no-repeat",
                                        backgroundAttachment: "scroll",
                                        backgroundSize: "16px 18px",
                                        backgroundPosition: "98% 50%",
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Valid first name is required.
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    placeholder=""
                                    value=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Valid last name is required.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">@</span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Username"
                                    required
                                />
                                <div
                                    className="invalid-feedback"
                                    style={{ width: "100%" }}>
                                    Your username is required.
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">
                                Email{" "}
                                <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="you@example.com"
                            />
                            <div className="invalid-feedback">
                                Please enter a valid email address for shipping
                                updates.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                placeholder="1234 Main St"
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter your shipping address.
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address2">
                                Address 2{" "}
                                <span className="text-muted">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="address2"
                                placeholder="Apartment or suite"
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <label htmlFor="country">Country</label>
                                <select
                                    className="custom-select d-block w-100"
                                    id="country"
                                    required>
                                    <option value="">Choose...</option>
                                    <option>United States</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please select a valid country.
                                </div>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="state">State</label>
                                <select
                                    className="custom-select d-block w-100"
                                    id="state"
                                    required>
                                    <option value="">Choose...</option>
                                    <option>California</option>
                                </select>
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="zip">Zip</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="zip"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Zip code required.
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="same-address"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="same-address">
                                Shipping address is the same as my billing
                                address
                            </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="save-info"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="save-info">
                                Save this information for next time
                            </label>
                        </div>
                        <hr className="mb-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div className="d-block my-3">
                            <div className="custom-control custom-radio">
                                <input
                                    id="credit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="custom-control-input"
                                    checked
                                    required
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="credit">
                                    Credit card
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input
                                    id="debit"
                                    name="paymentMethod"
                                    type="radio"
                                    className="custom-control-input"
                                    required
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="debit">
                                    Debit card
                                </label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input
                                    id="paypal"
                                    name="paymentMethod"
                                    type="radio"
                                    className="custom-control-input"
                                    required
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="paypal">
                                    Paypal
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-name">Name on card</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-name"
                                    placeholder=""
                                    required
                                />
                                <small className="text-muted">
                                    Full name as displayed on card
                                </small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="cc-number">
                                    Credit card number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-number"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Credit card number is required
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">
                                    Expiration
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-expiration"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <label htmlFor="cc-expiration">CVV</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cc-cvv"
                                    placeholder=""
                                    required
                                />
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <a
                            href="/payment"
                            className="btn btn-primary btn-lg btn-block">
                            Continue to checkout
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
