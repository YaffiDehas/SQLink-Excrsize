import React, {Component} from 'react';
import {connect} from 'react-redux';
import "bulma/css/bulma.min.css"
import {filterByValue, loadData, loadExactPage, loadNewPage, sortByAlphabet, sortByScore} from "../redux/projects";
import Score from "../component/Score";
import Status from "../component/Status";
import UserInfo from "../component/UserInfo";

class ProjectsList extends Component {

    // componentDidMount() {
    //     const params = new URLSearchParams(window.location.search);
    //     const pageQueryParam = params.get('page');
    //     if (!pageQueryParam) {
    //         window.history.pushState({page: 1}, "title 1", "?page=1");
    //     } else {

    //     }
    //     this.props.dispatch(loadData({count: 40}));
    // }

    filterByInput(e){
        let input = e.target.value;
        this.props.dispatch(filterByValue({value: input}))
    }

    nextPage() {
        this.props.dispatch(loadNewPage({page: 1}))
    }

    previousPage() {
        this.props.dispatch(loadNewPage({page: -1}));
    }

    goToPage(page) {
        this.props.dispatch(loadExactPage({page}))
    }

    sortByInput(e){
        let value = e.target.value;
        let direction = value.endsWith('asc') ? "asc" : "desc";

        if (value.startsWith('score')){
            this.props.dispatch(sortByScore({direction}))
        }else {
            this.props.dispatch(sortByAlphabet({direction}));
        }
    }

    render() {
        const {filteredProjects, filteredPages, currentPage, loginUser} = this.props;
        return (
            <div className="App">
                {/* <UserInfo loginUser={loginUser}/> */}
                <Status projects={filteredProjects} />
                <section className='section'>
                    <div className='container'>
                        <nav className="pagination" role="navigation" aria-label="pagination">
                            <button className="button pagination-previous" onClick={() => {
                                this.previousPage()
                            }}>Previous
                            </button>
                            <button className="button pagination-next" onClick={() => {
                                this.nextPage()
                            }}>Next page
                            </button>
                            <ul className="pagination-list">
                                {
                                    [...Array(filteredPages)].map((value, index) => (
                                        <button
                                            className={`button pagination-link ${currentPage === index + 1 ? "is-current" : ""}`}
                                            aria-label="Page 1"
                                            onClick={() => this.goToPage(index + 1)}
                                            aria-current="page">
                                            {index + 1}
                                        </button>
                                    ))
                                }
                            </ul>
                        </nav>

                    </div>
                </section>
                <section className='section'>
                    <div className='container'>
                        <div>
                            <div className="field is-grouped" style={{alignItems: "center"}}>
                                <div className="control">
                                    <div className="select">
                                        <select onChange={e => {
                                            this.sortByInput(e)
                                        }}>
                                            <option value="" disabled selected>Sort by</option>

                                            <option value='alphabet_asc'>Name - A-Z</option>
                                            <option value='alphabet_desc'>Name - Z-A</option>

                                            <option value='price_asc'>Score - Lowest to Highest</option>
                                            <option value='price_desc'>Score - Highest to Lowest</option>

                                        </select>
                                    </div>
                                </div>

                                <div className='control' style={{minWidth: "300px"}}>
                                    <input onChange={e => {
                                        this.filterByInput(e);
                                    }} style={{width: "100%"}} placeholder='Filter by' type='text'/>
                                </div>
                            </div>
                        </div>
                        <div className='tile is-ancestor' style={{flexWrap: "wrap"}}>
                            {
                                filteredProjects && filteredProjects.length && filteredProjects.map(project => (
                                    <div className='tile is-parent is-3'>
                                        <div className='tile is-child box'>
                                        <p>
                                            <b>Name: </b>
                                            {project.name}
                                        </p>
                                        <p>
                                            <Score score={project.score}/>
                                        </p>
                                        <p>
                                            <b>durationInDays: </b>
                                            {project.durationInDays}
                                        </p>
                                        <p>
                                            <b>bugsCount: </b>
                                            {project.bugsCount}
                                        </p>
                                        <p>
                                            <b>madeDadeline: </b>
                                            <input type="checkbox" name="vehicle3" value="Boat" checked={project.madeDadeline} />
                                        </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        loginUser: state.user.loginUser,
        filteredProjects: state.projects.filteredProjects,
        filteredPages: state.projects.filteredPages,
        currentPage: state.projects.currentPage
    };
}

export default connect(mapStateToProps)(ProjectsList);
