import React, { useState, useEffect } from "react";
const ethers = require("ethers");
import RaffleABI from "../../../abis/raffle.json";

const RAFFLE_CONTRACT_ADDRESS = "0x2DEC99766CD584DED0AcCef737cF7445D7AbCE94";

function EnterRaffleButton({ isSepolia, isRaffleClosed, entranceFee }) {
	const [isEnabled, setIsEnabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		setIsEnabled(isSepolia && !isRaffleClosed);
		setIsLoading(false);
		setMessage("");
	}, [isSepolia, isRaffleClosed]);

	const enterRaffle = async () => {
		if (!isEnabled) return;
		if (isRaffleClosed) {
			setMessage(
				"Raffle is currently calculating a winner, please wait."
			);
			return;
		}
		setIsLoading(true);
		setMessage("");

		const { ethereum } = window;
		if (!ethereum) {
			return;
		}
		console.log("entrance fee type", typeof entranceFee);
		console.log("entrance fee ", entranceFee);
		if (isNaN(entranceFee)) {
			return;
		}
		try {
			const provider = new ethers.BrowserProvider(ethereum);
			const signer = await provider.getSigner();
			const raffleContract = new ethers.Contract(
				RAFFLE_CONTRACT_ADDRESS,
				RaffleABI,
				signer
			);
			console.log("Before ", entranceFee);
			await raffleContract.enterRaffle({
				value: ethers.parseEther("0.01"),
			});
			setIsLoading(true);
			setIsEnabled(false);
			setMessage("Waiting transaction to enter the raffle!");
		} catch (error) {
			console.error("Failed to enter raffle:", error);
			setIsLoading(false);
		}
	};

	return (
		<div>
			<button
				className={`px-6 py-3 text-white font-bold rounded-full ${
					!isRaffleClosed && !isLoading
						? "bg-indigo-500 hover:bg-indigo-700"
						: "bg-gray-400 cursor-not-allowed"
				} transition-colors duration-300`}
				disabled={isRaffleClosed || isLoading}
				onClick={enterRaffle}
			>
				{isLoading ? "Processing..." : "Enter Raffle"}
			</button>
			{message && <p className="mt-2 text-sm font-medium">{message}</p>}
		</div>
	);
}

export default EnterRaffleButton;
