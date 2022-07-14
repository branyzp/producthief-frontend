import axios from 'axios';
import { count } from 'console';
import React, { useEffect, useState } from 'react';

interface Props {
	todoapi: string;
}
interface todo {
	id: number;
	title: string;
	description: string;
	completed: boolean;
}

const Blog = ({ todoapi }: Props) => {
	const [todos, setTodos] = useState<todo[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			await axios({
				method: 'get',
				url: todoapi,
			})
				.then((res) => setTodos(res.data))
				.catch((err) => console.log(err));
		};
		fetchData();
	}, []);

	console.log(todos);

	return (
		<div>
			<h1 className="pagetext">
				Total Focuses: {todos.length} <br />
			</h1>
		</div>
	);
};

export default Blog;
