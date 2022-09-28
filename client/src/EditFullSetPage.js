import { useParams } from "react-router-dom";
import CreateSet from "./CreateSet";
import MainNavbar from "./MainNavbar";
import { useState, useEffect } from "react";
import axios from "axios";

const EditFullSet = (props) => {
  const { setId } = useParams();

  const [set, setSet] = useState();

  useEffect(() => {
    const fetchSets = async () => {
      const fetchedSet = await axios.get(
        `http://localhost:5000/api/set/${setId}`
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
        />
      )}
    </>
  );
};
export default EditFullSet;
