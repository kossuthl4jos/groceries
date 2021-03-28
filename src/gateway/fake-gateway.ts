function createUserKey() {
  return `groceries-user-key-${String(Math.random()).substring(2, 11)}`;
}

function saveData({
  userKey,
  userName,
  password,
}: {
  userKey: string;
  userName: string;
  password: string;
}) {
  const data = JSON.stringify({ userKey, userName, password });
  return localStorage.setItem(userKey, data);
}

export const signUp = ({ userName, password }: { userName: string; password: string }) => {
  const userKey = createUserKey();
  saveData({ userKey, userName, password });

  return { userKey, userName };
};
