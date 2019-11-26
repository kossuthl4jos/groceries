const sandwich = [
	{
		id: '1',
		name: 'Sandwich',
		items: [
			{
				itemId: '1s',
				name: 'Bread',
				completed: false,
				completedBy: '',
				price: null
			},
			{
				itemId: '2s',
				name: 'Butter',
				completed: false,
				completedBy: '',
				price: null
			}
		]
	}
];

const bolognese = [
	{
		id: '2',
		name: 'Bolognese',
		items: [
			{
				itemId: '1b',
				name: 'Pasta',
				completed: true,
				completedBy: 'Louis',
				price: 4
			},
			{
				itemId: '2b',
				name: 'Tomato',
				completed: false,
				completedBy: '',
				price: null
			}
		]
	}
];

function signUp({ userName, password }) {
	const userKey = createUserKey();
	saveData({ userKey, userName, password });

	return userKey;
};

function createUserKey() {
	return `groceries-user-key-${String(Math.random()).substring(2, 11)}`;
};

function saveData({ userKey, userName, password }) {
	const data = JSON.stringify({ userKey, userName, password });
	return localStorage.setItem(userKey, data);
};

function signIn({ userName, password }){
	for (var key in localStorage) {
		if(key.startsWith('groceries-user-key')) {
			const credentials = JSON.parse(localStorage.getItem(key));
			if (credentials.userName === userName && credentials.password === password) {
				return credentials.userKey;
			}
		}
	}

	throw new Error("User was not found");
}

export { sandwich, bolognese, signUp, signIn };
