import React, { FC } from 'react';
import { Link } from "react-router-dom";

export interface IProps {
  title: string;
  description: string;
  href: string;
}

const EntityLink: FC<IProps> = ({ title, description, href }) => {
  
  return (
    <div>
      <Link to={href}>
        <h3>{title}</h3>
      </Link>
      <p>{description}</p>
    </div>
  );
}

export default EntityLink;
