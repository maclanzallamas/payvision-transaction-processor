class TransactionProcessor {
  // QUESTION: COMPLETE ALL CLASS FUNCTIONS TO PASS THE TESTS

  constructor(transactions) {
    this.transactions = transactions;
  }

  print(tx) {
    console.log(
      `ID: ${tx.id} - Brand: ${tx.brand} - Currency: ${tx.currency} - Amount: ${tx.amount}`
    );
  }

  // Check valid transactions rules
  static isValidTransaction(transaction) {
    // Validation structure idea from: https://stackoverflow.com/a/38616988

    const rules = {
      // https://stackoverflow.com/a/38813478. This Regex is checking if there is a . passed. 
      // This might not be the best solution as some countries use comma, or maybe the float number is passed with a different notation. 
      // We will need to know the exact use case and requirements.
      amount: value => /^[0-9]+(\.)?[0-9]*$/.test(value) && Math.sign(value) >= 0, 
      brand: value => ["visa", "mastercard", "amex"].includes(value),
      currency: value => ["EUR", "GBP", "USD"].includes(value),
      id: value => Number.isInteger(value) // This accepts 10.0 as an integer. If we didn't want that we would need to use something else.
    };
    
    const validate = (object, schema) => Object
      .keys(schema)
      .filter(key => !schema[key](object[key]))
      .map(key => new Error(`${key} is invalid.`));
    
    const errors = validate(transaction, rules);
    
    if (errors.length > 0) {
      return false;
    }
    return true;
  }

  // Remove invalid transactions
  filterInvalidTransactions() {
    this.transactions = this.transactions.filter((transaction) => TransactionProcessor.isValidTransaction(transaction));
    return this;
  }

  // Return transactions of given currency
  getTransactionsByCurrency(currency) {
    this.transactions = this.transactions.filter((transaction) => transaction.currency === currency);
    return this;
  }

  // Return transactions of given brand
  getTransactionsByBrand(brand) {
    this.transactions = this.transactions.filter((transaction) => transaction.brand === brand);
    return this;
  }

  // BONUS:
  // Apply multiple filters. Filters parameter should be an array of functions (predicates)
  filterTransaction(filters) {
    this.transactions = this.transactions.filter((transaction) => filters.every((filter) => filter(transaction)));
    return this;
  }

  // Return the total amount of current transactions array
  sum() {
    // We only want to sum for those that are valid
    this.filterInvalidTransactions();
    if (this.transactions.length > 0) {
      const sum = this.transactions.reduce((total, transaction) => total + transaction.amount, 0);
      return Math.round( ( sum + Number.EPSILON ) * 100 ) / 100 // We force to have 2 decimals always
    }
    return 0;
  }
}

module.exports = TransactionProcessor;
