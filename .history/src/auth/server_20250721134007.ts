

export async function getUser() {
  // Simule un "fetch" côté front
  const data = {
    user: {
      name: "lamat med",
      email: "lmt@gmail.com"
    }
  };

  return data.user;
}