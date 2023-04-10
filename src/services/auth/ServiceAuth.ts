import User from "../../models/user";

export interface ServiceAuth {
  googleSign(): Promise<boolean>;

  getCurrentUser(): Promise<User | undefined>;

  isUserLoggedIn(): Promise<boolean>;
}
