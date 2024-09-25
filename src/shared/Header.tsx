import { Flex } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = (props) => {
  const { className } = props;
  return (
    <Flex justify="space-between" className={className}>
      Header
      <Flex align="center" gap={10}>
        <Link to="/applications">Журнал заявок</Link>
        <Link to="/archive">Архив заявок</Link>
      </Flex>
    </Flex>
  );
};
