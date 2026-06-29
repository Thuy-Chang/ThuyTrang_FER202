import { Link } from 'react-router-dom';
import SlideShow from '../components/SlideShow';

function Home() {
  return (
    <main>
      <SlideShow />

      <section className="home-intro container">
        <p className="section-label">React Router Lab 5</p>

        <h2>Build an Online Quiz Application</h2>

        <p>
          This project demonstrates how to use React Router to create multiple
          pages in a ReactJS application. The system includes Home, News, About,
          Contact, and Quiz pages. Users can view news, answer quiz questions,
          and submit contact information through a React Bootstrap form.
        </p>

        <div className="home-buttons">
          <Link to="/news" className="btn btn-primary">
            View News
          </Link>

          <Link to="/quiz" className="btn btn-success">
            Start Quiz
          </Link>
        </div>
      </section>

      <section className="feature-section container">
        <Link to="/" className="feature-card feature-link">
          <h3>Home Page</h3>
          <p>Displays a slide show introducing the application.</p>
        </Link>

        <Link to="/news" className="feature-card feature-link">
          <h3>News Page</h3>
          <p>Displays news items using an array data structure.</p>
        </Link>

        <Link to="/quiz" className="feature-card feature-link">
          <h3>Quiz Page</h3>
          <p>Displays questions and options for users to answer.</p>
        </Link>

        <Link to="/contact" className="feature-card feature-link">
          <h3>Contact Page</h3>
          <p>Displays a contact form using React Bootstrap components.</p>
        </Link>
      </section>
    </main>
  );
}

export default Home;