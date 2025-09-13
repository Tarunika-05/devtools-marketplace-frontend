import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Code,
  ArrowRight,
  Zap,
  Shield,
  CheckCircle,
  Download,
} from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      if (isLogin) {
        // Login API call
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Store JWT token
          localStorage.setItem("jwt", data.token);
          alert("Login successful! Redirecting to browse page...");
          // Redirect to browse page
          window.location.href = "/browse";
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.message || "Login failed" });
        }
      } else {
        // Register API call
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.ok) {
          alert("Registration successful! Please login to continue.");
          setIsLogin(true);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.message || "Registration failed" });
        }
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-400/25 to-cyan-500/25 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "3s" }}
        ></div>
      </div>

      {/* Navigation Header */}
      <div className="relative z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevMarket
              </h1>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className="text-white/80 hover:text-cyan-300 transition-colors duration-300 font-medium"
            >
              ← Back to Browse
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Features */}
            <div className="hidden lg:block">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Join the Developer
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Community
                  </span>
                </h2>
                <p className="text-white/80 mb-10 text-lg leading-relaxed">
                  Access premium developer tools, sell your creations, and
                  connect with thousands of developers worldwide.
                </p>

                {/* Features List */}
                <div className="space-y-8">
                  {[
                    {
                      icon: Zap,
                      title: "Instant Access",
                      desc: "Download tools immediately after purchase with secure links",
                      gradient: "from-yellow-400 to-orange-500",
                    },
                    {
                      icon: Shield,
                      title: "Secure Platform",
                      desc: "Safe transactions with buyer protection and encrypted data",
                      gradient: "from-emerald-400 to-teal-500",
                    },
                    {
                      icon: Code,
                      title: "Quality Tools",
                      desc: "Curated developer tools and utilities from trusted creators",
                      gradient: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Download,
                      title: "Unlimited Downloads",
                      desc: "Re-download your purchased tools anytime, anywhere",
                      gradient: "from-purple-400 to-pink-500",
                    },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-5 group"
                    >
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                      >
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        2.5K+
                      </div>
                      <div className="text-white/70">Tools Available</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        15K+
                      </div>
                      <div className="text-white/70">Active Users</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        50K+
                      </div>
                      <div className="text-white/70">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl shadow-black/10">
                {/* Toggle Buttons */}
                <div className="flex backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-1 mb-8">
                  <button
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      isLogin
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setIsLogin(true);
                      setErrors({});
                      setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Login
                  </button>
                  <button
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      !isLogin
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      setIsLogin(false);
                      setErrors({});
                      setFormData({
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      });
                    }}
                  >
                    Register
                  </button>
                </div>

                {/* Form Title */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-white/70 text-lg">
                    {isLogin
                      ? "Sign in to access your developer tools"
                      : "Join thousands of developers today"}
                  </p>
                </div>

                {/* Error Message */}
                {errors.general && (
                  <div className="mb-6 p-4 backdrop-blur-xl bg-red-500/20 border border-red-400/30 rounded-2xl">
                    <p className="text-red-300 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full pl-12 pr-4 py-4 backdrop-blur-xl bg-white/10 border rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                            errors.name
                              ? "border-red-400/50"
                              : "border-white/20"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-300 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`w-full pl-12 pr-4 py-4 backdrop-blur-xl bg-white/10 border rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                          errors.email ? "border-red-400/50" : "border-white/20"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-300 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-white/90 text-sm font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className={`w-full pl-12 pr-12 py-4 backdrop-blur-xl bg-white/10 border rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                          errors.password
                            ? "border-red-400/50"
                            : "border-white/20"
                        }`}
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-300 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field (Register only) */}
                  {!isLogin && (
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm your password"
                          className={`w-full pl-12 pr-12 py-4 backdrop-blur-xl bg-white/10 border rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                            errors.confirmPassword
                              ? "border-red-400/50"
                              : "border-white/20"
                          }`}
                        />
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-300 text-xs mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-500 disabled:to-gray-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {isLogin ? "Sign In" : "Create Account"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer Links */}
                {isLogin && (
                  <div className="mt-6 text-center">
                    <button className="text-cyan-300 hover:text-cyan-200 text-sm transition-colors duration-300">
                      Forgot your password?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
