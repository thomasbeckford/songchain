# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

To deploy a new contract to rinkiby:

- We use alchemy to create a new app in the rinkeby network (this will be the node for the app)
- Alchemy provide us a URL, WEBSOCKETS and API KEY to connect to the node
- We use hardhat to deploy the contract to the node
