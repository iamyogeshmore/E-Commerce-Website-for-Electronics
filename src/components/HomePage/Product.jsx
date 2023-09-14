import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Header from "../Header/Header";
import "./Product.css";
import { ShoppingCartRounded } from "@mui/icons-material";

const ProductDetails = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRAM, setSelectedRAM] = useState("4GB"); 
  const [ramPrice, setRamPrice] = useState(0);
  const [displayedImage, setDisplayedImage] = useState(null); 


  useEffect(() => {
    document.title = "Product Details";
    fetchProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price * productCount + ramPrice);
    }
  }, [product, productCount, ramPrice]);

  const fetchProductDetails = (productId) => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((res) => res.json())
      .then((product) => {
        setProduct(product);
        setDisplayedImage(product.image);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  };

  const addToCart = async (id, quantity) => {
    try {
      const response = await axios.post("https://fakestoreapi.com/carts", {
        productId: id,
        quantity: quantity,
      });

      if (response.status === 200) {
        toast.success("Product added to cart!");
      } else {
        toast.error("Failed to add product to cart. Please try again later.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  const handleRAMOptionChange = (option, price) => {
    setSelectedRAM(option);
    setRamPrice(price);
    setTotalPrice(product.price * productCount + price);
  };

  const randomImages = [
    product.image, 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ557o_lo4rZExfverdDtaPsHJOcrIBmBJjkxYp-wdNdgKlmXpoFMBGzOsdIUgkyl0tD9g&usqp=CAU",
    "https://images.unsplash.com/photo-1517404215738-15263e9f9178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dXJsfGVufDB8fDB8fHww&w=1000&q=80",
    "https://images.unsplash.com/photo-1579667410546-f7079afa0601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8MTA1OTIxNTB8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=60",
  ];
  const handleImageClick = (imageUrl) => {
    setDisplayedImage(imageUrl);
  };

  return (
    <div>
      <Header />
      {product ? (
        <div className="product-details">
          <div className="random-images-container">
            <h3>Random Images</h3>
            <div className="random-images">
              {randomImages.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Random Image ${index}`}
                  className={`random-image ${imageUrl === displayedImage ? "selected" : ""}`}
                  onClick={() => handleImageClick(imageUrl)}
                />
              ))}
            </div>
          </div>
          <div className="image-container">
            <Card className="card" sx={{ maxWidth: 400 }}>
              <CardMedia
                component="img"
                height="400"
                image={displayedImage}
                alt="Product Image"
                sx={{ objectFit: "contain" }}
              />
            </Card>
          </div>
     
          <CardContent>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Price: Rs. {product.price}</p>
            <div className="ram-options">
              <p>Select RAM:</p>
              <div>
                <button
                  className={selectedRAM === "4GB" ? "selected" : ""}
                  onClick={() => handleRAMOptionChange("4GB", 0)}
                >
                  4GB
                </button>
                <button
                  className={selectedRAM === "8GB" ? "selected" : ""}
                  onClick={() => handleRAMOptionChange("8GB", 50)}
                >
                  8GB
                </button>
              </div>
            </div>
          </CardContent>
          <CardActions>
            <div className="action-buttons">
              <div className="product-count">
                <button
                  onClick={() => {
                    if (productCount > 1) {
                      setProductCount(productCount - 1);
                    }
                  }}
                  disabled={productCount <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={productCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value);
                    setProductCount(newCount);
                    setTotalPrice(product.price * newCount + ramPrice); 
                  }}
                />
                <button onClick={() => setProductCount(productCount + 1)}>+</button>
              </div>
              <Button
                startIcon={<ShoppingCartRounded />}
                onClick={() => addToCart(product.id, productCount)}
                size="small"
                variant="contained"
              >
                Add To Cart
              </Button>
              <div className="total-price">
                <p>Total Price: Rs. {totalPrice}</p>
              </div>
            </div>
          </CardActions>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ProductDetails;
