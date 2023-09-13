import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details based on the ID from the URL params
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  return (
    <div>
      {product ? (
        <div className="product-container">
          <Card className="product-card">
            <CardMedia
              component="img"
              height="300"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: Rs. {product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {product.rating.rate} ({product.rating.count} reviews)
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Product;
