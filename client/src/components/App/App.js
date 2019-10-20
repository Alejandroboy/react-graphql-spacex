import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';
import logo from '../../logo.png';
import { Launches } from '../Launches/Launches';
import { Launch } from '../Launch/Launch';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img src={logo} alt="dsfsdf" style={{ width: 300, display: 'block', margin: 'auto' }} />
          <Route exact path="/" component={Launches}></Route>
          <Route exact path="/launch/:flight_number" component={Launch}></Route>
        </div>
        {/* <Launches /> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
