import { useParams } from "react-router-dom";
import CreateSet from "./CreateSet";
import MainNavbar from "./MainNavbar";
import { useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import useAuth from "../hooks/useAuth";

const EditFullSet = (props) => {
  const { setId } = useParams();
  const { user } = useAuth()

  const [set, setSet] = useState();

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(
        `/api/set/${setId}`, {headers: {'Authorization': `Bearer ${user.token}`}}
      );
      setSet(fetchedSet.data);
    };
    fetchSets();
  }, [setId, user.token]);

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
