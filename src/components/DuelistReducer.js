import { useCallback, useEffect, useReducer, useState } from "react";

function DuelistReducer(props) {

    const [playerSwitch, setPlayerSwitch] = useState(true)
    const [lifepointCost, setLifepointCost] = useState(0)

    const changeLifePointCost = (ele) => {
        setLifepointCost(ele.target.value)
    }

    // ----------------------------------------------------
    // Creating the default duelist objects for each player
    const defaultDuelist = {
        name: {
            first: "Seto", 
            last: "Kaiba"},
        pictureName: "seto-kaiba.jpg",
        lifePoints: 4000, 
        deck: {name: "Blue-Eyes White Dragon", currentSize: 34},
        gameState: {handSize: 5, graveSize: 1, cardsOnField: 1},
        defeated: false,
        activeEditing: true
    }

    const defaultDuelist2 = {
        name: {
            first: "Yugi", 
            last: "Moto"},
        pictureName: "Yugi_muto.png",
        lifePoints: 4000, 
        deck: {name: "Dark Magician", currentSize: 37},
        gameState: {handSize: 4, graveSize: 2, cardsOnField: 1},
        defeated: false,
        activeEditing: false
    }

    // ----------------------------------------------------
    // Defining the reducer function to dispatch actions on the duelist objects

    const reducer = (duelist, action) => {

        if (action.type === "pay_lifepoints" && duelist.lifePoints > 0) return {
            ...duelist,
            lifePoints: duelist.lifePoints - lifepointCost
        }

        if (action.type === "reset_lifepoints" && duelist.lifePoints !== 4000) return {
            ...duelist,
            lifePoints: 4000,
            defeated: false
        }
        
        if (action.type === "draw_card" && duelist.deck.currentSize >= 1) return {
            ...duelist, 
            deck: {...duelist.deck, currentSize: duelist.deck.currentSize - 1}, 
            gameState: {...duelist.gameState, handSize: duelist.gameState.handSize + 1}}

        if (action.type === "defeat_check") {
            if (duelist.lifePoints <=0 || duelist.deck.currentSize <= 0) return {
                ...duelist,
                defeated: true
            }
        }

        if (action.type === "discard_card" && duelist.gameState.handSize >= 1) return {
            ...duelist,
            gameState: {...duelist.gameState, 
                        handSize: duelist.gameState.handSize - 1,
                        graveSize: duelist.gameState.graveSize + 1}
        }

        if (action.type === "swap_duelist") {

            console.log("swap duelist initiated")
            
            if (props.duelistName === "") {
                return duelist

            } else {
                
                let duelistNameObject = JSON.parse(props.duelistName) 
                console.log(duelistNameObject)
                return {
                ...duelist,
                name: {first: duelistNameObject.firstName, last: duelistNameObject.lastName},
                pictureName: duelistNameObject.picture
            }
            
        }}

        return duelist
    }

    // ----------------------------------------------------
    // Defining the actual players in the game and giving them their default data

    const [player1, dispatch] = useReducer(reducer, defaultDuelist)
    const [player2, dispatch2] = useReducer(reducer, defaultDuelist2)

    // ----------------------------------------------------
    // Defining function to determine which player to apply actions to

    let determineDispatch = useCallback((actionObject) => {
        if (playerSwitch === true) {
            dispatch(actionObject)
        }
        if (playerSwitch === false) {
            dispatch2(actionObject)
        }
    }, [playerSwitch])

    // ----------------------------------------------------
    // Use effect hook

    useEffect(() => {determineDispatch({type: "swap_duelist"})}, [props.duelistName, determineDispatch])

    // ----------------------------------------------------
    // Return statement / components structure

    return (
        <div className="reducer">
            
            <div className="portrait-grid">
                <div className="portrait-box">
                    <img className="portrait-image" src={require(`../images/${player1.pictureName}`)} alt="A face-closeup of Yugi Moto from the Yugioh anime series" />
                    <h2 className="portrait-text">Player 1: {player1.name.first + " " + player1.name.last}</h2>
                    <h2 className="portrait-text">Remaining Life Points: {player1.lifePoints}</h2>
                </div>
                
                <div className="portrait-box">
                    <img className="portrait-image" src={require(`../images/${player2.pictureName}`)} alt="A face-closeup of Alexis Rhodes from the Yugioh anime series" />
                    <h2 className="portrait-text">Player 2: {player2.name.first + " " + player2.name.last}</h2>
                    <h2 className="portrait-text">Remaining Life Points: {player2.lifePoints}</h2>
                </div>
            </div>
            
            
            {player1.lifePoints <= 0 ? <p style={{color: "red", marginTop: "0vw"}}>life points have fallen below 0!</p> : <p></p>}
            <h3>Lifepoints to sacrifice: {lifepointCost}</h3>
            <button onClick={() => determineDispatch({type: "pay_lifepoints"})}>Confirm Lifepoint Cost</button>
            <input type="range" value={lifepointCost} min="100" max="4000" step="50" onChange={changeLifePointCost}/>
            <button onClick={() => determineDispatch({type: "reset_lifepoints"})}>Reset Lifepoints</button>
            <h3>
                {`Cards in deck A: ${player1.deck.currentSize}, Cards in hand A: ${player1.gameState.handSize},  Cards in grave A: ${player1.gameState.graveSize}`}
            </h3>
            <h3>
                {`Cards in deck B : ${player2.deck.currentSize}, Cards in hand B: ${player2.gameState.handSize},  Cards in grave B: ${player2.gameState.graveSize}`}
            </h3>
            <button onClick={() => determineDispatch({type: "draw_card"})}>Click to draw a card!</button>
            <button onClick={() => determineDispatch({type: "discard_card"})}>Discard a card</button>
            <button onClick={() => determineDispatch({type: "defeat_check"})}>How is the duelist doing?</button>
            {player1.defeated === true ? <p>{player1.name.first} has lost the duel!</p>: <p>Heart of the cards!</p>}
            <button onClick={() => setPlayerSwitch(!playerSwitch)}>Click To Swap The Active Duelist ({playerSwitch.toString()})</button>
        </div>
    )
}

export default DuelistReducer