import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Containers/Home';
import Header from './Components/Header';
import Projects from './Containers/Projects';
import Contact from './Containers/Contact';

import Register from './Containers/Register';
import Login from './Containers/Login';
import Profile from './Containers/Profile';

import MovieRent from './Projects/MovieRent/Containers/MovieRent';
import Movie from './Projects/MovieRent/Containers/Movie';
import BuyCredits from './Projects/MovieRent/Containers/BuyCredits';

import ECommerce from './Projects/ECommerce/Containers/ECommerce';
import ProductDetails from './Projects/ECommerce/Containers/ProductDetails';
import Cart from './Projects/ECommerce/Containers/Cart';
import Shipping from './Projects/ECommerce/Containers/Shipping';
import Order from './Projects/ECommerce/Containers/Order';
import OrderDetails from './Projects/ECommerce/Containers/OrderDetails';
import UserList from './Containers/UseList';
import UserEdit from './Containers/UserEdit';
import ProductList from './Containers/ProductList';
import ProductEdit from './Containers/ProductEdit';
import OrderList from './Containers/OrderList';
import MovieList from './Containers/MovieList';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/user/:id' element={<UserEdit />} />
            <Route path='/admin/productlist' element={<ProductList />} />
            <Route
              path='/admin/productlist/:pageNumber'
              element={<ProductList />}
            />
            <Route path='/admin/product/:id' element={<ProductEdit />} />
            <Route path='admin/orderlist' element={<OrderList />} />
            <Route path='/admin/movieList' element={<MovieList />} />

            <Route path='/projects/movierent' element={<MovieRent />} />
            <Route path='/projects/movierent/movie' element={<Movie />} />
            <Route
              path='/projects/movierent/buycredits'
              element={<BuyCredits />}
            />

            <Route path='/projects/ecommerce' element={<ECommerce />} />
            <Route
              path='/projects/ecommerce/page/:pageNumber'
              element={<ECommerce />}
            />
            <Route
              path='/projects/ecommerce/product/:id'
              element={<ProductDetails />}
            />
            <Route path='/projects/ecommerce/cart/:id' element={<Cart />} />
            <Route path='/projects/ecommerce/cart' element={<Cart />} />
            <Route path='/projects/ecommerce/shipping' element={<Shipping />} />
            <Route path='/projects/ecommerce/placeorder' element={<Order />} />
            <Route
              path='/projects/ecommerce/order/:id'
              element={<OrderDetails />}
            />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
