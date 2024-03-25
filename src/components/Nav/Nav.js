// components/Nav.js
const Nav = ({ connectWalletHandler, isSepolia, currentAccount }) => {
	return (
		<nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
			<h1 className="text-xl font-bold">
				<span className="bg-indigo-500 px-2 py-1 rounded">ETH</span>{" "}
				Raffle
			</h1>
			{!isSepolia && (
				<p className="text-red-600 bg-gray-800 px-3 py-1 rounded">
					Please switch to the Sepolia network to participate in
					raffles.
				</p>
			)}
			{!currentAccount ? (
				<button
					onClick={connectWalletHandler}
					className="bg-indigo-600 hover:bg-indigo-800 text-gray-900 font-bold py-2 px-4 rounded transition duration-300"
				>
					Connect Wallet
				</button>
			) : (
				<span className="px-3 py-1 rounded">Wallet Connected</span>
			)}
		</nav>
	);
};

export default Nav;
