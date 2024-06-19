export const saveNewReview = async (request) => {
    return await fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }).then(res => res.json())
}

export const getReviews = async (gameId) => {
    return await fetch(`http://localhost:8000/reviews?game=${gameId}`, {
        headers: 
        {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
        }
    }).then(res => res.json())
}