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

module.exports={
    postFAQ 
};