const input = document.getElementById("query");
input.addEventListener("blur", e => {
	// console.log("blur");
	request(document.getElementById("query").value);
});
input.addEventListener("change", e => {
	// console.log("change");
	request(document.getElementById("query").value);
});
input.addEventListener("focus", e => {
	// console.log("focus");
	request(document.getElementById("query").value);
});
input.addEventListener("keyup", e => {
	// console.log("keyup");
	request(document.getElementById("query").value);
	if (document.getElementById("query").value === "") {
		document.getElementById("suggestions").innerHTML = "";
	}
});
input.addEventListener("paste", e => {
	// console.log("paste");
	request(document.getElementById("query").value);
});

const request = async data => {
	const {
		data: { result }
	} = await axios.post("/suggestion", { city: data });
	document.getElementById("suggestions").innerHTML = "";

	result.forEach(city => {
		document.getElementById("suggestions").innerHTML += `
                                <li>
                                    <p>${city}</p>
                                </li>
                            `;
	});
	document.querySelectorAll("li").forEach(li => {
		li.addEventListener("click", e => {
			document.getElementById("query").value = e.target.textContent.trim();
		});
	});
};
