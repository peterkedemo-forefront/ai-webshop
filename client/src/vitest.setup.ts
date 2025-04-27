import '@testing-library/jest-dom';
// Mock window.matchMedia for Mantine and other UI libraries
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function (query: string): MediaQueryList {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}
