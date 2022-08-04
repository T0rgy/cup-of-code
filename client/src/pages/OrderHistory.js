import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../utils/queries';
import Auth from '../utils/auth';

const OrderHistory = () => {
    const currentUser = Auth.loggedIn()
    const { data } = useQuery(GET_USER,  {
        variables: {
            _id: currentUser?.data?._id
        }
    });

    let user;

    if (data) {
        user = data.user;
    }

    console.log(user)

    return (
      <>
        <div className='container'>
            <Link to='/menu'>← Back to the Menu</Link>
            {user ? (
                <>
                    <h2>
                        Order History for {user.username} 
                    </h2>
                    {user.orders.map((order) => (
                        <div key={order._id} className=''>
                            <h3>
                                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                            </h3>
                            <div className='flex-row'>
                                {order.menuItems.map(({ _id, image, name, price }, index) => (
                                    <div key={index} className='card'>
                                        <img alt={name} src={`/images/${image}`} />
                                        <p>{name}</p>
                                        <div>
                                            <span>${price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : null}
        </div>
      </>
    );
};

export default OrderHistory