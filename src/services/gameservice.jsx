export const getAllGames = async () => {
    return await fetch("http://localhost:8000/games",             {
        headers: 
        {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
        }
    }).then(res => res.json())
}

export const getOneGame = async (pk) => {
    return await fetch(`http://localhost:8000/games/${pk}`,             {
        headers: 
        {
            Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
        }
    }).then(res => res.json())
}