import React, { useState, useEffect } from "react";
import {
  Download,
  Star,
  Calendar,
  Package,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  FileText,
  Code,
  Crown,
  Zap,
} from "lucide-react";

const PurchasesDownloads = () => {
  const [user, setUser] = useState(null);
  const [purchasedTools, setPurchasedTools] = useState([]);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const mockUser = {
    name: "John Doe",
    plan: "Pro",
    quota: { used: 7, limit: 25, resetDate: "2024-10-01" },
    joinDate: "2024-03-15",
  };

  // Mock purchased tools data
  const mockPurchasedTools = [
    {
      id: 1,
      name: "React Component Generator",
      description:
        "Automatically generate React components with TypeScript, tests, and stories",
      price: 29.99,
      seller: "CodeCraft Studios",
      rating: 4.8,
      category: "Frontend",
      purchaseDate: "2024-09-01",
      downloadCount: 3,
      lastDownload: "2024-09-12",
      status: "active",
      fileSize: "2.4 MB",
      version: "2.1.0",
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
      category: "Backend",
      purchaseDate: "2024-08-15",
      downloadCount: 1,
      lastDownload: "2024-08-15",
      status: "active",
      fileSize: "1.8 MB",
      version: "1.5.2",
      tags: ["API", "Documentation", "OpenAPI"],
    },
    {
      id: 6,
      name: "Testing Utilities Pack",
      description:
        "Essential testing utilities and mock data generators for modern apps",
      price: 0,
      seller: "TestPro",
      rating: 4.8,
      category: "Testing",
      purchaseDate: "2024-07-20",
      downloadCount: 5,
      lastDownload: "2024-09-10",
      status: "active",
      fileSize: "3.2 MB",
      version: "3.0.1",
      tags: ["Testing", "Mocks", "Utilities"],
    },
    {
      id: 7,
      name: "Vue 3 Dashboard Template",
      description:
        "Modern dashboard template with Vue 3, TypeScript, and Tailwind CSS",
      price: 49.99,
      seller: "VueExpert",
      rating: 4.9,
      category: "Frontend",
      purchaseDate: "2024-06-10",
      downloadCount: 2,
      lastDownload: "2024-06-12",
      status: "expired",
      fileSize: "5.7 MB",
      version: "1.2.0",
      tags: ["Vue", "Dashboard", "Template"],
    },
  ];

  useEffect(() => {
    setUser(mockUser);
    setPurchasedTools(mockPurchasedTools);

    // Generate download history
    const history = mockPurchasedTools
      .flatMap((tool) =>
        Array.from({ length: tool.downloadCount }, (_, i) => ({
          id: `${tool.id}-${i}`,
          toolName: tool.name,
          downloadDate: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
          )
            .toISOString()
            .split("T")[0],
          fileSize: tool.fileSize,
          status: Math.random() > 0.1 ? "completed" : "failed",
        }))
      )
      .sort((a, b) => new Date(b.downloadDate) - new Date(a.downloadDate));

    setDownloadHistory(history);
  }, []);

  const handleDownload = (toolId) => {
    if (!user || user.quota.used >= user.quota.limit) {
      return;
    }

    setIsLoading(true);

    // Simulate download process
    setTimeout(() => {
      const tool = purchasedTools.find((t) => t.id === toolId);
      if (tool) {
        // Update download count
        setPurchasedTools((prev) =>
          prev.map((t) =>
            t.id === toolId
              ? {
                  ...t,
                  downloadCount: t.downloadCount + 1,
                  lastDownload: new Date().toISOString().split("T")[0],
                }
              : t
          )
        );

        // Update user quota
        setUser((prev) => ({
          ...prev,
          quota: { ...prev.quota, used: prev.quota.used + 1 },
        }));

        // Add to download history
        setDownloadHistory((prev) => [
          {
            id: `${toolId}-${Date.now()}`,
            toolName: tool.name,
            downloadDate: new Date().toISOString().split("T")[0],
            fileSize: tool.fileSize,
            status: "completed",
          },
          ...prev,
        ]);

        alert(`Downloaded ${tool.name} successfully!`);
      }
      setIsLoading(false);
    }, 2000);
  };

  const getPlanIcon = (plan) => {
    switch (plan) {
      case "Free":
        return <Package className="w-5 h-5" />;
      case "Pro":
        return <Zap className="w-5 h-5" />;
      case "Premium":
        return <Crown className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getPlanGradient = (plan) => {
    switch (plan) {
      case "Free":
        return "from-gray-400 to-gray-600";
      case "Pro":
        return "from-blue-400 to-purple-600";
      case "Premium":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-600";
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
      </div>

      {/* Header */}
      <header
        className="relative w-full backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0 z-50 shadow-lg shadow-black/10"
        style={{ margin: 0, padding: 0 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                DevMarket
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm backdrop-blur-sm bg-white/10 rounded-xl px-3 py-2 border border-white/20">
                <span className="text-white/70">Downloads: </span>
                <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {user?.quota.used || 0}/{user?.quota.limit || 0}
                </span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/25">
                {user?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Purchases & Downloads
          </h1>
          <p className="text-white/70 text-lg">
            Manage your purchased tools and download history
          </p>
        </div>

        {/* User Plan & Quota Card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Plan Info */}
            <div className="text-center">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getPlanGradient(
                  user?.plan
                )} rounded-xl text-white font-semibold shadow-lg mb-3`}
              >
                {getPlanIcon(user?.plan)}
                {user?.plan} Plan
              </div>
              <p className="text-white/70 text-sm">
                Member since{" "}
                {user?.joinDate
                  ? new Date(user.joinDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>

            {/* Download Quota */}
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {user?.quota.used || 0} / {user?.quota.limit || 0}
              </div>
              <p className="text-white/70 text-sm mb-3">Downloads Used</p>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((user?.quota.used || 0) / (user?.quota.limit || 1)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Quota Reset */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-white/80 mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Quota Resets</span>
              </div>
              <div className="text-white font-medium">
                {user?.quota.resetDate
                  ? new Date(user.quota.resetDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Purchased Tools */}
          <div className="lg:col-span-2">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Package className="w-6 h-6" />
                Purchased Tools ({purchasedTools.length})
              </h2>

              <div className="space-y-6">
                {purchasedTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Tool Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {tool.name}
                            </h3>
                            <p className="text-white/70 text-sm">
                              by {tool.seller}
                            </p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white/80">
                                {tool.rating}
                              </span>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                                tool.status === "active"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                  : "bg-red-500/20 text-red-300 border border-red-400/30"
                              }`}
                            >
                              {tool.status === "active" ? "Active" : "Expired"}
                            </span>
                          </div>
                        </div>

                        <p className="text-white/80 text-sm mb-4">
                          {tool.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 backdrop-blur-sm bg-white/10 text-white/70 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Purchase & Download Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/60 block">
                              Purchased
                            </span>
                            <span className="text-white font-medium">
                              {new Date(tool.purchaseDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-white/60 block">
                              Downloads
                            </span>
                            <span className="text-white font-medium">
                              {tool.downloadCount}x
                            </span>
                          </div>
                          <div>
                            <span className="text-white/60 block">
                              File Size
                            </span>
                            <span className="text-white font-medium">
                              {tool.fileSize}
                            </span>
                          </div>
                          <div>
                            <span className="text-white/60 block">Version</span>
                            <span className="text-white font-medium">
                              v{tool.version}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Download Action */}
                      <div className="flex flex-col gap-3 md:w-32">
                        <button
                          onClick={() => handleDownload(tool.id)}
                          disabled={
                            isLoading ||
                            tool.status !== "active" ||
                            user?.quota.used >= user?.quota.limit
                          }
                          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                            tool.status === "active" &&
                            user?.quota.used < user?.quota.limit
                              ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40 transform hover:scale-105"
                              : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          Download
                        </button>

                        {tool.lastDownload && (
                          <div className="text-center">
                            <span className="text-white/50 text-xs">
                              Last:{" "}
                              {new Date(tool.lastDownload).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {purchasedTools.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    No purchases yet
                  </h3>
                  <p className="text-white/70">
                    Browse our marketplace to find amazing developer tools
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Download History Sidebar */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-5 h-5" />
                Recent Downloads
              </h2>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {downloadHistory.slice(0, 10).map((download) => (
                  <div
                    key={download.id}
                    className="flex items-center gap-3 p-3 backdrop-blur-sm bg-white/5 rounded-xl border border-white/10"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        download.status === "completed"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {download.toolName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <span>
                          {new Date(download.downloadDate).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{download.fileSize}</span>
                      </div>
                    </div>
                    {download.status === "completed" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              {downloadHistory.length === 0 && (
                <div className="text-center py-8">
                  <Download className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/70 text-sm">No downloads yet</p>
                </div>
              )}
            </div>

            {/* Quota Warning */}
            {user?.quota && user.quota.used >= user.quota.limit * 0.8 && (
              <div className="mt-6 backdrop-blur-xl bg-orange-500/20 border border-orange-400/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-orange-300" />
                  <h3 className="font-semibold text-orange-200">
                    Quota Warning
                  </h3>
                </div>
                <p className="text-orange-100/90 text-sm mb-4">
                  You're running low on downloads. Consider upgrading your plan
                  for more downloads.
                </p>
                <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300">
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasesDownloads;
