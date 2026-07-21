import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-section">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <p className="text-uppercase fw-bold text-primary mb-2">Laptop Product Management</p>
            <h1 className="display-5 fw-bold mb-3">Welcome to Laptop Store Server</h1>
            <div className="home-description">
                <p>
                  Discover, manage, and update laptop products easily through a modern ReactJS application.
                  This system connects directly to a REST API server to display product data,
                  manage product information, and provide a simple shopping-style interface for users.
                </p>

                <p>
                  Laptop Store allows users to explore different laptop products, view detailed specifications,
                  compare original and current prices, check discount information, add new products,
                  delete existing products, and edit product details in real time.
                </p>

                <p>
                  Start your experience with Laptop Store and manage products faster, cleaner,
                  and more efficiently.
                </p>
            </div>
            <Link className="btn btn-primary btn-lg" to="/products">
              View Products
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="home-hero-gallery">
  <div className="gallery-item">
    <img src="/Images/laptop1.png" alt="Laptop 1" />
  </div>

  <div className="gallery-item">
    <img src="/Images/laptop10.png" alt="Laptop 10" />
  </div>

  <div className="gallery-item">
    <img src="/Images/laptop3.png" alt="Laptop 3" />
  </div>

  <div className="gallery-item">
    <img src="/Images/laptop6.png" alt="Laptop 6" />
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
