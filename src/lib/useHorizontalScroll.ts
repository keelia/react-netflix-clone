import { useEffect, type RefObject } from 'react';

const usehPRorizontalScroll = (containerRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const el = containerRef.current;
    if (el == null) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY,
        behavior: 'smooth',
      });
    };

    el.addEventListener('wheel', onWheel);
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return { containerRef };
};

export default usehPRorizontalScroll;
