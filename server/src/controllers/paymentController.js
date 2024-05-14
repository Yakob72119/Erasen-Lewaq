const fetch = require('node-fetch');
const Educator = require('./../models/educatorModel');
const Exam = require('./../models/examModel');
const PaymentHistory = require('./../models/paymentModel');

const bankCodeMapping = {
    "Awash Bank": "80a510ea-7497-4499-8b49-ac13a3ab7d07",
    "Bank of Abyssinia": "32735b19-bb36-4cd7-b226-fb7451cd98f0",
    "CBEBirr": "153d0598-4e01-41ab-a693-t9e2g4da6u13",
    "Commercial Bank of Ethiopia": "96e41186-29ba-4e30-b013-2ca36d7e7025",
    "Cooperative Bank of Oromia": "f5dd0ca8-0e84-4dbe-a147-fb153ea97d9c",
    "Dashen Bank": "809814c1-ab98-4750-a5b8-3be5db7bd5f5",
    "M-Pesa": "953d0598-4e01-41ab-ac93-t9eab4da1u13",
    "telebirr": "853d0598-9c01-41ab-ac99-48eab4da1513",
    "Zemen Bank": "32b1c5b7-1ca3-4da0-aedf-3c0aaac5277e"
};

const initiateTransfer = async (req, res) => {
    try {
        const { examId, educatorId } = req.body;

        const educator = await Educator.findOne({ user: educatorId });
        if (!educator) {
            return res.status(404).json({ error: "Educator not found" });
        }

        const bank_code = bankCodeMapping[educator.bank];
        if (!bank_code) {
            return res.status(400).json({ error: "Invalid account name" });
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer CHASECK_TEST-bIT2tai8gXLOlpbQylUCyBQunlZFFqJ3");
        myHeaders.append("Content-Type", "application/json");

        const transferData = {
            account_name: educator.bank,
            account_number: educator.bankAcc,
            amount: "1000",
            currency: "ETB",
            reference: `${examId}`,
            bank_code: bank_code
        };

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(transferData),
            redirect: "follow"
        };

        fetch("https://api.chapa.co/v1/transfers", requestOptions)
            .then(response => response.json())
            .then(async result => {
                console.log("result for transfer",result)
                if (result.status === 'success') {
                    res.status(200).json({ success: "Transfer completed" });
                } else {
                    res.status(500).json({ error: "Transfer failed" });
                }
                    }); 
                 } catch (error) {
                        console.error("Error initiating transfer:", error);
                        res.status(500).json({ error: "Error initiating transfer" });
                    }};

const verifyTransfer = async (req, res) =>{

    const { examId, educatorId } = req.body;
    await Exam.findByIdAndUpdate(examId, { payment_status: "Paid" });
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer CHASECK_TEST-bIT2tai8gXLOlpbQylUCyBQunlZFFqJ3");
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.chapa.co/v1/transfers/verify/${examId}`, requestOptions)
    .then(response => response.json())
    .then(async result => {
    console.log("result for verfication",result)
        const paymentHistory = new PaymentHistory({
            educatorId,
            examId,
            verificationResponse: result
        });
         paymentHistory.save();
    })
};


module.exports = {
    initiateTransfer,
    verifyTransfer
};
