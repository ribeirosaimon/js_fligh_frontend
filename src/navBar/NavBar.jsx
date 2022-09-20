import useAuth from "../hooks/useAuth";

const NavBar = () => {
    const {signout} = useAuth()

    return(
        <div>
            <ul>
                <li>
                    <a href={"/"}>
                        Home
                    </a>
                </li>
                <li>
                    <a href={"/cheap-flight"}>
                        Passagens Baratas
                    </a>
                </li>
                <li>
                    <a href={"/all-flight"}>
                        Todas Passagens
                    </a>
                </li>
                <li>
                    <a href={"/"} onClick={() => signout()}>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    )
}


export default NavBar