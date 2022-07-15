import { Route, Routes } from 'react-router-dom';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}
