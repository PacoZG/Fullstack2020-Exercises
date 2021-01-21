import React from 'react';

const Header: React.FC<{ course: string }> = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

export default Header;