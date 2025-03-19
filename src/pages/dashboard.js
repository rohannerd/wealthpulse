import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { PieChart, Pie, Cell, Legend, Sector } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, DollarSign, Target, PlusCircle, LogOut, TrendingUp, Briefcase, Landmark, Home, Database } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const WealthPulseDashboard = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddDataModal, setShowAddDataModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [userData, setUserData] = useState({
    goal: null,
    monthlyData: {},
    assets: null, // Added to store assets field for backward compatibility
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data from Firestore on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            goal: data.goal || null,
            monthlyData: data.monthlyData || {},
            assets: data.assets || null, // Fetch assets field
          });
        } else {
          setUserData({
            goal: null,
            monthlyData: {},
            assets: null,
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Changed from '/logout' to '/'
    } catch (err) {
      console.error('Error signing out:', err);
      alert('Failed to sign out. Please try again.');
    }
  };

  // Format date as YYYY-MM
  const formatYearMonth = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  // Get current month data or initialize it if it doesn't exist
  const getCurrentMonthData = () => {
    const monthKey = formatYearMonth(currentMonth);
    if (userData.monthlyData && userData.monthlyData[monthKey]) {
      return userData.monthlyData[monthKey];
    }

    // Fallback to assets field if monthlyData for the current month doesn't exist
    if (userData.assets) {
      const aggregatedAssets = {
        savings: 0,
        fd: 0,
        stocks: 0,
        mutualFunds: 0,
        nps: 0,
        ppf: 0,
        epfo: 0,
        crypto: 0,
        gold: 0,
        realEstate: 0,
      };

      // Process liquid assets
      if (userData.assets.liquid) {
        userData.assets.liquid.forEach(asset => {
          if (asset.type === 'Savings Account') {
            aggregatedAssets.savings += asset.value;
          } else if (asset.type === 'Fixed Deposit') {
            aggregatedAssets.fd += asset.value;
          }
        });
      }

      // Process investments
      if (userData.assets.investments) {
        userData.assets.investments.forEach(investment => {
          if (investment.type === 'Stocks') {
            aggregatedAssets.stocks += investment.value;
          } else if (investment.type === 'Mutual Funds') {
            aggregatedAssets.mutualFunds += investment.value;
          } else if (investment.type === 'NPS') {
            aggregatedAssets.nps += investment.value;
          } else if (investment.type === 'PPF') {
            aggregatedAssets.ppf += investment.value;
          } else if (investment.type === 'EPFO') {
            aggregatedAssets.epfo += investment.value;
          } else if (investment.type === 'Crypto') {
            aggregatedAssets.crypto += investment.value;
          }
        });
      }

      // Process physical assets
      if (userData.assets.physical) {
        userData.assets.physical.forEach(asset => {
          if (asset.type === 'Gold') {
            aggregatedAssets.gold += asset.value;
          } else if (asset.type === 'Land/Property') {
            aggregatedAssets.realEstate += asset.value;
          }
        });
      }

      const totalNetWorth = Object.values(aggregatedAssets).reduce((sum, value) => sum + value, 0);

      return {
        totalNetWorth: totalNetWorth,
        assets: aggregatedAssets,
      };
    }

    // Default if neither monthlyData nor assets exists
    return {
      totalNetWorth: 0,
      assets: {
        savings: 0,
        fd: 0,
        stocks: 0,
        mutualFunds: 0,
        nps: 0,
        ppf: 0,
        epfo: 0,
        crypto: 0,
        gold: 0,
        realEstate: 0,
      },
    };
  };

  const currentMonthData = getCurrentMonthData();

  // Calculate category totals
  const liquidAssets = currentMonthData.assets.savings + currentMonthData.assets.fd;
  const investmentAssets = currentMonthData.assets.stocks + currentMonthData.assets.mutualFunds +
                           currentMonthData.assets.nps + currentMonthData.assets.ppf +
                           currentMonthData.assets.epfo + currentMonthData.assets.crypto;
  const physicalAssets = currentMonthData.assets.gold + currentMonthData.assets.realEstate;

  // Calculate total net worth
  const totalNetWorth = liquidAssets + investmentAssets + physicalAssets;

  // Prepare data for charts - categorized
  const pieChartData = [
    { name: 'Liquid Assets', value: liquidAssets },
    { name: 'Investments', value: investmentAssets },
    { name: 'Physical Assets', value: physicalAssets },
  ].filter(item => item.value > 0);

  // Get all months with data for the trend chart up to current view month
  const trendData = Object.entries(userData.monthlyData)
    .filter(([month]) => month <= formatYearMonth(currentMonth))
    .map(([month, data]) => {
      const liquid = data.assets.savings + (data.assets.fd || 0);
      const investments = (data.assets.stocks || 0) + (data.assets.mutualFunds || 0) +
                         (data.assets.nps || 0) + (data.assets.ppf || 0) +
                         (data.assets.epfo || 0) + (data.assets.crypto || 0);
      const physical = (data.assets.gold || 0) + (data.assets.realEstate || 0);
      const total = liquid + investments + physical;

      const [year, monthNum] = month.split('-');
      const displayMonth = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'short' });

      return {
        month: displayMonth,
        rawMonth: month,
        netWorth: total,
      };
    }).sort((a, b) => a.rawMonth.localeCompare(b.rawMonth));

  // Handle navigation to previous month
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  // Handle navigation to next month
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const today = new Date();

    if (nextMonth <= today) {
      setCurrentMonth(nextMonth);
    }
  };

  // Determine if we're viewing the current month
  const isCurrentMonth = () => {
    const today = new Date();
    return currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  // Handle form submission for adding new data
  const handleAddData = async (newData) => {
    const monthKey = formatYearMonth(currentMonth);
    const updatedUserData = {
      ...userData,
      monthlyData: {
        ...userData.monthlyData,
        [monthKey]: {
          assets: newData,
          totalNetWorth: Object.values(newData).reduce((sum, value) => sum + value, 0),
        },
      },
    };

    setUserData(updatedUserData);
    setShowAddDataModal(false);

    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          monthlyData: updatedUserData.monthlyData,
          goal: updatedUserData.goal,
        }, { merge: true });
      } catch (err) {
        console.error('Error saving monthly data:', err);
        alert('Failed to save data. Please try again.');
      }
    }
  };

  // Handle setting a financial goal
  const handleSetGoal = async (goal) => {
    const updatedUserData = {
      ...userData,
      goal,
    };

    setUserData(updatedUserData);
    setShowGoalModal(false);

    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          monthlyData: updatedUserData.monthlyData,
          goal: updatedUserData.goal,
        }, { merge: true });
      } catch (err) {
        console.error('Error saving goal:', err);
        alert('Failed to save goal. Please try again.');
      }
    }
  };

  // Active pie sector for better visualization
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#333" fontSize="16px" fontWeight="bold">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#333" fontSize="14px">
          {formatCurrency(value)}
        </text>
        <text x={cx} y={cy + 30} textAnchor="middle" fill="#666" fontSize="12px">
          {`${(percent * 100).toFixed(1)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 4}
          outerRadius={innerRadius - 1}
          fill={fill}
        />
      </g>
    );
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const goalProgress = userData.goal ? Math.min(100, Math.round((totalNetWorth / userData.goal) * 100)) : 0;

  const assetCategories = {
    'Liquid Assets': {
      'Savings Account': currentMonthData.assets.savings,
      'Fixed Deposits': currentMonthData.assets.fd,
    },
    'Investments': {
      'Stocks': currentMonthData.assets.stocks,
      'Mutual Funds': currentMonthData.assets.mutualFunds,
      'NPS': currentMonthData.assets.nps,
      'PPF': currentMonthData.assets.ppf,
      'EPFO': currentMonthData.assets.epfo,
      'Crypto': currentMonthData.assets.crypto,
    },
    'Physical Assets': {
      'Gold': currentMonthData.assets.gold,
      'Real Estate': currentMonthData.assets.realEstate,
    },
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">WealthPulse</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowGoalModal(true)}
            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Target className="mr-2 h-4 w-4" />
            Set Goal
          </button>
          <button
            onClick={() => setShowAddDataModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Data
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
          <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
            <button
              onClick={goToPreviousMonth}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center px-2">
              <Calendar className="h-4 w-4 text-gray-600 mr-2" />
              <span className="text-gray-700">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <button
              onClick={goToNextMonth}
              className="p-1 rounded-md hover:bg-gray-100"
              disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
            >
              <ChevronRight className={`h-5 w-5 ${currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear() ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </div>

        {/* Goal Progress - Only show for current month */}
        {userData.goal && isCurrentMonth() && (
          <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Goal Progress</h2>
              <span className="text-blue-600 font-medium">{goalProgress}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">Current: {formatCurrency(totalNetWorth)}</span>
              <span className="text-sm text-gray-500">Goal: {formatCurrency(userData.goal)}</span>
            </div>
          </div>
        )}

        {/* Net Worth Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Net Worth</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(totalNetWorth)}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Liquid Assets</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(liquidAssets)}</h3>
                <p className="text-xs text-gray-500 mt-1">FD & Savings Account</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Landmark className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Investments</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(investmentAssets)}</h3>
                <p className="text-xs text-gray-500 mt-1">NPS, PPF, EPFO, Stocks, MF, Crypto</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Physical Assets</p>
                <h3 className="text-2xl font-bold text-gray-800">{formatCurrency(physicalAssets)}</h3>
                <p className="text-xs text-gray-500 mt-1">Gold, Land/Property</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <Home className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Net Worth Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Net Worth Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month">
                    <Label value="Month" position="bottom" offset={0} />
                  </XAxis>
                  <YAxis>
                    <Label value="Net Worth ($)" position="left" angle={-90} offset={-15} />
                  </YAxis>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line
                    type="monotone"
                    dataKey="netWorth"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Asset Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Asset Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieChartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Asset Breakdown Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Asset Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-gray-600 font-medium">Category</th>
                  <th className="p-3 text-gray-600 font-medium">Asset Type</th>
                  <th className="p-3 text-gray-600 font-medium">Value</th>
                  <th className="p-3 text-gray-600 font-medium">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(assetCategories).map(([category, assets]) => (
                  Object.entries(assets).map(([assetName, value], index) => (
                    <tr
                      key={`${category}-${assetName}`}
                      className={`border-b last:border-0 hover:bg-gray-50 ${index === 0 ? 'border-t-4 border-t-gray-100' : ''}`}
                    >
                      {index === 0 ? (
                        <td
                          className="p-3 font-medium"
                          rowSpan={Object.keys(assets).length}
                        >
                          {category}
                        </td>
                      ) : null}
                      <td className="p-3">{assetName}</td>
                      <td className="p-3 font-medium">{formatCurrency(value)}</td>
                      <td className="p-3">
                        {totalNetWorth > 0 ? (
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(value / totalNetWorth) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-gray-600 whitespace-nowrap">
                              {totalNetWorth > 0 ? `${((value / totalNetWorth) * 100).toFixed(1)}%` : '0%'}
                            </span>
                          </div>
                        ) : '0%'}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Data Modal */}
      {showAddDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <AddDataForm
              initialData={currentMonthData.assets}
              onSubmit={handleAddData}
              onCancel={() => setShowAddDataModal(false)}
            />
          </div>
        </div>
      )}

      {/* Set Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <SetGoalForm
              initialGoal={userData.goal}
              onSubmit={handleSetGoal}
              onCancel={() => setShowGoalModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Add Data Form Component
const AddDataForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    savings: initialData.savings || 0,
    fd: initialData.fd || 0,
    stocks: initialData.stocks || 0,
    mutualFunds: initialData.mutualFunds || 0,
    nps: initialData.nps || 0,
    ppf: initialData.ppf || 0,
    epfo: initialData.epfo || 0,
    crypto: initialData.crypto || 0,
    gold: initialData.gold || 0,
    realEstate: initialData.realEstate || 0,
  });

  const [inputValues, setInputValues] = useState({
    savings: initialData.savings ? initialData.savings.toString() : '',
    fd: initialData.fd ? initialData.fd.toString() : '',
    stocks: initialData.stocks ? initialData.stocks.toString() : '',
    mutualFunds: initialData.mutualFunds ? initialData.mutualFunds.toString() : '',
    nps: initialData.nps ? initialData.nps.toString() : '',
    ppf: initialData.ppf ? initialData.ppf.toString() : '',
    epfo: initialData.epfo ? initialData.epfo.toString() : '',
    crypto: initialData.crypto ? initialData.crypto.toString() : '',
    gold: initialData.gold ? initialData.gold.toString() : '',
    realEstate: initialData.realEstate ? initialData.realEstate.toString() : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValues(prev => ({
      ...prev,
      [name]: value,
    }));

    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? 0 : parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Update Asset Values</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Liquid Assets */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Liquid Assets</h3>
          <div>
            <label className="block text-gray-700 mb-1">Savings Account</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="savings"
                value={inputValues.savings}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Fixed Deposits</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="fd"
                value={inputValues.fd}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Investments */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Investments</h3>
          <div>
            <label className="block text-gray-700 mb-1">Stocks</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="stocks"
                value={inputValues.stocks}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Mutual Funds</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="mutualFunds"
                value={inputValues.mutualFunds}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* More Investments */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">More Investments</h3>
          <div>
            <label className="block text-gray-700 mb-1">NPS</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="nps"
                value={inputValues.nps}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">PPF</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="ppf"
                value={inputValues.ppf}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">EPFO</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="epfo"
                value={inputValues.epfo}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Crypto</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="crypto"
                value={inputValues.crypto}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Physical Assets */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Physical Assets</h3>
          <div>
            <label className="block text-gray-700 mb-1">Gold</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="gold"
                value={inputValues.gold}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Real Estate</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="realEstate"
                value={inputValues.realEstate}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

// Set Goal Form Component
const SetGoalForm = ({ initialGoal, onSubmit, onCancel }) => {
  const [goal, setGoal] = useState(initialGoal || 0);

  const handleChange = (e) => {
    setGoal(parseFloat(e.target.value) || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(goal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Set Financial Goal</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Target Net Worth</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={goal}
            onChange={handleChange}
            className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your target net worth"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Set a realistic financial goal that you want to achieve</p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Set Goal
        </button>
      </div>
    </form>
  );
};

export default WealthPulseDashboard;