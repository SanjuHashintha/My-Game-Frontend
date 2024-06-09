import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessage from "../../common/AlertMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ message: "", status: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlert({
        message: "Email and password are required.",
        status: "danger",
      });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/api/signin`, {
        email,
        password,
      });

      if (response.data.status === 200) {
        localStorage.setItem("userId", response.data.payload._id);
        localStorage.setItem("access_token", response.data.payload.token);
        localStorage.setItem("role", response.data.payload.role);
        localStorage.setItem("username", response.data.payload.username);
        localStorage.setItem(
          "fullName",
          response.data.payload.firstName + " " + response.data.payload.lastName
        );
        navigate("/starter");
      } else if (response.data.status === 404) {
        setAlert({
          message: `Login Failed: ${response.data.message}`,
          status: "danger",
        });
      }
    } catch (error) {
      setAlert({
        message: `Login Failed: Something when wrong`,
        status: "danger",
      });
      console.error("Axios Error:", error);
    }
  };

  return (
    <Container
      className="d-flex vh-100"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Row className="justify-content-center w-100">
        <Col md={6} lg={4}>
          <Card>
            <CardBody>
              {alert.message && (
                <AlertMessage message={alert.message} status={alert.status} />
              )}
              <CardTitle tag="h5" className="text-center mb-4">
                Login
              </CardTitle>
              <Form onSubmit={handleLogin} autoComplete="on">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button color="primary" type="submit" block>
                  Login
                </Button>
              </Form>
              <CardText className="text-center mt-3">
                Don't have an account? <Link to="/register">Register</Link>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
