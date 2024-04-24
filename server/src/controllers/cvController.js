const Cv = require('./../models/cvModel');

const submitCV  = async (req, res) => {
  try {
    
    const {fullName, eduStatus, experience,department,gLink} = req.body;
    
    const cv = new Cv({
      fullName: fullName,
      eduStatus: eduStatus,
      experience: experience,
      department: department,
      gLink: gLink,
      submissionDate:new Date()
    });
    
  
    await cv.save();

    res.status(201).json({ message: 'CV submitted successfully' });
  } catch (error) {
    
    console.error('Error submitting CV:', error); 
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const getCVs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10; // Limit the number of CVs fetched, default to 10
    const cvs = await Cv.find().limit(limit);
    console.log(cvs);
    res.json(cvs);
  } catch (error) {
    console.error('Error fetching CVs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    await Cv.findByIdAndDelete(id);
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error deleting CV:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMultipleCVs = async (req, res) => {
  try {
    const { cvIds } = req.body;
    await Cv.deleteMany({ _id: { $in: cvIds } });
    res.json({ message: 'Multiple CVs deleted successfully' });
  } catch (error) {
    console.error('Error deleting multiple CVs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={
  submitCV, 
  getCVs,
  deleteCV,
  deleteMultipleCVs
};