import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../shared';
import { Layout } from 'antd';

export const LayoutApp: FC = () => {
  return (
    <Layout className="h-screen w-screen p-5">
      <Header />
      <main>
        <Outlet />
      </main>
    </Layout>
  );
};
