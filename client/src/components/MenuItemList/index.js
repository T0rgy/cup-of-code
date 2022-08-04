import React, { useEffect } from 'react';
import { useQuery }  from '@apollo/client';

import MenuItem from '../MenuItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_MENUITEMS } from '../../utils/actions';
import { GETMANY_MENUITEMS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function MenuItemList() {
    const [state, dispatch] = useStoreContext();

    const { currentCategory } = state;

    const { loading, data } = useQuery(GETMANY_MENUITEMS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_MENUITEMS,
                menuItems: data.menuItems,
            });
            data.menuItems.forEach((menuItem) => {
                idbPromise('menuItems', 'put', menuItem);
            });
        }
        else if (!loading) {
            idbPromise('menuItems', 'get').then((menuItems) => {
                dispatch({
                    type: UPDATE_MENUITEMS,
                    menuItems: menuItems
                });
            });
        }
    }, [data, loading, dispatch]);

    function filterMenuItems() {
        if (!currentCategory) {
            return state.menuItems;
        }

        return state.menuItems.filter(
            (menuItem) => menuItem.category._id === currentCategory
        );
    }

    return (
        <div className='menuItemList'>
            <h2 className="text-center"> Our MenuItems</h2>
            {state.menuItems.length ? (
                <div className='row'>
                    {filterMenuItems().map((menuItem) => (
                        <MenuItem
                        key={menuItem._id}
                        _id={menuItem._id}
                        image={menuItem.image}
                        name={menuItem.name}
                        price={menuItem.price}
                        ingredients={menuItem.ingredients}
                        description={menuItem.description}
                        />
                    ))}
                </div>
            ) : (
                <h3>You haven't added any menu items yet!</h3>
            )}
        </div>
    );
}

export default MenuItemList;