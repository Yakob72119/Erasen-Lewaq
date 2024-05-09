import { useState } from 'react';
import erasenLweq from '../assets/erasenLweq.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    collage: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [selectedRadio, setselectedRadio] = useState('');
  const [isCheck, SetIsCheck] = useState(false);
  const [error, setError] = useState('');
  const [errorStyle, setErrorStyle] = useState('red');
  const [submit, setSubmit] = useState('');


  const collages = [
    "Addis Ababa University",
    "Jimma University",
    "Hawassa University",
    "Mekelle University",
    "Bahir Dar University",
    "Arba Minch University",
    "University of Gondar",
    "Debre Markos University",
    "Ethiopian Civil Service University",
    "Adama Science and Technology University",
    "Wollo University",
    "Dilla University",
    "Haramaya University",
    "Dire Dawa University",
    "Debre Berhan University",
    "Bule Hora University",
    "Assosa University",
    "Bahir Dar Institute of Technology",
    "Addis Ababa Science and Technology University",
    "Addis Ababa Medical University",
    "Adigrat University",
    "Alage Agricultural Technical Vocational Education Training College",
    "Ambo University",
    "Axum University",
    "Bahir Dar Polytechnic College",
    "Bonga College of Teacher Education",
    "Dabat Institute of Technology",
    "Dessie College of Health Sciences",
    "Debre Birhan University",
    "Debremarkos Teachers Education College",
    "Debre Tabor University",
    "Defense College of Health Sciences",
    "Dire Dawa Institute of Technology",
    "Dire Dawa University",
    "Ethio-Nippon Technical College",
    "Federal TVET Institute",
    "Gambella University",
    "Gondar College of Teachers Education",
    "Hawassa College of Teacher Education",
    "Institute of Land Administration",
    "Jimma College of Agriculture",
    "Kotebe Metropolitan University",
    "Madawalabu University",
    "Mekelle Institute of Technology",
    "Mekelle University",
    "Metu University College",
    "Mizan-Tepi University",
    "Motta College of Teacher Education",
    "Moyale College of Health Sciences",
    "Mursi Community College",
    "Sodo College of Teacher Education",
    "University of Gondar",
    "University of Health Sciences",
    "Wachamo University",
    "Wegagen Bank Share Company Academy",
    "Wollega University",
    "Wollo University",
    "Yirgalem Technical and Vocational Education Training College",
    "Yirgalem University",
    'Other Collage'

  ];
  
  const departments = [
    'Anesthesia',
    'Public Health',
    'Pharmacy',
    'Medical Laboratory',
    'Nursing',
    'Midwifery',
    'Environmental Health',
    'Architecture and Urban Planning',
    'Biomedical Engineering',
    'Chemical Engineering',
    'Civil Engineering',
    'Computer Science',
    'Electrical and Computer Engineering',
    'Hydraulics and Water Resources Engineering',
    'Information Science',
    'Information Technology',
    'Material Science Engineering',
    'Mechanical Engineering',
    'Software Engineering',
    'Water Supply & Engineering',
    'Animal Production',
    'Animal Breeding & Genetics',
    'Animal Nutrition',
    'Natural Resource Management',
    'Horticulture',
    'Agriculture (Specialization in Soil Sciences)',
    'Agronomy',
    'Plant Pathology',
    'Plant Breeding',
    'Plant Biotechnology',
    'Agricultural Entomology',
    'Weed Science',
    'Plant Protection',
    'Postharvest Science and technology',
    'Postharvest Management',
    'Food Science and Technology',
    'Food Science and Nutrition',
    'Gender and Rural Development',
    'Agribusiness & Value Chain management',
    'Agricultural Economics',
    'Rural Development and Agricultural extension',
    'Rural Development and Environment',
    'Veterinary Epidemiology',
    'Veterinary Public health',
    'Veterinary Microbiology',
    'Animal Biotechnology',
    'Applied Microbiology',
    'Ecology & Systematic Zoology',
    'Botanical Sciences',
    'Aquaculture and Fisheries Management',
    'Analytical Chemistry',
    'Applied Entomology',
    'Organic Chemistry',
    'Inorganic Chemistry',
    'Physical Chemistry',
    'Astrophysics',
    'Condensed Matters Physics',
    'Nuclear physics',
    'Quantum Optics and Information Physics',
    'Statistical Physics',
    'Mathematics (Differential Equation)',
    'Mathematics (Numerical Analysis)',
    'Functional Analysis',
    'Biostatistics',
    'Sport Management',
    'Football Coaching',
    'Athletics Coaching',
    'Broadcast Journalism',
    'Development Anthropology and Indigenous Knowledge',
    'Ethiopian Literature & Folklore',
    'History',
    'Intercultural Communications and Public Diplomacy',
    'Land Resource Analysis & Management',
    'Literature',
    'Oromo Folklore & Cultural Studies',
    'Print and Online Journalism',
    'Public Relations and Corporate Communications',
    'Social Anthropology',
    'Socio-cultural Linguistics',
    'Sociology of Family and Gender',
    'Sociology (Specialization in Social policy)',
    'Social Work',
    'Teaching English as Foreign Language (TEFL)',
    'Urban and Regional Development Planning',
    'Accounting & Finance',
    'Economics',
    'Management',
    'Banking and Finance',
    'Hospitality and Tourism',
    'Educational Planning & Management',
    'Governance and Development Studies',
    'Logistics and Supply Chain Management',
    'Project Management and Finance',
    'Public Management (MPM)',
    'Business Administration (MBA)',
    'Accounting and Finance',
    'Development Economics',
    'Economics (Economic Policy Analysis)',
    'Industrial Economics',
    'Transport Economics',
    'Finance Economics',
    'Management',
    'Psychology',
    'Special Needs and Inclusive Education',
    'Civics',
    'Law',
    'Commercial and Investment Law',
    'Human Rights and Criminal Law',
    'Construction Law',
    'Curriculum and Instruction',
    'Educational leadership',
    'Counseling Psychology',
    'Developmental Psychology',
    'Early Childhood Care and Education',
    'Social Psychology',
    'Educational Leadership and Policy Studies',
    'Governance & Development Studies',
    'Other Department'
  
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message when input changes
  };

  const handleCheckboxChange = () => {
    SetIsCheck(!isCheck);
  };

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setselectedRadio(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmit(true);

    // Form validation
    const emptyFields = Object.values(formData).filter((value) => value === '');
    if (emptyFields.length > 0) {
      setError('All fields are required.');
      setErrorStyle('red')
      return;
    }

    if (formData.password.length < 6) {
      setError('The Password must be at least 6 characters long.');
      setErrorStyle('red')
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('The Passwords do not match.');
      setErrorStyle('red')
      return;
    }

    // Send form data to the backend
    try {
      const response = await axios.post('http://localhost:3000/student/register', formData);
      console.log(response.data); // Log the response from the backend
      setFormData({
        fullName: '',
        email: '',
        department: '',
        collage: '',
        password: '',
        confirmPassword: '',
        gender: ''
      });
      setError('Registration successful'); // Provide feedback to the user
      setErrorStyle('green')
      setSubmit(false)
      navigate('/login')
    } catch (error) {
      console.error('Error registering user:', error.response.data.error);
      setError(error.response.data.error); // Display error message returned from the backend
      setErrorStyle('red')

    }
  };

  return (
    <div className='Registration'>
      <div className='left-decor'>{/* this is just for left decor */}</div>
      <div className='registration-container'>
        <img className='EranseLewaqLogo' src={erasenLweq} alt='EranseLewaq-logo' />
        <h1 className='title'>Registration</h1>
        <form className='registerForm' onSubmit={handleSubmit}>
          <input
            type='text'
            name='fullName'
            placeholder='Full Name'
            value={formData.fullName}
            onChange={handleInputChange}
            {...(submit && formData.fullName === '' && { required: true })}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
            {...(submit && formData.email === '' && { required: true })}

          />
          <select
            className='input'
            name='department'
            value={formData.department}
            onChange={handleInputChange}
            {...(submit && formData.department === '' && { required: true })}>
            <option value=''>~Department~</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select
            className='input'
            name='collage'
            value={formData.collage}
            onChange={handleInputChange}
            {...(submit && formData.collage === '' && { required: true })}>
            <option value=''>~University/Collage~</option>
            {collages.map((collage) => (
              <option key={collage} value={collage}>
                {collage}
              </option>
            ))}
          </select>
          <input
            type={isCheck ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            {...(submit && formData.password === '' && { required: true })}
          />
          <input
            type={isCheck ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleInputChange}
            {...(submit && formData.confirmPassword === '' && { required: true })}
          />
          <div className={submit && formData.gender === '' ? 'error' : 'Gender'}>
            <label htmlFor='gender' {...(submit && formData.gender === '' && { required: true })}>Gender</label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={selectedRadio === 'Male'}
                onChange={handleSelectedRadio}
                {...(submit && formData.gender === '' && { required: true })}
              />
              Male
            </label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Female'
                checked={selectedRadio === 'Female'}
                onChange={handleSelectedRadio}
                {...(submit && formData.gender === '' && { required: true })}
              />
              Female
            </label>
          </div>
          <div className='showPass'>
            <input
              type='checkbox'
              className='check'
              id='checkBox'
              checked={isCheck}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='checkBox' className='check-label'>
              Show me the password
            </label>
          </div>
          {error && <span style={{ color: errorStyle }}>{error}</span>}
          <input type='submit' value='Register' className='formBtn' />
          <div className='redirect'>
            <p>
              You have an account? <Link className='ancr' to={'/login'}>Login</Link>
            </p>
          </div>
        </form>
      </div>
      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
};

export default Registration;
