import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const About = () => {
  const theme = useSelector((state) => state.theme.mode);

  const cardStyles = {
    borderLeft: "5px solid var(--green)",
    borderRadius: "14px",
    background: theme === "dark" ? "var(--dark)" : "var(--light)",
    color: theme === "dark" ? "var(--light)" : "var(--dark)",
  };

  const missionCardStyles = {
    borderLeft: "6px solid var(--pink)",
    borderRadius: "14px",
    background: theme === "dark" ? "var(--dark)" : "var(--light)",
    color: theme === "dark" ? "var(--light)" : "var(--dark)",
  };

  return (
    <>
      {/* HERO SECTION */}
      <Container
        fluid
        className="py-5 text-center"
        style={{
          background: "linear-gradient(135deg, var(--blue), var(--blue-light))",
          color: "var(--light)",
        }}
      >
        <h1 className="fw-bold display-4">About MySpend</h1>
        <p className="mt-3 fs-5">
          A smart and simple way to track your daily expenses.
        </p>
      </Container>

      {/* FEATURES */}
      <Container className="mt-5">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="fw-bold">Why Choose MySpend?</h2>
          </Col>
        </Row>

        <Row className="g-4">
          {/* CARD 1 */}
          <Col md={6} lg={3}>
            <Card className="shadow-sm h-100" style={cardStyles}>
              <Card.Body>
                <Card.Title>📊 Easy Tracking</Card.Title>
                <Card.Text>
                  Add, edit, or delete expenses effortlessly with a clean UI.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD 2 */}
          <Col md={6} lg={3}>
            <Card className="shadow-sm h-100" style={cardStyles}>
              <Card.Body>
                <Card.Title>💰 Smart Insights</Card.Title>
                <Card.Text>
                  Understand your spending and improve financial habits.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD 3 */}
          <Col md={6} lg={3}>
            <Card className="shadow-sm h-100" style={cardStyles}>
              <Card.Body>
                <Card.Title>☁️ Cloud Backup</Card.Title>
                <Card.Text>
                  Your data stays safe with real-time Firebase sync.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          {/* CARD 4 */}
          <Col md={6} lg={3}>
            <Card className="shadow-sm h-100" style={cardStyles}>
              <Card.Body>
                <Card.Title>⚡ Fast & Smooth</Card.Title>
                <Card.Text>
                  Optimized performance for a seamless experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* MISSION SECTION */}
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow-sm p-4" style={missionCardStyles}>
              <Card.Body>
                <h3 className="fw-bold mb-3">Our Mission</h3>
                <Card.Text className="fs-5" style={{ lineHeight: "1.7" }}>
                  At <strong>MySpend</strong>, our goal is to make money
                  management simple and stress-free. We help you build smarter
                  habits through clear tracking, easy editing, and meaningful
                  insights — without complexity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* QUOTE */}
      <Container className="text-center mt-5 mb-5">
        <p
          className="fs-5 fw-semibold"
          style={{ color: theme === "dark" ? "var(--green)" : "var(--blue)" }}
        >
          “Every rupee counts — track it, understand it, control it.”
        </p>
      </Container>
    </>
  );
};

export default About;
