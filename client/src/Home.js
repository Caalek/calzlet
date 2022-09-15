import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const Home = () => {
  return (
    <Container>
      <div className="mt-5" style={{ textAlign: "center" }}>
        <h1>Calzlet</h1>
        <p>Quizlet, ale w pełni darmowy i bez konta.</p>
        <Link to="/create-set">
          <Button>Stwórz nowy zestaw</Button>
        </Link>
      </div>
    </Container>
  );
}
export default Home;