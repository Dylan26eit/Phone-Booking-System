import React, { useState, useEffect, useRef } from 'react';
import sampleData from './SampleData.json'; // Adjust the path as necessary

function DiscussionBoard() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicName, setTopicName] = useState('');
  const isFirstRender = useRef(true);

  // Load topics from localStorage or use sample data
  useEffect(() => {
    const storedTopics = localStorage.getItem('discussionTopics');
    if (storedTopics) {
      setTopics(JSON.parse(storedTopics));
    } else {
      // If no topics in localStorage, load sample data
      setTopics(sampleData);
      localStorage.setItem('discussionTopics', JSON.stringify(sampleData));
    }
  }, []);

  // Save topics to localStorage
  useEffect(() => {
    if (!isFirstRender.current) {
      localStorage.setItem('discussionTopics', JSON.stringify(topics));
    } else {
      isFirstRender.current = false;
    }
  }, [topics]);

  // Handle creating a new topic
  const handleTopicSubmit = (event) => {
    event.preventDefault();
    if (topicName.trim()) {
      const newTopic = {
        id: Date.now(),
        name: topicName.trim(),
        messages: [],
      };
      setTopics([...topics, newTopic]);
      setTopicName('');
    } else {
      alert('Please enter a topic name.');
    }
  };

  // Handle submitting a new message
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() && message.trim() && selectedTopic) {
      const newMessage = {
        id: Date.now(),
        username: username.trim(),
        content: message.trim(),
        timestamp: new Date().toLocaleString(),
      };
      setTopics(prevTopics =>
        prevTopics.map(topic =>
          topic.id === selectedTopic
            ? { ...topic, messages: [...topic.messages, newMessage] }
            : topic
        )
      );
      setMessage('');
    } else {
      alert('Please enter both username and message, and select a topic.');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Discussion Board</h2>

      {/* If no topic is selected, show the topic creation form and topic list */}
      {!selectedTopic ? (
        <>
          <form onSubmit={handleTopicSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="topic" className="form-label">Create New Topic:</label>
              <input
                type="text"
                id="topic"
                className="form-control"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create Topic</button>
          </form>

          {/* Styled topic list */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {topics.map((topic) => (
              <li key={topic.id} style={{ marginBottom: '10px' }}>
                <button
                  onClick={() => setSelectedTopic(topic.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '20px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#333',
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  {topic.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          {/* Back button to go back to the topic selection screen */}
          <button className="btn btn-success mb-3" onClick={() => setSelectedTopic(null)}>Back to Topics</button>

          {/* Show the selected topic and its messages */}
          <div>
            <h2>Messages in {topics.find(t => t.id === selectedTopic).name}</h2>
            <form onSubmit={handleSubmit} className="mb-5">
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username:</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message:</label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Post Message</button>
            </form>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {topics.find(t => t.id === selectedTopic).messages.length === 0 ? (
                <p>No messages yet. Be the first to post!</p>
              ) : (
                topics.find(t => t.id === selectedTopic).messages
                  .slice()
                  .reverse()
                  .map((msg) => (
                    <div key={msg.id} className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">{msg.username}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{msg.timestamp}</h6>
                        <p className="card-text">{msg.content}</p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DiscussionBoard;
