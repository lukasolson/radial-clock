(function () {
	const arcs = document.querySelectorAll('.arc');

	const distanceBetweenArcs = Math.floor(Math.min(window.innerWidth, window.innerHeight) / (arcs.length * 2 + 1));
	const centerX = Math.floor(window.innerWidth / 2);
	const centerY = Math.floor(window.innerHeight / 2);

	arcs.forEach((arc, i) => {
		arc.setAttribute('stroke', `hsl(${360 / arcs.length * i}, 90%, 70%)`);
		arc.setAttribute('stroke-width', `${distanceBetweenArcs}`);
	});

	window.requestAnimationFrame(function draw() {
		const arcRatios = getArcRatios(new Date());
		arcs.forEach((arc, i) => {
			const radius = distanceBetweenArcs * (i + 1);
			const angle = 2 * Math.PI * arcRatios[i];
			const x1 = centerX;
			const y1 = centerY - radius;
			const x2 = centerX + Math.sin(angle) * radius - x1;
			const y2 = centerY - Math.cos(angle) * radius - y1;
			const largeArc = angle <= Math.PI ? 0 : 1;
			arc.setAttribute('d', `m ${x1} ${y1} a ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`);
		});
		window.requestAnimationFrame(draw);
	});
})();

function getArcRatios(date) {
	const msecs = date.getMilliseconds() / 1000;
	const secs = (date.getSeconds() + msecs) / 60;
	const mins = (date.getMinutes() + secs) / 60;
	const hours = (date.getHours() + mins) / 24;
	return [msecs, secs, mins, hours];
}
