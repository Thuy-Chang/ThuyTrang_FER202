import { Spinner } from "react-bootstrap";

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading-box" role="status" aria-live="polite">
      <Spinner animation="border" />
      <span>{message}</span>
    </div>
  );
}

export default LoadingSpinner;
