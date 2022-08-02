import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';

const CartItem = ({ item }) => {
    const [state, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
    };

    const onChange = (e) => {
        const value = e.target.value;
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
        }
    }

    return (
        <div className='cartItem'>
            <div>
                <img 
                    className='cartItemImage'
                    src={`/images/${item.image}`}
                    alt='cartItem'
                />
            </div>
            <div>
                <div>{item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type='number'
                        placeholder='1'
                        value={item.purchaseQuantity}
                        onChange={onChange}
                    />
                    <span
                        role="img"
                        aria-label="trash"
                        onClick={() => removeFromCart(item)}
                    >
                        🗑️
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;