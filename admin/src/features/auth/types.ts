export type Role = "ADMIN" | "USER";

/** The authenticated user as returned by `GET /users/me`. */
export interface CurrentUser {
  id: string;
  name: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: Role;
  phone?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

/**
 * Query keys for auth. `/users/me` is the single source of truth for the current user.
 */
export const authKeys = {
  all: ["auth"] as const,
  profile: () => [...authKeys.all, "profile"] as const,
};
