import PropTypes from "prop-types";
import { FaEye, FaInfo, FaLink, FaStar, FaUtensils } from 'react-icons/fa'
import RepoItem from "./RepoItem";
//instead the props convention ...we are going to destructured it instead..
function RepoList({repos}) {
    return (
        <div>
            <div className="rounded-lg shadow-lg card bg-base-100">
                <div className="card-body">
                    <h2 className="text-3xl my-4 font-bold card-title">
                        Latest Respositories
                    </h2>
                    {repos.map((repo, index) => (
                        <RepoItem key={repo.id} repo={repo} />
                     ))} 
                </div>
            </div>
        </div>
    );
}

RepoList.propTypes = {
    repos: PropTypes.array.isRequired,
};
export default RepoList;
