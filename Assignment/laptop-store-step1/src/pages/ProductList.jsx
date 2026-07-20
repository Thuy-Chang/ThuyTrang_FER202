import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import ExternalLaptopSection from "../components/ExternalLaptopSection";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCardClass from "../components/ProductCardClass";
import ProductCardFunctional from "../components/ProductCardFunctional";
import ProductForm from "../components/ProductForm";

import {
  addFavorite,
  removeFavorite,
} from "../features/favorites/favoritesSlice";

const PRODUCTS_API = "http://localhost:3001/products";

function ProductList() {
  const dispatch = useDispatch();

  const favoriteProducts = useSelector(
  (state) => state.favorites.items
  );

  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setFetchError("");

        const response = await fetch(PRODUCTS_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setFetchError(
            "Unable to load products. Make sure JSON Server is running on port 3001."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedKeyword = keyword
      .trim()
      .toLowerCase();

    return products.filter(({ name, description }) =>
      `${name} ${description}`
        .toLowerCase()
        .includes(normalizedKeyword)
    );
  }, [keyword, products]);

  const handleAddProduct = async (newProduct) => {
    try {
      setSubmitting(true);
      setFeedback(null);

      const response = await fetch(PRODUCTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const createdProduct = await response.json();

      setProducts((previousProducts) => [
        createdProduct,
        ...previousProducts,
      ]);

      setFeedback({
        type: "success",
        message: `${createdProduct.name} was added successfully.`,
      });

      return true;
    } catch (requestError) {
      setFeedback({
        type: "danger",
        message:
          "Unable to add product. Please check the API server.",
      });

      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (
    productId,
    productName
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(productId);
      setFeedback(null);

      const response = await fetch(
        `${PRODUCTS_API}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product.id !== productId
        )
      );

      dispatch(removeFavorite(productId));

      setFeedback({
        type: "success",
        message: `${productName} was deleted successfully.`,
      });
    } catch (requestError) {
      setFeedback({
        type: "danger",
        message:
          "Unable to delete product. Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleFavorite = (product) => {
    const alreadyExists = favoriteProducts.some(
      (favoriteProduct) =>
        String(favoriteProduct.id) ===
        String(product.id)
    );

    if (alreadyExists) {
      setFeedback({
        type: "warning",
        message: `${product.name} is already in favorites.`,
      });

      return;
    }

    dispatch(addFavorite(product));

    setFeedback({
      type: "info",
      message: `${product.name} was added to favorites.`,
    });
  };

  return (
    <main className="products-page">
      <Container>
        <section className="product-form-panel">
          <div className="section-heading">
            <p className="section-eyebrow">
              PRODUCT MANAGEMENT
            </p>

            <h1>Add New Product</h1>

            <p>
              Enter the laptop information and save it
              directly to the REST API.
            </p>
          </div>

          <ProductForm
            onAdd={handleAddProduct}
            submitting={submitting}
          />
        </section>

        {feedback && (
          <Alert
            variant={feedback.type}
            dismissible
            onClose={() => setFeedback(null)}
            className="product-feedback"
          >
            {feedback.message}
          </Alert>
        )}

        <section className="product-list-panel">
          <div className="product-list-header">
            <div>
              <p className="section-eyebrow">
                AVAILABLE PRODUCTS
              </p>

              <h2>Product List</h2>

              <p className="product-result-count">
                Showing {filteredProducts.length} of{" "}
                {products.length} products
              </p>
            </div>

            <Form.Control
              className="product-search"
              type="search"
              placeholder="Search laptops..."
              value={keyword}
              onChange={(event) =>
                setKeyword(event.target.value)
              }
            />
          </div>

          {loading && (
            <LoadingSpinner message="Loading products..." />
          )}

          {!loading && fetchError && (
            <Alert variant="danger">
              {fetchError}
            </Alert>
          )}

          {!loading &&
            !fetchError &&
            filteredProducts.length === 0 && (
              <Alert variant="info">
                No products found.
              </Alert>
            )}

          {!loading &&
            !fetchError &&
            filteredProducts.length > 0 && (
              <Row
                xs={1}
                md={2}
                lg={3}
                xl={4}
                className="g-4"
              >
                {filteredProducts.map(
                  (product, index) => (
                    <Col key={product.id}>
                      {index === 0 ? (
                        <ProductCardClass
                          product={product}
                          onFavorite={handleFavorite}
                          onDelete={handleDeleteProduct}
                          isDeleting={
                            deletingId === product.id
                          }
                        />
                      ) : (
                        <ProductCardFunctional
                          product={product}
                          onFavorite={handleFavorite}
                          onDelete={handleDeleteProduct}
                          isDeleting={
                            deletingId === product.id
                          }
                        />
                      )}
                    </Col>
                  )
                )}
              </Row>
            )}
        </section>

        <ExternalLaptopSection />
      </Container>
    </main>
  );
}

export default ProductList;