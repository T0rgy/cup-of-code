import { createContext, useContext } from "react";
import { useMenuItemReducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useMenuItemReducer({
        menuItems: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };