require("dotenv").config()
const fetch = require('node-fetch');
const axios = require('axios'); // Import axios library
const Educator = require('./../models/educatorModel');
const User = require('./../models/userModel');
const Student = require('./../models/studentModel');
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
        myHeaders.append("Authorization", `Bearer ${process.env.CHAPA_AUTH}`);
        myHeaders.append("Content-Type", "application/json");

        const TEXT_REF = "tx-erasenlewaq123-" + Date.now();
        const transferData = {
            account_name: educator.bank,
            account_number: educator.bankAcc,
            amount: "1",
            currency: "ETB",
            reference: TEXT_REF,
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
            .then(result => {
                console.log("result for transfer", result);
                if (result.status === 'success') {
                    res.status(200).json({ success: "Transfer completed", reference: TEXT_REF });
                } else {
                    res.status(500).json({ error: "Transfer failed" });
                }
            })
            .catch(error => {
                console.error("Error initiating transfer:", error);
                res.status(500).json({ error: "Error initiating transfer" });
            });
    } catch (error) {
        console.error("Error initiating transfer:", error);
        res.status(500).json({ error: "Error initiating transfer" });
    }
};


const buyCoins = async (req, res) => {
    const { userId, amount } = req.body;
    
    try {
        // Find the user by ID
        const user = await User.findById(userId);
        const student = await Student.findOne({ user: userId });
        const Name = student.fullName;
        const lname = Name.split(" ")[1];
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_AUTH}`
            }
        }
        
        // a unique reference given to every transaction
        const TEXT_REF = "tx-erasenlewaq123-" + Date.now()
          // chapa redirect you to this url when payment is successful
          const CALLBACK_URL = `http://localhost:3000/payment/verify-payment/${TEXT_REF}?userId=${userId}&amount=${req.body.amount}`;




          
  
          // form data
          const data = {
              key:"CHAPUBK_TEST-PDL7acBzuikgM8etodDuUwg8yNYvroY7",
              amount: amount, 
              currency: 'ETB',
              email: user.email,
              first_name: user.fname,
              last_name: lname,
              tx_ref: TEXT_REF,
              callback_url: CALLBACK_URL,
          }
  
          await axios.post(process.env.CHAPA_URL_TRANSACTION_INITIALIZE, data, config)
          .then((response) => {
              res.status(200).json({ checkout_url: response.data.data.checkout_url });
          })
          .catch((err) => console.log(err))
    } catch (error) {
        console.error('Error buying coins:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const verifyPayment = async (req, res) => {
    const { TEXT_REF } = req.params; // Get the TEXT_REF from the URL parameter
    const userId = req.query.userId;
    const amount = req.query['amp;amount'];
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_AUTH}`
            }
        }
    try {
        const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${TEXT_REF}`, config);
   
        const student = await Student.findOne({ user: userId });
        if (student) {            
            // Ensure amount is parsed as a number before addition
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount)) {
                student.balance += parsedAmount;
            } else {
                console.error("Invalid amount:", amount);
            }

            await student.save();
        } else {
            console.error("Student not found for user ID:", userId);
        }

        res.status(200).json({ message: "Payment verified successfully" });
    } catch (error) {
        console.error("Payment can't be verified:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getStudentBalance = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const student = await Student.findOne({ user: studentId });
      if (!student) {
        return res.status(404).json({ error: 'user not found' });
      }
  
      // Assuming you have a field called balance in your user schema
      const balance = student.balance;
      res.status(200).json({ balance });
    } catch (error) {
      console.error('Error fetching student balance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

module.exports = {
    initiateTransfer,
    buyCoins,
    verifyPayment,
    getStudentBalance
};
