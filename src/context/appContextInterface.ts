import React from "react"

interface AppContextInterface {
selected? : string[],
setSelected? : React.Dispatch<React.SetStateAction<string[]>>,
login : string,
setLogin : React.Dispatch<React.SetStateAction<string>>
}

export default AppContextInterface