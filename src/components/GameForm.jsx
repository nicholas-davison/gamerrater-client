import { useEffect, useState } from "react"
import "./games.css"
import { useNavigate } from "react-router-dom"
import { saveNewGame } from "../services/gameservice"
import { getAllCategories } from "../services/categoryservice"
import { saveNewGameCategory } from "../services/gamecategoryservice"

export const GameForm = () => {
    const navigate = useNavigate()
    const [allCategories, setAllCategories] = useState([])
    const [newGameChoices, setNewGameChoices] = useState({
        "title": "",
        "description": "",
        "designer": "",
        "year_released": "",
        "number_of_players": "",
        "estimated_play_time": "",
        "age_recommendation": ""
    })
    const [categorySelection, setCategorySelection] = useState("")

    useEffect(() => {
        getAllCategories().then((res) => {
            setAllCategories(res)
        })
    }, [])

    const handleStringGameChoices = (event) => {
        const stateCopy = {...newGameChoices}
        stateCopy[event.target.name] = event.target.value
        setNewGameChoices(stateCopy)
    }

    const handleIntGameChoices = (event) => {
        const stateCopy = {...newGameChoices}
        const value = event.target.value
        //stateCopy[event.target.name] = value === "" ? "" : parseInt(value, 10) || 0
        if (value === "") {
            stateCopy[event.target.name] = ""; // Set state to empty string if input is cleared
        } else {
            // Try to parse the value as an integer, fall back to 0 if parsing fails
            stateCopy[event.target.name] = parseInt(value) || 0;
        }
        setNewGameChoices(stateCopy)
    }

    const handleCategoryChange = (event) => {
        const selection = parseInt(event.target.value)
        setCategorySelection(selection)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await saveNewGame(newGameChoices).then((res) => {
            if (categorySelection != 0) {
                const newGameCategory = {
                    "game_id": res.id,
                    "category_id": categorySelection 
                }
                saveNewGameCategory(newGameCategory).then(() => {
                    navigate('/games')
                })

            }
        })
    }
    
    return (
        <>
        <h1>Add Game</h1>
        <div className="game-form-container">
            <form className="game-form">
                <label className="label-game-form">Title</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="Title"
                    value={newGameChoices.title}
                    name="title"
                    onChange={handleStringGameChoices}
                    />
                <label className="label-game-form">Description</label>
                <input
                    className="input-game-form"
                    type="text-area"
                    placeholder="Description"
                    value={newGameChoices.description}
                    name="description"
                    onChange={handleStringGameChoices}
                    />    
                <label className="label-game-form">Designer</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="Designer"
                    value={newGameChoices.designer}
                    name="designer"
                    onChange={handleStringGameChoices}
                    />
                <label className="label-game-form">Year Released</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="Year Released"
                    value={newGameChoices.year_released}
                    name="year_released"
                    onChange={handleIntGameChoices}
                />
                <label className="label-game-form">Maximum Number of Players</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="max number of players"
                    value={newGameChoices.number_of_players}
                    name="number_of_players"
                    onChange={handleIntGameChoices}
                />
                <label className="label-game-form">Estimated Time to Play</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="playtime"
                    value={newGameChoices.estimated_play_time}
                    name="estimated_play_time"
                    onChange={handleIntGameChoices}
                />
                <label className="label-game-form">Age Recommendation</label>
                <input
                    className="input-game-form"
                    type="text"
                    placeholder="Age recommendation"
                    value={newGameChoices.age_recommendation}
                    name="age_recommendation"
                    onChange={handleIntGameChoices}
                />
                <label className="label-game-form">Category</label>
                <select 
                    className="input-game-form"
                    value={categorySelection}
                    onChange={handleCategoryChange}
                >
                    <option value={0}>Choose a Category</option>
                    {allCategories.map((cat) => {
                        return (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )
                    })}
                </select>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
        </>
    )
}