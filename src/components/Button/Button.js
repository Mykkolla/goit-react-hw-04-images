import React from 'react';
import '../../styles.css';

const Button = ({ onClick }) => (
  <div>
    <button className="Button" type="button" onClick={onClick}>
      Load more
    </button>
  </div>
);

export default Button;
