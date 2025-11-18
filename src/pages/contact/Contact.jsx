import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
} from "react-bootstrap";

const Icon = ({ name, size = 20 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "currentColor",
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M3.654 1.328a.678.678 0 0 1 .746-.098l2.522 1.26a.678.678 0 0 1 .316.895l-1.01 2.434a.678.678 0 0 1-.58.39l-.885.044a10.05 10.05 0 0 0 4.516 4.516l.044-.885a.678.678 0 0 1 .39-.58l2.434-1.01a.678.678 0 0 1 .895.316l1.26 2.522a.678.678 0 0 1-.098.746l-1.2 1.6A1.5 1.5 0 0 1 13.9 16C6.302 16 0 9.698 0 2.1A1.5 1.5 0 0 1 1.128.528l1.6-1.2z" />
        </svg>
      );

    case "chat":
      return (
        <svg {...common}>
          <path d="M2 2h12v8H5.414L2 13.414V2z" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <path d="M8 3.5a.5.5 0 0 1 .5.5v4l2.25 1.35a.5.5 0 1 1-.5.866L7.5 8.5V4a.5.5 0 0 1 .5-.5z" />
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" />
        </svg>
      );
  }
};

const Contact = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Container>
        <Row className="text-center mb-4">
          <Col>
            <h1 style={{ fontWeight: 900 }}>Contact Sales</h1>
            <p style={{ opacity: 0.7 }}>
              Speak with a product specialist to see how MySpend can help you
              manage expenses smarter.
            </p>
          </Col>
        </Row>

        {/* TOP 3 CARDS */}
        <Row className="g-3 mb-4">
          <Col md={4}>
            <Card style={{ borderRadius: 12 }}>
              <Card.Body>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "var(--blue)" }}>
                    <Icon name="phone" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0 }}>Talk to Sales</h5>
                    <p style={{ margin: "6px 0", opacity: 0.7 }}>
                      Get details on pricing and setup.
                    </p>
                    <a style={{ color: "var(--pink)", fontWeight: 700 }}>
                      Get in touch →
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ borderRadius: 12 }}>
              <Card.Body>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "var(--blue)" }}>
                    <Icon name="chat" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0 }}>Customer Support</h5>
                    <p style={{ margin: "6px 0", opacity: 0.7 }}>
                      Help for existing customers.
                    </p>
                    <a style={{ color: "var(--pink)", fontWeight: 700 }}>
                      Contact support →
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ borderRadius: 12 }}>
              <Card.Body>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "var(--blue)" }}>
                    <Icon name="clock" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0 }}>Partners</h5>
                    <p style={{ margin: "6px 0", opacity: 0.7 }}>
                      Collaborate with MySpend.
                    </p>
                    <a style={{ color: "var(--pink)", fontWeight: 700 }}>
                      Learn more →
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FORM + RIGHT CARD */}
        <Row className="g-4">
          {/* LEFT FORM */}
          <Col lg={7}>
            <Card style={{ borderRadius: 12 }}>
              <Card.Body>
                <h3 style={{ fontWeight: 800 }}>Let's talk</h3>
                <p style={{ opacity: 0.7, marginTop: -4 }}>
                  Tell us about you and we’ll reach out.
                </p>

                <Form className="mt-3">
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control placeholder="Enter your name" />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control placeholder="name@example.com" />
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select>
                          <option>General Query</option>
                          <option>Support / Help</option>
                          <option>Complaint</option>
                          <option>Business Inquiry</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={12}>
                      <Form.Group>
                        <Form.Label>Your Message</Form.Label>
                        <Form.Control as="textarea" rows={4} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    style={{
                      background: "var(--pink)",
                      border: "none",
                      marginTop: 16,
                      padding: "10px 18px",
                      fontWeight: 700,
                    }}
                  >
                    Contact Sales
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT STICKY CARD */}
          <Col lg={5}>
            <div style={{ position: "sticky", top: 20 }}>
              <Card
                style={{
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <h5 style={{ fontWeight: 800 }}>Need help now?</h5>
                <p style={{ opacity: 0.8 }}>
                  Our team is available Monday–Friday to assist you.
                </p>

                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <div style={{ color: "var(--blue)" }}>
                    <Icon name="phone" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Call Sales</div>
                    <div style={{ color: "var(--pink)" }}>
                      +91 98765 43210
                    </div>
                  </div>
                </div>

                <hr style={{ opacity: 0.15 }} />

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ color: "var(--blue)" }}>
                    <Icon name="chat" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Chat</div>
                    <div style={{ opacity: 0.7 }}>
                      Start a quick chat with our team.
                    </div>
                  </div>
                </div>

                <hr style={{ opacity: 0.15 }} />

                <div>
                  <div style={{ fontWeight: 700 }}>Office</div>
                  <div style={{ opacity: 0.7 }}>
                    2093 Jaipur Road, Rajasthan, India
                  </div>
                </div>
              </Card>

              <p style={{ opacity: 0.6, marginTop: 12, fontSize: 13 }}>
                By submitting, you agree to be contacted by MySpend.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
