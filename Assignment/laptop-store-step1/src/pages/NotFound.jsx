import {
  Button,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <Container>
        <div className="not-found-content">
          <span className="not-found-code">
            404
          </span>

          <h1>Page Not Found</h1>

          <p>
            The page you requested does not exist or may
            have been moved.
          </p>

          <div className="not-found-actions">
            <Button
              as={Link}
              to="/"
              variant="outline-primary"
            >
              Back Home
            </Button>

            <Button
              as={Link}
              to="/feature"
              className="not-found-products-button"
            >
              View Products
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default NotFound;