import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(
        () => {
            const unsubscribe = auth.onAuthStateChanged((u) => {
                if (u) {
                    setUser(u);
                } else {
                    console.log("User not logged");
                    setUser(null);
                }
            });
            return () => unsubscribe();
        }
        , []);


    const logout = () => {
        auth.signOut();
    }

    if (user)
        return (
            <div className="header1">
                <NavLink to="/" exact className="nav-button">{user.displayName}</NavLink>
                <NavLink to="/add" className="nav-button">Dodaj</NavLink>
                <NavLink to="/search" exact className="nav-button">Szukaj</NavLink>
                <a href="/" className="nav-button" onClick={logout}>Wyloguj</a>
            </div>
        )

    return (
        <div className="header2">
            <NavLink to="/login" className="nav-button">Zaloguj</NavLink>
            <NavLink to="/register" className="nav-button">Zarejestruj</NavLink>
        </div>
    )

}

export default Header;
