import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';
import Cart from './pages/Cart/Cart';
import AllOrder from './pages/AllOrdersList/AllOrder';
import Product from './components/HomePage/Product';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = { <HomePage/>} />
        <Route path="/Login" element = { <LoginPage/>} />
        <Route path="/Signup" element = { <SignUpPage/>} />
        <Route path="/Cart" element = { <Cart/>} />
        <Route path="/product/:productId" element = { <Product/>} />
      </Routes>
    </Router>
  );
}

export default App;
