const sandwich = [
	{
		id: 1,
		name: 'Sandwich',
		items: [
			{
				itemId: '1s',
				name: 'Bread',
				completed: 'yes',
				completedBy: 'Robert',
				price: 3
			},
			{
				itemId: '2s',
				name: 'Butter',
				completed: 'no',
				completedBy: '',
				price: null
			}
		]
	}
];

const bolognese = [
	{
		id: 2,
		name: 'Bolognese',
		items: [
			{
				itemId: '1b',
				name: 'Pasta',
				completed: 'yes',
				completedBy: 'Louis',
				price: 4
			},
			{
				itemId: '2b',
				name: 'Tomato',
				completed: 'no',
				completedBy: '',
				price: null
			}
		]
	}
];

export { sandwich, bolognese };
