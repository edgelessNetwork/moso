// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable2StepUpgradeable } from "@openzeppelin/contracts-upgradeable/access/Ownable2StepUpgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract TokenDistributor is Ownable2StepUpgradeable, UUPSUpgradeable {
	IERC20 public token;
	address sender;
	uint256[50] private __gap;

	event BatchSend(address[] receivers, uint256[] amounts);
	error ZeroAddress();
	error OnlySender(address attemptedSender, address sender);
	error MismatchedLengths(address[] receivers, uint256[] amounts);

	modifier onlySender() {
		if (msg.sender != sender) revert OnlySender(msg.sender, sender);
		_;
	}

	constructor () {
		_disableInitializers();
	}

	function initialize(IERC20 _token, address _owner, address _sender) external initializer {
		if (_token == IERC20(address(0))) revert ZeroAddress();
		token = IERC20(_token);
		sender = _sender;
		__Ownable2Step_init();
        __UUPSUpgradeable_init();
        _transferOwnership(_owner);
	}

	function batchSend(address[] calldata _receivers, uint256[] calldata _amounts) external onlySender {
		if (_receivers.length != _amounts.length) revert MismatchedLengths(_receivers, _amounts);
		for (uint256 i = 0; i < _receivers.length; i++) {
			token.transfer(_receivers[i], _amounts[i]);
		}
		emit BatchSend(_receivers, _amounts);
	}

	function withdraw(address _token, address to, uint256 amount) external onlyOwner {
		IERC20(_token).transfer(to, amount);
	}

	function setSender(address _sender) external onlyOwner {
		sender = _sender;
	}

	function _authorizeUpgrade(address) internal override onlyOwner { }
}
