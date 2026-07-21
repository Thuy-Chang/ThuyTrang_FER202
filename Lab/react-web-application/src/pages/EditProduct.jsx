import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../api/productApi';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
    image: 'laptop1.png'
  });

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        setForm(data);
      } catch (err) {
        alert('Cannot load product details.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSaveProduct = async (event) => {
    event.preventDefault();

    if (!form.name || !form.description || !form.price || !form.currentPrice) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await updateProduct(id, form);
      alert('Update product successfully!');
      navigate(`/products/${id}`);
    } catch (err) {
      alert('Update product failed.');
    }
  };

  if (loading) {
    return <h3 className="text-center mt-4">Loading...</h3>;
  }

  return (
    <div className="page-wrap">
      <div className="edit-panel">
        <h2 className="panel-title">Edit Product</h2>

        <div className="edit-content">
          <div className="edit-image-preview">
            <img
              src={`/Images/${form.image}`}
              alt={form.name}
              className="edit-preview-img"
            />

            <p className="edit-image-name">{form.image}</p>
          </div>

          <form onSubmit={handleSaveProduct} className="edit-form">
            <div className="form-row-custom">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={form.name || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-custom">
              <label>Description:</label>
              <textarea
                name="description"
                rows="3"
                value={form.description || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-custom">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={form.price || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-custom">
              <label>Current Price:</label>
              <input
                type="text"
                name="currentPrice"
                value={form.currentPrice || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-row-custom">
              <label>Image:</label>
              <select
                name="image"
                value={form.image || 'laptop1.png'}
                onChange={handleChange}
              >
                {imageOptions.map((image) => (
                  <option key={image} value={image}>
                    {image}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-actions-left">
              <Link to="/products" className="btn btn-primary btn-sm me-2">
                Back Home
              </Link>

              <button type="submit" className="btn btn-danger btn-sm">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;