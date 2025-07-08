import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { IoTrashBin } from "react-icons/io5";
import { useProductStore } from '../store/product.js';


const ProductGrid = ({ products }) => {

  const { deleteProducts, updateProducts } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProducts(pid);
    console.log(`Success: ${success}, Message: ${message}`);
    if (success) {
      toast.success("Product deleted", { autoClose: 3000, pauseOnHover: false });
    } else {
      toast.error("Error deleting product", { autoClose: 3000, pauseOnHover: false });
    }
  }

  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: '',
    image: '',
    _id: ''
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setUpdatedProduct(product);
    setShow(true);
  }

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message} = await updateProducts(pid, updatedProduct);
    setUpdatedProduct(updatedProduct);
    handleClose();
    if (success) {
      toast.success("Product updated", { autoClose: 3000, pauseOnHover: false });
    } else {
      toast.error("Error updating product", { autoClose: 3000, pauseOnHover: false });
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ objectFit: 'cover', height: '200px' }}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <span className='mt-auto row d-flex justify-content-start'>
                    <button className="btn btn-success col-xl-2 mb-1 mx-1" name='edit' onClick={() => handleShow(product)}><FaEdit size={28}/></button>
                    <button className="btn btn-danger col-xl-2 mb-1 mx-1" name='delete' onClick={() => handleDeleteProduct(product._id)}><IoTrashBin size={28}/></button>
                </span>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="modal show" style={{ display: 'block', position: 'initial' }}> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className='bg-dark text-white'>
              <Modal.Title>Update product</Modal.Title>
            </Modal.Header>
              <Modal.Body className='d-flex flex-column bg-dark text-white'>
                {/* Name */}
                <label htmlFor='name'>Name</label>
                <input id='name' name='name' value={updatedProduct.name} type='text' placeholder='product name' className='bg-transparent p-2 m-1 border-1 px-1 mx-2 rounded border-1 border-light' required={true} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}/>
                
                {/* Price */}
                <label htmlFor='price'>Price</label>
                <input id='price' name='price' value={updatedProduct.price} type='text' placeholder='price' className='bg-transparent p-2 m-1 border-1 px-1 mx-2 rounded border-1 border-light' required={true} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}/>
                
                {/* Image */}
                <label htmlFor='image'>Image</label>
                <input id='image' name='image' value={updatedProduct.image} placeholder='image url' className='bg-transparent p-2 m-1 border-1 px-1 mx-2 rounded border-1 border-light' onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}/>
              </Modal.Body>

            <Modal.Footer className='bg-dark'>
              <Button variant="primary" onClick={() => handleUpdateProduct(updatedProduct._id, updatedProduct)}>Save Changes</Button>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductGrid;
