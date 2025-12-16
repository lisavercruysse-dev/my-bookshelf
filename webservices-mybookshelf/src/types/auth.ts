export interface JwtPayload {
  sub: number;
  userName: string;
  email: string;
  roles: string[];
}

export interface Session {
  id: number;
  email: string;
  roles: string[];
}
