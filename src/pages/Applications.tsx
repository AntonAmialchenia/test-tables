import {FC} from 'react';

interface ApplicationsProps {
  className?:string
}

export const Applications:FC<ApplicationsProps> = (props) => {
  const {className} = props
  return <div className={className}>Applications</div>;
};