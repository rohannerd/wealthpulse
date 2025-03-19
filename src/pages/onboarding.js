import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { TrendingUp, ChevronDown, ChevronUp, PlusCircle, MinusCircle, CreditCard, Briefcase, Home } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion states
  const [openLiquid, setOpenLiquid] = useState(true);
  const [openInvestments, setOpenInvestments] = useState(false);
  const [openPhysical, setOpenPhysical] = useState(false);

  // Form data states
  const [liquidAssets, setLiquidAssets] = useState([
    { type: 'Savings Account', value: '', institution: '' },
    { type: 'Fixed Deposit', value: '', institution: '' },
  ]);
  const [investments, setInvestments] = useState([
    { type: 'NPS', value: '', details: '' },
    { type: 'EPFO', value: '', details: '' },
    { type: 'Stocks', value: '', details: '' },
    { type: 'Mutual Funds', value: '', details: '' },
    { type: 'PPF', value: '', details: '' },
    { type: 'Crypto', value: '', details: '' },
  ]);
  const [physicalAssets, setPhysicalAssets] = useState([
    { type: 'Gold', value: '', details: '' },
    { type: 'Land/Property', value: '', details: '' },
  ]);

  // Auth state handling
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setLoadingAuth(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log('onboarding.js: Auth state changed:', currentUser?.uid);
        setUser(currentUser);
        setLoadingAuth(false);
        if (!currentUser) {
          console.log('onboarding.js: No user found, redirecting to /login');
          navigate('/login');
        }
      });
      return () => unsubscribe();
    }
  }, [navigate]);

  // Add/remove asset handlers
  const addLiquidAsset = () => setLiquidAssets([...liquidAssets, { type: '', value: '', institution: '' }]);
  const addInvestment = () => setInvestments([...investments, { type: '', value: '', details: '' }]);
  const addPhysicalAsset = () => setPhysicalAssets([...physicalAssets, { type: '', value: '', details: '' }]);

  const removeLiquidAsset = (index) => setLiquidAssets(liquidAssets.filter((_, i) => i !== index));
  const removeInvestment = (index) => setInvestments(investments.filter((_, i) => i !== index));
  const removePhysicalAsset = (index) => setPhysicalAssets(physicalAssets.filter((_, i) => i !== index));

  // Change handlers
  const handleLiquidChange = (index, field, value) => {
    const updatedAssets = [...liquidAssets];
    updatedAssets[index][field] = value;
    setLiquidAssets(updatedAssets);
  };
  const handleInvestmentChange = (index, field, value) => {
    const updatedInvestments = [...investments];
    updatedInvestments[index][field] = value;
    setInvestments(updatedInvestments);
  };
  const handlePhysicalChange = (index, field, value) => {
    const updatedAssets = [...physicalAssets];
    updatedAssets[index][field] = value;
    setPhysicalAssets(updatedAssets);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form submitted - Starting process');

    if (loadingAuth || !user) {
      alert('Authenticating user, please wait...');
      return;
    }

    const hasValidLiquidAssets = liquidAssets.every(asset => !asset.type || (asset.type && asset.value));
    const hasValidInvestments = investments.every(investment => !investment.type || (investment.type && investment.value));
    const hasValidPhysicalAssets = physicalAssets.every(asset => !asset.type || (asset.type && asset.value));

    if (!hasValidLiquidAssets || !hasValidInvestments || !hasValidPhysicalAssets) {
      alert('Please fill in all required fields (Type and Value) for each asset.');
      return;
    }

    // Aggregate the assets into the format expected by the dashboard
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
    liquidAssets.forEach(asset => {
      if (asset.type && asset.value) {
        const value = Number(asset.value) || 0;
        if (asset.type === 'Savings Account') {
          aggregatedAssets.savings += value;
        } else if (asset.type === 'Fixed Deposit') {
          aggregatedAssets.fd += value;
        }
      }
    });

    // Process investments
    investments.forEach(investment => {
      if (investment.type && investment.value) {
        const value = Number(investment.value) || 0;
        if (investment.type === 'Stocks') {
          aggregatedAssets.stocks += value;
        } else if (investment.type === 'Mutual Funds') {
          aggregatedAssets.mutualFunds += value;
        } else if (investment.type === 'NPS') {
          aggregatedAssets.nps += value;
        } else if (investment.type === 'PPF') {
          aggregatedAssets.ppf += value;
        } else if (investment.type === 'EPFO') {
          aggregatedAssets.epfo += value;
        } else if (investment.type === 'Crypto') {
          aggregatedAssets.crypto += value;
        }
      }
    });

    // Process physical assets
    physicalAssets.forEach(asset => {
      if (asset.type && asset.value) {
        const value = Number(asset.value) || 0;
        if (asset.type === 'Gold') {
          aggregatedAssets.gold += value;
        } else if (asset.type === 'Land/Property') {
          aggregatedAssets.realEstate += value;
        }
      }
    });

    // Calculate total net worth for the month
    const totalNetWorth = Object.values(aggregatedAssets).reduce((sum, value) => sum + value, 0);

    // Format the current month as YYYY-MM
    const currentMonth = new Date();
    const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      console.log('Attempting Firestore write with data:', {
        monthlyData: {
          [monthKey]: {
            assets: aggregatedAssets,
            totalNetWorth: totalNetWorth,
          },
        },
        hasCompletedOnboarding: true,
      });
      await setDoc(userDocRef, {
        monthlyData: {
          [monthKey]: {
            assets: aggregatedAssets,
            totalNetWorth: totalNetWorth,
          },
        },
        hasCompletedOnboarding: true,
        createdAt: new Date().toISOString()
      }, { merge: true });
      console.log('Firestore write completed successfully');
      console.log('Initiating navigation to /dashboard');
      await new Promise(resolve => setTimeout(resolve, 500)); // Small delay
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Firestore write failed:', error.message);
      setError('Failed to save assets. Please try again: ' + error.message);
      setIsSubmitting(false);
    }
  };

  if (loadingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">WealthPulse</span>
        </div>
      </nav>

      <div className="flex-grow px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Your Assets</h1>
            <p className="text-gray-600">Complete the form below to track your wealth across different asset categories.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Liquid Assets Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer bg-gray-50"
                onClick={() => setOpenLiquid(!openLiquid)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-50 rounded-full mr-3">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Liquid Assets</h2>
                </div>
                {openLiquid ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </div>

              {openLiquid && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your savings accounts, fixed deposits, and other liquid assets.</p>
                  {liquidAssets.map((asset, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Liquid Asset #{index + 1}</h3>
                        {index > 1 && (
                          <button type="button" onClick={() => removeLiquidAsset(index)} className="text-red-500 hover:text-red-700">
                            <MinusCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.type}
                            onChange={(e) => handleLiquidChange(index, 'type', e.target.value)}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="Savings Account">Savings Account</option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                            <option value="Cash">Cash</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Value (₹)</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.value}
                            onChange={(e) => handleLiquidChange(index, 'value', e.target.value)}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution (Optional)</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.institution}
                            onChange={(e) => handleLiquidChange(index, 'institution', e.target.value)}
                            placeholder="Bank or institution name"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addLiquidAsset} className="flex items-center text-blue-600 hover:text-blue-800">
                    <PlusCircle className="h-5 w-5 mr-1" />
                    <span>Add Another Liquid Asset</span>
                  </button>
                </div>
              )}
            </div>

            {/* Investments Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer bg-gray-50"
                onClick={() => setOpenInvestments(!openInvestments)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-50 rounded-full mr-3">
                    <Briefcase className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Investments</h2>
                </div>
                {openInvestments ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </div>

              {openInvestments && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your investment details like NPS, EPFO, stocks, etc.</p>
                  {investments.map((investment, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Investment #{index + 1}</h3>
                        {index > 1 && (
                          <button type="button" onClick={() => removeInvestment(index)} className="text-red-500 hover:text-red-700">
                            <MinusCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={investment.type}
                            onChange={(e) => handleInvestmentChange(index, 'type', e.target.value)}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="NPS">NPS</option>
                            <option value="EPFO">EPFO</option>
                            <option value="Stocks">Stocks</option>
                            <option value="Mutual Funds">Mutual Funds</option>
                            <option value="PPF">PPF</option>
                            <option value="Crypto">Crypto</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Value (₹)</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={investment.value}
                            onChange={(e) => handleInvestmentChange(index, 'value', e.target.value)}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Details (Optional)</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={investment.details}
                            onChange={(e) => handleInvestmentChange(index, 'details', e.target.value)}
                            placeholder="Additional info"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addInvestment} className="flex items-center text-blue-600 hover:text-blue-800">
                    <PlusCircle className="h-5 w-5 mr-1" />
                    <span>Add Another Investment</span>
                  </button>
                </div>
              )}
            </div>

            {/* Physical Assets Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div
                className="px-6 py-4 flex justify-between items-center cursor-pointer bg-gray-50"
                onClick={() => setOpenPhysical(!openPhysical)}
              >
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-50 rounded-full mr-3">
                    <Home className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Physical Assets</h2>
                </div>
                {openPhysical ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
              </div>

              {openPhysical && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your physical assets like gold, property, etc.</p>
                  {physicalAssets.map((asset, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Physical Asset #{index + 1}</h3>
                        {index > 1 && (
                          <button type="button" onClick={() => removePhysicalAsset(index)} className="text-red-500 hover:text-red-700">
                            <MinusCircle className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.type}
                            onChange={(e) => handlePhysicalChange(index, 'type', e.target.value)}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="Gold">Gold</option>
                            <option value="Land/Property">Land/Property</option>
                            <option value="Vehicle">Vehicle</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Value (₹)</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.value}
                            onChange={(e) => handlePhysicalChange(index, 'value', e.target.value)}
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Details (Optional)</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.details}
                            onChange={(e) => handlePhysicalChange(index, 'details', e.target.value)}
                            placeholder="Additional info"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addPhysicalAsset} className="flex items-center text-blue-600 hover:text-blue-800">
                    <PlusCircle className="h-5 w-5 mr-1" />
                    <span>Add Another Physical Asset</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Save and Continue to Dashboard'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>© {new Date().getFullYear()} WealthPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;