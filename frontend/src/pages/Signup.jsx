import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await createUser({
                name,
                email,
                password
            });

            navigate("/login");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-content">

                    <h1>Create Account</h1>

                    <p className="auth-subtitle">
                        Enter details to register a new account
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="auth-form-group">
                            <label>Full Name</label>

                            <div className="auth-input-wrapper">
                                <span>♙</span>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label>Email Address</label>

                            <div className="auth-input-wrapper">
                                <span>✉</span>

                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label>Password</label>

                            <div className="auth-input-wrapper">
                                <span>♙</span>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Sign Up  →"}
                        </button>

                    </form>

                    <p className="auth-switch">
                        Already have an account?
                        {" "}
                        <Link to="/login">
                            Log In
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Signup;