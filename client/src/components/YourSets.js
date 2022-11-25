import { useEffect, useState } from "react";
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container";
import MainNavbar from "./MainNavbar";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const YourSets = () => {
  const { user } = useAuth();
  const [shares, setShares] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
    const fetchShares = async () => {
      const params = {
        userId: user.userId,
      };
      const response = await axios.get("/api/shares", {
        params: params,
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setShares(response.data);
      console.log(shares)
    };
    await fetchShares();
  }
  fetchData()
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
        {shares &&
          shares.map((share, index) => {
            if (
              (searchTerm &&
                share.title.toLowerCase().includes(searchTerm.toLowerCase()) ||!searchTerm)
            ) {
              return (
                <SetCard
                  key={index}
                  title={share.title}
                  setId={share.setId}
                  avatarUrl={share.avatarUrl}
                  username={share.username}
                />
              );
            }
          })}
      </Container>
    </div>
  );
};
export default YourSets;
