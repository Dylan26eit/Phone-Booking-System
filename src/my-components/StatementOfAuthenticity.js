import React from 'react';

function StatementOfAuthenticity() {
  return (
    <div className="card bg-light mb-3">
      <div className="card-body">
        <h3 className="card-title font-weight-bold">Statement of authenticity</h3>
        <p className="card-text">I confirm that:</p>
        <ul>
          <li>This is an original assessment and is entirely my own work.</li>
          <li>
            It contains no material previously published or written by another person or myself except where due acknowledgment is made in the text.
          </li>
          <li>
            No material which to a substantial extent, has been submitted for any other academic course, is included without acknowledgment.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StatementOfAuthenticity;
