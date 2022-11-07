import { useContext, useEffect, useState } from "react"
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container"
import MainNavbar from "./MainNavbar";
import UserContext from "../context/UserContext";
import axios from "axios"

const YourSets = () => {
    const {user, setUser} = useContext(UserContext)
    const [sets, setSets] = useState([])
    const [searchTerm, setSearchTerm] = useState()

    useEffect(() => {
      const fetchSets = async () => {
        const fetchedSets = await axios.get(`/api/sets`, {headers: {'Authorization': `Bearer ${user.token}`}})
        setSets(fetchedSets.data)
      }
      fetchSets()
    }, [])
    return (
      <div>
        <MainNavbar />
        <Container>
            <h1 className="mt-5">Twoje zestawy</h1>
            <input className="text-input mt-5" placeholder="Szukaj po nazwie" onChange={(e) => setSearchTerm(e.target.value)}></input>
            {sets && sets.map((set, index) => {
              if ((searchTerm && set.title.toLowerCase().includes(searchTerm.toLowerCase())) || !searchTerm) {
                return <SetCard key={index} set={set} />
              }
            })}
        </Container>
    </div>
    )
}
export default YourSets