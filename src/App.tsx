import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Agendas from './components/Agendas';
import TeamOverview from './components/TeamOverview';
//import TimeTracking from './components/TimeTracking';

function App() {
  return (
    <div className="light bg-background">
      <Navbar />
      <Routes>
        <Route path="/Senior-Project-Website" element={<Landing />} />
        <Route path="/Senior-Project-Website/agendas" element={<Agendas />} />
        <Route path="/Senior-Project-Website/team" element={<TeamOverview />} />
        <Route path="/Senior-Project-Website/time" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;


