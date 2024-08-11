import React, { useEffect, useState } from 'react';
import axios from 'axios';


const HomeLayout = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAllProducts');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#ff4b30]">Welcome to the Shoppieee</h1>
      </div>
      {
        products && (
          <div className="products-container">
            <h1>Product List</h1>
            <div className="product-list">
              {products?.data?.map((product, index) => (
                <div key={index} className="product-card">
                  <img src={product.image} alt={product.productName} className="product-image" />
                  <div className="product-details">
                    <h2 className="product-name">{product.productName}</h2>
                    <p className="product-description">{product.product_description}</p>
                    <p className="product-price">Price: ${product.product_price}</p>
                    <p className="product-offer">Offer: ${product.product_offer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>
  )
}

export default HomeLayout