export const sandwich = [
  {
    id: '1',
    name: 'Sandwich',
    items: [
      {
        itemId: '1s',
        name: 'Bread',
        completed: false,
        completedBy: '',
        price: null,
      },
      {
        itemId: '2s',
        name: 'Butter',
        completed: false,
        completedBy: '',
        price: null,
      },
    ],
  },
];

export const bolognese = [
  {
    id: '2',
    name: 'Bolognese',
    items: [
      {
        itemId: '1b',
        name: 'Pasta',
        completed: true,
        completedBy: 'Louis',
        price: 4,
      },
      {
        itemId: '2b',
        name: 'Tomato',
        completed: false,
        completedBy: '',
        price: null,
      },
    ],
  },
];

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
