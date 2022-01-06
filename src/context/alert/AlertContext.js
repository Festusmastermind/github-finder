import {createContext, useReducer} from 'react'
import alertReducer from './AlertReducer'



//create the alertContext 
const AlertContext = createContext() 

//We need a provider 
export const AlertProvider = ({children}) => {
    const initialState = null

    const[state, dispatch] = useReducer(alertReducer, initialState)

    //set an alert takes in two parameters
    const setAlert = (msg, type)=>{
        dispatch({ type: 'SET_ALERT', payload: {msg, type},})
    }

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000) //for 3seconds ...then remove alert..this runs autmoatically..

    //We need to the return the AlertContext.Provider passing the values other components wants to use inside ..
    return (
        <AlertContext.Provider value={{alert: state, setAlert}}>
            {children}
        </AlertContext.Provider>
    )
    

}
 

export default AlertContext
