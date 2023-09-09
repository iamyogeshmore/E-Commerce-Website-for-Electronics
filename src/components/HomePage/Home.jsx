import { Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Home.css';
import Pagination from '../pagination/Pagination';
import { ShoppingCartRounded } from '@mui/icons-material';



const Home = () => {
  const [electronics, setElectronics] = useState([]);
  const [login, setLogin] = useState(false);
  const [showPerPage,setShowPerPage]=useState(3);
  const [pagination,setPagination]=useState({start:0,end:showPerPage})
  const[search, setSearch]= useState("")

  const onPaginationChange=(start,end)=>{
    setPagination({start:start,end:end})
  }
  
  useEffect (() => {
    document.title = 'Book-Store Home';
    fetchBooks();
    if (localStorage.getItem("AccessToken") === null) {
      setLogin(false)
      console.log(localStorage.getItem("AccessToken"))
    } else {
      setLogin(true)
      console.log(localStorage.getItem("AccessToken"))
    } 
  }, [])

  const fetchBooks =() => {
    axios.get("https://fakestoreapi.com/products/category/electronics")
    .then((response) => {
      setElectronics(response.data)
      console.log(response.data)
    })
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = today.getDate().toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}-${day}`;
  console.log(formattedDate); // Output: "YYYY-MM-DD" for the current date
  
  const addToCart = (id) => {
      if (login) {
        let  cartData = {
              userId : 1,
              date : formattedDate,
              products:[{productId:id,quantity:1}]
          }
          const body = JSON.stringify(cartData)
        axios.post('https://fakestoreapi.com/carts',body, {headers: {
          'Content-Type': 'application/json',
        }})
        .then((res) => {
          if(res.status == 200){
            toast.success("Iteam Added Succefully ")
          }else{
            toast.error("Something went wrong")
          }
        })
        .catch((err) => {
          toast.error(err.data.data);
          console.log(err);
        })
      } else {
        toast.error("Please Login to buy Book.");
      }
    }
  
    const sorting = (e) => {
      console.log(e.target.value);
      if (e.target.value === "Asc") {
        axios.get("https://fakestoreapi.com/products?sort=desc")
        .then((res) => {
          setElectronics(res.data);
        })
      }
  
      if (e.target.value === "Dsc") {
        axios.get("https://fakestoreapi.com/products?sort=desc")
        .then((res) => {
          setElectronics(res.data);
        })
      }
  
      if (e.target.value === "New") {
        axios.get("https://fakestoreapi.com/products?sort=desc")
        .then((res) => {
          setElectronics(res.data);
        })
      }
  
    }
  return (   
    <div>
      <Header></Header>
      <div className='searchSortBar'>
      <text className='bookText'>Electronics
      </text>
      <input type="text" id='myInput' placeholder="Search for electronics products.." title="Type in a name" onChange={(event) => {setSearch(event.target.value)}}/>
      <select  className='selectBar' onChange={sorting}>
        <option >Sort by Relevance</option>
        <option value="Asc">Price: Low to High</option>
        <option value="Dsc">Price: High to Low</option>
        <option value="New">Newest Arrivals</option>  
      </select>
      </div>
      <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
            {
              electronics.length>0 ? electronics.filter(electronics => {
                if (search === " ") {
                  return electronics;
                } else if (electronics.title.toLowerCase().includes(search) || electronics.description.toLowerCase().includes(search) ){
                  return electronics;
                }
              }).slice(pagination.start,pagination.end).map((electronics) => {
                return (
                  <Card key={electronics.id} className='card' sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={electronics.image}
                      alt="Image Not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>

                    {electronics.rating.count == 0 &&
                      <h1 className='content'>Out of Stock</h1>
                    }

                    <CardContent class="cardcontent">
                      <label className='cardtitle'>
                        {electronics.title}
                      </label><br />

                      <label className='authorname'>
                        by {electronics.description}
                      </label><br />

                      <label className='cardtitle'>
                        Rs. {electronics.price}
                      </label>
                    </CardContent>

                    <CardActions>
                      <Button startIcon={<ShoppingCartRounded />} disabled={electronics.rating.count === 0} onClick={() => addToCart(electronics.id)} size="small" variant="contained">Add To Cart</Button>
                      <Button variant="outlined" size="small">WishList</Button>
                    </CardActions>
                  </Card>
                )
              }): "No Electronics products Available Here"
            }
          </div>
          <div className='pagination'>
          <Pagination showPerPages={showPerPage} onPagination={onPaginationChange} totalPage={electronics.length}/>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  )
}

export default Home