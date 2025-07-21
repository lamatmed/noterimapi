
import { cookies } from "next/headers";

export async function getUser() {

  const { data } =


  return data.user;
}