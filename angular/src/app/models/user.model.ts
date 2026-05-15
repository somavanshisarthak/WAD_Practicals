/** Shape of a user saved in localStorage (includes password for demo only). */
export interface UserRecord {
  name: string;
  email: string;
  password: string;
}

/** What we keep in session after login (no password). */
export interface UserSession {
  name: string;
  email: string;
}
