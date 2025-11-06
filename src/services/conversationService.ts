
/**
 * A simple in-memory session store for managing user conversation states.
 * In production, replace with Redis or MongoDB.
 */

interface UserSession {
  state: string;
  data?: Record<string, any>;
}

// Map<userPhoneNumber, UserSession>
const sessions = new Map<string, UserSession>();

/**
 * Get a user's current conversation state.
 */
export function getUserState(userId: string): string | undefined {
  return sessions.get(userId)?.state;
}

/**
 * Set or update a user's conversation state.
 */
export function setUserState(userId: string, state: string, data: Record<string, any> = {}): void {
  const existing = sessions.get(userId) || { state: "", data: {} };
  sessions.set(userId, { ...existing, state, data });
}

/**
 * Retrieve data stored for the user (like trip distance, etc.).
 */
export function getUserData(userId: string): Record<string, any> | undefined {
  return sessions.get(userId)?.data;
}

/**
 * Update partial data for the user (e.g., add trip distance before consumption).
 */
export function updateUserData(userId: string, newData: Record<string, any>): void {
  const existing = sessions.get(userId);
  if (!existing) return;
  sessions.set(userId, { ...existing, data: { ...existing.data, ...newData } });
}

/**
 * Clear user session (reset conversation).
 */
export function clearUserState(userId: string): void {
  sessions.delete(userId);
}
