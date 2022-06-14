import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";
import Spinner from "../components/layout/Spinner";
import RepoList from "../components/repos/RepoList";
import { getUserAndRepos } from "../context/github/GithubActions";

//we need to have the props sent down from the ContextApi in GithubContext
function User() {
    //destructing and the picking our need props..
    const { user, repos, loading, dispatch } = useContext(GithubContext);

    const params = useParams();

    //Once this page loads then we are goin to use the useEffect hook to get the content to loads on the page. ..instantly 
    useEffect(() => {
        dispatch({type: 'SET_LOADING'}) //sets loading to true, while wait for the response from the server.
        const getUserData = async () => {
            const userData = await getUserAndRepos(params.login)
            //inside the userData payload we have user payload and repos payload...
            dispatch({type: 'GET_USER_AND_REPOS', payload: userData})
        }
        getUserData() //invoke the function ..
    }, [dispatch, params.login]); //an empty array indicated that the useEffect should run only once...


    
    //destructured the user object and get what we need from it
    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
    } = user;

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to="/" className="btn btn-ghost">
                        Back To Search
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                    {/**Profile pics information side content.. */}
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="profile pics" />
                            </figure>
                            <div className="card-body justify-end">
                                <h2 className="card-title mb-0">{name}</h2>
                                <p>{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>
                                {/**if and onlyif hireable is true */}
                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className="mt-4 card-actions">
                                <a
                                    href={html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline"
                                >
                                    Visit Github Profile
                                </a>
                            </div>
                        </div>
                         {/**if and only if location is true */}
                        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                            {location && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Location
                                    </div>
                                    <div className="text-lg stat-value">
                                        {location}
                                    </div>
                                </div>
                            )}
                            {/**personal blog or website information */}
                            {blog && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Website
                                    </div>
                                    <div className="text-lg stat-value">
                                        <a
                                            href={`https://${blog}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {blog}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {/**twitter information */}
                            {twitter_username && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Twitter
                                    </div>
                                    <div className="text-lg stat-value">
                                        <a
                                            href={`https://twitter.com/${twitter_username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {twitter_username}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/**Statistics information below .. */}
                <div className="w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl md:text-5xl" />
                        </div>
                        <div className="stat-title pr-5">Followers</div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {followers}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUserFriends className="text-3xl md:text-5xl" />
                        </div>
                        <div className="stat-title pr-5">Following</div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {following}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCodepen className="text-3xl md:text-5xl" />
                        </div>
                        <div className="stat-title pr-5">Public Repos</div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {public_repos}
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaStore className="text-3xl md:text-5xl" />
                        </div>
                        <div className="stat-title pr-5">Public Gists</div>
                        <div className="stat-value pr-5 text-3xl md:text-4xl">
                            {public_gists}
                        </div>
                    </div>
                </div>
                                
                <RepoList repos={repos}/> {/**passing repos as a prop..to RepoList Component .. */}
            
            </div>
        </>
    );
}

export default User;

/***
 * for react-router-dom version 5...we can get a prop called match to specified a parameter (params) to be access via a url
 * for v6 match won't work .. so we useParams instead .
 * 
 * The code below has been refactored into a single function above .
 * 
 * const getUserData = async () => {
        const userinfo = await getUser(params.login)
        dispatch({type: 'GET_USER', payload: userinfo})
        const userRepos =  await getUserRepos(params.login)
        dispatch({type: 'GET_REPOS', payload: userRepos})
    }
 */
