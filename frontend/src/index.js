import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
// import InsuranceCompanyRoute from './routes/InsuranceCompanyRoute'; // Importez InsuranceCompanyRoute depuis le bon chemin
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/ShopOwners/ProductListScreen';
import ProductEditScreen from './screens/ShopOwners/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import UserEditScreen from './screens/admin/UserEditScreen';
import InsuranceCompanyListScreen from './screens/admin/InsuranceCompanyListScreen';
import InsuranceCompanyEditScreen from './screens/admin/InsuranceCompanyEditScreen';
import ShopListScreen from './screens/admin/ShopListScreen';
import ShopEditScreen from './screens/admin/ShopEditScreen';
import Contract from './screens/ChooseContractScreen';
import RepairerCompanyListScreen from './screens/admin/RepairerCompanyListScreen';
import RepairerCompanyEditScreen from './screens/admin/RepairerCompanyEditScreen';
import InsuranceHome from './screens/InsuranceCompany/InsuranceHome';
import StickyHeadTable from './screens/InsuranceCompany/PolicyListScreen';
import EditPolicy from './screens/InsuranceCompany/PolicyEditScreen';
import { Provider } from 'react-redux';
import store from './store';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <Router>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index={true} element={<HomeScreen />} />
                <Route path='/search/:keyword' element={<HomeScreen />} />
                <Route path='/page/:pageNumber' element={<HomeScreen />} />
                <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
                <Route path='/product/:id' element={<ProductScreen />} />
                <Route path='/cart' element={<CartScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/about' element={<AboutUsScreen />} />
                
                <Route path='/register' element={<RegisterScreen />} />
                {/* Registered users */}
                <Route path='' element={<PrivateRoute />}>
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/contract/:id' element={<Contract />} />
                  <Route path='/order/:id' element={<OrderScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                </Route>
                  <Route path='/ShopOwners/productlist' element={<ProductListScreen />} />
                  <Route path='/ShopOwners/productlist/:pageNumber' element={<ProductListScreen />} />
                  <Route path='/ShopOwners/product/:id/edit' element={<ProductEditScreen />} />
                {/* Admin users */}
                <Route path='' element={<AdminRoute />}>
                  <Route path='/admin/orderlist' element={<OrderListScreen />} />
                  <Route path='/admin/InsuranceCompanyList' element={<InsuranceCompanyListScreen />} />
                  <Route path='/admin/ShopList' element={<ShopListScreen />} />
                  <Route path='/admin/RepairerCompanyList' element={<RepairerCompanyListScreen />} />
                  <Route path='/admin/userlist' element={<UserListScreen />} />
                  <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
                  <Route path='/admin/InsuranceCompany/:id/edit' element={<InsuranceCompanyEditScreen />} />
                  <Route path='/admin/RepairerCompany/:id/edit' element={<RepairerCompanyEditScreen />} />
                  <Route path='/admin/Shop/:id/edit' element={<ShopEditScreen />} />
                  
                </Route>
                {/* InsuranceCompany */}
                <Route>
                  <Route path='/InsuranceCompany/InsuranceHome' element={<InsuranceHome />} />
                  <Route path='/InsuranceCompany/InsuranceListScreen' element={<StickyHeadTable />} />
                  <Route path='/InsuranceCompany/Policy/:id/edit' element={<EditPolicy />} />
                </Route>

              </Route>
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
