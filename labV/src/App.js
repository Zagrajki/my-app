import './App.css';
import Main from './components/Main'

import {BrowserRouter as Router, NavLink, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <header>
        <p>Dzień dobry! Mam nadzieję, że można korzystać z pańskiego szablonu ;)</p>
        <p>Aby zatwierdzić wpisane dane, proszę nacisnąć ENTER</p>
        Wyszukiwanie po tagach działa tak, że tagi są oddzielane spacją i przy wyszukiwaniu choć 1 musi się zgadzać.
    </header>
    <main>
        <nav>
            <NavLink to="/" exact>Lista wszystkich</NavLink>
            <NavLink to="/wyswietl">Wyszukaj</NavLink>
            <NavLink to="/dodaj">Dodaj</NavLink>
        </nav>
      <Main />
    </main>
    <footer></footer>
</Router>
  );
}

export default App;
