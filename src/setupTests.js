// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// JSDOM does not implement CanvasRenderingContext2D. Our UI uses <canvas> for the
// bathroom preview; for unit tests we stub the minimal API we touch.
// This prevents noisy "Not implemented: HTMLCanvasElement.prototype.getContext"
// console errors during tests.
HTMLCanvasElement.prototype.getContext = function getContext() {
  const gradientStub = () => ({ addColorStop: jest.fn() });

  return {
    canvas: this,
    // state
    fillStyle: null,
    strokeStyle: null,
    lineWidth: 1,
    font: "",
    textAlign: "start",
    textBaseline: "alphabetic",
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "low",
    // methods used by our renderer
    setTransform: jest.fn(),
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    clip: jest.fn(),
    stroke: jest.fn(),
    fill: jest.fn(),
    drawImage: jest.fn(),
    fillText: jest.fn(),
    createRadialGradient: gradientStub,
    createLinearGradient: gradientStub,
    createPattern: jest.fn(() => ({})),
  };
};
