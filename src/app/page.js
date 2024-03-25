"use client";

import { useEffect, useState } from "react";
require("dotenv/config");
const ethers = require("ethers");
import RaffleABI from "../../abis/raffle.json";
import Nav from "../components/Nav/Nav";
import EnterRaffleCard from "../views/EnterRaffleCard/EnterRaffleCard";
import RaffleEvents from "../components/RaffleEvents/RaffleEvents";
EnterRaffleCard;

const RAFFLE_CONTRACT_ADDRESS = "0x2DEC99766CD584DED0AcCef737cF7445D7AbCE94";
const RAFFLE_STATE_OPEN = 0n;
const RAFFLE_STATE_CALCULATING = 1n;
const SEPOLIA = "sepolia";

export default function Home() {
	const [currentAccount, setCurrentAccount] = useState(null);
	const [network, setNetwork] = useState("");
	const [raffleState, setRaffleState] = useState(RAFFLE_STATE_CALCULATING);
	const [raffleInterval, setRaffleInterval] = useState(0);
	const [lastTimeStamp, setLastTimeStamp] = useState(0n);
	const [entranceFee, setEntranceFee] = useState("");
	const [countdown, setCountdown] = useState(0);

	const isSepolia = () => network.name === SEPOLIA;

	const connectWalletHandler = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				alert("Please install MetaMask to use this app.");
				return;
			}

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const checkIfWalletIsConnected = async () => {
			try {
				const { ethereum } = window;
				if (!ethereum) {
					return;
				}

				const accounts = await ethereum.request({
					method: "eth_accounts",
				});
				if (accounts.length) {
					setCurrentAccount(accounts[0]);
				}

				// Check network
				const provider = new ethers.BrowserProvider(ethereum);
				const network = await provider.getNetwork();
				setNetwork(network);
			} catch (error) {
				console.error(error);
			}
		};
		checkIfWalletIsConnected();
	}, []);

	useEffect(() => {
		const getRaffleIntervals = async () => {
			const { ethereum } = window;
			if (!ethereum) {
				return;
			}
			const provider = new ethers.BrowserProvider(ethereum);
			const raffleContract = new ethers.Contract(
				RAFFLE_CONTRACT_ADDRESS,
				RaffleABI,
				provider
			);
			const raffleInterval = await raffleContract.getInterval();
			setRaffleInterval(Number(raffleInterval));
			setCountdown(Number(raffleInterval));
		};
		getRaffleIntervals();
	}, []);

	useEffect(() => {
		const checkRaffleState = async () => {
			try {
				const { ethereum } = window;
				if (!ethereum) {
					return;
				}
				const provider = new ethers.BrowserProvider(ethereum);
				const raffleContract = new ethers.Contract(
					RAFFLE_CONTRACT_ADDRESS,
					RaffleABI,
					provider
				);
				const raffleState = await raffleContract.getRaffleState();
				setRaffleState(raffleState);
			} catch (error) {
				console.error("Failed to check raffle state:", error);
			}
		};

		checkRaffleState();
		const intervalId = setInterval(checkRaffleState, 1000);
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const getLastTimeStamp = async () => {
			const { ethereum } = window;
			if (!ethereum) {
				console.log("Ethereum object not found");
				return;
			}
			const provider = new ethers.BrowserProvider(ethereum);
			const raffleContract = new ethers.Contract(
				RAFFLE_CONTRACT_ADDRESS,
				RaffleABI,
				provider
			);

			const lastTimeStamp = await raffleContract.getLastTimeStamp();
			setLastTimeStamp(lastTimeStamp);
		};
		getLastTimeStamp();
		const checkTimeStampId = setInterval(getLastTimeStamp, 1000);

		return () => clearInterval(checkTimeStampId);
	}, []);

	useEffect(() => {
		const updateCounter = async () => {
			setCountdown((prevCountdown) =>
				prevCountdown - 1 > 0 ? prevCountdown - 1 : 0
			);
		};

		const counterId = setInterval(updateCounter, 1000);

		return () => clearInterval(counterId);
	}, []);

	useEffect(() => {
		const { ethereum } = window;
		const handleChainChanged = async (_chainId) => {
			const provider = new ethers.BrowserProvider(ethereum);
			const network = await provider.getNetwork();
			setNetwork(network);
		};

		if (ethereum) {
			ethereum.on("chainChanged", handleChainChanged);
		}

		// Cleanup function to remove the event listener
		return () => {
			if (ethereum) {
				ethereum.removeListener("chainChanged", handleChainChanged);
			}
		};
	}, []);

	useEffect(() => {
		const fetchEntranceFee = async () => {
			const { ethereum } = window;
			if (!ethereum) {
				return;
			}
			const provider = new ethers.BrowserProvider(ethereum);
			if (!provider) return;
			const raffleContract = new ethers.Contract(
				RAFFLE_CONTRACT_ADDRESS,
				RaffleABI,
				provider
			);
			const fee = await raffleContract.getEntranceFee();
			setEntranceFee(ethers.formatEther(fee));
		};

		fetchEntranceFee();
	}, []);

	useEffect(() => {
		setCountdown(raffleInterval);
	}, [lastTimeStamp]);

	return (
		<div className="min-h-screen flex flex-col">
			<Nav
				onClickWalletHandler={connectWalletHandler}
				isSepolia={isSepolia}
				currentAccount={currentAccount}
			/>
			<div className="flex flex-grow flex-row">
				<div className="flex flex-col p-4 w-1/4">
					<h2 className="text-lg font-semibold mb-4">Events</h2>
					<RaffleEvents lastTimeStamp={lastTimeStamp} />
				</div>
				<EnterRaffleCard
					raffleState={raffleState}
					countdown={countdown}
					isSepolia={isSepolia()}
					entranceFee={entranceFee}
				/>
			</div>
		</div>
	);
}
