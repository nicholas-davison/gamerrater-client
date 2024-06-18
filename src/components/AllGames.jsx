import { useEffect, useState } from "react"
import { getAllGames } from "../services/gameservice"
import "./games.css"
import { Link, useNavigate } from "react-router-dom"

export const AllGames = () => {
    const navigate = useNavigate()

    const [allGames, setAllGames] = useState([])

    useEffect(() => {
        getAllGames().then((res) => {
            setAllGames(res)
        })
    }, [])

    return (
        <div>
            <h1>Games</h1>
            <div className="btn-container">
                <button className="btn-add-game" onClick={() => (navigate("create"))}>Register New Game</button>
            </div>
            <div className="game-list">
                {allGames.map((gameObj) => {
                    return (
                        <div className="game-item" key={gameObj.id}>
                            <Link to={`${gameObj.id}`}>{gameObj.title}</Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}