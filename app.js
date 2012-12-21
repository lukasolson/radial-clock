$(document).ready(function() {
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d");
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	context.lineCap = "round";
	context.lineWidth = 20;
	context.translate(canvas.width / 2, canvas.height / 2); // Center the origin
	context.rotate(-Math.PI / 2); // Start the circle at 0:00 instead of 3:00

	setInterval(function () {
		context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

		var date = new Date(),
			msecs = date.getMilliseconds(),
			secs = date.getSeconds() + msecs / 1000,
			mins = date.getMinutes() + secs / 60,
			hours = date.getHours() + mins / 60;

		context.strokeStyle = "rgb(128, 128, 255)";
		context.beginPath();
		context.arc(0, 0, 100, 0, (2 * Math.PI) * hours / 24);
		context.stroke();

		context.strokeStyle = "rgb(128, 255, 128)";
		context.beginPath();
		context.arc(0, 0, 75, 0, (2 * Math.PI) * mins / 60);
		context.stroke();

		context.strokeStyle = "rgb(255, 128, 128)";
		context.beginPath();
		context.arc(0, 0, 50, 0, (2 * Math.PI) * secs / 60);
		context.stroke();

		context.strokeStyle = "rgb(255, 255, 128)";
		context.beginPath();
		context.arc(0, 0, 25, 0, (2 * Math.PI) * msecs / 1000);
		context.stroke();
	}, 1000 / 48); // 48fps baby!
});