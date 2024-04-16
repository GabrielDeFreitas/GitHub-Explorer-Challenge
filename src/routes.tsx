import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Import from './pages/Import';
import Home from './pages/Home';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/import" element={<Import />} />
      </Routes>
    </BrowserRouter>
  );
}
