import { RadioGroup, RadioOption } from "./RadioOptions";

const duelistNames = [
    {firstName: "Yugi", lastName: "Moto"}, 
    {firstName: "Mokuba", lastName: "Kaiba"}, 
    {firstName: "Marik", lastName: "Ishtar"},
    {firstName: "Alexis", lastName: "Rhodes"}
  ]

function DuelistRadioSelection(props) {   

    // Move the state to app.js and pass its properies down here as props. Then it can be used to change the duelist's name from app.jss

    const viewSelectedClick = () => {
        console.log("selected: " + props.selected)
      }   

    const submitDuelist = () => {
        // I should convert this function in the return statement to be onSubmit eventually, since it's currently just an onClick function
        console.log("Submitted!")
        console.log("selected: " + props.selected)
        try {
            let duelistNameObject = JSON.parse(props.selected)
            console.log(duelistNameObject.firstName)
          }
          catch (e) {
            console.log("That's some invalid JSON you got there")
            console.log(e)
          }
    }

    return (
      <RadioGroup onChange={props.setSelected} selected={props.selected}>
        <RadioOption value={JSON.stringify(duelistNames[0])}>{`${duelistNames[0].firstName} ${duelistNames[0].lastName}`}</RadioOption>
        <RadioOption value={JSON.stringify(duelistNames[1])}>{`${duelistNames[1].firstName} ${duelistNames[1].lastName}`}</RadioOption>
        <RadioOption value={JSON.stringify(duelistNames[2])}>{`${duelistNames[2].firstName} ${duelistNames[2].lastName}`}</RadioOption>
        <RadioOption value={JSON.stringify(duelistNames[3])}>{`${duelistNames[3].firstName} ${duelistNames[3].lastName}`}</RadioOption>
        <button type="submit" disabled={!props.selected} onClick={submitDuelist}>Submit Duelist Name</button>
        <button onClick={viewSelectedClick}>See value of selected</button>
      </RadioGroup>
    )
}

export default DuelistRadioSelection