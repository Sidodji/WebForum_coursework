import React, {useEffect} from "react";
import useActions from "../helpers/hooks/useActions";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

const Topic = (props) => {
    const redux = useActions();
    const token = localStorage.getItem('token');
    useEffect(() => {
        (async () => {
            if (token) {
                await fetch('/topic', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(data => data.json())
                    .then(topics => {
                        redux.getTopics(topics);
                    })
            }
        })()
    }, [])
    const {topics} = useSelector(state => state.topic);

    return (
        <div className="main_content">
            <div className="info">
                <h2>Topics</h2>
                <ul className="list-group">
                    {topics && topics.map((topic, index) => (
                        <li key={index} className="list-group-item">
                            <div id="list-span">
                                <span id="span_username">{topic.name}</span>
                            </div>
                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                <NavLink to={`/topic/${topic.name}`} exact
                                         className="btn btn-outline-primary">Show</NavLink>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Topic;
