import Questions from './faqs.json';
import { useState } from 'react';
import AutoSlideshow from './AutoSlideshow';
import ManualSlideshow from './ManualSlideshow';

function FAQ() {
  const [enteredKeywords, setEnteredKeywords] = useState('');
  const inputChange = (event) => {
    setEnteredKeywords(event.target.value);
  };

  let id = 0;

  const images = [
    { src: '/images/Image1.png', caption: 'Iphone' },
    { src: '/images/Image2.png', caption: 'Samsung' },
    { src: '/images/Image3.png', caption: 'Google Pixel' },
    { src: '/images/Image4.png', caption: 'Nokia' },
  ];

  return (
    <>
      <div style={{ minHeight: '80vh', backgroundColor: '#f4f4f9', padding: '30px 0' }}>
        <div className="container">
          {/* Slideshow Section */}
          <div className="row mb-5">
            <div className="col-12 col-md-6 mb-4">
              <h2 style={{ fontSize: '22px', color: '#34495e', fontWeight: 'bold' }}>Automatic Slideshow</h2>
              <AutoSlideshow images={images} interval={3000} />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <h2 style={{ fontSize: '22px', color: '#34495e', fontWeight: 'bold' }}>Manual Slideshow</h2>
              <ManualSlideshow images={images} />
            </div>
          </div>

          {/* Search Box */}
          <div className="row justify-content-center mb-4">
            <input
              className="col-12 col-md-6"
              type="text"
              name="search"
              onChange={inputChange}
              placeholder="Search for FAQs"
              style={{
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
          </div>

          {/* FAQ Section */}
          <div>
            {Questions.filter(
              (question) =>
                question.question.toLowerCase().includes(enteredKeywords.toLowerCase()) ||
                question.answer.toLowerCase().includes(enteredKeywords.toLowerCase())
            ).map((question) => {
              return (
                <div
                  className="faq-item p-3 mb-3"
                  key={id++}
                  style={{
                    backgroundColor: '#fef3e6',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#e67e22' }}>
                    {question.question}
                  </h4>
                  <p style={{ marginBottom: '0', fontSize: '16px', color: '#34495e' }}>
                    {question.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
