import {
  Badge,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";

const learningOutcomes = [
  {
    code: "LO1",
    title: "Project Setup and Git",
    description:
      "The application was created with Create React App and uses Git for version control with at least five meaningful commits.",
  },
  {
    code: "LO2",
    title: "Reusable Components",
    description:
      "Product data is displayed through both Functional and Class components using reusable props.",
  },
  {
    code: "LO3",
    title: "JSX and ES6",
    description:
      "The project uses JSX, arrow functions, destructuring, template literals, spread syntax, map, filter and conditional rendering.",
  },
  {
    code: "LO4",
    title: "Bootstrap and Custom CSS",
    description:
      "React-Bootstrap is used for navigation, cards, forms, grids, alerts, buttons and responsive layouts, together with customized CSS.",
  },
  {
    code: "LO5",
    title: "React Router",
    description:
      "The application provides Home, Main Feature, About, Product Detail, Edit Product and Not Found routes.",
  },
  {
    code: "LO6",
    title: "State, Effects and Events",
    description:
      "useState and useEffect manage forms, product data, loading, errors, search and interactive button events.",
  },
  {
    code: "LO7",
    title: "API and Lazy Loading",
    description:
      "The application fetches local REST API data and external public API data with loading and error states. Feature pages use React.lazy and Suspense.",
  },
  {
    code: "LO8",
    title: "Redux Global State",
    description:
      "Redux Toolkit manages favorite products globally and displays the selected-product count in the navigation bar.",
  },
];

const technologies = [
  "ReactJS",
  "Create React App",
  "React Router DOM",
  "React Bootstrap",
  "Redux Toolkit",
  "JSON Server",
  "DummyJSON Public API",
  "JavaScript ES6",
  "Custom CSS",
  "Git",
];

function About() {
  return (
    <main className="about-page">
      <Container>
        <section className="about-hero">
          <Badge bg="primary" className="about-course-badge">
            FER202 React Assignment
          </Badge>

          <h1>Custom React Web Application</h1>

          <p>
            Laptop Store Management is a full-stack-style React
            application for browsing, creating, updating, deleting
            and managing laptop products through REST APIs.
          </p>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              APPLICATION CONCEPT
            </p>

            <h2>Project Overview</h2>
          </div>

          <Row className="g-4">
            <Col lg={7}>
              <Card className="about-information-card h-100">
                <Card.Body>
                  <h3>Laptop Store Management</h3>

                  <p>
                    The application provides a modern interface for
                    managing laptop products. Users can view product
                    information, search products, add new products,
                    edit product details, delete products and manage
                    favorite selections.
                  </p>

                  <p>
                    Local product data is stored through JSON Server,
                    while external laptop recommendations are fetched
                    from a public REST API.
                  </p>

                  <p className="mb-0">
                    The project demonstrates reusable components,
                    React Hooks, React Router, Redux Toolkit, API
                    integration, lazy loading, validation and
                    responsive interface design.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="about-information-card h-100">
                <Card.Body>
                  <h3>Application Features</h3>

                  <ul className="about-feature-list">
                    <li>Display laptop products from a REST API</li>
                    <li>Add, edit and delete products</li>
                    <li>View detailed product information</li>
                    <li>Search products dynamically</li>
                    <li>Manage favorites with Redux Toolkit</li>
                    <li>Load recommendations from a public API</li>
                    <li>Handle loading, empty and error states</li>
                    <li>Support responsive desktop and mobile views</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="about-section">
          <div className="about-section-heading">
            <p className="section-eyebrow">
              COURSE REQUIREMENTS
            </p>

            <h2>Learning Outcomes LO1–LO8</h2>

            <p>
              Each learning outcome is demonstrated through an
              identifiable part of the application.
            </p>
          </div>

          <Row xs={1} md={2} xl={4} className="g-4">
            {learningOutcomes.map(
              ({ code, title, description }) => (
                <Col key={code}>
                  <Card className="lo-card h-100">
                    <Card.Body>
                      <span className="lo-code">
                        {code}
                      </span>

                      <h3>{title}</h3>

                      <p>{description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </section>

        <section className="about-section">
          <Row className="g-4">
            <Col lg={6}>
              <Card className="about-information-card h-100">
                <Card.Body>
                  <p className="section-eyebrow">
                    TECHNOLOGY STACK
                  </p>

                  <h2>Tools and Libraries</h2>

                  <div className="technology-list">
                    {technologies.map((technology) => (
                      <Badge
                        bg="light"
                        text="dark"
                        className="technology-badge"
                        key={technology}
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="about-information-card h-100">
                <Card.Body>
                  <p className="section-eyebrow">
                    RESOURCE TRANSPARENCY
                  </p>

                  <h2>External Resources</h2>

                  <p>
                    React, React Router, Redux Toolkit and
                    React-Bootstrap documentation were consulted
                    during development.
                  </p>

                  <p>
                    DummyJSON is used as the external public product
                    API. JSON Server is used as the local REST API for
                    persistent CRUD operations during development.
                  </p>

                  <p className="mb-0">
                    Laptop images were provided with the assignment
                    materials. AI assistance may be used for
                    explanations, debugging and code review. All code
                    must be understood, tested and explained by the
                    submitting student or team.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <section className="about-section">
          <Card className="about-information-card">
            <Card.Body>
              <p className="section-eyebrow">
                CONTRIBUTIONS
              </p>

              <h2>Student or Team Contribution</h2>

              <p>
                Replace the following information before submission:
              </p>

              <div className="contribution-placeholder">
                <strong>Student name:</strong> Huynh Thi Thuy Trang
              </div>

              <div className="contribution-placeholder">
                <strong>Student ID:</strong> DE190387
              </div>

              <div className="contribution-placeholder">
                <strong>Contribution:</strong> Project setup,
                component development, routing, API integration,
                Redux state management, styling, testing and
                documentation.
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </main>
  );
}

export default About;