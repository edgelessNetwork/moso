# Pari Contracts

## Overview

This is a fork of the [gnosis conditional tokens market maker contracts](https://github.com/gnosis/conditional-tokens-market-makers/). The main functionality is to let streamers create betting markets and for their users to be able to bet on them.

**[Conditional Token](https://docs.gnosis.io/conditionaltokens/)**: You deposit 1 ETH into a conditional token that has the condition `Will ETH hit 4k USD by Jan 1, 2025`, you get back one yes and one no token. On Jan 1, 2025, a predetermined oracle will update the conditonal token with yes or no depending on the ETH price. If the ETH price is above 4k, the yes token redeems the 1 ETH, otherwise the no token redeems the one ETH.

**[Fixed Product Market Maker(FPMM)](https://docs.gnosis.io/conditionaltokens/docs/introduction3)**: Since you can only mint one yes token and one no token, the way to get exposure to one end of the trade would be to trade your one no token for another yes token. The FPMM lets you add liquidity in the form of yes/no token pairs, and to swap yes tokens for no tokens.

![image](https://github.com/edgelessNetwork/sweep/assets/156271310/cb3f220a-e456-43f6-b0c7-f079e9590cd7)


## Usage

This is a list of the most frequently needed commands.

### Compile

```sh
npx hardhat compile
```

### Test

```sh
npx hardhat test
```

### Deploy

```sh
npx hardhat deploy --network edgelessTestnet
```
