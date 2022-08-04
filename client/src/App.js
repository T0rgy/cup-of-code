import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import NavBar from "./components/NavBar";
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Signup from './pages/Signup';
import About from './pages/about';
import Menu from './pages/Menu';
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success';
import Footer from './components/Footer';
import { StoreProvider } from './utils/GlobalState';

import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <NavBar />
            <Routes>
              <Route 
                path='/'
                element={<Dashboard />}
              />
              <Route 
                path='/login'
                element={<Login />}
              />
              <Route 
                path='/signup'
                element={<Signup />}
              />
              <Route
                path='/about'
                element={<About />}
              />
              <Route
                path='/menu'
                element={<Menu />}
              />
              <Route
                path='/orderhistory'
                element={<OrderHistory />}
              />
              <Route
                path='/success'
                element={<Success />}
              />              
            </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
