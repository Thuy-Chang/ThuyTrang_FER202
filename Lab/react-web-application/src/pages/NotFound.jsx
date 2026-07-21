import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-wrap">
      <div className="detail-box">
        <h1 className="detail-title">404 - Page Not Found</h1>

        <p className="detail-description">
          The page you are looking for does not exist.
        </p>

        <Link to="/products" className="btn btn-primary btn-sm">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default NotFound;