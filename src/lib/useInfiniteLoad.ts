import { useEffect, useRef } from 'react';

export interface UseInfiniteLoadOptions {
  threshold?: number | number[];
}

/**
 * Generic infinite load hook.
 * ContainerEl = scrollable root element type
 * SentinelEl = the element to observe for intersection
 */

const useInfiniteLoad = <
  ContainerEl extends HTMLElement = HTMLUListElement,
  SentinelEl extends HTMLElement = HTMLLIElement,
>(
  onLoad?: () => void,
  { threshold = 0.1 }: UseInfiniteLoadOptions = {}
) => {
  const containerRef = useRef<ContainerEl>(null);
  const sentinelRef = useRef<SentinelEl>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasObserveredRef = useRef(false);

  useEffect(() => {
    if (hasObserveredRef.current) return;
    if (!containerRef.current || !sentinelRef.current) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onLoad && onLoad();
          }
        });
      },
      { threshold, root: containerRef.current }
    );
    observerRef.current.observe(sentinelRef.current);
    hasObserveredRef.current = true;
    return () => {
      observerRef.current?.disconnect();
      hasObserveredRef.current = false;
    };
  }, [onLoad]);

  return {
    containerRef,
    sentinelRef,
  };
};

export default useInfiniteLoad;
