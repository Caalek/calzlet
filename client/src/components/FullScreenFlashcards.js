import Container from "react-bootstrap/Container"
import { useState, useEffect, } from "react";
import FlashcardViewer from "./FlashCardViewer";
import { useParams } from "react-router-dom";
import axios from "../utils/axios"
 
const FullScreenFlashcards = () => {
  const { setId } = useParams()
  const [set, setSet] = useState()

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(`/api/set/${setId}`)
      setSet(fetchedSet.data)
    }
    fetchSets()
  }, [setId])
    return (
        <Container>
            {set && <FlashcardViewer title={set.title} words={set.flashcards} setId={set._id} lastIndex={set.lastIndex}/>}
        </Container>
    )
}
export default FullScreenFlashcards;