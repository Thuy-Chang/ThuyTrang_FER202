import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";

const EXTERNAL_LAPTOP_API =
  "https://dummyjson.com/products/category/laptops";

const formatUSD = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));

function ExternalLaptopSection() {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchExternalLaptops = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(EXTERNAL_LAPTOP_API, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `External API request failed with status ${response.status}`
          );
        }

        const data = await response.json();

        const externalProducts = Array.isArray(data.products)
          ? data.products.slice(0, 4)
          : [];

        setLaptops(externalProducts);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            "Unable to load external laptop recommendations. Please check your internet connection."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchExternalLaptops();

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <section className="external-laptop-panel">
      <div className="external-section-header">
        <div>
          <div className="external-title-line">
            <p className="section-eyebrow mb-0">
              EXTERNAL DATA SOURCE
            </p>

            <Badge bg="success" className="external-api-badge">
              Public API
            </Badge>
          </div>

          <h2>External Laptop Recommendations</h2>

          <p>
            These laptop products are loaded from the DummyJSON
            public REST API and are separate from the locally
            managed product list.
          </p>
        </div>

        {!loading && (
          <Button
            type="button"
            variant="outline-primary"
            className="refresh-external-button"
            onClick={() =>
              setReloadKey((previousKey) => previousKey + 1)
            }
          >
            ↻ Refresh API
          </Button>
        )}
      </div>

      {loading && (
        <div className="external-loading">
          <Spinner animation="border" />

          <div>
            <strong>Connecting to public API...</strong>
            <span>Loading external laptop data</span>
          </div>
        </div>
      )}

      {!loading && error && (
        <Alert variant="warning" className="external-api-alert">
          <Alert.Heading>
            External API is unavailable
          </Alert.Heading>

          <p>{error}</p>

          <Button
            type="button"
            variant="outline-warning"
            onClick={() =>
              setReloadKey((previousKey) => previousKey + 1)
            }
          >
            Try Again
          </Button>
        </Alert>
      )}

      {!loading && !error && laptops.length === 0 && (
        <Alert variant="info">
          The public API returned no laptop products.
        </Alert>
      )}

      {!loading && !error && laptops.length > 0 && (
        <Row xs={1} md={2} xl={4} className="g-4">
          {laptops.map(
            ({
              id,
              title,
              description,
              price,
              thumbnail,
              brand,
              rating,
              stock,
            }) => (
              <Col key={id}>
                <Card className="external-laptop-card h-100">
                  <div className="external-image-wrapper">
                    <Badge
                      bg="success"
                      className="external-source-label"
                    >
                      External API
                    </Badge>

                    <Card.Img
                      src={thumbnail}
                      alt={title}
                      className="external-laptop-image"
                    />
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="external-product-meta">
                      <span>{brand || "Laptop"}</span>
                      <span>★ {rating}</span>
                    </div>

                    <Card.Title className="external-product-title">
                      {title}
                    </Card.Title>

                    <Card.Text className="external-product-description">
                      {description}
                    </Card.Text>

                    <div className="external-product-footer mt-auto">
                      <strong>{formatUSD(price)}</strong>

                      <span>
                        {stock > 0
                          ? `${stock} available`
                          : "Out of stock"}
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      )}
    </section>
  );
}

export default ExternalLaptopSection;