
export const saveNewGameCategory = async (request) => {
    return await fetch("http://localhost:8000/game-categories", {
        method: "POST",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
}