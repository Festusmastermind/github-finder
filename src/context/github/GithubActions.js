import axios from 'axios'


const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
//const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN; //the token is not stable hence not included...

// const github = axios.create({
//     baseURL: GITHUB_URL,
//     headers: { Authorization: `token ${GITHUB_TOKEN}` }, //this is will used if i want to use headers ...
// })

const github = axios.create({
    baseURL: GITHUB_URL,
})

export const searchUsers = async (text) => {
    //setLoading() function will be called just before calling this searchUsers function
    const params = new URLSearchParams({
        q: text,
    });
  
    const response = await github.get(`/search/users?${params}`)
    //the reponse contains a data array and data array contains items array...
    return response.data.items

    //const response = await fetch(`${GITHUBURL}/search/users?${params}`);
    //const { items } = await response.json(); //destructing
    //return items
};


// Get user and repos
export const getUserAndRepos = async (login) => {
    //Promise.all is used when we are trying to get data from more than one request action ...
    //destructing the array result returned ...in this case 2 request is made once ..
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}`),
      github.get(`/users/${login}/repos`),
    ])
  
    return { user: user.data, repos: repos.data }  //returning an object...

}

/**
 * When import a function as a component ...
 * we use {} e.g import {searchUsers} from './components/github'
 * because its a defaut export.....
 * keep this in mind as well..
 * 
 * The below function is optimized into one function above
 * 
 * //Get a single user information ..
export const getUser = async (login) => {

    const response = await fetch(`${GITHUBURL}/users/${login}`);

    if (response.status === 404) {
        window.location = "/notfound"; //redirect it to notFound Page ..
    } else {
        const data = await response.json();
        return data
    }
};

//Get a user respos..its a expecting a parameter (username)
export const getUserRepos = async (login) => {

    const params  = new URLSearchParams ({
        sort: 'created', 
        per_page: 5,
    })
    const response = await fetch(`${GITHUBURL}/users/${login}/repos?${params}`);
    const data = await response.json();
    //send an action to GithubReducer
    return data
};
 */