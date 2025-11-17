// ContactSales.jsx
import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

/**
 * Full Contact Sales style page (HubSpot-like)
 * - Uses Lato (assumed imported in root)
 * - Uses your CSS variables (--pink, --blue, etc.)
 * - No external CSS file; inline styles only
 * - Bootstrap-like icons implemented as small inline SVGs
 */

const Icon = ({ name, size = 18 }) => {
  // small set of inline SVGs resembling bootstrap icons
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "currentColor",
  };
  switch (name) {
    case "phone":
      return (
        <svg
          {...common}
          style={{ display: "inline-block", verticalAlign: "middle" }}
        >
          <path d="M3.654 1.328a.678.678 0 0 1 .746-.098l2.522 1.26a.678.678 0 0 1 .316.895l-1.01 2.434a.678.678 0 0 1-.58.39l-.885.044a10.05 10.05 0 0 0 4.516 4.516l.044-.885a.678.678 0 0 1 .39-.58l2.434-1.01a.678.678 0 0 1 .895.316l1.26 2.522a.678.678 0 0 1-.098.746l-1.2 1.6A1.5 1.5 0 0 1 13.9 16C6.302 16 0 9.698 0 2.1A1.5 1.5 0 0 1 1.128.528l1.6-1.2z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path d="M8 3.5a.5.5 0 0 1 .5.5v4l2.25 1.35a.5.5 0 1 1-.5.866L7.5 8.5V4a.5.5 0 0 1 .5-.5z" />
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M2 2h12v8H5.414L2 13.414V2z" />
        </svg>
      );
    case "chev-right":
      return (
        <svg {...common}>
          <path d="M6 3l4 5-4 5V3z" />
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

const ContactSales = () => {
  const sectionPad = { paddingTop: 48, paddingBottom: 48 };
  const containerStyle = {
    fontFamily: "var(--font-family)",
    color: "var(--dark)",
  };

  return (
    <div style={{ background: "var(--light)", minHeight: "100vh" }}>
      {/* HERO */}
      <Container
        fluid
        style={{
          ...sectionPad,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.0), var(--grey) 100%)",
        }}
      >
        <Container style={containerStyle}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1
                style={{ fontSize: 34, fontWeight: 900, color: "var(--dark)" }}
              >
                Contact Sales
              </h1>
              <p
                style={{
                  fontSize: 16,
                  marginTop: 12,
                  color: "rgba(0,0,0,0.7)",
                }}
              >
                Speak with a product specialist to see how MySpend can help
                manage your team's expenses and spend smarter.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* 3 FEATURE CARDS */}
      <Container style={{ marginTop: -20, marginBottom: 24 }}>
        <Row className="g-3 justify-content-center">
          <Col md={4}>
            <Card style={{ borderRadius: 10, height: "100%" }}>
              <Card.Body>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ fontSize: 22, color: "var(--blue)" }}>
                    <Icon name="phone" size={22} />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 700 }}>
                      Talk to Sales
                    </h5>
                    <p style={{ margin: "6px 0 0", color: "rgba(0,0,0,0.7)" }}>
                      Our team can walk you through product details, pricing,
                      and deployment.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <a
                    style={{
                      fontWeight: 700,
                      color: "var(--pink)",
                      textDecoration: "none",
                    }}
                  >
                    Get in touch <Icon name="chev-right" />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ borderRadius: 10 }}>
              <Card.Body>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ fontSize: 22, color: "var(--blue)" }}>
                    <Icon name="chat" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 700 }}>
                      Customer Support
                    </h5>
                    <p style={{ margin: "6px 0 0", color: "rgba(0,0,0,0.7)" }}>
                      Existing customers can get product help and
                      troubleshooting.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <a
                    style={{
                      fontWeight: 700,
                      color: "var(--pink)",
                      textDecoration: "none",
                    }}
                  >
                    Contact support <Icon name="chev-right" />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card style={{ borderRadius: 10 }}>
              <Card.Body>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
                >
                  <div style={{ fontSize: 22, color: "var(--blue)" }}>
                    <Icon name="clock" />
                  </div>
                  <div>
                    <h5 style={{ margin: 0, fontWeight: 700 }}>Partners</h5>
                    <p style={{ margin: "6px 0 0", color: "rgba(0,0,0,0.7)" }}>
                      Interested in partnering with MySpend? Let's collaborate.
                    </p>
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <a
                    style={{
                      fontWeight: 700,
                      color: "var(--pink)",
                      textDecoration: "none",
                    }}
                  >
                    Learn more <Icon name="chev-right" />
                  </a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* MAIN CONTACT AREA: Form (left) + Sticky Card (right) */}
      <Container style={{ ...sectionPad }}>
        <Row className="g-4">
          {/* LEFT: BIG FORM */}
          <Col lg={7}>
            <Card style={{ borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontWeight: 800, marginBottom: 6 }}>Let's talk</h3>
              <p style={{ marginTop: 0, color: "rgba(0,0,0,0.7)" }}>
                Tell us a little about you and we’ll get in touch.
              </p>

              <Form>
                <Row className="g-3">
                  {/* NAME */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 600 }}>
                        Full Name
                      </Form.Label>
                      <Form.Control
                        placeholder="Enter your name"
                        style={{ height: 44, borderRadius: 6 }}
                      />
                    </Form.Group>
                  </Col>

                  {/* EMAIL */}
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 600 }}>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        style={{ height: 44, borderRadius: 6 }}
                      />
                    </Form.Group>
                  </Col>

                  {/* CATEGORY SELECT */}
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 600 }}>
                        Select Category
                      </Form.Label>
                      <Form.Select style={{ height: 44, borderRadius: 6 }}>
                        <option value="">Choose a category</option>
                        <option>General Query</option>
                        <option>Support / Help</option>
                        <option>Complaint</option>
                        <option>Product Information</option>
                        <option>Business / Partnership</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* MESSAGE */}
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 600 }}>
                        Your Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Tell us more..."
                        style={{ borderRadius: 6 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* BUTTON + PHONE TEXT */}
                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "var(--pink)",
                      border: "none",
                      padding: "10px 18px",
                      fontWeight: 700,
                    }}
                  >
                    Contact sales
                  </Button>

                  <div style={{ color: "rgba(0,0,0,0.6)", fontSize: 14 }}>
                    Or call us at{" "}
                    <strong style={{ color: "var(--blue)" }}>
                      +91 99999 99999
                    </strong>
                  </div>
                </div>
              </Form>
            </Card>
          </Col>

          {/* RIGHT: Sticky info card (var(--grey) background) */}
          <Col lg={5}>
            <div style={{ position: "sticky", top: 24 }}>
              <Card
                style={{
                  borderRadius: 12,
                  padding: 20,
                  background: "var(--grey)",
                }}
              >
                <h5
                  style={{
                    marginTop: 0,
                    fontWeight: 800,
                    color: "var(--dark)",
                  }}
                >
                  Need help now?
                </h5>
                <p style={{ color: "rgba(0,0,0,0.8)" }}>
                  Our product specialists are available Monday–Friday to answer
                  questions and set up a demo.
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <div style={{ fontSize: 20, color: "var(--blue)" }}>
                    <Icon name="phone" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Call Sales</div>
                    <div style={{ color: "var(--pink)" }}>+91 98765 43210</div>
                  </div>
                </div>

                <hr
                  style={{ borderColor: "rgba(0,0,0,0.06)", margin: "16px 0" }}
                />

                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ fontSize: 20, color: "var(--blue)" }}>
                    <Icon name="chat" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700 }}>Chat</div>
                    <div style={{ color: "rgba(0,0,0,0.7)" }}>
                      Start a chat for quick questions
                    </div>
                  </div>
                </div>

                <hr
                  style={{ borderColor: "rgba(0,0,0,0.06)", margin: "16px 0" }}
                />

                <div>
                  <div style={{ fontWeight: 700 }}>Office</div>
                  <div style={{ color: "rgba(0,0,0,0.8)" }}>
                    2093 Jaipur Road, Rajasthan, India
                  </div>
                </div>
              </Card>

              {/* small legal / footer text */}
              <div
                style={{
                  marginTop: 12,
                  color: "rgba(0,0,0,0.6)",
                  fontSize: 13,
                }}
              >
                By submitting, you agree to be contacted by MySpend about
                product-related information.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactSales;
