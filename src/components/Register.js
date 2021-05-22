import { auth } from '../firebase';
import { useState} from "react";
import { Redirect } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [redirect, setRedirect] = useState(false);

    const createUserWithEmailAndPasswordHandler = () => {

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {

                auth.signInWithEmailAndPassword(email, password)
                    .then(loggedUser => {
                        loggedUser.user.updateProfile({
                            displayName: displayName,
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
                setRedirect(true);
            })
            .catch(error => {
                console.log(error);
            })
    };

    if(redirect)
        return <Redirect to="/"/>

    return (
        <div className="form">
            <label htmlFor="displayName">Wyświetlana nazwa</label>
            <div>
                <input
                    id="displayName"
                    name="username"
                    className="form-input has-hint"
                    value={displayName}
                    placeholder="Nazwa wyświetlana"
                    onChange={e => setDisplayName(e.target.value)}
                />
            </div>

            <label htmlFor="email">Email</label>
            <div>
                <input
                    id="email"
                    name="email"
                    className="form-input has-hint"
                    value={email}
                    placeholder="Nazwa wyświetlana"
                    onChange={e => setEmail(e.target.value)}
                />
                <div></div>
            </div>

            <label htmlFor="password">Hasło</label>
            <div>
                <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-input has-hint"
                    value={password}
                    placeholder="Twoje hasło"
                    onChange={e => setPassword(e.target.value)}
                />
                <div>Hasło musi zawierać co najmniej 6 znaków</div>
            </div>

            <button onClick={createUserWithEmailAndPasswordHandler}>Zarejestruj się</button>
        </div>
    )
}

export default Register;