import {
  lazy,
  Suspense,
} from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import LoadingSpinner from "./components/LoadingSpinner";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const ProductList = lazy(() =>
  import("./pages/ProductList")
);

const ProductDetail = lazy(() =>
  import("./pages/ProductDetail")
);

const EditProduct = lazy(() =>
  import("./pages/EditProduct")
);

function App() {
  return (
    <>
      <AppNavbar />

      <Suspense
        fallback={
          <LoadingSpinner message="Loading page..." />
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/feature"
            element={<ProductList />}
          />

          <Route
            path="/feature/:id"
            element={<ProductDetail />}
          />

          <Route
            path="/feature/:id/edit"
            element={<EditProduct />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;