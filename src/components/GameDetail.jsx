import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOneGame } from "../services/gameservice"

export const GameDetail = () => {
    const {gameId} = useParams()
    const [currentGame, setCurrentGame] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getOneGame(gameId).then(res => {
            setCurrentGame(res)
        })
    }, [gameId])

    return (
        <div className="game-detail">
            <h1>{currentGame.title}</h1>
            <div className="game-detail-container">
                <div>Designed by: {currentGame.designer}</div>
                <div>Year released: {currentGame.year_released}</div>
                <div>Number of players: {currentGame.number_of_players}</div>
                <div>Estimated time of play: {currentGame.estimated_play_time}</div>
                <div>Age recommendation: {currentGame.age_recommendation}</div>
                <div>Categories:
                    {currentGame.categories && currentGame.categories.length > 0 ? (
                        currentGame.categories.map((category, index) => (
                            <span key={index}>{category.name}{index < currentGame.categories.length - 1 ? ', ' : ''}</span>
                        ))
                    ) : (
                        <span>No categories available</span>
                    )
                    }
                </div>
            </div>
            <button className="btn-review-game" onClick={() => {navigate(`review`)}}>Review Game</button>
            <div className="game-review-container">
                    
            </div>
        </div>
    )
}