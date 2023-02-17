import React from "react"

interface AppContextInterface {
selected? : string[],
setSelected? : React.Dispatch<React.SetStateAction<string[]>>,
login : string,
setLogin : React.Dispatch<React.SetStateAction<string>>
password : string,
setImagen :  React.Dispatch<React.SetStateAction<string>>
imagen : string,
setPassword :  React.Dispatch<React.SetStateAction<string>>
}

export default AppContextInterface