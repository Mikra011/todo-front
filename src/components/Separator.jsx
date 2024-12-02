import React from 'react';

const Separator = ({ color = "#ccc", thickness = "1px"}) => {
  return (
    <hr style={{ width: '100%', border: `0`, borderTop: `${thickness} solid ${color}`}} />
  );
};

export default Separator;
