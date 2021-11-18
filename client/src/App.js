import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Provider } from 'react-redux';
import store from './utils/globalState';

import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Nav />
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route component={Dashboard} />
            </Switch>
          </Router>
        </Provider>
    </ApolloProvider>
  );
}

export default App;
