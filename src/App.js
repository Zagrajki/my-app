import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom';
//import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                    <Header />
                    <Main />
            </div>
        </BrowserRouter>
    );
    /*<Footer />
  return (
    <Router basename={process.env.PUBLIC_URL}>
        <DummyContext.Provider value={value}>
    <header>
        <p>Dzień dobry! Mam nadzieję, że można korzystać z pańskiego szablonu ;)</p>
        <p>Aby zatwierdzić wpisane dane, proszę nacisnąć ENTER</p>
        Wyszukiwanie po tagach działa tak, że tagi są oddzielane spacją i przy wyszukiwaniu choć 1 musi się zgadzać.
    </header>
    <main>
        <nav>
            {message && <NavLink to="/" exact>Lista wszystkich</NavLink>}
            {message && <NavLink to="/wyswietl">Wyszukaj</NavLink>}
            {message && <NavLink to="/dodaj">Dodaj</NavLink>}
            {!message && <NavLink to="/zaloguj">Zaloguj</NavLink>}
            {!message && <NavLink to="/zarejestruj">Zarejestruj</NavLink>}
            {message && <NavLink to="/wyloguj">Wyloguj</NavLink>}
        </nav>
      <Main message={message}/>
    </main>
    <footer></footer>
        </DummyContext.Provider>
</Router>
  );
     */
}

export default App;
