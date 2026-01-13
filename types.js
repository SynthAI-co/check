// 1. Interfaces are removed entirely because JavaScript 
// does not support them. They are only for development-time checks.

// 2. Enums are converted to a standard JavaScript object.
// We use 'export const' so other files can import it.
export const AppState = {
  FORM: 'FORM',
  INITIALIZING: 'INITIALIZING',
  RESPONSE: 'RESPONSE'
};

// Optional: prevent the object from being changed
Object.freeze(AppState);
