import React, { useEffect, useState } from "react";
const ethers = require("ethers");
import RaffleABI from "../../../abis/raffle.json";

const RAFFLE_CONTRACT_ADDRESS = "0x2DEC99766CD584DED0AcCef737cF7445D7AbCE94";
const RaffleEvents = ({ lastTimeStamp }) => {
	const [entries, setEntries] = useState([]);
	const [timeFilter, setTimeFilter] = useState(new Date());

	useEffect(() => {
		let contract;

		const initializeEthers = async () => {
			try {
				// Connect to Ethereum provider
				const { ethereum } = window;
				if (!ethereum) {
					return;
				}
				const provider = new ethers.BrowserProvider(ethereum);

				// Get signer
				const signer = await provider.getSigner();

				// Initialize contract instance
				contract = new ethers.Contract(
					RAFFLE_CONTRACT_ADDRESS,
					RaffleABI,
					signer
				);

				// Assuming event.blockNumber is available and can be used to infer the timestamp
				const filterEventsByTime = async (event) => {
					const block = await provider.getBlock(event.blockNumber);
					const eventTimestamp = new Date(block.timestamp * 1000);
					return eventTimestamp > timeFilter;
				};

				contract.on("RaffleEnter", async (player, event) => {
					if (await filterEventsByTime(event)) {
						setEntries((prevEntries) => [
							...prevEntries,
							{
								player: player,
								color: getRandomColor(),
								isJoin: true,
							},
						]);
					}
				});

				contract.on("WinnerPicked", (player, event) => {
					console.log("Winner");
					setEntries((prevEntries) => [
						...prevEntries,
						{
							player: player,
							color: "text-green-500",
							isJoin: false,
						},
					]);
				});
			} catch (error) {
				console.error("Error initializing ethers:", error);
			}
		};

		initializeEthers();

		// Cleanup function
		return () => {
			if (contract) {
				contract.removeAllListeners("RaffleEnter");
				contract.removeAllListeners("WinnerPicked");
			}
		};
	}, []);

	const getRandomColor = () => {
		const colors = [
			"text-red-500",
			"text-yellow-500",
			"text-green-500",
			"text-blue-500",
			"text-indigo-500",
			"text-purple-500",
			"text-pink-500",
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<ul className="py-8">
				{entries.map((entry, index) =>
					entry.isJoin ? (
						<li
							key={index}
							className={`border-b text-xs border-gray-200 py-2`}
						>
							<span className="font-semibold text-xs">
								Player:
							</span>{" "}
							<span
								className={`font-bold text-xs ${entry.color}`}
							>
								{entry.player}
							</span>{" "}
							joined the current raffle
						</li>
					) : (
						<li
							key={index}
							className={`border-b text-xs border-gray-200 py-1`}
						>
							<span className="font-semibold text-xs">
								Player:
							</span>{" "}
							<span
								className={`font-bold text-xs ${entry.color}`}
							>
								{entry.player}
							</span>{" "}
							won the raffle!
						</li>
					)
				)}
			</ul>
		</div>
	);
};

export default RaffleEvents;
