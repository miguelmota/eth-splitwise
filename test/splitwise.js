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
          return split.debtors.call(a, 0);
        })
        .then(function(result) {
          assert.equal(result, b);
        })
        .then(function(result) {
          return split.getDebtors.call(b)
        })
        .then(function(result) {
          assert.equal(result.length, 0);
        });
    });
  });
});

/*
contract('Splitwise', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];

  it('should subtract existing debt from new debt', function() {
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
          return split.debtors.call(b, 0);
        })
        .then(function(result) {
          assert.equal(result, a);
          return split.debtors.call(a, 0);
        })
        .then(function(result) {
          assert.equal(result, a);
          return split.getDebtors.call(a);
        })
        .then(function(result) {
          assert.sameMembers(result, []);
        });
    });
  });
});
*/


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

contract('Splitwise', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];
  var c = accounts[2];

  it('should remove holes in the debtors array', function() {
    return Splitwise.deployed()
    .then(split => {
      return split.addDebt(a, b, 2)
        .then(function() {
          return split.addDebt(a, c, 3);
        })
        .then(function() {
          return split.addDebt(b, a, 2);
        })
        .then(function() {
          return split.getDebtors.call(a);
        })
        .then(function(result) {
          console.log(result);
          assert.sameMembers(result, [c]);
        })
    });
  });
});

contract('Splitwise - getDebtorIndex', function(accounts) {
  var a = accounts[0];
  var b = accounts[1];
  var c = accounts[2];

  it('a-b-c subtracts funds from existing debts', function() {
    return Splitwise.deployed()
      .then(split => {
        return split.addDebt(a, b, 10)
        .then(function() {
          return split.addDebt(b, c, 10);
        })
        .then(function() {
          return split.addDebt(c, a, 5);
        })
        .then(function() {
          return split.debts.call(a, b);
        })
        .then(function(result) {
          assert.equal(result.toNumber(), 5)
          return split.debts.call(b, c);
        })
        .then(function(result) {
          assert.equal(result.toNumber(), 5)
          return split.debts.call(c, a);
        })
        .then(function(result) {
          assert.equal(result.toNumber(), 0)
        });

      });
  });

});
