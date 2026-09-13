export interface ScrollState {
  progress: number;
  velocity: number;
  currentSection: number;
  heroProgress: number;
  culinaryProgress: number;
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  currentSection: 0,
  heroProgress: 0,
  culinaryProgress: 0,
};
