import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="h5" variant="h6"
      style={{
        textAlign: 'center',
        fontSize: '1rem',
        width: '100%',
      }}>
      {props.children.toUpperCase()}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

