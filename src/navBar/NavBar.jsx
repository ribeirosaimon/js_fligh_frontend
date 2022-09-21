import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const {signout} = useAuth()

    function handleNavBar() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Cheap Flight</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/cheap-flight"> Cheap Ticket</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/all-flight">All Ticket</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Configuration</a>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-outline-success mx-2" type="submit" >
                        <a className="nav-link" href="/whoisme">Who is Me</a>
                </button>
                <button className="btn btn-outline-danger mx-2"  type="submit" href={"/"}
                        onClick={() => signout()}>Logout
                </button>
            </nav>
        )
    }

    return (
        handleNavBar()
    )
}


export default NavBar