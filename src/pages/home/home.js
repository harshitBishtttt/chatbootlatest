import './home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {

    useEffect(() => {
        const interval = setInterval(() => {
            const button = document.getElementById('chatbase-bubble-button');
            if (button) {
                console.log('Chatbase button found, clicking it to open chat window.');
            button.click();
            clearInterval(interval);
            } else {
           // clearInterval(interval);
            }
        }, 500);
    }, []);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add any logout logic here (e.g., clearing tokens)
        localStorage.clear();
        navigate('/');
    };

    return (
        <section className="py-5 BorderSection">
            <a onClick={handleLogout}>Logout</a>
            <div className="container">
                <div className="row align-items-start">

                    <div className="col-lg-8 col-md-12">
                        <h2 className="section-title">
                            Streamline Your Care Coordination
                        </h2>

                        <p className="section-subtitle mb-4">
                            Designed for speed and accuracy, helping providers make informed decisions faster.
                        </p>

                        <div className="row g-4">

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="feature-icon icon-orange">
                                        <i className="fa-solid fa-database"></i>
                                    </div>
                                    <h5>Instant Record Retrieval</h5>
                                    <p>
                                        Ask natural language questions to instantly retrieve patient vitals,
                                        medications, and history.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="feature-icon icon-green">
                                        <i className="fa-solid fa-shield-halved"></i>
                                    </div>
                                    <h5>HIPAA Compliant & Secure</h5>
                                    <p>
                                        Enterprise-grade encryption and strict access controls ensure
                                        patient data remains protected.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="feature-card">
                                    <div className="feature-icon icon-blue">
                                        <i className="fa-solid fa-stethoscope"></i>
                                    </div>
                                    <h5>Clinical Decision Support</h5>
                                    <p>
                                        Synthesized insights from clinical guidelines to support your care plans.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div className="chat-shell">
                           
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Home;