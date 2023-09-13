import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import { toast, ToastContainer } from 'react-toastify';
import './Cart.css';
import emptyCartImg from '../../assets/empty_cart.png';

const Cart = () => {

  let navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([])
  const [totalCartAmount, setTotalCartAmount] = useState(0)


  useEffect(() => {
    document.title = 'Cart';
    fetchCartData();
  }, [])

  const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
const day = today.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

  const fetchCartData = () => {
    axios.get('https://fakestoreapi.com/carts/user/1')
    .then((res) => {
      console.log(res)
      setCartProducts(res.data);
    })
    .catch((err) => {
      console.log(err.response.data)
    })
    console.log(cartProducts.length)
  }


  const increaseBookQty= (CartID, qty) => {
      const data = {
          userId:1,
          date:formattedDate,
          products:[{productId:qty.productId,quantity:qty.quantity + 1}]
      }
      const body = JSON.stringify(data)
    axios.put(`https://fakestoreapi.com/carts/${CartID}`, body ,{headers: {
      'Content-Type': 'application/json',
    }})
    .then((res) => {
      toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER} );
      console.log(res.data)
      fetchCartData();
    })
    .catch((err) => {
      toast.error(err.response.data);
  });
  }

  const decreaseBookQty= (CartID, qty) => {
      const data = {
          userId:1,
          date:formattedDate,
          products:[{productId:qty.productId,quantity:qty.quantity -1}]
      }
      const body = JSON.stringify(data)
    axios.put(`https://fakestoreapi.com/carts/${CartID}`, body ,{headers: {
      'Content-Type': 'application/json',
    }})
    .then((res) => {
      toast.success(res.data.message, {position: toast.POSITION.BOTTOM_CENTER});
      fetchCartData();
    })
    .catch((err) => {
      toast.error(err.response.data);
  });
  }

  const removeBookFromCart=(id) => {
    axios.delete(`https://fakestoreapi.com/carts/${id}`)
    .then((res) => {
      console.log(res.data);
      toast.success("Product remove from cart", {position: toast.POSITION.BOTTOM_CENTER});
      fetchCartData();
  })
  .catch((err) => {
      console.log(err);
  });
  }


return (
  <div>
    <Header/>
    <div className='cartContainer'>
      {cartProducts.length>0 ? (cartProducts.map((cartProduct) => {
        console.log(cartProducts.length);
        return (
          <div className='cartcontainerbody'>
            <Card key={cartProduct.id} className='card' sx={{ display: 'flex', marginBottom: '1%', marginTop: '1%', width: '75%', maxHeight: '90%' }}>
              {/* <div>
                <CardMedia
                  component="img"
                  height="100px"
                  image={cartProduct.products[0].image}
                  alt="Image not Available"
                  sx={{ objectFit: "contain", width: '150px' }} />
              </div> */}
              <div className='cardContent'>
                <CardContent class="cardcontent">
                  <label className='cardtitle'>
                      {cartProduct.date}
                  </label><br />

                  <label className='authorname'>
                      {cartProduct.products[0].productId}
                  </label><br />

                  <label className='cardtitle'>
                      Rs. {cartProduct.products[0].quantity}
                  </label><br />

                  <div className='countOfItems'>
                    <button onClick={() => decreaseBookQty(cartProduct.id, cartProduct.products[0])} disabled={cartProduct.products[0].image === 1}> - </button>
                    <input  value={cartProduct.products[0].quantity} className="count" type="text" name="countOfBook" id="Name" required />
                    <button onClick={() => increaseBookQty(cartProduct.id, cartProduct.products[0])}> + </button>
                  </div>
                </CardContent>
              </div>
              <div className='cardAction'>
                <CardActions>
                  <Button onClick={() => removeBookFromCart(cartProduct.id)} variant="outlined" startIcon={<DeleteIcon />}>
                      Remove
                  </Button>
                </CardActions>
              </div>
            </Card>
          </div>
        );
      })):(<img src={emptyCartImg} className="emptyCartImg"/>)
    }{cartProducts.length>0 &&
    <button class="place-order" onClick = {() => { navigate("/PlaceOrder") }}>
      Place Order
    </button> 
    }      
    </div>
    <ToastContainer autoClose={2000} />  
    </div>
  )
}
export default Cart