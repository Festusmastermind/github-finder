import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUBURL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    const initialState = {
        users: [], //am empty array
        user: {},
        repos: [],
        loading: false,
    };
    //using useReducer Hook..instead of useState...
    const [state, dispatch] = useReducer(githubReducer, initialState);
   
    

    const setLoading = () => dispatch({ type: "SET_LOADING" }); //returns a dispatch ..

    //const clearUsers = () => dispatch({ type: "CLEAR_USERS" }); //this can be called directly and not passed down.

    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch, 
        }}>
            {children}
        </GithubContext.Provider>
    )

};

export default GithubContext;

/***
 * The reason of creating the GitHubContext is to manage props and states gloabally..
 * so that it will available all over the application lifetime..
 *
 * the values can be object, array, variable and functions ..
 * So from the Context Provider ...the children(all the encapsulated components have access to users, loading and other other props passed..)
 *
 * We can just spread the states to avoid repetive codes ..
    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                user: state.user,
                repos: state.repos, 
                loading: state.loading,
                searchUsers,
                getUser,
                clearUsers,
                getUserRepos,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
 */

//for testing purpose..

// const fetchUsers = async () => {
//      setLoading() //this setLoading to true from the reducer..
//     const response = await fetch(`${GITHUBURL}/users`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`, //this is not necessary, its majorly for request-rate-limit per min...
//         },
//     });
//     const data = await response.json();
//     //setUsers(data); //once you hit this function then re-rendered ..the whole view/state...
//     // setLoading(false); //re-render the state/view and sets loading to false..
//     dispatch({ type: 'GET_USERS', payload: data }); //dispatch an action...
// };



//SEARCH_USERS 
// const searchUsers = async (text) => {
//     setLoading(); //this sets Loading to true from the setLoadng function ..
//     const params = new URLSearchParams({
//         q: text,
//     });
//     // const response = await fetch(`${GITHUBURL}/search/users?${params}`, {
//     //     headers: {
//     //         Authorization: `token ${GITHUB_TOKEN}`, //this is not necessary, its majorly for request-rate-limit per min...
//     //     },
//     // });
//     const response = await fetch(`${GITHUBURL}/search/users?${params}`);
//     //destructing from the objects that been returned and just picking the only one we need ....
//     const { items } = await response.json(); //destructing
//     //const data = await response.json();
//     //console.log(data)
//     dispatch({ type: "GET_USERS", payload: items }); //dispatch an action... and the loading is beeng set to force..
// };