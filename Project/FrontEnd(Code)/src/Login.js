import Register from './Register';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "./context/AuthProvider";
import axios from './api/axios';
import DT from "./displayTable";
const LOGIN_URL = 'http://localhost:1111/login';



const Login = (props) => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                { "email": user, "password": pwd }
            );
            //console.log(JSON.stringify(response));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token;
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 404) {
                setErrMsg('Username not found');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 403) {
                setErrMsg('INVALID PASSWORD');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }





    return (
        <>
            {success ? (
                <div>
                    <h1>GPS Summary Page</h1>
                    <br />
                    <DT/>
                </div>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <button className="link-btn" onClick={() => props.onFormSwitch('Register')}>Don't have an account? Register here.</button>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login
