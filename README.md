# Raffle Project

Welcome to the Raffle Smart contract Project! This project is a blockchain-based raffle system that allows participants to enter a raffle and picks a winner in a decentralized and transparent way. Built with Ethereum smart contracts and a React frontend, the raffle system is designed to be fair, secure, and fun.

## Technologies

-   **Solidity** and **foundry** for developing, testing and deploying the smart contract.
    Look at the [smart contract repo](https://github.com/JuanDuz/Raffle-smart-contract).
-   **Chainlink VRF** and **Automation** for oracle randomness and automation of the contract calls
-   **React** for the frontend
-   **Ethers** for interacting with the User account and the contract

## Features

-   **Decentralized Raffle**: Utilizes smart contracts on the Ethereum blockchain for raffle entry and winner selection.
-   **Transparent Selection**: Every raffle entry and the winner selection process are recorded on the blockchain, ensuring transparency.
-   **Easy to Participate**: A user-friendly web interface that allows participants to enter the raffle with just a few clicks.
-   **Random Color Assignment**: Each participant receives a random color for easy identification on the frontend.
-   **Only testnet allowed**: If the user uses a chain different than sepolia testnet the app will alert the user and not let him participate.

Enter the raffle with the minimum fee
<br>
<img src="/docs/Enter.png" alt="Enter" width="300"/>

Raffle has a 30 seconds of minimum interval between drafts.
<br>
<img src="/docs/Countdown.png" alt="Countdown" width="300"/>

Once the time has passed, if there are already players, the draft of a winner will start or ...
The Raffle will wait for players
<br>
<img src="/docs/WaitingPlayers.png" alt="WaitingPlayers" width="300"/>

Draft a winner
<br>
<img src="/docs/WaitingPlayers.png" alt="DraftWinner" width="300"/>

Winner receives the prize!
<br>
<img src="/docs/Winner.png" alt="Winner" width="300"/>

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js and npm (Node Package Manager)
-   A web browser with MetaMask installed
-   An Ethereum testnet wallet with test ether

In order to run the client

```bash
npm run dev
```
