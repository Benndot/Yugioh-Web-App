import { useEffect, useReducer, useState } from "react";

let reducerStyle = {
    backgroundColor: "yellow"
}

function DuelistReducer(props) {

    const [lifepointCost, setLifepointCost] = useState(0)

    const changeLifePointCost = (ele) => {
        setLifepointCost(ele.target.value)
    }

    // A little yugioh / trading card game themed example for the use of useReducer 
    const defaultDuelist = {
        name: {
            first: "Seto", 
            last: "Kaiba"},
        lifePoints: 4000, 
        deck: {name: "Dark Magician", size: 43, cardsRemaining: 38},
        gameState: {handSize: 3, graveSize: 1, cardsOnField: 1},
        defeated: false
    }

    const reducer = (duelist, action) => {

        if (action.type === "pay_lifepoints" && duelist.lifePoints > 0) return {
            ...duelist,
            lifePoints: duelist.lifePoints - lifepointCost
        }
        
        if (action.type === "draw_card") return {
            ...duelist, 
            deck: {...duelist.deck, size: duelist.deck.size - 1}, 
            gameState: {...duelist.gameState, handSize: duelist.gameState.handSize + 1}}

        if (action.type === "defeat_check") {
            if (duelist.lifePoints <=0 || duelist.deck.size <= 0) return {
                ...duelist,
                defeated: true
            }
        }

        if (action.type === "discard_card") return {
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
                name: {first: duelistNameObject.firstName, last: duelistNameObject.lastName}
            }
            
        }}

        return duelist
    }

    const [duelist, dispatch] = useReducer(reducer, defaultDuelist)

    useEffect(() => {
        dispatch({type: "swap_duelist"})
    }, [props.duelistName])

    return (
        <div style={reducerStyle}>
            <h4>Current Duelist: {duelist.name.first + " " + duelist.name.last}</h4>
            <h2>Remaining Life Points: {duelist.lifePoints}</h2>
            {duelist.lifePoints <= 0 ? <p style={{color: "red", marginTop: "0vw"}}>life points have fallen below 0!</p> : <p></p>}
            <h3>Lifepoints to sacrifice: {lifepointCost}</h3>
            <button onClick={() => dispatch({type: "pay_lifepoints"})}>Confirm Lifepoint Cost</button>
            <input type="range" value={lifepointCost} min="100" max="4000" step="50" onChange={changeLifePointCost}/>
            <h5>
                Cards in deck: {duelist.deck.size}, Cards in hand: {duelist.gameState.handSize}, Cards in grave: {duelist.gameState.graveSize}
                </h5>
            <button onClick={() => dispatch({type: "draw_card"})}>Click me to draw a card!</button>
            <button onClick={() => dispatch({type: "discard_card"})}>Discard a card</button>
            <button onClick={() => dispatch({type: "defeat_check"})}>How is the duelist doing?</button>
            <button onClick={() => dispatch({type: "swap_duelist"})}>Swap Duelists?</button>
            <button onClick={() => console.log(props.duelistName, props.duelistName["firstName"], typeof(props.duelistName))}>What's the current duelist name?</button>
            {duelist.defeated === true ? <p>{duelist.name.first} has lost the duel!</p>: <p>Heart of the cards!</p>}
        </div>
    )
}

export default DuelistReducer