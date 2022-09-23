import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {HttpDeleteAxios, HttpGetAxios, HttpPostAxios, HttpPutAxios} from "../../http/HttpBasicAxios";
import "./style.css"
import {DangerToast, ErrorToast, SuccessToast} from "../../components/Toasty/Toasty";

const WhoIsMe = () => {
    const {loggedUser, signout} = useAuth()
    const [profile, setMyProfile] = useState({})

    const [confirmationDeleteUser, setConfirmationDeleteUser] = useState(false)
    const [confirmationChangePassword, setConfirmationChangePassword] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    useEffect(() => {
        HttpGetAxios("/user/" + loggedUser.userId)
            .then(resp => {
                setMyProfile(resp.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function deleteMyUser() {
        if (!oldPassword) {
            DangerToast("You need write your password")
            return
        }
        DangerToast("Wait a moment")
        HttpPostAxios("/user/verify-password", {"password": oldPassword})
            .then(() => {
                HttpDeleteAxios("/user/" + loggedUser.userId, {"password": newPassword})
                    .then(() => signout())
            })
            .catch(() => {
                ErrorToast("You password is incorrect")
            })
    }

    function changeMyPassword() {
        DangerToast("Wait a moment")
        if (!newPassword | !confirmNewPassword | !oldPassword) {
            DangerToast("You need complet all fields")
            return
        }
        if (newPassword !== confirmNewPassword) {
            DangerToast("Confirm your password")
            return
        }

        HttpPostAxios("/user/verify-password", {"password": oldPassword})
            .then(() => {
                HttpPutAxios("/user/" + loggedUser.userId, {"password": newPassword})
                    .then(() => {
                        SuccessToast("You have a new password")
                    })
            })
            .catch(() => {
                ErrorToast("You old password is incorrect")
            })
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
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
            {confirmationDeleteUser ?
                <div>
                    <div className={"d-flex justify-content-center profile-card"}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Confirm password: </label>
                            <input type="password" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Password" onChange={(e) => setOldPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-center profile-card"}>Are you sure?</div>
                    <div className={"d-flex justify-content-center profile-card"}>
                        <a className="btn btn-danger mx-2" onClick={deleteMyUser}>Yes, delete my account</a>
                        <a className="btn btn-primary mx-2" onClick={() => setConfirmationDeleteUser(false)}>No</a>
                    </div>
                </div>
                : <></>}
            {!confirmationDeleteUser && confirmationChangePassword ?
                <div>
                    <div className={"d-flex justify-content-center profile-card"}>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Old password: </label>
                            <input type="password" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Old password" onChange={(e) => setOldPassword(e.target.value)}/>
                            <label htmlFor="exampleFormControlInput1">New password: </label>
                            <input type="password" className="form-control" id="exampleFormControlInput1"
                                   placeholder="New password" onChange={(e) => setNewPassword(e.target.value)}/>
                            <label htmlFor="exampleFormControlInput1">Confirm password: </label>
                            <input type="password" className="form-control" id="exampleFormControlInput1"
                                   placeholder="Confirm password"
                                   onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            <div className={"d-flex justify-content-center profile-card"}>
                                <a className="btn btn-success mx-2" onClick={changeMyPassword}>Change Password</a>
                                <a className="btn btn-primary mx-2"
                                   onClick={() => setConfirmationChangePassword(false)}>Cancel</a>
                            </div>

                        </div>
                    </div>
                </div>
                : <></>}
        </>

    )
}

export default WhoIsMe