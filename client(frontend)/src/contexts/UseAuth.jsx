import { useContext } from "react";
import AuthContext from "./AuthContext";
function UseAuth(){
    const context=useContext(AuthContext)
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context
}

export default UseAuth