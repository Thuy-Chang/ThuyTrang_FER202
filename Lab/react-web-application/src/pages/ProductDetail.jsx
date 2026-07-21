import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setError('');
      } catch (err) {
        setError('Cannot load product detail.');
      }
    };

    loadProductDetail();
  }, [id]);

  const convertPriceToNumber = (price) => {
    return Number(String(price).replace(/\./g, '')) || 0;
  };

  const calculateDiscount = () => {
    if (!product) return 0;

    const oldPrice = convertPriceToNumber(product.price);
    const currentPrice = convertPriceToNumber(product.currentPrice);

    if (oldPrice === 0 || currentPrice === 0) return 0;

    return Math.round(((oldPrice - currentPrice) / oldPrice) * 100);
  };

  if (error) {
    return (
      <div className="detail-wrapper">
        <div className="detail-box">
          <h2>{error}</h2>

          <Link to="/products" className="btn btn-primary btn-sm">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return <h3 className="text-center mt-4">Loading...</h3>;
  }

  return (
    <div className="detail-wrapper">
      <div className="detail-box">
        <h2 className="detail-title">{product.name}</h2>

        <div className="detail-image-area">
          <img
            src={`/Images/${product.image}`}
            alt={product.name}
            className="detail-img"
          />
        </div>

        <p className="detail-description">{product.description}</p>

        <p className="detail-price">Price: {product.price} đ</p>

        <p className="detail-price">Current Price: {product.currentPrice} đ</p>

        <p className="detail-price">Discount: {calculateDiscount()} %</p>

        <div className="detail-actions">
          <Link to="/products" className="btn btn-primary btn-sm me-2">
            Back Home
          </Link>

          <Link
            to={`/products/${product.id}/edit`}
            className="btn btn-danger btn-sm"
          >
            Edit
          </Link>
        </div>
      </div>

      <p className="detail-caption">Giao diện trang chi tiết sản phẩm</p>
    </div>
  );
}

export default ProductDetail;