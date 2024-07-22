/** @format */

interface ParamsProps {
	startDateTime: string;
	endDateTime: string;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const calculateTime = ({
	startDateTime,
	endDateTime,
}: ParamsProps): { timeLeft: TimeLeft; isStarted: boolean } => {
	const now = new Date();
	const start = new Date(startDateTime);
	const end = new Date(endDateTime);

	let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
	let isStarted = false;

	if (now >= start && end > now) {
		isStarted = true;
		const difference = Number(end) - Number(now);
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / (1000 * 60)) % 60),
			seconds: Math.floor((difference / 1000) % 60),
		};
	}

	return { timeLeft, isStarted };
};

export default calculateTime;
