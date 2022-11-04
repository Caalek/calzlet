import Container from "react-bootstrap/Container"
import { useState, useEffect, useContext } from "react";
import FlashcardViewer from "./FlashCardViewer";
import { useParams } from "react-router-dom";
import axios from "axios"
import UserContext from "../context/UserContext";
 
const FullScreenFlashcards = () => {
  const { setId } = useParams()
  const [set, setSet] = useState()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(`http://localhost:5000/api/set/${setId}`, {headers: {'Authorization': `Bearer ${user.token}`}})
      setSet(fetchedSet.data)
      console.log(set)
    }
    fetchSets()
  }, [])
    return (
        <Container>
            {set && <FlashcardViewer title={set.title} words={set.flashcards} setId={set._id} />}
        </Container>
    )
}
export default FullScreenFlashcards;