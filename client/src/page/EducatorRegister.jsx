import { useState } from 'react'
import erasenLweq from '../assets/erasenLweq.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EducatorRegister = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collage: '',
    residence: '',
    bank: '',
    bankAcc: '',
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
  

  const residences = [
    'Addis Ababa',
    'Afar',
    'Amhara',
    'Benishangul-Gumuz',
    'Dire Dawa',
    'Gambela',
    'Harari',
    'Oromia',
    'Sidama',
    'Somali',
    'Southern Nations, Nationalities, and Peoples\' Region (SNNPR)',
    'Tigray',
    'Other'
  ];
  
  const bank = ['CBE', 'Awash International Bank', 'Abyssinia Bank', 'Tele Birr', 'E-Biir', 'Amole', 'Oromiaya Bank', 'M-Pesa', 'Enat Bank'];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error message when input changes
  };

  const handleCheckboxChange = () => {
    SetIsCheck(!isCheck); // Toggle the value of isCheck
  };

  const handleSelectedRadio = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setselectedRadio(value); // Use the current value, not formData.gender
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

    try {
      const response = await axios.post('http://localhost:3000/educator/register', formData);
      console.log(response.data); // Log the response from the backend
      setFormData({
        fullName: '',
        email: '',
        collage: '',
        residence: '',
        bank: '',
        bankAcc: '',
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
      <div className="scroll"></div>

      <div className='left-decor'>{/* this is just for left decor */}</div>

      {/* container for all central components */}
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

          <div className="contact">
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              {...(submit && formData.email === '' && { required: true })}
            />
            <div className="phoneNumber">
            <input
              type='tel'
              name='code'
              className='code'
              placeholder='+251'
              value='+251'
              onChange={handleInputChange}
              disabled true
            />
            <input
              type='tel'
              name='phone'
              className='phone'
              placeholder='XXX XXX XXX'
              value={formData.phone}
              onChange={handleInputChange}
              maxLength={9}
              {...(submit && formData.phone === '' && { required: true })}
            />
            </div>
          </div>
          <select
            className='input'
            name='collage'
            id='comboCollage'
            value={formData.collage}
            onChange={handleInputChange}
            {...(submit && formData.collage === '' && { required: true })}>
            <option className='option' value=''>
              ~Department~
            </option>
            {collages.map((collage) => (
              <option key={collage} value={collage}>
                {collage}
              </option>
            ))}
          </select>
          <select
            className='input'
            name='residence'
            id='comboResidence'
            value={formData.residence}
            onChange={handleInputChange}
            {...(submit && formData.residence === '' && { required: true })}>
            <option className='option' value=''>
              ~Residence~
            </option>
            {residences.map((residence) => (
              <option key={residence} value={residence}>
                {residence}
              </option>
            ))}
          </select>
          <select
            className='input'
            name='bank'
            id='comboBank'
            value={formData.bank}
            onChange={handleInputChange}
            {...(submit && formData.bank === '' && { required: true })}>
            <option className='option' value=''>
              ~Bank~
            </option>
            {bank.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
          <input
            type='number'
            name='bankAcc'
            placeholder='Bank Acccount'
            value={formData.bankAcc}
            onChange={handleInputChange}
            {...(submit && formData.bankAcc === '' && { required: true })}
          />
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
            <label htmlFor='gender'>Gender</label>
            <label className='radioGroup'>
              <input
                type='radio'
                name='gender'
                value='Male'
                checked={selectedRadio === 'Male'}
                onChange={handleSelectedRadio}
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
          <input type="submit" value="Register" className="formBtn" id='forBtn' />
          <div className="redirect">
            <p>You have account?  <Link className='ancr' to={'/login'}>Login</Link> </p>
          </div>
        </form>
      </div>

      <div className='right-decor'>{/* this is just for right decor */}</div>
    </div>
  );
};

export default EducatorRegister
