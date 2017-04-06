pragma solidity ^0.4.0;

// FROM = A
// TO = B

contract Splitwise {
    mapping(address => mapping (address => uint256)) public debts;
    mapping(address => address[]) public debtors;

    function addDebt(address from, address to, uint256 amount) {
        // There is an existing deb (to -> from that exceeds the new debt (from -> to)
        if (debts[to][from] > amount) {
            debts[to][from] -= amount;

            // The new debt (from -> to) is equal to the existing debt
        } else if (debts[to][from] == amount) {
            debts[to][from] = 0;
            safeRemoveDebtor(from, to);

            // The new debt (from -> to) exeeds the existing debt (to -> from)
        } else {
            amount -= debts[to][from];
            debts[to][from] = 0;
            safeRemoveDebtor(from, to);

            uint256 i = 0;
            while(i < debtors[to].length && amount > 0) {
                address debtor = debtors[to][i]; //c
                uint256 debtTo2Debtor = debts[to][debtor]; // debt to -> debtor
                uint256 debtDebtor2From = debts[debtor][from];

                if (debtTo2Debtor > 0 && debtDebtor2From > 0) {
                    // find out if debtor owes "from" money
                    uint reduceBy = min(debtTo2Debtor, debtDebtor2From);
                    cancelCircularDebt(from, to, debtor, reduceBy);
                    amount-= reduceBy;
                }
                i++;

            }

            if (getDebtorIndex(from, to) == -1) {
                debtors[from].push(to);
            }

            debts[from][to] += amount;
        }
    }

    function cancelCircularDebt(address a, address b, address c, uint256 amount) {
        cancelDebt(a, b, amount);
        cancelDebt(b, c, amount);
        cancelDebt(c, a, amount);
    }

    function cancelDebt(address a, address b, uint256 amount) {
        debts[a][b] -= amount;
        if (debts[a][b] == 0) {
            removesDebtor(a, uint256(getDebtorIndex(a, b)));
        }

        // lookup the amount owed a > b
        // reduce by amount
        // if debt is zero, remove array entry

    }

    function getDebtorIndex(address a, address b) constant returns (int256) {
        for (uint256 i = 0; i < debtors[a].length; i++) {
            if (debtors[a][uint256(i)] == b) {
                return int256(i);
            }
        }

        return -1;
    }

    function getDebtors(address from) constant returns (address[]) {
        return debtors[from];
    }

    // removes debtor at index from a's debtors array
    function removesDebtor(address a, uint256 index) {
        uint256 numDebtors = debtors[a].length;
        debtors[a][uint256(index)] = debtors[a][numDebtors - 1];
        delete debtors[a][numDebtors - 1];
        debtors[a].length -= 1;
    }

    // removes a debtor b if it exists in a's debtors array
    function safeRemoveDebtor(address a, address b) {
        int256 index = getDebtorIndex(a, b);

        if (index > -1) {
            removesDebtor(a, uint256(index));
        }
    }

    function min(uint256 a, uint256 b) returns (uint256) {
        return a > b ? b : a;
    }

    function settle() {

    }
}
