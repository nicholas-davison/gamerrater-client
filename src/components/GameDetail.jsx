import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOneGame } from "../services/gameservice"
import { getReviews } from "../services/reviewservice"
import { saveNewRating } from "../services/ratingservice"

export const GameDetail = () => {
    const {gameId} = useParams()
    const [currentGame, setCurrentGame] = useState({})
    const [gameReviews, setGameReviews] = useState([])
    const [userRating, setUserRating] = useState(0)
    const navigate = useNavigate()

    const getAndSetGame = () => {
        getOneGame(gameId).then(res => {
            setCurrentGame(res)
        })
    }
    useEffect(() => {
        getAndSetGame()
    }, [gameId])

    useEffect(() => {
        getReviews(gameId).then(res=> {
            setGameReviews(res)
        })
    }, [gameId, currentGame])


    const handleSubmitRating = () => {
        if (userRating == 0) {
            window.alert('please select a rating between 1 and 5')
        } else {
            const ratingObj =   {
                "game_id": gameId,
                "rating": parseInt(userRating)
              }
            saveNewRating(ratingObj)
            setUserRating(0)
            getAndSetGame()
            window.alert('rating saved!')
        }
    }

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
                            <span key={index}> {category.name}{index < currentGame.categories.length - 1 ? ', ' : ''}</span>
                        ))
                    ) : (
                        <span>No categories available</span>
                    )
                    }
                </div>
                <div>Average rating: {currentGame.average_rating}</div>
            </div>
            <div className="btn-container">
                <button className="btn-review-game" onClick={() => {navigate(`review`)}}>Review Game</button>
                {currentGame.is_owner ? (
                    <button className="btn-review-game" onClick={() => {navigate('edit')}}>Edit Game</button>
                ) : (
                    ""
                )}
                <div className="rating-slider">
                    <label htmlFor="slider">Rate this game: {userRating}</label>
                    <input id="slider" type="range"min="0" max="5" value={userRating} className="slider" onChange={(e) => setUserRating(e.target.value)}/>
                    <button className="btn-review-game" onClick={handleSubmitRating}>Submit</button>
                </div>
            </div>
            <h2>Reviews:</h2>
            <div className="game-review-container">
                {gameReviews.map((review) => {
                    return <div className="game-review" key={review.id}>{review.comment}</div>
                })}
            </div>
        </div>
    )
}