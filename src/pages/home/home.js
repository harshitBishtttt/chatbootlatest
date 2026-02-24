import './home.css';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(true);
    const iframeRef = useRef(null);

    useEffect(() => {

       

        if (iframeRef.current) {

            iframeRef.current.src =
                `https://webchat.botframework.com/embed/${botId}?s=${secret}`;

            iframeRef.current.style.opacity = "0";

            iframeRef.current.onload = () => {
                iframeRef.current.style.opacity = "1";
            };
        }

    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const toggleChat = () => {
        setChatOpen(!chatOpen);
    };



    return (
        <section className="py-5 BorderSection">
            <div className="container">
                <div className="row align-items-start">

                    <div className="col-lg-7 col-md-12">
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
                        <div className="row g-4"><div className="col-md-4 pt-4"><button className="btn btn-primary-custom mt-4 w-75" onClick={handleLogout} >
                            <i className="fa-solid fa-sign-out me-2"></i>
                            Log Out
                        </button></div></div>
                    </div>

                    <div className="col-lg-5 col-md-12">
                        {chatOpen && (
                            <div className="chat-widget-wrap">
                                <div className="chat-widget-bar">
                                    <div className="widget-avatar"></div>
                                    <div className="widget-info">
                                        <div className="widget-name">CareBridge</div>
                                        <div className="widget-status"><span className="widget-dot"></span>Online</div>
                                    </div>
                                    <div className="widget-actions">
                                        <button
                                            className="widget-btn"
                                            onClick={toggleChat}
                                            title="Close Chat"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                <iframe
                                    id="botchat"
                                    ref={iframeRef}
                                    title="AgentBot AI Assistant" 
                                    allow="microphone;"
                                ></iframe>
                            </div>
                        )}

                        {!chatOpen && (
                            <button
                                className="float-chat-btn"
                                onClick={toggleChat}
                                title="Open Chat"
                            >
                                💬
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Home;