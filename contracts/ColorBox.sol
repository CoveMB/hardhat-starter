// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A box containing some hex color
/// @author Mr Tumeric A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without..
/// @custom:experimental This is an experimental contract.
contract ColorBox is Ownable {
  string private color;

  // Emitted when the stored value changes
  event ColorChanged(string newValue);

  constructor(string memory initialColor) {
    color = initialColor;
  }

  /// @notice Allow to change the color stored in the Box
  /// @notice Only the Owner can call this function
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newColor The new color to be stored in the box state
  function changeColor(string calldata newColor) public onlyOwner {
    color = newColor;
    emit ColorChanged(newColor);
  }

  /// @notice Allow to simulate changing the color stored in the Box
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param newColor The new color to be stored in the box state
  /// @custom:event-only This function simply emit an event.
  function changeColorDryRun(string calldata newColor) public onlyOwner {
    emit ColorChanged(newColor);
  }

  /// @notice Returns current color in the box.
  /// @dev Returns only a string.
  /// @return The current color of in the box state
  function getColor() public view returns (string memory) {
    return color;
  }
}