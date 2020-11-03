export class TaksError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TaksError';
  }
}
