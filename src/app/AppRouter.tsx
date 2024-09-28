import { Route, Routes } from 'react-router-dom';
import { LayoutApp } from './LayoutApp';
import { AppRoutes } from '../shared';
import { lazy, Suspense } from 'react';

const Applications = lazy(() => import('../pages/Applications'));
const Archive = lazy(() => import('../pages/Archive'));

export function AppRouter() {
  return (
    <Routes>
      <Route path={AppRoutes.HOME} element={<LayoutApp />}>
        <Route
          path={AppRoutes.APPLICATIONS}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Applications />
            </Suspense>
          }
        />
        <Route
          path={AppRoutes.ARCHIVE}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Archive />
            </Suspense>
          }
        />
      </Route>
      <Route path={AppRoutes.NOT_FOUND} element={<div>404</div>} />
    </Routes>
  );
}
