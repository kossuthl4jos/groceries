import React from 'react';
import Square from 'src/components/Square';
import renderer from 'react-test-renderer';


describe('Square', () => {
	test('Square renders value properly', () => {

		const component = renderer.create(<Square value={ 'X' }></Square>);
		let tree = component.toJSON();

		expect(tree.type).toBe('button');
		expect(tree.children).toStrictEqual([ 'X' ]);
	});
});