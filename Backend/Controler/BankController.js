const Bank = require("../Models/add.js"); // Adjust path as needed

const BankSave = (req, res) => {
    const { name, accountNumber } = req.body;

    if (!name || !accountNumber) {
        return res.status(400).send('Name and Account Number are required.');
    }

    const newBank = new Bank({
        name: name,
        accountNumber: accountNumber
    });

    newBank.save()
        .then(() => {
            res.status(201).send('Bank details saved successfully.');
        })
        .catch((error) => {
            res.status(500).send('Error saving bank details: ' + error.message);
        });
};

const getBankData = async (req, res) => {
    try {
        const banks = await Bank.find({});
        res.status(200).json(banks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bank data', error });
    }
};

const deleteDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const bank = await Bank.findByIdAndDelete(id);
        console.log(bank)

        if (!bank) {
            return res.status(404).json({ message: 'Bank details not found' });
        }

        res.status(200).json({ message: 'Bank details deleted successfully' });
    } catch (error) {
        console.error("Error deleting:", error);
        res.status(500).json({ message: 'An error occurred while deleting bank details' });
    }
};

const eDetails = async (req, res) => {
    try {
        // Correct way to access the _id from params
         // Extract _id directly from params
        
        // Debugging: log the ID

        // Find bank details by ID
        console.log(req.params.id);
        const bank = await Bank.findById(req.params.id);
        console.log('Fetched Bank Details:', bank);

        if (!bank) {
            return res.status(404).json({ message: 'Bank details not found' });
        }

        res.status(200).json(bank);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: 'An error occurred while fetching bank details' });
    }
};



const updateDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, accountNumber } = req.body;
        const updatedBank = await Bank.findByIdAndUpdate(id, { name, accountNumber }, { new: true });

        if (!updatedBank) {
            return res.status(404).json({ message: 'Bank details not found' });
        }

        res.status(200).json(updatedBank);
    } catch (error) {
        console.error("Error updating:", error);
        res.status(500).json({ message: 'An error occurred while updating bank details' });
    }
};

module.exports = { BankSave, getBankData, deleteDetails, eDetails, updateDetails };
