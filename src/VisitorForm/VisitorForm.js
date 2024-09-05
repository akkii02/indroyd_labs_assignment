import React, { useState } from 'react';
import styles from './VisitorForm.module.css'; 

const VisitorForm = () => {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [company, setCompany] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [isCustomCompany, setIsCustomCompany] = useState(false);

  const companies = [
    'Indroyd Labs',
    '3M India',
    'Airtel',
    'Amdocs',
    'Amul',
    'Asian Paints',
    'Axis Bank',
    'Bajaj Auto',
    'Bajaj Finserv',
    'Bharti Infratel',
    'Biocon',
    'Bharat Petroleum',
    'Cadila Healthcare',
    'Cognizant',
    'Dabur',
    'HCL Technologies',
    'HDFC Bank',
    'HDFC Limited',
    'Hero MotoCorp',
    'ICICI Bank',
    'Indian Oil',
    'IndusInd Bank',
    'Infosys',
    'ITC Limited',
    'JSW Steel',
    'KPMG India',
    'Larsen & Toubro',
    'Mahindra & Mahindra',
    'Maruti Suzuki',
    'Narayana Health',
    'Nestlé India',
    'NTPC',
    'Oil & Natural Gas Corporation (ONGC)',
    'Reliance Industries',
    'SBI Bank',
    'Siemens India',
    'State Bank of India (SBI)',
    'Sun Pharma',
    'Tata Consultancy Services (TCS)',
    'Tata Motors',
    'Tata Power',
    'Tata Steel',
    'Tech Mahindra',
    'Wipro',
    'Hindustan Unilever',
    'Bharti Airtel',
    'Godrej Group',
    'Nvidia India',
    'Dr. Reddy’s Laboratories',
    'Patanjali Ayurved',
    'Bharti Enterprises',
    'Myntra',
    'Zomato',
    'Uber India',
    'Paytm',
    'Swiggy',
    'Flipkart',
    'Urban Ladder',
    'OYO Rooms',
    'GEP Worldwide',
    'Indraprastha Gas Limited (IGL)',
    'L&T Finance',
    'Maruti Suzuki India',
    'Jindal Steel & Power',
    'KPMG',
    'Axis Bank',
    'National Bank for Agriculture and Rural Development (NABARD)',
    'Syndicate Bank',
    'South Indian Bank',
    'Sundaram Finance',
    'Muthoot Finance'
  ];
   

  const validateForm = () => {
    const errors = {};
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) errors.name = 'Name is required';
    if (!contactNumber || !phonePattern.test(contactNumber)) errors.contactNumber = 'Valid contact number is required';
    if (!email || !emailPattern.test(email)) errors.email = 'Valid email is required';
    if (!purpose) errors.purpose = 'Purpose of visit is required';
    if (!entryTime) errors.entryTime = 'Entry time is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Prepare user details object
      const userDetails = {
        name,
        contactNumber,
        email,
        purpose,
        company,
        entryTime,
      };

      // Store user details in localStorage
      localStorage.setItem('visitorDetails', JSON.stringify(userDetails));

      // Optionally, clear the form
      setName('');
      setContactNumber('');
      setEmail('');
      setPurpose('');
      setCompany('');
      setEntryTime('');
      setIsCustomCompany(false);

      alert('Form submitted successfully and details saved!');
    }
  };

  const handleCompanyChange = (event) => {
    const value = event.target.value;
    setCompany(value);
    if (value === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = companies.filter(comp =>
        comp.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCompany(suggestion);
    setSuggestions([]);
    setIsCustomCompany(suggestion === 'Other');
  };

  return (
    <>
    <div className={styles.head}>
      <h1 className={styles.heading}>Visitor Entry Form</h1>
    </div>
    <div className={styles.visitorFormContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? styles.error : ''}
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="text"
            id="contactNumber"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className={errors.contactNumber ? styles.error : ''}
          />
          {errors.contactNumber && <span className={styles.errorMessage}>{errors.contactNumber}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? styles.error : ''}
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="purpose">Purpose of Visit:</label>
          <textarea
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className={errors.purpose ? styles.error : ''}
          />
          {errors.purpose && <span className={styles.errorMessage}>{errors.purpose}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="company">Company Name (if applicable):</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={handleCompanyChange}
            className={errors.company ? styles.error : ''}
            placeholder="Type your company name"
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={styles.suggestionItem}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.company && <span className={styles.errorMessage}>{errors.company}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="entryTime">Time of Entry:</label>
          <input
            type="time"
            id="entryTime"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            className={errors.entryTime ? styles.error : ''}
          />
          {errors.entryTime && <span className={styles.errorMessage}>{errors.entryTime}</span>}
        </div>

        <div className={styles.formGroup}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
};

export default VisitorForm;
