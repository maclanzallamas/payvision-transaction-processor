# Transactions Processor

We want to develop a new transactions processor library to complete online payments. **TransactionProcessor.js** file contains the code scaffolding of our new payments engine.

## Pattern 
I believe the Transaction Processor is following the Singleton Pattern, as it is always returning the instance itself (this).


### Valid transactions

A valid transaction must have:

- A float number non-negative amount value (amount >= 0).
- One brand of: { "visa", "mastercard", "amex" }, lowercase.
- One currency of: { "EUR", "GBP", "USD" }, uppercase.
- An ID greater than zero integer value (id > 0).

## How to set up the project

To run the project, open a terminal and execute the following command from project root path:

- Install dependencies

> yarn

- Run the application

> yarn start

- Run tests

> yarn test
