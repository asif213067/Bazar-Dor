import React, { Suspense } from 'react'
import Navbar from './header/Navbar'
import PriceMarquee from './header/PriceMarquee'
import PriceMarqueeSkeleton from './header/PriceMarqueeSkeleton';

const Header = () => {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<PriceMarqueeSkeleton />}>
        <PriceMarquee />
      </Suspense>
    </div>
  );
}

export default Header