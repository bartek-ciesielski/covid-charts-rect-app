import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="h5" variant="h6" color="black" style={{textAlign: 'center'}}>
      {props.children.toUpperCase()}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

