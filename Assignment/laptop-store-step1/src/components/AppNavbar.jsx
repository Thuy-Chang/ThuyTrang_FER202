import { useState } from "react";

import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";

import {
  NavLink,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import FavoritesOffcanvas from "./FavoritesOffcanvas";

function AppNavbar() {
  const location = useLocation();

  const [showFavorites, setShowFavorites] =
    useState(false);

  const favoriteCount = useSelector(
    (state) => state.favorites.items.length
  );

  const getNavClass = ({ isActive }) =>
    `app-nav-link ${isActive ? "active" : ""}`;

  const isProductRoute =
    location.pathname.startsWith("/feature");

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        data-bs-theme="dark"
        className="app-navbar"
      >
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="app-brand"
          >
            <span className="brand-icon">
              💻
            </span>

            Laptop Store
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar"
          />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              <NavLink
                className={getNavClass}
                to="/"
                end
              >
                Home
              </NavLink>

              <NavLink
                className={`app-nav-link ${
                  isProductRoute ? "active" : ""
                }`}
                to="/feature"
              >
                Products
              </NavLink>

              <NavLink
                className={getNavClass}
                to="/about"
              >
                About
              </NavLink>

              <Button
                type="button"
                className="favorite-counter"
                onClick={() =>
                  setShowFavorites(true)
                }
                aria-label={`Open ${favoriteCount} favorite products`}
              >
                <span className="favorite-heart">
                  ♥
                </span>

                <span>Favorites</span>

                <Badge
                  pill
                  bg="warning"
                  text="dark"
                >
                  {favoriteCount}
                </Badge>
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FavoritesOffcanvas
        show={showFavorites}
        onHide={() => setShowFavorites(false)}
      />
    </>
  );
}

export default AppNavbar;