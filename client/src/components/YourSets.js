import { useEffect, useState } from "react";
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar"
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const YourSets = () => {
  const { user } = useAuth();
  const [sets, setSets] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchData = async () => {
      axios.get(
        `/api/sets`,
        { params: { associatedUserIds: user.userId }, headers: { Authorization: `Bearer ${user.token}` } }
      ).then(response => {
        if (response.status === 401) {
          navigate("/login")
        }
        setSets(response.data)
      })
    };
    fetchData();
  }, [navigate, user.token, user.userId]);
  
  return (
    <div>
      <MainNavbar />
      <Container>
        <h1 className="mt-5">Zestawy</h1>
        <input
          type="text"
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
