// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * This file was generated with Openzeppelin Wizard and later modified.
 * GO TO: https://wizard.openzeppelin.com/#erc20
 */
contract TestERC20 is ERC20 {
	constructor(
		string memory name,
		string memory symbol
	) ERC20(name, symbol){}

	function mint(address to, uint256 amount) external {
		_mint(to, amount);
	}
}
