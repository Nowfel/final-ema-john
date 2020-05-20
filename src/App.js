import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotMatch from './components/NotMatch/NotMatch';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/Use-auth';
import Shipment from './components/Shipment/Shipment';

function App() {
  return (
    <div className="App">

      <AuthContextProvider>

        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/product/:productkey">
              <ProductDetails></ProductDetails>
            </Route>
            <Route path='/login'>
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
              </PrivateRoute>
            
            <Route path="*">
              <NotMatch></NotMatch>
            </Route>
          </Switch>
        </Router>

      </AuthContextProvider>

    </div>
  );
}

export default App;
