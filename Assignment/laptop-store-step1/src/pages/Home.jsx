import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const previewProducts = [
  {
    id: 1,
    image: "/images/laptop1.png",
    name: "ASUS Zenbook",
  },
  {
    id: 2,
    image: "/images/laptop10.png",
    name: "Acer Swift",
  },
  {
    id: 3,
    image: "/images/laptop3.png",
    name: "Dell Vostro",
  },
  {
    id: 4,
    image: "/images/laptop6.png",
    name: "ASUS Vivobook",
  },
];

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <div className="hero-content">
                <p className="hero-eyebrow">
                  FER202 REACT APPLICATION
                </p>

                <h1 className="hero-title">
                  Welcome to
                  <span> Laptop Store</span>
                </h1>

                <p className="hero-description">
                  Discover and manage laptop products through a modern
                  ReactJS application connected to a REST API.
                </p>

                <p className="hero-description">
                  View product specifications, compare prices, manage
                  favorites, add new laptops, update information and
                  remove products easily.
                </p>

                <div className="hero-actions">
                  <Button
                    as={Link}
                    to="/feature"
                    size="lg"
                    className="hero-primary-button"
                  >
                    View Products
                  </Button>

                  <Button
                    as={Link}
                    to="/about"
                    size="lg"
                    variant="outline-primary"
                    className="hero-secondary-button"
                  >
                    Learn More
                  </Button>
                </div>

                <div className="hero-stat-list">
                  <div className="hero-stat">
                    <strong>10+</strong>
                    <span>Products</span>
                  </div>

                  <div className="hero-stat">
                    <strong>CRUD</strong>
                    <span>Management</span>
                  </div>

                  <div className="hero-stat">
                    <strong>Redux</strong>
                    <span>Global State</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <div className="laptop-showcase">
                <div className="showcase-decoration decoration-one" />
                <div className="showcase-decoration decoration-two" />

                <div className="laptop-grid">
                  {previewProducts.map(({ id, image, name }) => (
                    <div className="laptop-preview-card" key={id}>
                      <img src={image} alt={name} />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Home;