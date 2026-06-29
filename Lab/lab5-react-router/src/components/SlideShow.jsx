import Carousel from 'react-bootstrap/Carousel';

function SlideShow() {
  return (
    <Carousel className="home-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100 slide-img"
          src="/images/slide1.jpg"
          alt="Slide 1"
        />
        <Carousel.Caption>
          <h1>Welcome to Online Quiz App</h1>
          <p>Learn React Router by building a multi-page React application.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 slide-img"
          src="/images/slide2.jpg"
          alt="Slide 2"
        />
        <Carousel.Caption>
          <h1>Read Latest News</h1>
          <p>Display news data from a JavaScript array.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 slide-img"
          src="/images/slide3.jpg"
          alt="Slide 3"
        />
        <Carousel.Caption>
          <h1>Test Your Knowledge</h1>
          <p>Answer quiz questions and check your final score.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;