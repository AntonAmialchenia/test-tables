import {FC} from 'react';

interface ArchiveProps {
  className?:string
}

export const Archive:FC<ArchiveProps> = (props) => {
  const {className} = props
  return <div className={className}>Archive</div>;
};