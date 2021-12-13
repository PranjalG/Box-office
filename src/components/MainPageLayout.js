import React from 'react';
import Navs from './Navs';
import Title from './Title';

function MainPageLayout({ children }) {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="Are you searching a movie or character?"
      />
      <Navs />
      {children}
    </div>
  );
}

export default MainPageLayout;
