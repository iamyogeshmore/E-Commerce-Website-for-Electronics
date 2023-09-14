import { Button, Card, CardActions, CardContent } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import './Cart.css';
import emptyCartImg from '../../assets/empty_cart.png';

const Cart = () => {
  let navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    document.title = 'Cart';
    fetchCartData();
  }, []);

  const formattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchCartData = () => {
    axios
      .get('https://fakestoreapi.com/carts/user/1')
      .then((res) => {
        console.log(res);
        setCartProducts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const increaseProductQty = (CartID, productId) => {
    const updatedCartProducts = cartProducts.map((cart) => {
      if (cart.id === CartID) {
        const updatedProducts = cart.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });

    updateCartOnServer(CartID, updatedCartProducts);
  };

  const decreaseProductQty = (CartID, productId) => {
    const updatedCartProducts = cartProducts.map((cart) => {
      if (cart.id === CartID) {
        const updatedProducts = cart.products.map((product) => {
          if (product.productId === productId && product.quantity > 1) {
            return { ...product, quantity: product.quantity - 1 };
          }
          return product;
        });
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });

    updateCartOnServer(CartID, updatedCartProducts);
  };

  const updateCartOnServer = (CartID, updatedCartProducts) => {
    const data = {
      userId: 1,
      date: formattedDate(),
      products: updatedCartProducts.find((cart) => cart.id === CartID).products,
    };
    const body = JSON.stringify(data);

    axios
      .put(`https://fakestoreapi.com/carts/${CartID}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        toast.success(res.data.message, { position: toast.POSITION.BOTTOM_CENTER });
        setCartProducts(updatedCartProducts);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const removeProductFromCart = (CartID, productId) => {
    const updatedCartProducts = cartProducts.map((cart) => {
      if (cart.id === CartID) {
        const updatedProducts = cart.products.filter((product) => product.productId !== productId);
        return { ...cart, products: updatedProducts };
      }
      return cart;
    });

    const data = {
      userId: 1,
      date: formattedDate(),
      products: updatedCartProducts.find((cart) => cart.id === CartID).products,
    };
    const body = JSON.stringify(data);

    axios
      .put(`https://fakestoreapi.com/carts/${CartID}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        toast.success('Product removed from cart', { position: toast.POSITION.BOTTOM_CENTER });
        setCartProducts(updatedCartProducts);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div>
      <Header />
      <div className='cartContainer'>
        {cartProducts.length > 0 ? (
          cartProducts.map((cart) => {
            return (
              <div className='cartcontainerbody' key={cart.id}>
                {cart.products.map((cartProduct) => (
                  <Card
                    key={cartProduct.productId}
                    className='card'
                    sx={{
                      display: 'flex',
                      marginBottom: '1%',
                      marginTop: '1%',
                      width: '75%',
                      maxHeight: '90%',
                    }}
                  >
                    <div className='cardContent'>
                      <CardContent class='cardcontent'>
                        <label className='cardtitle'>{cartProduct.title}</label>
                        <br />

                        <label className='authorname'>
                          Product ID: {cartProduct.productId}
                        </label>
                        <br />

                        <label className='cardtitle'>
                          Quantity: {cartProduct.quantity}
                        </label>
                        <br />

                        <div className='countOfItems'>
                          <button
                            onClick={() => decreaseProductQty(cart.id, cartProduct.productId)}
                            disabled={cartProduct.quantity === 1}
                          >
                            -
                          </button>
                          <input
                            value={cartProduct.quantity}
                            className='count'
                            type='text'
                            name='countOfBook'
                            id='Name'
                            required
                          />
                          <button
                            onClick={() => increaseProductQty(cart.id, cartProduct.productId)}
                          >
                            +
                          </button>
                        </div>
                      </CardContent>
                    </div>
                    <div className='cardAction'>
                      <CardActions>
                        <Button
                          onClick={() => removeProductFromCart(cart.id, cartProduct.productId)}
                          variant='outlined'
                          startIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </div>
                  </Card>
                ))}
              </div>
            );
          })
        ) : (
          <img src={emptyCartImg} className='emptyCartImg' alt='Empty Cart' />
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Cart;
