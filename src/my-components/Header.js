import { Link } from 'react-router-dom';

function Header() {
    const headerStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50',
    };

    const taglineStyle = {
        minHeight: '15vh',
        backgroundColor: '#2C3E50',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <>
            <header className="row m-0" style={headerStyle}>
                <div className="col-12 col-md-12 col-lg-8 text-center text-white display-5" style={taglineStyle}>
                    Phone Fix Booking System
                </div>
                <div className="col-12 col-md-12 col-lg-4">
                    <div className="container p-0">
                        <div className="row">
                            {/* Button 1 */}
                            <Link
                                to="/"
                                className="col-6 p-0 m-0 bg-info border border-dark text-center text-white"
                                style={{ textDecoration: 'none' }}
                            >
                                HOME
                            </Link>
                            {/* Button 2 */}
                            <Link
                                to="/advancedJS"
                                className="col-6 p-0 m-0 bg-info border border-dark text-center text-white"
                                style={{ textDecoration: 'none' }}
                            >
                                EXTENSION
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
