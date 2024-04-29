const Cv = require('./../models/cvModel');

const submitCV  = async (req, res) => {
  try {
    
    const { fullName, eduStatus, experience, department, gLink, educatorId } = req.body;
    
    const cv = new Cv({
      educatorId: educatorId,
      fullName: fullName,
      eduStatus: eduStatus,
      experience: experience,
      department: department,
      gLink: gLink,
      submissionDate:new Date(),
      status: "Pending"
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

const getCvStatus = async (req, res) => {
  const userId = req.params.userId;
  try {
      const cv = await Cv.findOne({ educatorId: userId });
      if (!cv) {
          return res.status(404).json({ message: 'CV not found' });
      }
      // Return CV status
      res.status(200).json({ status: cv.status });
  } catch (error) {
      console.error('Error fetching CV status:', error);
      res.status(500).json({ error: 'Server error' });
  }
};

const filterCvs = async (req, res) => {
  try {
      const { department } = req.body;
      const filteredCVs = await Cv.find({ department });
      res.json(filteredCVs);
  } catch (error) {
      console.error('Error filtering CVs:', error);
      res.status(500).json({
          status: 'error',
          message: 'Internal server error'
      });
  }
};


const updateCvValue = async (req, res) => {
  const { id } = req.params; // Adjust to use "id" instead of "_id"
  
  const { value } = req.body; // Change to retrieve "value" from the request body
 
  try {
    const cv = await Cv.findById(id);

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    cv.value = value;
    if (value >= 18) {
      cv.status = 'Accepted';
    } else {
      cv.status = 'Declined';
    }
    const updatedCv = await cv.save();

    res.status(200).json(updatedCv);
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={
  submitCV, 
  getCVs,
  deleteCV,
  deleteMultipleCVs,
  getCvStatus,
  filterCvs,
  updateCvValue
};