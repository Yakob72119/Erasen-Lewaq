import React, { useState, useEffect } from 'react';

const Faq = () => {
  // State to store fetched FAQs
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Fetch FAQs from the database when the component mounts
    const fetchFaqs = async () => {
      try {
        const response = await fetch('http://localhost:3000/faq/getFqas');
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div className='fqa'>
      {/* Map through fetched FAQs and populate the divs */}
      <div className="answers">
        {faqs.map((faq, index) => (
          <div key={index} className="answer" id={`a${index + 1}`}>
            <h1>{faq.question}</h1>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
