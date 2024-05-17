// controllers/faqController.js
const FAQ = require('./../models/fqaModel');

const postFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const faq = new FAQ({ question, answer });
    await faq.save();
    res.status(201).json({ message: 'FAQ posted successfully', faq });
  } catch (error) {
    console.error('Error posting FAQ:', error);
    res.status(500).json({ error: 'Could not post FAQ' });
  }
};

const getAllFAQs = async (req, res) => {
  try {
    // Fetch all FAQs from the database
    const faqs = await FAQ.find();
    res.json(faqs); // Send the fetched FAQs as a JSON response
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports={
    postFAQ,
    getAllFAQs 
};