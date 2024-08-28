const express = require('express');
const router = express.Router();
const { BankSave, getBankData, deleteDetails ,updateDetails,eDetails} = require("../Controler/BankController.js"); // Adjust path as needed

// Define routes
router.post('/bank/save', BankSave);
router.get('/get', getBankData);
router.delete('/bank/delete/:id', deleteDetails); // Ensure this route matches
router.get('/bank/edit/:id', eDetails); // Ensure



router.put("bank/update/:id", updateDetails);
module.exports = router;
