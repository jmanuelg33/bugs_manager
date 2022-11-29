import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import Summary from './components/Summary';
import RegisterBug from './components/RegisterBug';
import BugsDetails from './components/BugsDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route path="" element={<Summary />} />
        <Route path="register" element={<RegisterBug />} />
        <Route path="bugs" element={<BugsDetails />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
