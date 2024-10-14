import React, { useState } from "react";
import "./LoginModal.css";
import countryData from "../../../data.json";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import qs from "qs";

const LoginModal = ({ onClose }) => {
  const [loginClick, setLoginClick] = useState(true);
  const [errors, setErrors] = useState({ mobile: "", password: "" });
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
 
  const handleLogin = () => {
    setLoginClick(true);
  };

  const handleRegister = () => {
    setLoginClick(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("login-modal")) {
      onClose();
    }
  };

  // for login form
  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Validation logic for mobile number
    if (name === "mobile") {
      if (/^\d*$/.test(value)) {
        if (value.length === 10) {
          setErrors((prev) => ({ ...prev, mobile: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            mobile: "Mobile number must be 10 digits",
          }));
        }
      } else {
        setErrors((prev) => ({ ...prev, mobile: "Only numbers are allowed" }));
      }
    }
  
    // Validation logic for password
    if (name === "password") {
      if (value.length < 6 || value.length > 15) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be between 6 and 15 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.mobile || !formData.password) {
      setErrors((prev) => ({
        ...prev,
        mobile: !formData.mobile
          ? "Mobile number is required"
          : prev.mobile,
        password: !formData.password ? "Password is required" : prev.password,
      }));
    } else if (!errors.mobile && !errors.password && formData.mobile.length === 10) {
      try {
        const response = await axios.post(
          "https://alpha-shoppy.vercel.app/api/login",
          qs.stringify({ mobile: formData.mobile, password: formData.password }), // Convert data to URL-encoded format
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded', // URL-encoded headers
            },
          }
        );
        console.log("API Response:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.data[0]));
        onClose(); 
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        setErrors((prev) => ({ ...prev, login: "Login failed. Please try again." }));
      }
    }
  };

  // for register form 
  const [formDataRegister, setFormDataRegister] = useState({
    mobile: "",
    name: "rohit",
    // last_name: "pawar",
    password: "12345678",
    country_code: 2,
    email: "kumkumrai32002@gmail.com",
    gender: "male"
  });
  
  const handleInputChangeRegister = (e) => {
    const { name, value } = e.target;
    setFormDataRegister((prev) => ({ ...prev, [name]: value }));
  
    // Validation logic for mobile number
    if (name === "mobile") {
      if (/^\d*$/.test(value)) {
        if (value.length === 10) {
          setErrors((prev) => ({ ...prev, mobile: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            mobile: "Mobile number must be 10 digits",
          }));
        }
      } else {
        setErrors((prev) => ({ ...prev, mobile: "Only numbers are allowed" }));
      }
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    if (!formDataRegister.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required",
      }));
    } else if (!errors.mobile && formDataRegister.mobile.length === 10) {
      if (verified) {
        try {
          const response = await axios.post(
            "https://alpha-shoppy.vercel.app/api/register_user",
            qs.stringify(formDataRegister), 
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
              },
            }
          );
          console.log("API Response:", response.data);
          onClose(); 
        } catch (error) {
          console.error("Registration failed:", error.response?.data || error.message);
          setErrors((prev) => ({ ...prev, register: "Registration failed. Please try again." }));
        }
      } else {
        alert("Please verify the captcha!");
      }
    }
  };
  

  // Country code picker
  const [selectedCountry, setSelectedCountry] = useState(countryData.data[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false); // Close dropdown after selecting a country
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // reCaptcha code
  const [verified, setVerified] = useState(false);

  const handleRecaptcha = (value) => {
    if (value) {
      setVerified(true);
      console.log("Captcha verified");
    } else {
      setVerified(false);
    }
  };

  return (
    <div className="login-modal" onClick={handleClickOutside}>
      <div className="login-modal-content">
        <div className="modal-close-button">
          <button onClick={onClose} className="close-button">
            X
          </button>
        </div>
        <div className="login-modal-header">
          <div
            className="login-tab text-center p-3"
            onClick={handleLogin}
            style={{
              backgroundColor: loginClick ? "#49A6A2" : "",
              cursor: "pointer",
              color: loginClick ? "white" : "black",
            }}
          >
            Login
          </div>
          <div
            className="login-register-tab text-center p-3"
            onClick={handleRegister}
            style={{
              backgroundColor: loginClick ? "" : "#49A6A2",
              color: loginClick ? "black" : "white",
              padding: "25px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            Register
          </div>
        </div>
        {loginClick ? (
          <form className="input-login-modal m-4" onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="mobile"
              placeholder="Mobile number"
              value={formData.mobile}
              onChange={handleInputChangeLogin}
            />
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChangeLogin}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <div className="forgot-password py-3 float-end">Forgot Password?</div>

            <ReCAPTCHA
              sitekey="6LfbQVMqAAAAANe0MZ_OK8XUHtv-QjTWXotCffao"
              onChange={handleRecaptcha}
              className="text-center "
            />
            {errors.login && <p className="error-text">{errors.login}</p>}
            <button type="submit" className="login-button-modal mt-2">
              Login
            </button>
          </form>
        ) : (
          <form className="input-login-modal m-4" onSubmit={handleRegisterSubmit}>
            <div className="custom-dropdown">
              <div className="dropdown-selected" onClick={toggleDropdown}>
                <img
                  src={selectedCountry.flag}
                  alt={`${selectedCountry.name} flag`}
                  width="20"
                  height="15"
                  className=""
                />
                <span>{selectedCountry.dial_code}</span>
                <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
                  ▼
                </span>
              </div>
              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                className="my-3"
                value={formDataRegister.mobile}
              onChange={handleInputChangeRegister}
              />

              {isOpen && (
                <div className="dropdown-list">
                  {countryData.data.map((country) => (
                    <div
                      key={country.code}
                      className="dropdown-item"
                      onClick={() => handleSelect(country)}
                    >
                      <img
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width="20"
                        height="15"
                      />
                      <div>
                        {country.name} ({country.dial_code})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            <ReCAPTCHA
              sitekey="6LfbQVMqAAAAANe0MZ_OK8XUHtv-QjTWXotCffao"
              onChange={handleRecaptcha}
              className="text-center"
            />

            <button type="submit" className="login-button-modal">
              Send OTP
            </button>
            <button
              type="submit"
              className="login-button-modal my-3 bg-danger"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
