import React from 'react';
import MenuItemList from '../components/MenuItemList';
import CategoryMenu from '../components/CategoryMenu';
import Cart from '../components/Cart';

const Menu = () => {
    return (
        <div className='container'>
            <CategoryMenu />
            <MenuItemList />
            <Cart />
        </div>
    );
};

export default Menu;