const arrayEl = document.querySelector('.arr');
const quesSVG = document.getElementById('ques-svg');
const ansSVG = document.getElementById('ans-svg');

const arr = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];

// Algo
const resultArr = function (arr) {
	let totalWater = 0;
	const res = [];
	const left = [];
	const right = [];
	let leftMax = arr[0];
	let rightMax = arr[0];
	for (let i = 0; i < arr.length; i++) {
		if (leftMax < arr[i]) {
			leftMax = arr[i];
		}
		left[i] = leftMax;
	}
	for (let i = arr.length - 1; i >= 0; i--) {
		if (rightMax < arr[i]) {
			rightMax = arr[i];
		}
		right[i] = rightMax;
	}
	for (let i = 0; i < arr.length; i++) {
		const minWater = Math.min(left[i], right[i]) - arr[i];
		totalWater += minWater;
		res[i] = minWater;
	}
	return [res, totalWater];
};

// Create Ques SVG
const createQuesSVG = function (arr, output) {
	console.log(arr);
	const maximumElInArr = arr.reduce((max, cur) => (max < cur ? cur : max));
	document.getElementById(
		'ques-arr'
	).textContent = `Question Array : [${arr}]`;
	quesSVG.setAttribute(
		'viewBox',
		`0 0 ${arr.length * 20} ${(maximumElInArr + 1) * 10}`
	);

	// Vertical Line
	for (let i = 1; i < arr.length; i++) {
		const verticalLine = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		verticalLine.setAttribute('stroke', 'black');
		verticalLine.setAttribute('stroke-width', '.3');
		verticalLine.setAttributeNS(
			null,
			'd',
			`M${i * 20} 0 V${(maximumElInArr + 1) * 10}`
		);
		quesSVG.appendChild(verticalLine);
	}

	// Horizontal Line
	for (let i = 1; i <= maximumElInArr; i++) {
		const horizontalLine = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		horizontalLine.setAttribute('stroke', 'black');
		horizontalLine.setAttribute('stroke-width', '.3');
		horizontalLine.setAttributeNS(
			null,
			'd',
			`M0 ${i * 10} H${arr.length * 20}`
		);
		quesSVG.appendChild(horizontalLine);
	}

	// fill the pillers

	for (let i = 0; i < arr.length; i++) {
		const piller = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		piller.setAttribute('fill', 'yellow');
		piller.setAttributeNS(
			null,
			'd',
			`M${i * 20} ${(maximumElInArr + 1) * 10} h20 0 v0 ${
				-arr[i] * 10
			} h-20 0 z`
		);
		quesSVG.appendChild(piller);
	}

	// Water block
	for (let i = 0; i < arr.length; i++) {
		const piller = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		piller.setAttribute('fill', 'skyblue');
		piller.setAttributeNS(
			null,
			'd',
			`M${i * 20} ${(maximumElInArr + 1 - arr[i]) * 10} h20 0 v0 ${
				-output[0][i] * 10
			} h-20 0 z`
		);
		quesSVG.appendChild(piller);
	}
};

// Create Ans SVG
const createAnsSVG = function (arr, output) {
	const maximumElInArr = arr.reduce((max, cur) => (max < cur ? cur : max));
	document.getElementById(
		'ans-unit'
	).textContent = `Output : ${output[1]} units`;
	ansSVG.setAttribute(
		'viewBox',
		`0 0 ${arr.length * 20} ${(maximumElInArr + 1) * 10}`
	);
	// Vertical Line
	for (let i = 1; i < arr.length; i++) {
		const verticalLine = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		verticalLine.setAttribute('stroke', 'black');
		verticalLine.setAttribute('stroke-width', '.3');
		verticalLine.setAttributeNS(
			null,
			'd',
			`M${i * 20} 0 V${(maximumElInArr + 1) * 10}`
		);
		ansSVG.appendChild(verticalLine);
	}

	// Horizontal Line
	for (let i = 1; i <= maximumElInArr; i++) {
		const horizontalLine = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		horizontalLine.setAttribute('stroke', 'black');
		horizontalLine.setAttribute('stroke-width', '.3');
		horizontalLine.setAttributeNS(
			null,
			'd',
			`M0 ${i * 10} H${arr.length * 20}`
		);
		ansSVG.appendChild(horizontalLine);
	}

	// Water block
	for (let i = 0; i < arr.length; i++) {
		const piller = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		piller.setAttribute('fill', 'skyblue');
		piller.setAttributeNS(
			null,
			'd',
			`M${i * 20} ${(maximumElInArr + 1 - arr[i]) * 10} h20 0 v0 ${
				-output[0][i] * 10
			} h-20 0 z`
		);
		ansSVG.appendChild(piller);
	}
};
window.onload = function () {
	const output = resultArr(arr);
	createQuesSVG(arr, output);
	createAnsSVG(arr, output);
};
