import React, { useState } from "react";
import {
  Upload,
  Code,
  DollarSign,
  FileText,
  Tag,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Image,
  X,
} from "lucide-react";

const UploadSellPage = () => {
  const [formData, setFormData] = useState({
    toolName: "",
    description: "",
    price: "",
    category: "",
    file: null,
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    "Web Development",
    "Mobile Apps",
    "Desktop Apps",
    "APIs & Backend",
    "Design Tools",
    "DevOps & Deployment",
    "Testing Tools",
    "Code Libraries",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [type]: file,
      }));
      if (errors[type]) {
        setErrors((prev) => ({
          ...prev,
          [type]: "",
        }));
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
      if (errors.file) {
        setErrors((prev) => ({
          ...prev,
          file: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.toolName.trim()) {
      newErrors.toolName = "Tool name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.file) {
      newErrors.file = "Tool file is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Check if user is authenticated
      const token =
        typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
      if (!token) {
        alert("Please login to upload tools");
        window.location.href = "/auth";
        return;
      }

      const uploadData = new FormData();
      uploadData.append("toolName", formData.toolName);
      uploadData.append("description", formData.description);
      uploadData.append("price", formData.price);
      uploadData.append("category", formData.category);
      uploadData.append("file", formData.file);
      if (formData.image) {
        uploadData.append("image", formData.image);
      }

      const response = await fetch("/api/tools/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: uploadData,
      });

      if (response.ok) {
        alert("Tool uploaded successfully! Redirecting to browse page...");
        window.location.href = "/browse";
      } else {
        const errorData = await response.json();
        setErrors({ general: errorData.message || "Upload failed" });
      }
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: null,
    }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
      </div>

      {/* Navigation Header */}
      <div className="relative z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevMarket
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative flex-1 px-6 pb-6"
        style={{ height: "calc(100vh - 88px)" }}
      >
        <div className="h-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6 h-full">
            {/* Left Panel - Upload Info */}
            <div className="lg:col-span-2">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-3">
                    Sell Your
                    <br />
                    <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      Developer Tools
                    </span>
                  </h2>
                  <p className="text-white/80 leading-relaxed">
                    Share your creations with thousands of developers and earn
                    from your work.
                  </p>
                </div>

                <div className="flex-1 space-y-4">
                  {[
                    {
                      icon: DollarSign,
                      title: "Earn Revenue",
                      desc: "Set your own price and keep 85% of sales",
                      gradient: "from-emerald-400 to-green-500",
                    },
                    {
                      icon: CheckCircle,
                      title: "Instant Publishing",
                      desc: "Your tools go live immediately after upload",
                      gradient: "from-cyan-400 to-blue-500",
                    },
                    {
                      icon: Tag,
                      title: "Easy Management",
                      desc: "Update pricing and descriptions anytime",
                      gradient: "from-purple-400 to-pink-500",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    85%
                  </div>
                  <div className="text-white/70 text-sm">Revenue Share</div>
                </div>
              </div>
            </div>

            {/* Right Panel - Upload Form */}
            <div className="lg:col-span-3">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 h-full">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Upload Your Tool
                  </h3>
                  <p className="text-white/70">
                    Fill in the details below to list your developer tool
                  </p>
                </div>

                {/* Error Message */}
                {errors.general && (
                  <div className="mb-4 p-3 backdrop-blur-xl bg-red-500/20 border border-red-400/30 rounded-xl">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-300 mr-2" />
                      <p className="text-red-300 text-sm">{errors.general}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Tool Name */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-1">
                          Tool Name *
                        </label>
                        <div className="relative">
                          <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="text"
                            name="toolName"
                            value={formData.toolName}
                            onChange={handleInputChange}
                            placeholder="e.g., API Testing Suite"
                            className={`w-full pl-10 pr-3 py-3 backdrop-blur-xl bg-white/10 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                              errors.toolName
                                ? "border-red-400/50"
                                : "border-white/20"
                            }`}
                          />
                        </div>
                        {errors.toolName && (
                          <p className="text-red-300 text-xs mt-1">
                            {errors.toolName}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-1">
                          Price ($) *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="29.99"
                            min="0"
                            step="0.01"
                            className={`w-full pl-10 pr-3 py-3 backdrop-blur-xl bg-white/10 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15 ${
                              errors.price
                                ? "border-red-400/50"
                                : "border-white/20"
                            }`}
                          />
                        </div>
                        {errors.price && (
                          <p className="text-red-300 text-xs mt-1">
                            {errors.price}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-1">
                        Category *
                      </label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4 z-10" />
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-3 py-3 backdrop-blur-xl bg-white/10 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white transition-all duration-300 hover:bg-white/15 appearance-none cursor-pointer ${
                            errors.category
                              ? "border-red-400/50"
                              : "border-white/20"
                          }`}
                          style={{ backgroundImage: "none" }}
                        >
                          <option value="" className="bg-slate-800 text-white">
                            Select a category
                          </option>
                          {categories.map((cat) => (
                            <option
                              key={cat}
                              value={cat}
                              className="bg-slate-800 text-white"
                            >
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.category && (
                        <p className="text-red-300 text-xs mt-1">
                          {errors.category}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-1">
                        Description *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 text-white/50 w-4 h-4" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe what your tool does, its features, and benefits..."
                          rows={3}
                          className={`w-full pl-10 pr-3 py-3 backdrop-blur-xl bg-white/10 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 resize-none hover:bg-white/15 ${
                            errors.description
                              ? "border-red-400/50"
                              : "border-white/20"
                          }`}
                        />
                      </div>
                      {errors.description && (
                        <p className="text-red-300 text-xs mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* File Upload */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-1">
                          Tool File *
                        </label>
                        <div
                          className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 cursor-pointer hover:bg-white/5 ${
                            dragActive
                              ? "border-cyan-400/50 bg-cyan-400/10"
                              : errors.file
                              ? "border-red-400/50"
                              : "border-white/30 hover:border-white/50"
                          }`}
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                        >
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "file")}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".zip,.rar,.exe,.dmg,.deb,.tar.gz"
                          />
                          {formData.file ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                                <span className="text-white text-sm truncate max-w-32">
                                  {formData.file.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile("file");
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-white/50 mx-auto mb-2" />
                              <p className="text-white/70 text-sm">
                                Drop file or click
                              </p>
                              <p className="text-white/50 text-xs mt-1">
                                ZIP, RAR, EXE, DMG...
                              </p>
                            </>
                          )}
                        </div>
                        {errors.file && (
                          <p className="text-red-300 text-xs mt-1">
                            {errors.file}
                          </p>
                        )}
                      </div>

                      {/* Optional Image */}
                      <div>
                        <label className="block text-white/90 text-sm font-medium mb-1">
                          Preview Image
                        </label>
                        <div className="relative border-2 border-dashed border-white/30 hover:border-white/50 rounded-xl p-4 text-center transition-all duration-300 cursor-pointer hover:bg-white/5">
                          <input
                            type="file"
                            onChange={(e) => handleFileChange(e, "image")}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                          />
                          {formData.image ? (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                                <span className="text-white text-sm truncate max-w-32">
                                  {formData.image.name}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile("image");
                                }}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Image className="w-6 h-6 text-white/50 mx-auto mb-2" />
                              <p className="text-white/70 text-sm">Optional</p>
                              <p className="text-white/50 text-xs mt-1">
                                JPG, PNG, GIF...
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 disabled:from-gray-500 disabled:to-gray-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Upload & Publish
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSellPage;
