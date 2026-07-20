import { useEffect, useState } from "react";
import {
    Alert,
    Badge,
    Button,
    Col,
    Container,
    Row,
    Spinner,
} from "react-bootstrap";
import {
    Link,
    useLocation,
    useParams,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { addFavorite } from "../features/favorites/favoritesSlice";

const PRODUCTS_API = "http://localhost:3001/products";

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(Number(value));

function ProductDetail() {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();

    const favoriteProducts = useSelector(
        (state) => state.favorites.items
    );

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const isFavorite = product
        ? favoriteProducts.some(
            (favoriteProduct) =>
                String(favoriteProduct.id) ===
                String(product.id)
            )
        : false;

    useEffect(() => {
        const controller = new AbortController();

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

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
                setProduct(data);
            } catch (requestError) {
                if (requestError.name !== "AbortError") {
                    setError(
                        requestError.message ||
                        "Unable to load product details."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <main className="product-detail-page">
                <Container>
                    <div className="detail-loading">
                        <Spinner animation="border" />
                        <span>Loading product details...</span>
                    </div>
                </Container>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="product-detail-page">
                <Container>
                    <Alert variant="danger">
                        <Alert.Heading>
                            Unable to display product
                        </Alert.Heading>

                        <p>{error || "Product not found."}</p>

                        <Button
                            as={Link}
                            to="/feature"
                            variant="outline-danger"
                        >
                            Back to Products
                        </Button>
                    </Alert>
                </Container>
            </main>
        );
    }

    const {
        name,
        description,
        price,
        currentPrice,
        image,
    } = product;

    const discount =
        Number(price) > 0
            ? Math.round(
                ((Number(price) - Number(currentPrice)) /
                    Number(price)) *
                100
            )
            : 0;

    const savedAmount =
        Number(price) - Number(currentPrice);

    const handleAddFavorite = () => {
        if (product && !isFavorite) {
            dispatch(addFavorite(product));
        }
    };

    return (
        <main className="product-detail-page">
            <Container>
                {location.state?.updated && (
                    <Alert
                        variant="success"
                        dismissible
                        className="detail-success-alert"
                    >
                        Product information was updated successfully.
                    </Alert>
                )}

                <section className="product-detail-card">
                    <Row className="align-items-center g-5">
                        <Col lg={5}>
                            <div className="detail-image-panel">
                                <Badge
                                    bg="danger"
                                    className="detail-discount-badge"
                                >
                                    Save {discount}%
                                </Badge>

                                <img
                                    src={image}
                                    alt={name}
                                    className="detail-product-image"
                                />
                            </div>
                        </Col>

                        <Col lg={7}>
                            <div className="detail-content">
                                <p className="detail-eyebrow">
                                    LAPTOP PRODUCT DETAILS
                                </p>

                                <h1 className="detail-title">
                                    {name}
                                </h1>

                                <p className="detail-description">
                                    {description}
                                </p>

                                <div className="detail-price-section">
                                    <span className="detail-old-price">
                                        {formatCurrency(price)}
                                    </span>

                                    <strong className="detail-current-price">
                                        {formatCurrency(currentPrice)}
                                    </strong>
                                </div>

                                <div className="detail-information-grid">
                                    <div className="detail-information-item">
                                        <span>Discount</span>
                                        <strong>{discount}%</strong>
                                    </div>

                                    <div className="detail-information-item">
                                        <span>You save</span>
                                        <strong>
                                            {formatCurrency(savedAmount)}
                                        </strong>
                                    </div>

                                    <div className="detail-information-item">
                                        <span>Product ID</span>
                                        <strong>#{id}</strong>
                                    </div>
                                </div>

                                <div className="detail-actions">
                                    <Button
                                        as={Link}
                                        to="/feature"
                                        variant="outline-secondary"
                                    >
                                        ← Back to Products
                                    </Button>

                                    <Button
                                        variant={
                                            isFavorite ? "success" : "outline-primary"
                                        }
                                        onClick={handleAddFavorite}
                                        disabled={isFavorite}
                                        >
                                        {isFavorite
                                            ? "✓ Added to Favorites"
                                            : "♡ Add to Favorites"}
                                    </Button>

                                    <Button
                                        as={Link}
                                        to={`/feature/${id}/edit`}
                                        className="detail-edit-button"
                                    >
                                        Edit Product
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
}

export default ProductDetail;