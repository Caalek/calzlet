import Container from "react-bootstrap/Container"
import { useState, useEffect } from "react";
import FlashcardViewer from "./FlashCardViewer";
import { useParams } from "react-router-dom";
import axios from "axios"
 
const FullScreenFlashcards = () => {
  const { setId } = useParams()
  const [set, setSet] = useState()

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(`http://localhost:5000/api/set/${setId}`)
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