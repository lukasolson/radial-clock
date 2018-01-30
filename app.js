(function () {
	const canvas = document.getElementById("canvas");
	const context = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	context.lineCap = "round";
	context.lineWidth = Math.min(canvas.width, canvas.height) / 9;
	context.translate(canvas.width / 2, canvas.height / 2); // Center the origin
	context.rotate(-Math.PI / 2); // Start the circle at 0:00 instead of 3:00

	window.requestAnimationFrame(function draw() {
		context.clearRect(-canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width); // Invert x/y because of the rotation

		const now = new Date();
		getArcLengths(now).forEach((value, i, list) => {
			context.strokeStyle = `hsl(${i / list.length * 360}, 90%, 70%)`;
			context.beginPath();
			context.arc(0, 0, context.lineWidth * (i + 1), 0, (2 * Math.PI) * value);
			context.stroke();
		});

		window.requestAnimationFrame(draw);
	});

	function getArcLengths(date) {
		const msecs = date.getMilliseconds() / 1000;
		const secs = (date.getSeconds() + msecs) / 60;
		const mins = (date.getMinutes() + secs) / 60;
		const hours = (date.getHours() + mins) / 24;
		return [msecs, secs, mins, hours];
	}
})();
