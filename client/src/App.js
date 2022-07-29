
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Header from "./pages/Header";
import Login from './pages/login';
import Dashboard from './pages/dashboard';

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
    <Header />
      <Router>
        <Routes>
          <Route 
            path='/'
            element={<Dashboard />}
          />
          <Route 
            path='/login'
            element={<Login />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
