import React, { FC } from 'react';
import { Box, Paper, Typography } from '@material-ui/core';

import InternalLink from './InternalLink';

export interface IProps {
  title: string;
  description: string;
  href: string;
}

const EntityLink: FC<IProps> = ({ title, description, href }) => {

  return (
    <Box p={1}>
      <Paper>
        <Box p={1}>
          <InternalLink href={href} variant="h5">{title}</InternalLink>
          {!!description && <Typography>{description}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
}

export default EntityLink;
