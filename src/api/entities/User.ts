export type Role = "technician" | "supervisor";

export interface User {
  id: string;
  name: string;
  role: Role;
}
