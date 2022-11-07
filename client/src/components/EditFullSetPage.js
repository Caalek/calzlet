import { useParams } from "react-router-dom";
import CreateSet from "./CreateSet";
import MainNavbar from "./MainNavbar";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const EditFullSet = (props) => {
  const { setId } = useParams();
  const { user } = useContext(UserContext)

  const [set, setSet] = useState();

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(
        `/api/set/${setId}`, {headers: {'Authorization': `Bearer ${user.token}`}}
      );
      setSet(fetchedSet.data);
    };
    fetchSets();
  }, []);

  return (
    <>
      <MainNavbar />
      {set && (
        <CreateSet
          title={set.title}
          description={set.description}
          viewAccess={set.viewAccess}
          editAccess={set.editAccess}
          viewPassword={set.viewPassword}
          editPassword={set.editPassword}
          flashcards={set.flashcards}
          set={set}
        />
      )}
    </>
  );
};
export default EditFullSet;
