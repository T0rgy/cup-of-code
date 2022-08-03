import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, menuItems: [...cart]});
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);


    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    };

    function submitCheckout() {
        const menuItemIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                menuItemIds.push(item._id);
            }
        });

        getCheckout({
            variables: { menuItems: menuItemIds }
        });
    }


    return (
        <div className='cart'>
            <h2>Shopping Cart</h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map((menuItem) => (
                        <CartItem key={menuItem._id} item={menuItem} />
                    ))}

                    <div className='flex-row space-between'>
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ? (
                                <button onClick={submitCheckout}>
                                    Checkout
                                </button>
                                ) : (
                                <span>(log in to check out)</span>
                        )}
                    </div>
                </div>
            ) : (
                <h3>
                    You haven't added anything to your cart yet!
                </h3>
            )}
        </div>
    );
};

export default Cart;