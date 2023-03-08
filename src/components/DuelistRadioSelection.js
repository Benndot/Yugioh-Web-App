import { RadioGroup, RadioOption } from "./RadioOptions";

const duelistNames = [
    {firstName: "Yugi", lastName: "Moto", picture: "Yugi_muto.png"}, 
    {firstName: "Tea", lastName: "Gardner", picture: "tea-gardner.png"},
    {firstName: "Mokuba", lastName: "Kaiba", picture: "mokuba-kaiba.png"}, 
    {firstName: "Marik", lastName: "Ishtar", picture: "marik-ishtar.png"},
    {firstName: "Alexis", lastName: "Rhodes", picture: "alexis-rhodes.jpg"},
    {firstName: "Seto", lastName: "Kaiba", picture: "seto-kaiba.jpg"},
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
        <h2>Choose The Active Duelist:</h2>

        {duelistNames.map(duelist => (
          <RadioOption value={JSON.stringify(duelist)}>
            {`${duelist.firstName} ${duelist.lastName}`}
          </RadioOption>
        ))}


        <button type="submit" disabled={!props.selected} onClick={submitDuelist}>Submit Duelist Name</button>
        <button onClick={viewSelectedClick}>See value of selected</button>
      </RadioGroup>
    )
}

export default DuelistRadioSelection