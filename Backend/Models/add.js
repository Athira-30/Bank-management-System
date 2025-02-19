const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    name: { type: String, required: true },
    accountNumber: { type: String, required: true }
});

const Bank = mongoose.model('Bank', BankSchema);

module.exports = Bank;
