import * as React from 'react';
import * as ReactDOM from 'react-dom';

const MapArray = ({
	from,
	mapToProps,
	children: Child
}) => (
	<React.Fragment>
		{from.map((item) =>(
			<Child {...mapToProps(item)} />
		))}
	</React.Fragment>
);

const TodoItem = ({ done, label }) => (
	<li>
		<input type="checkbox" checked={done} readOnly />
		<label>{label}</label>
	</li>
);

const list = [
	{ id: 1, done: true, title: 'Study for exam' },
	{ id: 2, done: false, title: 'Shower' },
	{ id: 3, done: false, title: 'Go to gym' }
];

const mapToProps = ({ id: key, done, title: label }) => ({
	key,
	done,
	label
});

const TodoListAPp = ({ items }) => (
	<ol>
		<MapArray from={list} mapToProps={mapToProps}>
			{TodoItem}
		</MapArray>
	</ol>
);

ReactDOM.render(
	<TodoListAPp items={list} />,
	document.querySelector('[role="main"]')
);