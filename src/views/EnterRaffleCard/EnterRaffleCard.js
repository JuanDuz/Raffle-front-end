import RaffleStatus from "../../components/RaffleStatus/RaffleStatus";
import EnterRaffleButton from "../../components/Buttons/EnterRaffleButton";
import EntranceFee from "../../components/EntranceFee/EntranceFee";

const EnterRaffleCard = ({
	raffleState,
	countdown,
	isSepolia,
	entranceFee,
}) => {
	return (
		<div className="w-full max-w-sm mx-auto rounded overflow-hidden shadow-lg">
			<div className="flex justify-center">
				<RaffleStatus state={raffleState} countdown={countdown} />
			</div>
			<div className="p-4">
				<div className="text-center">
					<EntranceFee entranceFee={entranceFee} />
					<EnterRaffleButton
						isSepolia={isSepolia}
						isRaffleClosed={raffleState !== 0n}
						entranceFee={entranceFee}
					/>
				</div>
			</div>
		</div>
	);
};

export default EnterRaffleCard;
