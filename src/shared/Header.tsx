import { Flex } from 'antd';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="flex items-center justify-between py-5">
      Header
      <Flex align="center" gap={10}>
        <Link to="/applications">Журнал заявок</Link>
        <Link to="/archive">Архив заявок</Link>
      </Flex>
    </header>
  );
};
