"use client";

import { useRef, useState } from "react";
import type { ReactNode, UIEvent } from "react";

interface CategoryNavScrollerProps {
  children: ReactNode;
}

const CategoryNavScroller = ({ children }: CategoryNavScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = (element: HTMLDivElement) => {
    setCanScrollLeft(element.scrollLeft > 1);

    setCanScrollRight(
      element.scrollLeft + element.clientWidth < element.scrollWidth - 1,
    );

    setHasOverflow(element.scrollWidth > element.clientWidth + 1);
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    updateScrollState(event.currentTarget);
  };

  const scroll = (direction: "left" | "right") => {
    const element = scrollRef.current;

    if (!element) return;

    element.scrollBy({
      left: direction === "left" ? -160 : 160,
      behavior: "smooth",
    });
  };

  return (
    <nav
      aria-label="Product categories"
      className="flex h-10 items-center border-t border-gray-100 px-1"
    >
      {/* Left arrow: mobile only */}
      {hasOverflow && (
        <button
          type="button"
          aria-label="Scroll categories left"
          disabled={!canScrollLeft}
          onClick={() => scroll("left")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xl text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 sm:hidden"
        >
          &#8249;
        </button>
      )}

      {/* Scrollable category links */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onLoad={() => {
          if (scrollRef.current) {
            updateScrollState(scrollRef.current);
          }
        }}
        className="min-w-0 flex-1 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max min-w-full items-center gap-1 sm:gap-3">
          {children}
        </div>
      </div>

      {/* Right arrow: mobile only */}
      {hasOverflow && (
        <button
          type="button"
          aria-label="Scroll categories right"
          disabled={!canScrollRight}
          onClick={() => scroll("right")}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xl text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30 sm:hidden"
        >
          &#8250;
        </button>
      )}
    </nav>
  );
};

export default CategoryNavScroller;
