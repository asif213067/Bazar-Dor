import React from 'react'

const NavLinksSkeleton = () => {
  return (
    <nav
      aria-label="Loading categories"
      className="flex h-10 items-center gap-4 overflow-hidden border-t border-gray-100 px-3"
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="h-4 w-14 shrink-0 animate-pulse rounded bg-gray-200"
        />
      ))}
    </nav>
  );
}

export default NavLinksSkeleton