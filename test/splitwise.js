var Splitwise = artifacts.require("./Splitwise.sol");

contract('Splitwise', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];

  it('should add debt', function() {
    return Splitwise.deployed()
    .then(split => {
      return split.addDebt(a, b, 1)
      .then(function() {
        return split.debts.call(a, b)
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 1);
        console.log(result);
      });
    });
  });
});

contract('Splitwise', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];

  it('should subtract debt from existing debt', function() {
    return Splitwise.deployed()
    .then(split => {
      return split.addDebt(a, b, 2)
      .then(function() {
        return split.addDebt(b, a, 1);
      })
      .then(function() {
        return split.debts.call(a, b);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 1);
        return split.debts.call(b, a);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 0);
      });
    });
  });
});

contract('Splitwise', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];

  it('should subtract debt from new debt', function() {
    return Splitwise.deployed()
    .then(split => {
      return split.addDebt(a, b, 1)
      .then(function() {
        return split.addDebt(b, a, 2);
      })
      .then(function() {
        return split.debts.call(a, b);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 0);
        return split.debts.call(b, a);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 1);
      });
    });
  });
});


contract('Splitwise - getDebtorIndex', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];

  it('gets index when debtor doesnt exist', function() {
    return Splitwise.deployed()
      .then(split => {
        return split.getDebtorIndex(a, b);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), -1);
      });
  });

  it('gets index when debtor exists', function() {
    return Splitwise.deployed()
      .then(split => {
      return split.addDebt(a, b, 1)
      .then(function() {
        return split.getDebtorIndex(a, b);
      })
      .then(function(result) {
        assert.equal(result.toNumber(), 0);
      });
    });
  });
});

  /*
  it("should put 10000 MetaCoin in the first account", function() {
    return MetaCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function() {
    var meta;
    var metaCoinBalance;
    var metaCoinEthBalance;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(accounts[0]);
    }).then(function(outCoinBalance) {
      metaCoinBalance = outCoinBalance.toNumber();
      return meta.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth) {
      metaCoinEthBalance = outCoinBalanceEth.toNumber();
    }).then(function() {
      assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
  */
