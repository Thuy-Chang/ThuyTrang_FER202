import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container page-section">
      <div className="not-found-box">
        <h1>404 - Page Not Found</h1>

        <p>The page you are looking for does not exist.</p>

        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;