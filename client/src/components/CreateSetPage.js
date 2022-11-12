import uuid from "react-uuid"
import CreateSet from "./CreateSet"
import MainNavbar from "./MainNavbar"

const CreateSetPage = () => {
  return (
    <>
      <MainNavbar />
      <CreateSet set={{flashcards: [{ word: "", translation: "", imageUrl: "", _id: uuid() }]}} />
    </>

  )
}
export default CreateSetPage;