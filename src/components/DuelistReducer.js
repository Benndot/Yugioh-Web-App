import { useCallback, useEffect, useReducer, useState } from "react";

function DuelistReducer(props) {

    const [duelistSwitch, setDuelistSwitch] = useState(true)
    const [lifepointCost, setLifepointCost] = useState(0)

    const changeLifePointCost = (ele) => {
        setLifepointCost(ele.target.value)
    }

    // A little yugioh / trading card game themed example for the use of useReducer 
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

    const [duelist, dispatch] = useReducer(reducer, defaultDuelist)
    const [duelist2, dispatch2] = useReducer(reducer, defaultDuelist2)

    let determineDispatch = useCallback((actionObject) => {
        if (duelistSwitch === true) {
            dispatch(actionObject)
        }
        if (duelistSwitch === false) {
            dispatch2(actionObject)
        }
    }, [duelistSwitch])

    useEffect(() => {determineDispatch({type: "swap_duelist"})}, [props.duelistName, determineDispatch])

    return (
        <div className="reducer">
            
            <div className="portrait-grid">
                <div className="portrait-box">
                    <img className="portrait-image" src={require(`../images/${duelist.pictureName}`)} alt="A face-closeup of Yugi Moto from the Yugioh anime series" />
                    <h2 className="portrait-text">Duelist A: {duelist.name.first + " " + duelist.name.last}</h2>
                    <h2 className="portrait-text">Remaining Life Points: {duelist.lifePoints}</h2>
                </div>
                
                <div className="portrait-box">
                    <img className="portrait-image" src={require(`../images/${duelist2.pictureName}`)} alt="A face-closeup of Alexis Rhodes from the Yugioh anime series" />
                    <h2 className="portrait-text">Duelist B: {duelist2.name.first + " " + duelist2.name.last}</h2>
                    <h2 className="portrait-text">Remaining Life Points: {duelist2.lifePoints}</h2>
                </div>
            </div>
            
            
            {duelist.lifePoints <= 0 ? <p style={{color: "red", marginTop: "0vw"}}>life points have fallen below 0!</p> : <p></p>}
            <h3>Lifepoints to sacrifice: {lifepointCost}</h3>
            <button onClick={() => determineDispatch({type: "pay_lifepoints"})}>Confirm Lifepoint Cost</button>
            <input type="range" value={lifepointCost} min="100" max="4000" step="50" onChange={changeLifePointCost}/>
            <button onClick={() => determineDispatch({type: "reset_lifepoints"})}>Reset Lifepoints</button>
            <h3>
                {`Cards in deck A: ${duelist.deck.currentSize}, Cards in hand A: ${duelist.gameState.handSize},  Cards in grave A: ${duelist.gameState.graveSize}`}
            </h3>
            <h3>
                {`Cards in deck B : ${duelist2.deck.currentSize}, Cards in hand B: ${duelist2.gameState.handSize},  Cards in grave B: ${duelist2.gameState.graveSize}`}
            </h3>
            <button onClick={() => determineDispatch({type: "draw_card"})}>Click me to draw a card!</button>
            <button onClick={() => determineDispatch({type: "discard_card"})}>Discard a card</button>
            <button onClick={() => determineDispatch({type: "defeat_check"})}>How is the duelist doing?</button>
            {duelist.defeated === true ? <p>{duelist.name.first} has lost the duel!</p>: <p>Heart of the cards!</p>}
            <button onClick={() => setDuelistSwitch(!duelistSwitch)}>Click To Swap The Active Duelist ({duelistSwitch.toString()})</button>
        </div>
    )
}

export default DuelistReducer