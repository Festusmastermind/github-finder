const githubReducer = (state, action) => {
    switch(action.type)
    {
        case 'GET_USERS': 
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case 'GET_USER': 
            return {
                ...state, 
                user: action.payload, 
                loading: false,
            }
        case 'GET_REPOS':
            return { 
                ...state, 
                repos: action.payload,
                loading: false, 
            }
        case 'SET_LOADING':
            return {
                ...state, 
                loading: true
            }
        case 'CLEAR_USERS'  : 
            return {
                ...state,
                users: []
            }
        default: 
            return state
    }
}

export default githubReducer

/**
 * ... i.e. spread across anything in that array or object earlier...like adding to the exiting items ..
 * for GET_USERS action ....the current state at that moment is empty array users[] from the initial state... 
 * so the ... will just add / fill the empty array with the data coming in ..
 */