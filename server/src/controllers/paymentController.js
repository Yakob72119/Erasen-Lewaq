const axios = require("axios").default;
const Educator = require('./../models/educatorModel');

// Define a mapping of account names to bank codes
const bankCodeMapping = {
    "Awash Bank": "80a510ea-7497-4499-8b49-ac13a3ab7d07",
    "Bank of Abyssinia": "32735b19-bb36-4cd7-b226-fb7451cd98f0",
    "CBEBirr": "153d0598-4e01-41ab-a693-t9e2g4da6u13",
    "Commercial Bank of Ethiopia (CBE)": "96e41186-29ba-4e30-b013-2ca36d7e7025",
    "Cooperative Bank of Oromia (COOP)": "f5dd0ca8-0e84-4dbe-a147-fb153ea97d9c",
    "Dashen Bank": "809814c1-ab98-4750-a5b8-3be5db7bd5f5",
    "M-Pesa": "953d0598-4e01-41ab-ac93-t9eab4da1u13",
    "telebirr": "853d0598-9c01-41ab-ac99-48eab4da1513",
    "Zemen Bank": "32b1c5b7-1ca3-4da0-aedf-3c0aaac5277e"
};

// Function to initiate payment and transfer with Chapa
const initiatePaymentAndTransfer = async (req, res) => {
    try {
        const { examId, educatorId} = req.body;

        // Find the educator by ID
        const educator = await Educator.findOne({ user: educatorId });
        console.log(educator)
        if (!educator) {
            return res.status(404).json({ error: "Educator not found" });
        }

        // Split full name into first name and last name
        const [first_name, last_name] = educator.fullName.split(' ');

        // Construct payment data
        const paymentData = {
            amount: '1000', // Example amount
            currency: 'ETB',
            email: educator.email,
            first_name,
            last_name,
            tx_ref: `Transaction for Exam ${examId}`,
            // Include other necessary fields for payment
        };

        // Choose bank code based on account name
        const bank_code = bankCodeMapping[educator.bank];
        if (!bank_code) {
            return res.status(400).json({ error: "Invalid account name" });
        }

        // Construct transfer data
        const transferData = {
            account_name: educator.bank,
            account_number: educator.bankAcc,
            amount: paymentData.amount,
            currency: paymentData.currency,
            reference: `Transfer for Exam ${examId}`,
            bank_code
            // Add other necessary fields from educator data
        };

        // Send payment and transfer requests to Chapa
        const paymentResponse = await axios.post("https://api.chapa.co/v1/transaction/initialize", paymentData, {
            headers: { Authorization: "Bearer CHASECK_TEST-bIT2tai8gXLOlpbQylUCyBQunlZFFqJ3" }
        });
        
        const transferResponse = await axios.post("https://api.chapa.co/v1/transfers", transferData, {
            headers: { Authorization: "Bearer CHASECK_TEST-bIT2tai8gXLOlpbQylUCyBQunlZFFqJ3" }
        });

        // Return responses from Chapa
        res.json({ paymentResponse: paymentResponse.data, transferResponse: transferResponse.data });
    } catch (error) {
        console.error("Error initiating payment and transfer:", error);
        res.status(500).json({ error: "Error initiating payment and transfer" });
    }
};

module.exports = {
    initiatePaymentAndTransfer
};
