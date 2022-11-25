import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import FlashcardViewer from "./FlashCardViewer";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";

const FlashcardsPage = () => {
  const { setId } = useParams();
  const { user } = useAuth()
  const [set, setSet] = useState();
  const [share, setShare] = useState()

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(`/api/set/${setId}`);
      setSet(fetchedSet.data);
    };

    const fetchShare = async () => {
      const params = {
        userId: user.userId,
        setId: setId
      }
      const response = await axios.get("/api/shares", {params: params, headers: { Authorization: `Bearer ${user.token}` }});
      setShare(response.data[0])
    }
    fetchSets();
    if (user) {
      fetchShare()
    }
  }, [setId]);

  return (
    <Container style={{ height: "83vh" }}>
      {((set && !user) || (set && share && user)) && (
        <FlashcardViewer
          title={set.title}
          words={set.flashcards}
          setId={set._id}
          lastIndex={share ? share.lastIndex : 0}
        />
      )}
    </Container>
  );
};
export default FlashcardsPage;
