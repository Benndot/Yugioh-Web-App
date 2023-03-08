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
    // Determine alt image text

    function getPortraitAltText(duelist) {
        return `A close-up of the character ${duelist.name.first} ${duelist.name.last} from the Yugioh anime series`
    }

    // ----------------------------------------------------
    // Create duelist portrait/data box

    function createDuelistPortraitBox(duelist) {
        return (
            <div className="portrait-box">
                <img className="portrait-image" src={require(`../images/${duelist.pictureName}`)} alt={getPortraitAltText(duelist)} />
                <h2 className="portrait-text">Player: {duelist.name.first + " " + duelist.name.last}</h2>
                <h2 className="portrait-text">Remaining Life Points: {duelist.lifePoints}</h2>
                <h3>Cards in deck: {duelist.deck.currentSize}</h3>
                <h3>Cards in hand: {duelist.gameState.handSize}</h3>
                <h3>Cards in grave: {duelist.gameState.graveSize}</h3>
            </div>
        )
    }

    // ----------------------------------------------------
    // Return statement / components structure

    return (
        <div className="reducer">
            
            <div className="portrait-row">
                {createDuelistPortraitBox(player1)}
                {createDuelistPortraitBox(player2)}
            </div>

            {player1.lifePoints <= 0 || player2.lifePoints <= 0 ? <p style={{color: "red", marginTop: "0vw"}}>life points have fallen below 0!</p> : <p></p>}

            {/* life points box */}
            <div className="lifepoints-tool">
                
                <h4>
                    Lifepoints to sacrifice: {lifepointCost}
                </h4>

                <div>
                    <input type="range" className="lifepoint-slider" value={lifepointCost} min="100" max="4000" step="50" onChange={changeLifePointCost}/>

                    <button classname="lifepoint-button" onClick={() => determineDispatch({type: "pay_lifepoints"})}>
                        Confirm Lifepoint Cost
                    </button>

                    <button classname="lifepoint-button" onClick={() => determineDispatch({type: "reset_lifepoints"})}>
                        Reset Lifepoints
                    </button>
                </div>
                

            </div>
            
            <div className="player-actions">
                <button onClick={() => determineDispatch({type: "draw_card"})}>
                    Click to draw a card!
                </button>
                
                <button onClick={() => determineDispatch({type: "discard_card"})}>
                    Discard a card
                </button>
                
                <button onClick={() => determineDispatch({type: "defeat_check"})}>
                    Outcome check?
                </button>
            </div>  

            {player1.defeated === true ? <p>{player1.name.first} has lost the duel!</p>: <p>Heart of the cards!</p>}
            
            <h2>
                Active duelist: {playerSwitch? "Player Left": "Player Right"}
            </h2>

            <button id="player-switch" onClick={() => setPlayerSwitch(!playerSwitch)}>
                Swap The Active Duelist
            </button>
        </div>
    )
}

export default DuelistReducer