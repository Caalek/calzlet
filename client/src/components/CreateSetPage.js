import CreateSet from "./CreateSet"
import MainNavbar from "./MainNavbar"

const CreateSetPage = () => {
  return (
    <>
      <MainNavbar />
      <CreateSet set={{flashcards: [{ word: "", translation: "", imageUrl: "", index: 0 }]}} />
    </>

  )
}
export default CreateSetPage;