import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {HomePage, Serials} from '../pages';
import Header from '../header/Header';

const App = () => {

  return (
        <Router>
          <Header/>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/serials' element={<Serials/>} />
          </Routes>
        </Router>
  );
}

export default App;