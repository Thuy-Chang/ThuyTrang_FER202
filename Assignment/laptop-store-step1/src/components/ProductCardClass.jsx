import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";

import { Link } from "react-router-dom";

class ProductCardClass extends Component {
  formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);

  render() {
    const {
      product,
      onFavorite,
      onDelete,
      isDeleting,
    } = this.props;

    const {
      id,
      name,
      description,
      price,
      currentPrice,
      image,
    } = product;

    const discount =
      price > 0
        ? Math.round(
            ((price - currentPrice) / price) * 100
          )
        : 0;

    return (
      <Card className="product-card h-100 shadow-sm">
        <div className="product-image-wrapper">
          <Card.Img
            src={image}
            alt={name}
            className="product-image"
          />
        </div>

        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <Badge bg="danger">-{discount}%</Badge>

            <Badge bg="info" text="dark" className="ms-2">
              Class
            </Badge>
          </div>

          <Card.Title className="product-title">
            {name}
          </Card.Title>

          <Card.Text className="product-description">
            {description}
          </Card.Text>

          <div className="mt-auto">
            <div className="old-price">
              {this.formatCurrency(price)}
            </div>

            <div className="current-price">
              {this.formatCurrency(currentPrice)}
            </div>

            <div className="product-card-actions">
              <Button
                as={Link}
                to={`/feature/${id}`}
                variant="outline-primary"
                className="view-product-button"
              >
                View Details
              </Button>

              <Button
                as={Link}
                to={`/feature/${id}/edit`}
                variant="warning"
                className="edit-product-button"
              >
                Edit
              </Button>

              <Button
                className="favorite-product-button"
                onClick={() => onFavorite(product)}
              >
                ♡ Favorite
              </Button>

              <Button
                variant="outline-danger"
                onClick={() => onDelete(id, name)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ProductCardClass;