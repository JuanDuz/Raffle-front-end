import React, { useState, useEffect } from "react";

function RaffleStatus({ state, countdown }) {
	const [raffleState, setRaffleState] = useState("");

	useEffect(() => {
		setRaffleState(state === 0n ? "OPEN" : "CALCULATING");
	}, [state]);

	return (
		<div className="text-center my-4">
			<div className="inline-block">
				<p
					className={`py-3 px-6 text-white font-medium text-md rounded-lg shadow`}
				>
					Raffle State:{" "}
					<span
						className={`px-1 text-white font-semibold text-md rounded-lg shadow ${
							raffleState.toLowerCase() === "open"
								? "text-green-700"
								: "text-yellow-700"
						}`}
					>
						{raffleState}
					</span>
				</p>
			</div>
			<div className="mt-4 flex flex-col items-center">
				<p
					className={`font-bold ${
						countdown !== 0 ? "text-8xl" : "text-4xl"
					}`}
				>
					{countdown !== 0
						? countdown
						: raffleState === "OPEN"
						? "Waiting for more players"
						: "Finding the lucky one"}
				</p>
				<p className="text-md text-gray-400">
					{countdown !== 0 ? "seconds" : "..."}
				</p>
			</div>
		</div>
	);
}

export default RaffleStatus;
