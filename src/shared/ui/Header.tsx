import { Button, Flex } from 'antd';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../enums';

const HOME = 'Главная';
const ARCHIVE = 'Архив документов';
const APPLICATIONS = 'Архив заявок';

export const Header = () => {
  const { pathname } = useLocation();

  const [isAuth, setIsAuth] = useState(false);
  const handleToggleAuth = () => setIsAuth((prev) => !prev);

  const getTitle = () => {
    switch (pathname) {
      case AppRoutes.HOME:
        return HOME;
      case AppRoutes.APPLICATIONS:
        return APPLICATIONS;
      case AppRoutes.ARCHIVE:
        return ARCHIVE;
      default:
        return '';
    }
  };

  return (
    <header className="flex items-center justify-between py-5">
      <h2 className="text-lg font-semibold">{getTitle()}</h2>
      <Flex gap={20} align="center">
        {isAuth && (
          <Flex align="center" gap={10}>
            <Link to={AppRoutes.APPLICATIONS}>{APPLICATIONS}</Link>
            <Link to={AppRoutes.ARCHIVE}>{ARCHIVE}</Link>
          </Flex>
        )}
        <Button onClick={handleToggleAuth}>{isAuth ? 'Выйти' : 'Войти'}</Button>
      </Flex>
    </header>
  );
};
