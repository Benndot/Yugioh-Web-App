import { RadioGroup, RadioOption } from "./RadioOptions";

const duelistNames = [
    {charId: 1, firstName: "Yugi", lastName: "Moto", picture: "Yugi_muto.png"}, 
    {charId: 2, firstName: "Seto", lastName: "Kaiba", picture: "seto-kaiba.jpg"},
    {charId: 3, firstName: "Mai", lastName: "Valentine", picture: "mai-valentine.png"},
    {charId: 4, firstName: "Mokuba", lastName: "Kaiba", picture: "mokuba-kaiba.png"}, 
    {charId: 5, firstName: "Tea", lastName: "Gardner", picture: "tea-gardner.png"},
    {charId: 6, firstName: "Marik", lastName: "Ishtar", picture: "marik-ishtar.png"},
    {charId: 7, firstName: "Alexis", lastName: "Rhodes", picture: "alexis-rhodes.jpg"},
    {charId: 8, firstName: "Blair", lastName: "Flannigan", picture: "blair-gx.png"},
    {charId: 9, firstName: "Mokeo", lastName: "Belowski", picture: "mokeo-belowski.png"},
  ]

function DuelistRadioSelection(props) {   

    // Move the state to app.js and pass its properies down here as props. Then it can be used to change the duelist's name from there

    const viewSelectedClick = () => {
        let selectedDuelist = JSON.parse(props.selected)
        alert(`selected:  ${selectedDuelist.firstName} ${selectedDuelist.lastName}`)
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
        <h2>Change Duelist Profile:</h2>

        {duelistNames.map(duelist => (
          <RadioOption key={duelist.charId} value={JSON.stringify(duelist)}>
            {`${duelist.firstName} ${duelist.lastName}`}
          </RadioOption>
        ))}

        <div className="radio-submission-buttons">
          <button type="submit" disabled={!props.selected} onClick={submitDuelist}>Submit Duelist Name</button>
          <button onClick={viewSelectedClick}>See value of selected</button>
        </div>
        
      </RadioGroup>
    )
}

export default DuelistRadioSelection