import {
  Badge,
  Button,
  Image,
  Offcanvas,
} from "react-bootstrap";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import {
  clearFavorites,
  removeFavorite,
} from "../features/favorites/favoritesSlice";

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Number(value));

function FavoritesOffcanvas({ show, onHide }) {
  const dispatch = useDispatch();

  const favoriteProducts = useSelector(
    (state) => state.favorites.items
  );

  const totalPrice = favoriteProducts.reduce(
    (total, product) =>
      total + Number(product.currentPrice || 0),
    0
  );

  const handleRemoveFavorite = (productId) => {
    dispatch(removeFavorite(productId));
  };

  const handleClearFavorites = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all favorite products?"
    );

    if (confirmed) {
      dispatch(clearFavorites());
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="favorites-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <span className="favorites-title-icon">
            ♥
          </span>

          Favorite Products

          <Badge
            bg="warning"
            text="dark"
            pill
            className="ms-2"
          >
            {favoriteProducts.length}
          </Badge>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {favoriteProducts.length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-favorites-icon">
              ♡
            </div>

            <h3>No favorite products</h3>

            <p>
              Add laptops to your favorites to review
              them later.
            </p>

            <Button
              as={Link}
              to="/feature"
              onClick={onHide}
              className="browse-products-button"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="favorite-product-list">
              {favoriteProducts.map((product) => {
                const {
                  id,
                  name,
                  image,
                  currentPrice,
                } = product;

                return (
                  <article
                    className="favorite-product-item"
                    key={id}
                  >
                    <div className="favorite-product-image-wrapper">
                      <Image
                        src={image}
                        alt={name}
                        className="favorite-product-image"
                      />
                    </div>

                    <div className="favorite-product-content">
                      <h3>{name}</h3>

                      <strong>
                        {formatCurrency(currentPrice)}
                      </strong>

                      <div className="favorite-item-actions">
                        <Button
                          as={Link}
                          to={`/feature/${id}`}
                          variant="outline-primary"
                          size="sm"
                          onClick={onHide}
                        >
                          View
                        </Button>

                        <Button
                          type="button"
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            handleRemoveFavorite(id)
                          }
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="favorites-summary">
              <div className="favorites-summary-row">
                <span>Selected products</span>

                <strong>
                  {favoriteProducts.length}
                </strong>
              </div>

              <div className="favorites-summary-row total-row">
                <span>Total value</span>

                <strong>
                  {formatCurrency(totalPrice)}
                </strong>
              </div>

              <Button
                as={Link}
                to="/feature"
                className="continue-shopping-button"
                onClick={onHide}
              >
                Continue Shopping
              </Button>

              <Button
                type="button"
                variant="outline-danger"
                className="clear-favorites-button"
                onClick={handleClearFavorites}
              >
                Clear All Favorites
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default FavoritesOffcanvas;