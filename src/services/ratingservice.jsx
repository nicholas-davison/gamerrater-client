export const saveNewRating = async (request) => {
        return await fetch("http://localhost:8000/ratings", {
        method: "POST",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }).then(res => res.json())
}