import { useState } from "react"
import { v4 as uuidv4 } from "uuid";
import SetCard from "./SetCard";
import Container from "react-bootstrap/Container"
import MainNavbar from "./MainNavbar";

const YourSets = () => {
    const [sets, setSets] = useState([
        {
            name: "Set 1",
            desc: "great super set",
            words: [
                {
                  word: "el tiburón",
                  translation: "rekin",
                },
                {
                  word: "la calefacción",
                  translation: "ogrzewanie",
                },
                {
                  word: "el lavaplatos",
                  translation: "zmywarka",
                },
              ],
        }
    ])

    return (
      <div>
        <MainNavbar />
        <Container>
            <h1 className="mt-5">Twoje zestawy</h1>
            {sets.map(set => {
                return <SetCard key={uuidv4()} set={set}></SetCard>
            })}
        </Container>
    </div>
    )
}
export default YourSets