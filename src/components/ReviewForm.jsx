import { useState } from "react"
import "./games.css"
import { useNavigate, useParams } from "react-router-dom"
import { saveNewReview } from "../services/reviewservice"
export const ReviewForm = () => {
    const navigate = useNavigate()
    const [reviewText, setReviewText] = useState('')
    const {gameId} = useParams()

    const handleReviewTextChange = (event) => {
        const text = event.target.value
        setReviewText(text)
    }

    const handleSaveNewReview = async (event) => {
        event.preventDefault()
        const newReview =   {
            "game_id": gameId,
            "comment": reviewText
          }
          await saveNewReview(newReview).then(navigate(`/games/${gameId}`))
    }

    return (
        <>
            <h1>Write a Review</h1>
            <div className="review-form-container">
                <form>
                    <textarea
                        className="review-text-area"
                        onChange={handleReviewTextChange}
                    />
                    <button className="btn-review-game" onClick={handleSaveNewReview}>Submit</button>
                </form>
            </div>
        </>
    )
}