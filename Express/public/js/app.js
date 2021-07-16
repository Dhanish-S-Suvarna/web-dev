const App = () => {
	const [users, setUsers] = React.useState([]);

	const [form, setForm] = React.useState({
		name: '',
		salary: '',
	});

	React.useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const res = await fetch('/api/users');
		const data = await res.json();
		setUsers(data);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.salary) {
			return;
		}
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
		});
		const data = await res.json();
		fetchUsers();
		setForm({ name: '', salary: '' });
	};

	const updateForm = (event, field) => {
		setForm({
			...form,
			[field]: event.target.value,
		});
	};

	const deleteUser = async (userId) => {
		const res = await fetch(`/api/users/${userId}`, {
			method: 'DELETE',
		});
		const data = fetchUsers();
		console.log(data);
	};

	return (
		<>
			<div className='card'>
				<div className='card-header'>Add a User</div>
				<div className='card-body'>
					<form onClick={handleSubmit}>
						<input
							type='text'
							value={form.name}
							placeholder='User name...'
							className='form-control mt-3'
							onChange={() => updateForm(event, 'name')}
						/>
						<input
							type='text'
							value={form.salary}
							placeholder='User salary...'
							className='form-control mt-3'
							onChange={() => updateForm(event, 'salary')}
						/>
						<button type='submit' className='btn btn-primary mt-3'>
							Submit
						</button>
					</form>
				</div>
			</div>
			<ul className='list-group mt-4 mb-5'>
				{users.map((user) => (
					<li
						key={user.id}
						className='list-group-item d-flex justify-content-between align-items-center'
					>
						<div>
							<strong>Name : </strong>
							{user.name}
							<strong> Salary : </strong>${user.salary}
						</div>
						<button
							className='btn'
							onClick={() => deleteUser(user.id)}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-trash'
								viewBox='0 0 16 16'
							>
								<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
								<path
									fillRule='evenodd'
									d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
								/>
							</svg>
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
