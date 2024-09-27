import { useState } from 'react';
import DiscussionBoard from './DiscussionBoardDemo'; // Import the DiscussionBoard component
import Statement from './StatementOfAuthenticity';
import JSFeatures from './AdvancedJSFeatures';

// Function Component
function AdvancedJS() {
    // State to track which button is clicked
    const [clickedButton, setClickedButton] = useState(1);

    const toggleDemo = (index) => {
        setClickedButton(index);
    }

    // Clear all topics and messages from localStorage and reload the page to reflect changes
    const clearDiscussionBoard = () => {
        if (window.confirm("Are you sure you want to delete all topics and messages? This action cannot be undone.")) {
            localStorage.removeItem('discussionTopics');
            window.location.reload(); // Reload to update the board state
        }
    }

    // Component UI: HTML Rendering
    return (
        <>
            <div style={{ minHeight: '75vh' }} className='row container-fluid p-0 m-0'>
                {/* Sidebar (Column 1) */}
                <div style={{ backgroundColor: '#003049' }} className='col-12 col-md-3'>
                    <div class="row gap-2 justify-content-around">
                        <button
                            className={`btn ${clickedButton === 1 ? 'btn-warning' : 'btn-primary'} col-11 col-md-10`}
                            onClick={() => toggleDemo(1)}>
                            Discussion Board Demo
                        </button>
                        <button
                            className={`btn ${clickedButton === 2 ? 'btn-warning' : 'btn-primary'} col-5 col-md-10`}
                            onClick={() => toggleDemo(2)}>
                            Clear Discussion Board
                        </button>
                        <button
                            className={`btn ${clickedButton === 3 ? 'btn-warning' : 'btn-primary'} col-5 col-md-10`}
                            onClick={() => toggleDemo(3)}>
                            Statement Of Authenticity
                        </button>
                        <button
                            className={`btn ${clickedButton === 4 ? 'btn-warning' : 'btn-primary'} col-5 col-md-10`}
                            onClick={() => toggleDemo(4)}>
                            JS Features
                        </button>
                    </div>
                </div>

                {/* Content Area (Column 2) */}
                <div style={{ backgroundColor: '#F1F1F1', }} className='col-12 col-md-9'>
                    <div style={{ minHeight: '50vh' }}>
                        {clickedButton === 1 && <DiscussionBoard />}
                        {clickedButton === 2 && (
                            <div>
                                <h2>Clear Discussion Board</h2>
                                <button className="btn btn-danger" onClick={clearDiscussionBoard}>
                                    Delete All Topics and Messages
                                </button>
                            </div>
                        )}
                        {clickedButton === 3 && <Statement />}
                        {clickedButton === 4 && <JSFeatures />}
                    </div>
                </div>
            </div>
        </>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS;
