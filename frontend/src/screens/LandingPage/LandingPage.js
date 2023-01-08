import React, { useEffect } from "react";
import "./LandingPage.css";
import { Container, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate("/mynotes");
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div class="intro-text">
            <div>
              <h1 className="title">Welcome to Note Kiper</h1>
              <p className="subtitle">One safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
