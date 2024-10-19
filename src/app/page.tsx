"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Define regex in a variable
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";

    // Use the regex variable for email validation
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (formData.password.length < 6 || formData.password.length > 25) {
      errors.password = "Password must be between 6 and 25 characters";
    }

    if (formData.password !== formData.password2) {
      errors.password2 = "Passwords do not match";
    }

    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-black p-8 rounded shadow-md w-96">
        <h2 className="text-center text-xl font-semibold mb-6">
          Register with us
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className={`w-full p-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded`}
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300">
              Email
            </label>
            <input
              type="text"
              id="email"
              className={`w-full p-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded`}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full p-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded text-black`}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password2" className="block text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              className={`w-full p-2 border ${
                errors.password2 ? "border-red-500" : "border-gray-700"
              } rounded text-black`}
              value={formData.password2}
              onChange={handleInputChange}
              placeholder="Confirm password"
            />
            {errors.password2 && (
              <p className="text-red-500 text-sm">{errors.password2}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
