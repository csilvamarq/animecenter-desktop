import { createContext } from "react";
import AppContextInterface from "./appContextInterface";

const AppContext  = createContext<AppContextInterface>({})

export default AppContext