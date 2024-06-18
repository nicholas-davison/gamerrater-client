
export const saveNewGameCategory = async (request) => {
    return await fetch("http://localhost:8000/game-categories", {
        Method: "POST",
        Headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
            "Content-Type": "application/json"
        },
        Body: JSON.stringify(request)
    })
}