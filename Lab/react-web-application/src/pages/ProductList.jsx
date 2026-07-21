import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createProduct, deleteProduct, getProducts } from '../api/productApi';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: 'laptop1.png'
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const imageOptions = [
    'laptop1.png',
    'laptop2.jpg',
    'laptop3.png',
    'laptop4.png',
    'laptop5.jpg',
    'laptop6.png',
    'laptop7.jpg',
    'laptop8.jpg',
    'laptop9.png',
    'laptop10.png'
  ];

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Unable to fetch products. Please make sure JSON Server is running on port 3001.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    if (!form.name || !form.description || !form.price || !form.currentPrice) {
      alert('Please fill in all fields.');
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: form.name,
      description: form.description,
      price: form.price,
      currentPrice: form.currentPrice,
      image: form.image
    };

    try {
      await createProduct(newProduct);

      setForm({
        name: '',
        description: '',
        price: '',
        currentPrice: '',
        image: 'laptop1.png'
      });

      loadProducts();
    } catch (err) {
      alert('Add product failed.');
    }
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Delete product failed.');
    }
  };

  return (
    <div className="page-wrap">
      <div className="custom-panel">
        <h2 className="panel-title">Add Product</h2>

        <form onSubmit={handleAddProduct} className="product-form-custom">
          <div className="form-row-custom">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-custom">
            <label>Description:</label>
            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-custom">
            <label>Price:</label>
            <input
              type="text"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-custom">
            <label>Current Price:</label>
            <input
              type="text"
              name="currentPrice"
              value={form.currentPrice}
              onChange={handleChange}
            />
          </div>

          <div className="form-row-custom">
            <label>Image:</label>
            <select name="image" value={form.image} onChange={handleChange}>
              {imageOptions.map((image) => (
                <option key={image} value={image}>
                  {image}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions-center">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Add Product
            </button>
          </div>
        </form>
      </div>

      <div className="product-list-panel mt-4">
        <h2 className="panel-title">Product List</h2>

        {loading && <p className="text-center text-light">Loading...</p>}

        {error && <p className="alert alert-danger">{error}</p>}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={`/Images/${product.image}`}
                  alt={product.name}
                  className="product-img"
                />

                <h5 className="product-name">{product.name}</h5>

                <p className="product-description">{product.description}</p>

                <p className="old-price">{product.price} đ</p>

                <p className="current-price">{product.currentPrice} đ</p>

                <div className="product-actions">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-danger btn-sm"
                  >
                    View Details
                  </Link>

                  <Link
                    to={`/products/${product.id}/edit`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;