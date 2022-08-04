import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const menuItems = cart.map((item) => item._id);

            if (menuItems.length) {
                const { data } = await addOrder({ variables: {
                    menuItems 
                }});
                const menuItemData = data.addOrder.menuItems;

                menuItemData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
            setTimeout(() => {
                window.location.assign('/orderhistory');
            }, 6000)
        }

        saveOrder();
    }, [addOrder]);

    return (
        <div style={{ height: 600, clear: 'both', paddingTop: 120, textAlign: 'center' }}>
            <div className='checkmark'>
              <span>✓</span>  
            </div>
            
            <h1>You've Successfully Submitted Your Order!</h1>
            <h2>Your order will be ready for pick up in 30 minutes.</h2>
            <h2>We appreciate your business!</h2>
        </div>
    )
}

export default Success;