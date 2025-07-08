import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product.js'
import  ProductGrid from '../components/ProductGrid.jsx';

const HomePage = () => {
  const {fetchProducts, products} = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products ",products);

  return (
    <div className='container d-flex jusitify-content-center w-100 align-items-center flex-column pt-4'>
        {/* Card heading */}
        <h1 className='fw-bold' style={{background: 'linear-gradient(to right, cyan, blue)', backgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Current Products 🚀</h1>
        {/* To store cards */}
        <div className='d-flex jusitify-content-center w-100 align-items-center flex-column'>
          <ProductGrid products={products}/>
          {
            products.length === 0 && (
              <p className='fw-bold'>No Products found 😔 <Link to='/create' style={{textDecoration: 'none'}}>Create a Product</Link></p>
            )
          }
        </div>
    </div>
  )
}

export default HomePage;