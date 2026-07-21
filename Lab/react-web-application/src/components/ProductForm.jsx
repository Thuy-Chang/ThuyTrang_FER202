import { useState } from 'react';

const defaultForm = {
  name: '',
  description: '',
  price: '',
  currentPrice: '',
  image: 'laptop1.png',
};

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
  'laptop10.png',
];

function ProductForm({ initialProduct, buttonText = 'Add Product', onSubmit }) {
  const [formData, setFormData] = useState(initialProduct || defaultForm);
  const [formError, setFormError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setFormError('Product name is required.');
      return;
    }

    if (!formData.description.trim()) {
      setFormError('Description is required.');
      return;
    }

    if (!formData.price.trim() || !formData.currentPrice.trim()) {
      setFormError('Price and current price are required.');
      return;
    }

    setFormError('');
    await onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      price: formData.price.trim(),
      currentPrice: formData.currentPrice.trim(),
    });

    if (!initialProduct) {
      setFormData(defaultForm);
    }
  }

  return (
    <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
      {formError && <div className="alert alert-warning">{formError}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Product name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="25.990.000"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Current price</label>
          <input
            type="text"
            name="currentPrice"
            className="form-control"
            value={formData.currentPrice}
            onChange={handleChange}
            placeholder="20.990.000"
          />
        </div>

        <div className="col-md-8">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Image</label>
          <select
            name="image"
            className="form-select"
            value={formData.image}
            onChange={handleChange}
          >
            {imageOptions.map((image) => (
              <option key={image} value={image}>
                {image}
              </option>
            ))}
          </select>
          <div className="small text-muted mt-2">
            Images are loaded from public/Images.
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <button type="submit" className="btn btn-success px-4">
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
