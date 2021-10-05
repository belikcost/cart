import { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";

import {
    addFileRequest, calculateDeliveryRequest, createOrderRequest,
    deleteFileRequest,
    getCartRequest,
    getCitiesSuggestionsRequest,
    getPickpointsRequest
} from "../redux/actions";

import { Cart } from "../components/Cart";
import { Delivery } from "../components/Delivery";
import { OrderSuccess } from "../components/OrderSuccess";


const override = `
    display: block;
    margin: 30px 0;
    text-align: center;
`;

const cartId = localStorage.getItem('cartId');

function gtag() {
    const dataLayer = window.dataLayer || [];
    dataLayer.push(arguments);
}


const App = ({
                 cart,
                 handleGetCart,
                 citiesSuggestions,
                 handleGetCitiesSuggestions,
                 pickpoints,
                 handleGetPickpoints,
                 handleAddFile,
                 handleDeleteFile,
                 handleCalculateDelivery,
                 deliveryPrice,
                 handleCreateOrder,
                 orderWasCreated
             }) => {

    useEffect(() => {
        if (!cart && cartId) {
            handleGetCart(cartId);
        }
    }, [cart])

    useLayoutEffect(() => {
        gtag('js', new Date());
        gtag('config', 'G-Q589DMNJSM');
    }, []);

    useEffect(() => {
        if (orderWasCreated) {
            gtag('set', 'page', '/checkout/success');
            gtag('send', 'pageview');
            window.ym(85747113, 'hit', '/checkout/success');
        }
    }, [orderWasCreated])


    if (cart) {

        if (orderWasCreated) {

            return (
                <OrderSuccess/>
            );
        } else {

            return !cart.isLoading ? (
                <>
                    <Cart
                        cart={cart}
                    />
                    <Delivery
                        cart={cart}
                        citiesSuggestions={citiesSuggestions}
                        handleGetCitiesSuggestions={handleGetCitiesSuggestions}
                        pickpoints={pickpoints}
                        handleGetPickpoints={handleGetPickpoints}
                        handleAddFile={handleAddFile}
                        handleDeleteFile={handleDeleteFile}
                        deliveryPrice={deliveryPrice}
                        handleCalculateDelivery={handleCalculateDelivery}
                        handleCreateOrder={handleCreateOrder}
                        orderWasCreated={orderWasCreated}
                    />
                </>
            ) : (
                <BeatLoader loading={true} css={override} size={15} margin={2}/>
            );
        }

    } else if (!cartId) {

        return (
            <h2>Корзина пуста</h2>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    citiesSuggestions: state.citiesSuggestions,
    pickpoints: state.pickpoints,
    deliveryPrice: state.deliveryPrice,
    orderWasCreated: state.orderWasCreated
});

const mapDispatchToProps = (dispatch) => ({
    handleGetCitiesSuggestions: (data) => dispatch(getCitiesSuggestionsRequest(data)),
    handleGetPickpoints: (data) => dispatch(getPickpointsRequest(data)),
    handleAddFile: (data) => dispatch(addFileRequest(data)),
    handleDeleteFile: (data) => dispatch(deleteFileRequest(data)),
    handleGetCart: (data) => dispatch(getCartRequest(data)),
    handleCalculateDelivery: (data) => dispatch(calculateDeliveryRequest(data)),
    handleCreateOrder: (data) => dispatch(createOrderRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);