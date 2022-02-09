const input = document.getElementById('query');
input.addEventListener('blur', e => {
	request(document.getElementById('query').value);
});
input.addEventListener('change', e => {
	request(document.getElementById('query').value);
});
input.addEventListener('focus', e => {
	request(document.getElementById('query').value);
});
input.addEventListener('keyup', e => {
	request(document.getElementById('query').value);
	if (document.getElementById('query').value === '') {
		document.getElementById('suggestions').innerHTML = '';
	}
});
input.addEventListener('paste', e => {
	request(document.getElementById('query').value);
});

const request = async data => {
	try {
		const {
			data: { result }
		} = await axios.post('/suggestion', { city: data });
		document.getElementById('suggestions').innerHTML = '';

		result.forEach(city => {
			document.getElementById('suggestions').innerHTML += `
				<li>
					<p>${city}</p>
				</li>
			`;
		});
		document.querySelectorAll('li').forEach(li => {
			li.addEventListener('click', e => {
				document.getElementById('query').value = e.target.textContent.trim();
			});
		});
	} catch (e) {
		console.log(e.message);
	}
};
