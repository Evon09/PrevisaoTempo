import { Api } from "../service/api";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }
  const user = JSON.parse(json);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await Api.post("auth/login", { email, password });

    return request.data;
  } catch {
    return null;
  }
}

export async function RegisterRequest(
  email: string,
  name: string,
  password: string
) {
  try {
    await Api.post("auth/register", { email, name, password });

    return null;
  } catch (err) {
  
    throw err;
  }
}
