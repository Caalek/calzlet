import { useContext, useEffect, useState } from "react";
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import UserContext from "../context/UserContext";
import axios from "axios";

const YourSets = () => {
  const { user, setUser } = useContext(UserContext);
  const [sets, setSets] = useState();
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    const fetchData = async () => {
      axios.get(
        `/api/sets`,
        { params: { associatedUserIds: user.user.userId }, headers: { Authorization: `Bearer ${user.token}` } }
      ).then(response => {
        setSets(response.data)
      })
    };
    fetchData();
    console.log(sets)
  }, []);
  return (
    <div>
      <MainNavbar />
      <Container>
        <h1 className="mt-5">Zestawy</h1>
        <input
          className="text-input mt-3"
          placeholder="Szukaj po nazwie"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        {/* <h3 className="mt-3">Moje</h3> */}
        {sets &&
          sets.map((set, index) => {
            if (
              (searchTerm &&
                set.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
              !searchTerm
            ) {
              return <SetCard key={index} set={set} avatarUrl={set.creatorAvatarUrl} username={set.creatorUsername}  />;
            }
          })}
      </Container>
    </div>
  );
};
export default YourSets;
