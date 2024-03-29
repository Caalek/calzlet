import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import MainNavbar from "./MainNavbar";
import UpdateEmailForm from "./UpdateEmailForm";
import UpdatePasswordForm from "./UpdatePasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";
import UpdateProfileForm from "./UpdateProfileForm";
import useAuth from "../hooks/useAuth";

const SettingsPage = () => {
  const { user } = useAuth()

  return (
    <>
      <MainNavbar />
      <Container className="mt-5">
        <Row>
          <h3>{user.username}</h3>
          <Col sm={12} md={4}>
            <UpdateProfileForm />
          </Col>
          <Col sm={12} md={4}>
            <UpdateEmailForm />
          </Col>
          <Col sm={12} md={4}>
            <UpdatePasswordForm />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col sm={12} md={6}>
            <DeleteAccountForm />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
