import './App.css';
import Header from './components/Header';
import Location from './components/Location';
import { Switch, Route } from 'react-router-dom';
import Favorites from './components/Favorites';


const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/favorites' component={Favorites}/>
        <Route path='/' exact component={Location}/>
      </Switch>
    </div>
  );
}

export default App;
