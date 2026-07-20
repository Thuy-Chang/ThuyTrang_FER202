import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

const initialFormData = {
  name: "",
  description: "",
  price: "",
  currentPrice: "",
  image: "/images/laptop1.png",
};

const imageOptions = [
  "/images/laptop1.png",
  "/images/laptop2.jpg",
  "/images/laptop3.png",
  "/images/laptop4.png",
  "/images/laptop5.jpg",
  "/images/laptop6.png",
  "/images/laptop7.jpg",
  "/images/laptop8.jpg",
  "/images/laptop9.png",
  "/images/laptop10.png",
];

function ProductForm({ onAdd, submitting }) {
  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const [validationError, setValidationError] = useState("");

  const {
    name,
    description,
    price,
    currentPrice,
    image,
  } = formData;

  const handleChange = (event) => {
    const { name: fieldName, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [fieldName]: value,
    }));
  };

  const validateForm = () => {
    if (!name.trim()) {
      return "Product name is required.";
    }

    if (!description.trim()) {
      return "Product description is required.";
    }

    if (!price || Number(price) <= 0) {
      return "Original price must be greater than 0.";
    }

    if (!currentPrice || Number(currentPrice) <= 0) {
      return "Current price must be greater than 0.";
    }

    if (Number(currentPrice) > Number(price)) {
      return "Current price cannot be greater than original price.";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      setValidationError(errorMessage);
      return;
    }

    setValidationError("");

    const newProduct = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      currentPrice: Number(currentPrice),
      image,
    };

    const addedSuccessfully = await onAdd(newProduct);

    if (addedSuccessfully) {
      setFormData({
        ...initialFormData,
      });
    }
  };

  return (
    <Form className="product-form" onSubmit={handleSubmit}>
      {validationError && (
        <Alert variant="warning">
          {validationError}
        </Alert>
      )}

      <Row className="g-4">
        <Col lg={8}>
          <Form.Group className="mb-3">
            <Form.Label className="product-form-label">
              Product Name
            </Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={name}
              placeholder="Example: ASUS Vivobook 15"
              onChange={handleChange}
              disabled={submitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="product-form-label">
              Description
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={description}
              placeholder="Enter processor, RAM, SSD, display..."
              onChange={handleChange}
              disabled={submitting}
            />
          </Form.Group>

          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="product-form-label">
                  Original Price
                </Form.Label>

                <Form.Control
                  type="number"
                  min="1"
                  name="price"
                  value={price}
                  placeholder="Example: 25000000"
                  onChange={handleChange}
                  disabled={submitting}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="product-form-label">
                  Current Price
                </Form.Label>

                <Form.Control
                  type="number"
                  min="1"
                  name="currentPrice"
                  value={currentPrice}
                  placeholder="Example: 21990000"
                  onChange={handleChange}
                  disabled={submitting}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mt-3">
            <Form.Label className="product-form-label">
              Product Image
            </Form.Label>

            <Form.Select
              name="image"
              value={image}
              onChange={handleChange}
              disabled={submitting}
            >
              {imageOptions.map((imagePath, index) => (
                <option value={imagePath} key={imagePath}>
                  Laptop image {index + 1}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col lg={4}>
          <div className="product-form-preview">
            <p className="preview-label">Image Preview</p>

            <img
              src={image}
              alt="Selected laptop preview"
              className="product-form-preview-image"
            />

            <p className="preview-product-name">
              {name || "New laptop product"}
            </p>
          </div>
        </Col>
      </Row>

      <div className="product-form-actions">
        <Button
          type="submit"
          className="add-product-button"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
              />
              Adding Product...
            </>
          ) : (
            <>＋ Add Product</>
          )}
        </Button>
      </div>
    </Form>
  );
}

export default ProductForm;