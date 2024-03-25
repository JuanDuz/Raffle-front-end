function EntranceFeeComponent({ entranceFee }) {
	return (
		<div className="my-8 text-center  py-4 bg-gray-800 text-white rounded-lg shadow-md">
			<h3 className="text-l font-semibold mb-2">Entrance Fee</h3>
			<p className="text-l">
				{entranceFee} <span className="font-medium">ETH</span>
			</p>
		</div>
	);
}

export default EntranceFeeComponent;
