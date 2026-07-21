import { Link } from 'react-router-dom';

function ProductCard({ product, onDelete }) {
  return (
    <div className="card product-card h-100 border-0 shadow-sm">
      <div className="product-image-wrapper">
        <img
          src={`/Images/${product.image}`}
          className="card-img-top product-image"
          alt={product.name}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title product-title">{product.name}</h5>
        <p className="card-text text-muted product-description">{product.description}</p>
        <div className="mt-auto">
          <div className="d-flex align-items-center gap-2 flex-wrap mb-3">
            <span className="old-price">{product.price}đ</span>
            <span className="current-price">{product.currentPrice}đ</span>
          </div>
          <div className="d-grid gap-2 d-md-flex">
            <Link className="btn btn-primary flex-fill" to={`/products/${product.id}`}>
              Detail
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger flex-fill"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
