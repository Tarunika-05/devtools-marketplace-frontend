import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Star,
  Download,
  ShoppingCart,
  Code,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Filter,
  Grid,
  List,
  LogOut,
} from "lucide-react";

const DevMarket = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tools, setTools] = useState([]);

  // Mock data for demonstration
  const mockTools = [
    {
      id: 1,
      name: "React Component Generator",
      description:
        "Automatically generate React components with TypeScript, tests, and stories",
      price: 29.99,
      seller: "CodeCraft Studios",
      rating: 4.8,
      downloads: 1247,
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      purchased: false,
      tags: ["React", "TypeScript", "Components"],
    },
    {
      id: 2,
      name: "API Documentation Builder",
      description:
        "Generate beautiful API docs from your OpenAPI specifications with custom themes",
      price: 0,
      seller: "DevTools Inc",
      rating: 4.6,
      downloads: 892,
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
      purchased: true,
      tags: ["API", "Documentation", "OpenAPI"],
    },
    {
      id: 3,
      name: "Docker Compose Templates",
      description:
        "Pre-configured Docker Compose files for popular development stacks",
      price: 15.99,
      seller: "CloudNinja",
      rating: 4.9,
      downloads: 2156,
      category: "DevOps",
      image:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=300&h=200&fit=crop",
      purchased: false,
      tags: ["Docker", "DevOps", "Templates"],
    },
    {
      id: 4,
      name: "CSS Animation Library",
      description: "50+ smooth CSS animations ready to use in your projects",
      price: 12.99,
      seller: "AnimateMaster",
      rating: 4.7,
      downloads: 3421,
      category: "Frontend",
      image:
        "https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=300&h=200&fit=crop",
      purchased: false,
      tags: ["CSS", "Animations", "Frontend"],
    },
    {
      id: 5,
      name: "MongoDB Query Builder",
      description:
        "Visual query builder for MongoDB with export to multiple languages",
      price: 39.99,
      seller: "DataFlow Labs",
      rating: 4.5,
      downloads: 756,
      category: "Backend",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop",
      purchased: false,
      tags: ["MongoDB", "Database", "Query"],
    },
    {
      id: 6,
      name: "Testing Utilities Pack",
      description:
        "Essential testing utilities and mock data generators for modern apps",
      price: 0,
      seller: "TestPro",
      rating: 4.8,
      downloads: 1834,
      category: "Testing",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      purchased: true,
      tags: ["Testing", "Mocks", "Utilities"],
    },
  ];

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "DevOps",
    "Testing",
    "Mobile",
    "Utilities",
  ];

  useEffect(() => {
    setTools(mockTools);
    setIsLoggedIn(true);
    setUser({ name: "John Doe", quota: { used: 2, limit: 10, plan: "Pro" } });
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    // You might want to clear localStorage or perform other cleanup here
  };

  const handlePurchase = (toolId) => {
    alert(`Purchasing tool ${toolId}. Redirecting to payment...`);
  };

  const handleDownload = (toolId) => {
    const tool = tools.find((t) => t.id === toolId);
    if (!isLoggedIn) {
      alert("Please login to download tools");
      return;
    }
    if (user.quota.used >= user.quota.limit && user.quota.limit !== -1) {
      alert("Download quota exceeded. Please upgrade your plan.");
      return;
    }
    alert(`Downloading ${tool.name}...`);
    setUser((prev) => ({
      ...prev,
      quota: { ...prev.quota, used: prev.quota.used + 1 },
    }));
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
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/15 to-teal-500/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: "7s", animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative w-full backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Code className="w-5 h-5 text-white" />
              </div>
              <Link to="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                  DevMarket
                </h1>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white/90 hover:text-cyan-300 transition-colors duration-300 font-medium relative group"
              >
                Home/Browse
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/upload"
                className="text-white/90 hover:text-cyan-300 transition-colors duration-300 font-medium relative group"
              >
                Upload
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/downloads"
                className="text-white/90 hover:text-cyan-300 transition-colors duration-300 font-medium relative group"
              >
                Purchases/Downloads
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm backdrop-blur-sm bg-white/10 rounded-xl px-3 py-2 border border-white/20">
                    <span className="text-white/70">Downloads: </span>
                    <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {user.quota.used}/
                      {user.quota.limit === -1 ? "∞" : user.quota.limit}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/25">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white/90 hover:text-cyan-300 transition-colors duration-300 font-medium"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/auth"
                    className="text-white/90 hover:text-cyan-300 transition-colors duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-400/30 transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full">
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Browse Developer Tools,
              <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Buy & Download Securely
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto">
              Discover premium developer tools, scripts, and utilities created
              by the community. Purchase once, download instantly, and boost
              your productivity.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {[
                {
                  icon: Code,
                  count: "2,500+",
                  label: "Developer Tools",
                  gradient: "from-cyan-400 to-blue-500",
                },
                {
                  icon: Users,
                  count: "15K+",
                  label: "Active Users",
                  gradient: "from-emerald-400 to-teal-500",
                },
                {
                  icon: Download,
                  count: "50K+",
                  label: "Downloads",
                  gradient: "from-purple-400 to-pink-500",
                },
                {
                  icon: Shield,
                  count: "100%",
                  label: "Secure",
                  gradient: "from-orange-400 to-red-500",
                },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                    <div
                      className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.count}
                    </div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" className="relative w-full">
        <div className="container mx-auto px-4 py-20">
          {/* Search and Filters */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-10">
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tools, categories, or tags..."
                  className="w-full pl-12 pr-4 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white placeholder-white/50 transition-all duration-300 hover:bg-white/15"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    className="appearance-none px-6 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 text-white transition-all duration-300 hover:bg-white/15 cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1rem",
                    }}
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-slate-800 text-white"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-1">
                  <button
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "grid"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === "list"
                        ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "backdrop-blur-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/30"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tools Grid */}
          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-5xl mx-auto"
            }`}
          >
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className={`group backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-lg hover:bg-white/15 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 overflow-hidden transform hover:scale-105 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-64 flex-shrink-0" : ""
                  }`}
                >
                  <img
                    src={tool.image}
                    alt={tool.name}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      viewMode === "list" ? "h-full" : "h-52"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div
                  className={`p-8 ${
                    viewMode === "list"
                      ? "flex-1 flex flex-col justify-between"
                      : ""
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-white/70">
                          by {tool.seller}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1.5 text-xs font-medium rounded-xl backdrop-blur-sm border transition-all duration-300 ${
                          tool.category === "Frontend"
                            ? "bg-blue-500/20 border-blue-400/30 text-blue-300 group-hover:bg-blue-500/30"
                            : tool.category === "Backend"
                            ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300 group-hover:bg-emerald-500/30"
                            : tool.category === "DevOps"
                            ? "bg-purple-500/20 border-purple-400/30 text-purple-300 group-hover:bg-purple-500/30"
                            : "bg-gray-500/20 border-gray-400/30 text-gray-300 group-hover:bg-gray-500/30"
                        }`}
                      >
                        {tool.category}
                      </span>
                    </div>

                    <p className="text-white/80 text-sm mb-6 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 backdrop-blur-sm bg-white/10 border border-white/20 text-white/80 text-xs rounded-lg hover:bg-white/20 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Rating and Downloads */}
                    <div className="flex items-center gap-6 mb-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-white/90 font-medium">
                          {tool.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-white/70" />
                        <span className="text-white/90 font-medium">
                          {tool.downloads.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/20">
                    <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {tool.price === 0 ? "Free" : `${tool.price}`}
                    </div>

                    <div className="flex gap-3">
                      {tool.purchased ? (
                        <button
                          onClick={() => handleDownload(tool.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transform hover:scale-105"
                          disabled={
                            !isLoggedIn ||
                            (user?.quota.used >= user?.quota.limit &&
                              user?.quota.limit !== -1)
                          }
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchase(tool.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 transform hover:scale-105"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {tool.price === 0 ? "Get Free" : "Buy Now"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-16 max-w-lg mx-auto">
                <div className="text-white/40 mb-6">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  No tools found
                </h3>
                <p className="text-white/70">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full">
        <div className="backdrop-blur-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-y border-white/10">
          <div className="relative container mx-auto px-4 py-20 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to sell your developer tools?
            </h2>
            <p className="text-white/80 mb-10 max-w-2xl mx-auto text-lg">
              Join thousands of developers earning by sharing their tools and
              utilities with the community.
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 transform hover:scale-105"
            >
              Start Selling <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevMarket;
