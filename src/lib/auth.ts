import { db } from "@/lib/db";

// Lightweight cookie-based session management.
// For production, swap in NextAuth.js or JWT with proper secrets.

const SESSION_COOKIE = "biztra_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function getSessionCookie() {
  return SESSION_COOKIE;
}

export function getSessionMaxAge() {
  return SESSION_MAX_AGE_SECONDS;
}

// Validate admin credentials against the database
export async function validateCredentials(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user) return false;
    if (user.role !== "ADMIN") return false;
    // Plain-text comparison for demo purposes.
    // In production, hash passwords with bcrypt/argon2.
    return user.password === password;
  } catch (error) {
    console.error("validateCredentials error:", error);
    return false;
  }
}

// Generate a simple session token (in production, use a JWT or signed token)
export function generateSessionToken(email: string): string {
  // Simple base64 encoding for demo — NOT cryptographically secure.
  // Replace with a proper JWT or signed cookie value in production.
  const payload = JSON.stringify({
    email,
    issued: Date.now(),
    expires: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  });
  return Buffer.from(payload).toString("base64");
}

// Validate a session token and return the user email if valid
export function validateSessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const payload = JSON.parse(decoded) as {
      email: string;
      issued: number;
      expires: number;
    };
    if (Date.now() > payload.expires) return null;
    return payload.email;
  } catch {
    return null;
  }
}
