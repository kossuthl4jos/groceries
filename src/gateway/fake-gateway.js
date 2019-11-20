const sandwich = [
	{
		id: '1',
		name: 'Sandwich',
		items: [
			{
				itemId: '1s',
				name: 'Bread',
				completed: true,
				completedBy: 'Robert',
				price: 3
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

export { sandwich, bolognese };
