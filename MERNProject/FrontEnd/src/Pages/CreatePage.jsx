import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import {useProductStore} from '../store/product.js'
import ProductGrid from '../components/ProductGrid.jsx';

const CreatePage = () => {
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        image: ""
    });

    const {createProducts} = useProductStore();
    // handle products
    const handleAddProduct = async () => {
        const {success, message} = await createProducts(newProduct);
        if(success) {
            toast.success("Product Created");
            <ProductGrid products={newProduct}/>;
        }
        else
            toast.error("Fill all fields");
        setNewProduct({name: "", price: "", image: ""});
    }

  return (
    <div className='container.sm bg-dark d-flex justify-content-center align-items-center flex-column' style={{height: '100vh'}}>
        <span className='d-flex justify-content-center align-items-center'>
            <h1 className='fw-bold' style={{background: 'linear-gradient(to right, cyan, blue)', backgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Create New Product</h1>
        </span>
        <div className='p-4 border-1 rounded bg-secondary w-50'>
            <div className='d-flex flex-column'>
                {/* Name */}
                <label htmlFor='name'>Name</label>
                <input id='name' name='name' type='text' placeholder='product name' value={newProduct.name} className='bg-transparent border-1 px-1 mx-2 rounded' onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} required={true}/>
                
                {/* Price */}
                <label htmlFor='price'>Price</label>
                <input id='price' name='price' type='text' placeholder='price' value={newProduct.price} className='bg-transparent border-1 px-1 mx-2 rounded' onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} required={true}/>
                
                {/* Image */}
                <label htmlFor='image'>Image</label>
                <input id='image' name='image' placeholder='image url' value={newProduct.image} className='bg-transparent border-1 px-1 mx-2 rounded' onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>

                <Button type='submit' onClick={handleAddProduct} className='mt-2'>Add product</Button>
            </div>
        </div>
    </div>
  )
}

export default CreatePage;