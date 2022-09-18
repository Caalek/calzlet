import { useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid";
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container"
import MainNavbar from "./MainNavbar";
import UserContext from "./UserContext";
import axios from "axios"

const YourSets = () => {
    const {user, setUser} = useContext(UserContext)
    const [sets, setSets] = useState([])

    useEffect(() => {
      const fetchSets = async () => {
        const userId = user.sub
        const fetchedSets = await axios.get(`http://localhost:5000/api/sets/${userId}`)
        setSets(fetchedSets.data)
      }
      fetchSets()
    }, [])

    return (
      <div>
        <MainNavbar />
        <Container>
            <h1 className="mt-5">Twoje zestawy</h1>
            {sets !== [] && sets.map(set => {
                return <SetCard key={uuidv4()} set={set}></SetCard>
            })}
        </Container>
    </div>
    )
}
export default YourSets