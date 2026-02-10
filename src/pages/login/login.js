import './login.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    useEffect(() => {
        const interval = setInterval(() => {
            const button = document.getElementById('chatbase-bubble-button');
            if (button) {
                console.log('Chatbase button found, clicking it to open chat window.');
                button.style.display = 'none';
            clearInterval(interval);
            } else {
           // clearInterval(interval);
            }
        }, 500);
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/home');
        }

    }, []);
    
    const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let errs = {};
    if (!userId) errs.userId = 'User ID is required';
    if (!password) errs.password = 'Password is required';
    
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
        try {
            const loginResponse = await fetch('https://fhirassist.rsystems.com:481/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userId, password })
            });
            const loginData = await loginResponse.json();

            if (!loginData || !loginData.idToken) {
                setLoading(false);
                setErrors({ api: loginData.message || 'Login failed' });
                return;
            }
            localStorage.setItem('authToken', loginData.idToken);
          
            const token = loginData.idToken;
            const localId = loginData.localId;

            try {
                const userResponse = await fetch(`https://fhirassist.rsystems.com:481/firebase/get-user?uuid=${localId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!userResponse.ok) throw new Error('Failed to fetch current user');

                const userData = await userResponse.json();
                localStorage.setItem('userName', userData.name || 'User');
            } catch (err) {
                console.error('Error fetching current user:', err);
                localStorage.setItem('userName', 'User'); // fallback
            }
            setLoading(false);
            sessionStorage.setItem("reloadHomeOnce", "true");
            navigate('/home');

        } catch (err) {
            setLoading(false);
            console.error('Network/login error:', err);
            setErrors({ api: 'Network error' });
        }
    }
};


    return (
        <section className="hero">
        {loading && (
                <div className="page-loader">
                    <div className="spinner"></div>
                    <p className="mt-3">Signing you in…</p>
                </div>
            )}
            {errors.api && (
                <div className="alert alert-danger mt-3">
                    <i className="fa-solid fa-circle-exclamation me-2"></i>
                    {errors.api}
                </div>
            )}
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-lg-6">
                        <h1>
                            Instant <span className="text-primary-accent">Patient Insights</span><br />
                            for Care Teams
                        </h1>
                        <p className="mt-4">
                            Empower your workflow with a secure, AI-driven assistant.
                            Query patient records, summarize complex histories,
                            and retrieve clinical protocols in seconds.
                        </p>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group mt-4 w-60">
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <i className="fa-solid fa-user"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className={`form-control${errors.userId ? ' is-invalid' : ''}`}
                                        placeholder="User ID"
                                        aria-label="User ID"
                                        value={userId}
                                        onChange={e => setUserId(e.target.value)}
                                    />
                                </div>
                                {errors.userId && <div className="invalid-feedback d-block">{errors.userId}</div>}
                            </div>
                            <div className="form-group mt-3 w-60">
                                <div className="input-group">
                                    <span className="input-group-text bg-white">
                                        <i className="fa-solid fa-lock"></i>
                                    </span>
                                    <input
                                        type="password"
                                        className={`form-control${errors.password ? ' is-invalid' : ''}`}
                                        placeholder="Password"
                                        aria-label="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary-custom mt-4 w-60">
                                <i className="fa-solid fa-comment-medical me-2"></i>
                                Launch Provider Assistant
                            </button>
                        </form>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero-card">
                            <img src="images/ChatBot.png" className="imgBg" alt="ChatBot" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;