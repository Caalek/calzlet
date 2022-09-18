import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordPair from "./WordPair";
import { useState, useEffect, useContext } from "react";
import WordViewer from "./WordViewer";
import learnImage from "./img/learn.png";
import  { Link, useParams } from "react-router-dom"
import MainNavbar from "./MainNavbar";
import axios from "axios"
import UserContext from "./UserContext";

const ViewSet = () => {
  const { setId } = useParams()
  const [set, setSet] = useState()

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(`http://localhost:5000/api/set/${setId}`)
      setSet(fetchedSet.data)
    }
    fetchSets()
  }, [])
  if (set) {
    return (
      <div>
      <MainNavbar />
      <Container className="mt-5">
        <Row>
          <Col sm={12} md={{ span: 8, offset: 2 }}>
            <h1>{set.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 3, offset: 2 }}>
            <div className="learn-button p-2">
              {/* <img src={learnImage} height="40"></img> */}
              <span className="m-3" style={{ fontSize: 17 }}>
                Ucz się (tryb Eli)
              </span>
            </div>
          </Col>
          <Col md={{ span: 3 }}>
            <Link to={`/flashcards/${set._id}`}>
              <div className="learn-button p-2">
              {/* <img src={learnImage} height="40"></img> */}
              <span className="m-3" style={{ fontSize: 17 }}>
                Fiszki
              </span>
              </div>
            </Link> 
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={{ span: 8, offset: 2 }}>
            <div>
              <WordViewer flashcards={set.flashcards} />
            </div>
          </Col>
        </Row>
        <Row>
          {set.flashcards.map((pair, index) => {
            return (
              <WordPair
                key={index}
                word={pair.word}
                translation={pair.translation}
              />
            );
          })}
        </Row>
      </Container>
    </div>
  )} else {
    return <div></div>
  }
}
export default ViewSet;