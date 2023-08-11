import React, { useState } from 'react';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleQuestionSubmit = () => {
    // Check if the user has selected a plan that allows posting questions
    if (selectedPlan === 'premium') {
      // Process the submitted question and save it to the database
      // ...
    } else {
      // Handle the scenario when the user does not have the appropriate subscription plan
      alert('You need a premium subscription to post questions.');
    }
  };

  return (
    <div>
      {/* Subscription plan selection */}
      <div>
        <label>
          <input
            type="radio"
            value="silver"
            checked={selectedPlan === 'silver'}
            onChange={() => setSelectedPlan('silver')}
          />
          Free Plan
        </label>
        <label>
          <input
            type="radio"
            value="premium"
            checked={selectedPlan === 'premium'}
            onChange={() => setSelectedPlan('premium')}
          />
          Premium Plan
        </label>
      </div>

      {/* Question form */}
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
      ></textarea>
      <button onClick={handleQuestionSubmit}>Submit</button>
    </div>
  );
};

export default QuestionForm;
