pragma solidity ^0.4.0;

contract Splitwise {
    mapping(address => mapping (address => uint256)) public debts;
    mapping(address => address[]) debtors;

    function addDebt(address from, address to, uint256 amount) {
        // There is an existing deb (to -> from that exceeds the new debt (from -> to)
        if (debts[to][from] >= amount) {
            debts[to][from] -= amount;

        // The new debt (from -> to) exeeds the existing debt (to -> from)
        } else {
            amount -= debts[to][from];
            debts[to][from] = 0;

            //

            /*
            uint256 i = 0;
            while(i < debtors[to].length && amount > 0) {
                 address debtor = debtors[to][i];
                 uint256 debt = debts[to][debtor];

            }
            */

            //

            debts[from][to] += amount;

            debtors[from].push(to);
        }
    }

    function getDebtorIndex(address from, address to) constant returns (int256) {
        for (uint256 i = 0; i < debtors[from].length; i++) {
            if (debtors[from][uint256(i)] == to) {
                return int256(i);
            }
        }

        return -1;
    }

    function settle() {

    }
}
