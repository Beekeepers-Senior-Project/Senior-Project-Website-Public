import { Navbar } from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Agendas from './components/Agendas';
import TeamOverview from './components/TeamOverview';
import TimeTracking from './components/TimeTracking';

function App() {
  return (
    <div className="light bg-background">
      <Navbar />
      <Routes>
        <Route path="/Senior-Project-Website-Public" element={<Landing />} />
        <Route path="/Senior-Project-Website-Public/agendas" element={<Agendas />} />
        <Route path="/Senior-Project-Website-Public/team" element={<TeamOverview />} />
        <Route path="/Senior-Project-Website-Public/time" element={<TimeTracking />} />
      </Routes>
    </div>
  );
}

export default App;


