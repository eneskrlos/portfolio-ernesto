import '@testing-library/jest-dom'

// jsdom no implementa IntersectionObserver; se define un stub global para que
// los componentes que lo usan (vía useScrollAnimation) no rompan al montarse.
// Los tests que necesitan disparar la intersección definen su propio mock.
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
