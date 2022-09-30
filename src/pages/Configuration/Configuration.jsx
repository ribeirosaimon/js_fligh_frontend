import React, {useEffect, useState} from "react";
import {HttpGetAxios, HttpPostAxios} from "../../http/HttpBasicAxios";
import {ErrorToast, SuccessToast} from "../../components/Toasty/Toasty";


const Configuration = () => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    function getAllUsers(){
        HttpGetAxios("/user")
            .then(resp => {
                setAllUsers(resp.data)
            })
    }

    function promoteToAdmin(id, username) {
        HttpPostAxios("/user/" + id + "/promoted")
            .then(() => {
                SuccessToast(username + " is admin now!")
                getAllUsers()
            })
            .catch(() => {
                ErrorToast("Have a problem with API")
            })
    }

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
            </tr>
            </thead>
            <tbody>
            {allUsers.map((user, index) => (
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{user._id}</td>
                    <td>{user.name + " " + user.lastName}</td>
                    <td>{user.username}</td>
                    <td>{user.roles.includes("ADMIN") === true ?
                        <button type="button" className="btn btn-success">Admin</button>
                        :
                        <button type="button" className="btn btn-secondary"
                                onClick={() => promoteToAdmin(user._id, user.username)}>Admin</button>
                    }</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Configuration