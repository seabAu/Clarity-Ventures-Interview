import {
    faShareAlt,
    faShoppingCart,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BrowserRouter as Router, Link } from "react-router-dom";

import React, { useState } from "react";

const ShoppingCartPanel = (props: any): JSX.Element => {
    const [products, setProducts] = useState([
        {
            name: "Product A",
            description: "Product Description Here",
            price: 25.0,
            quantity: 2,
        },
        {
            name: "Product B",
            description: "Product Description Here",
            price: 25.0,
            quantity: 1,
        },
    ]);

    function deleteProduct(productIndex: number): void {
        // products = products.filter((_, index) => index !== productIndex);
        setProducts(products.filter((_, index) => index !== productIndex));
    }

    function getTotal (): number
    {
        // Run through each product and add up the price.
        let total: number = 0;
        products.forEach( ( product ) =>
            {
                total += product.price * product.quantity;
            }
        );
        return total;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="card card-info">
                        <div className="card-header">
                            <div className="card-title">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h5 className="mb-0">
                                            <FontAwesomeIcon
                                                icon={faShoppingCart}
                                            />{" "}
                                            Shopping Cart
                                        </h5>
                                    </div>
                                    <div className="col-6">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-sm w-100">
                                            <FontAwesomeIcon
                                                icon={faShareAlt}
                                            />{" "}
                                            Continue shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {products.map((product, productIndex) => {
                                return (
                                    <div className="row" key="{productIndex}">
                                        <div className="col-2">
                                            <img
                                                className="img-responsive"
                                                src="http://placehold.it/100x70"
                                                alt="placeholder"
                                            />
                                        </div>
                                        <div className="col-4">
                                            <h4 className="product-name">
                                                <strong>{product.name}</strong>
                                            </h4>
                                            <h4>
                                                <small>
                                                    {product.description}
                                                </small>
                                            </h4>
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6 text-end">
                                                    <h6>
                                                        <strong>
                                                            {product.price}{" "}
                                                            <span className="text-muted">
                                                                x
                                                            </span>
                                                        </strong>
                                                    </h6>
                                                </div>
                                                <div className="col-4">
                                                    <input
                                                        type="text"
                                                        className="form-control input-sm"
                                                        defaultValue={
                                                            product.quantity
                                                        }
                                                    />
                                                </div>
                                                <div className="col-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link btn"
                                                        onClick={() =>
                                                            deleteProduct(
                                                                productIndex,
                                                            )
                                                        }>
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <hr />
                            <div className="row text-center align-items-center">
                                <div className="col-9">
                                    <h6 className="text-end mb-0">
                                        Added items?
                                    </h6>
                                </div>
                                <div className="col-3">
                                    <button
                                        type="button"
                                        className="btn btn-default btn-sm w-100 border"
                                        onClick={() => console.log(products)}>
                                        Update cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row text-center align-items-center">
                                <div className="col-9">
                                    <h4 className="text-end mb-0 h5">
                                        Total <strong>${getTotal()}</strong>
                                    </h4>
                                </div>
                                <div className="col-3">
                                    <a
                                        href="/checkout"
                                        className="btn btn-success w-100">
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartPanel;
