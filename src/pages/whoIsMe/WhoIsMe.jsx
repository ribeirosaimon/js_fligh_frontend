import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {HttpDeleteAxios, HttpGetAxios} from "../../http/HttpBasicAxios";
import "./style.css"

const WhoIsMe = () => {
    const {loggedUser, signout} = useAuth()
    const [profile, setMyProfile] = useState({})
    const [confirmationDeleteUser, setConfirmationDeleteUser] = useState(false)
    const [confirmationChangePassword, setConfirmationChangePassword] = useState(false)


    useEffect(() => {
        HttpGetAxios("/user/" + loggedUser.userId)
            .then(resp => {
                setMyProfile(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    function deleteMyUser(){
        console.log("clicou")
    }

    function changeMyPassword(){

    }

    return (
        <>
            <div className={"d-flex justify-content-center profile-card"}>
                <div className="card ">
                    <h5 className="card-header">Welcome {profile.username}</h5>
                    <div className="card-body">
                        <h5 className="card-title">{profile.name + " " + profile.lastName}</h5>
                        <p className="card-text">I'm a {loggedUser.userRole} in this site</p>
                        <a href="#" className="btn btn-primary mx-2" onClick={() => {
                            setConfirmationChangePassword(true)
                            setConfirmationDeleteUser(false)
                        }}>Change my password</a>
                        <a href="#" className="btn btn-danger" onClick={() => {
                            setConfirmationChangePassword(false)
                            setConfirmationDeleteUser(true)
                        }}>Delete my User</a>
                    </div>
                </div>
            </div>
            { confirmationDeleteUser ?
                <div >
                    <div className={"d-flex justify-content-center profile-card"}>Are you sure?</div>
                    <div className={"d-flex justify-content-center profile-card"}>
                        <a className="btn btn-danger mx-2" onClick={deleteMyUser}>Yes, delete my account</a>
                        <a className="btn btn-primary mx-2" onClick={() => setConfirmationDeleteUser(false)}>No</a>
                    </div>
                </div>
                : <></>}
            { !confirmationDeleteUser && confirmationChangePassword ?
                <div >
                    <div className={"d-flex justify-content-center profile-card"}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Password: </label>
                            <input type="password" className="form-control" id="exampleFormControlInput1"
                                   placeholder="password"/>
                            <div className={"d-flex justify-content-center profile-card"}>
                                <a className="btn btn-success mx-2" onClick={deleteMyUser}>Change Password</a>
                                <a className="btn btn-primary mx-2" onClick={() => setConfirmationChangePassword(false)}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>}
        </>

    )
}

export default WhoIsMe