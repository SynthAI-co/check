/**
 * In JavaScript, we don't use 'interface'. 
 * We simply document the expected structure of the objects.
 */

// Replacement for 'export enum AppState'
export const AppState = {
  FORM: 'FORM',
  INITIALIZING: 'INITIALIZING',
  RESPONSE: 'RESPONSE'
};

/**
 * @typedef {Object} CollaborationRequest
 * @property {string} fullName
 * @property {string} email
 * @property {string} brief
 */

/**
 * @typedef {Object} CreativeDirection
 * @property {string} visionStatement
 * @property {string} moodDescription
 * @property {Array<{title: string, description: string}>} pillars
 * @property {string[]} suggestedAesthetics
 */
