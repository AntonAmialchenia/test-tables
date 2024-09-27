import { Route, Routes } from 'react-router-dom';
import { LayoutApp } from './LayoutApp';
import { Applications, Archive } from '../pages';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LayoutApp />}>
        <Route path="applications" element={<Applications />} />
        <Route path="archive" element={<Archive />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
