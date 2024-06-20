
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

export const getGameCategoriesByGameId = async (gameId) => {
    return await fetch(`http://localhost:8000/game-categories?game=${gameId}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
        }
    }).then(res=>res.json())
}

export const updateGameCategory = async (request) => {
    return await fetch(`http://localhost:8000/game-categories/${request.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
}