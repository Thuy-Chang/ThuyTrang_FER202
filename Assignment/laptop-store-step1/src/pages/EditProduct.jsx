import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

const PRODUCTS_API = "http://localhost:3001/products";

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

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalProduct, setOriginalProduct] =
    useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "/images/laptop1.png",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [fetchError, setFetchError] = useState("");
  const [validationError, setValidationError] =
    useState("");
  const [updateError, setUpdateError] =
    useState("");

  const {
    name,
    description,
    price,
    currentPrice,
    image,
  } = formData;

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(
          `${PRODUCTS_API}/${id}`,
          {
            signal: controller.signal,
          }
        );

        if (response.status === 404) {
          throw new Error("Product not found.");
        }

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        setOriginalProduct(data);

        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          currentPrice: data.currentPrice || "",
          image:
            data.image || "/images/laptop1.png",
        });
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setFetchError(
            requestError.message ||
              "Unable to load product."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  const handleChange = (event) => {
    const { name: fieldName, value } =
      event.target;

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

    if (
      !currentPrice ||
      Number(currentPrice) <= 0
    ) {
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
    setUpdateError("");

    const updatedProduct = {
      ...originalProduct,
      id: originalProduct.id,
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      currentPrice: Number(currentPrice),
      image,
    };

    try {
      setSubmitting(true);

      const response = await fetch(
        `${PRODUCTS_API}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      await response.json();

      navigate(`/feature/${id}`, {
        state: {
          updated: true,
        },
        replace: true,
      });
    } catch (requestError) {
      setUpdateError(
        "Unable to update product. Please check the API server and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="edit-product-page">
        <Container>
          <div className="detail-loading">
            <Spinner animation="border" />
            <span>Loading product information...</span>
          </div>
        </Container>
      </main>
    );
  }

  if (fetchError) {
    return (
      <main className="edit-product-page">
        <Container>
          <Alert variant="danger">
            <Alert.Heading>
              Unable to edit product
            </Alert.Heading>

            <p>{fetchError}</p>

            <Button
              variant="outline-danger"
              onClick={() => navigate("/feature")}
            >
              Back to Products
            </Button>
          </Alert>
        </Container>
      </main>
    );
  }

  return (
    <main className="edit-product-page">
      <Container>
        <section className="edit-product-card">
          <div className="edit-product-heading">
            <p className="section-eyebrow">
              PRODUCT MANAGEMENT
            </p>

            <h1>Edit Product</h1>

            <p>
              Update the laptop information and save
              changes to the REST API.
            </p>
          </div>

          {validationError && (
            <Alert variant="warning">
              {validationError}
            </Alert>
          )}

          {updateError && (
            <Alert variant="danger">
              {updateError}
            </Alert>
          )}

          <Form
            className="edit-product-form"
            onSubmit={handleSubmit}
          >
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
                    rows={5}
                    name="description"
                    value={description}
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
                    {imageOptions.map(
                      (imagePath, index) => (
                        <option
                          value={imagePath}
                          key={imagePath}
                        >
                          Laptop image {index + 1}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col lg={4}>
                <div className="edit-image-preview">
                  <p>Product Preview</p>

                  <img
                    src={image}
                    alt={name || "Laptop preview"}
                  />

                  <strong>
                    {name || "Laptop product"}
                  </strong>
                </div>
              </Col>
            </Row>

            <div className="edit-product-actions">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() =>
                  navigate(`/feature/${id}`)
                }
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="save-product-button"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </Form>
        </section>
      </Container>
    </main>
  );
}

export default EditProduct;