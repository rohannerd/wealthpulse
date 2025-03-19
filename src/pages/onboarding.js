import React, { useState } from 'react';
import { 
  TrendingUp, 
  ChevronDown, 
  ChevronUp,
  Plus,
  DollarSign,
  Briefcase,
  Landmark,
  Home,
  CreditCard,
  Save,
  PlusCircle,
  MinusCircle
} from 'lucide-react';

const AssetInputForm = () => {
  // States for each category accordion
  const [openLiquid, setOpenLiquid] = useState(true);
  const [openInvestments, setOpenInvestments] = useState(false);
  const [openPhysical, setOpenPhysical] = useState(false);
  
  // States for form data
  const [liquidAssets, setLiquidAssets] = useState([
    { type: 'Savings Account', value: '', institution: '' },
    { type: 'Fixed Deposit', value: '', institution: '' }
  ]);
  
  const [investments, setInvestments] = useState([
    { type: 'NPS', value: '', details: '' },
    { type: 'EPFO', value: '', details: '' },
    { type: 'Stocks', value: '', details: '' },
    { type: 'Mutual Funds', value: '', details: '' },
    { type: 'PPF', value: '', details: '' },
    { type: 'Crypto', value: '', details: '' }
  ]);
  
  const [physicalAssets, setPhysicalAssets] = useState([
    { type: 'Gold', value: '', details: '' },
    { type: 'Land/Property', value: '', details: '' }
  ]);
  
  // Handle adding new items to each category
  const addLiquidAsset = () => {
    setLiquidAssets([...liquidAssets, { type: '', value: '', institution: '' }]);
  };
  
  const addInvestment = () => {
    setInvestments([...investments, { type: '', value: '', details: '' }]);
  };
  
  const addPhysicalAsset = () => {
    setPhysicalAssets([...physicalAssets, { type: '', value: '', details: '' }]);
  };
  
  // Handle removing items from each category
  const removeLiquidAsset = (index) => {
    const updatedAssets = [...liquidAssets];
    updatedAssets.splice(index, 1);
    setLiquidAssets(updatedAssets);
  };
  
  const removeInvestment = (index) => {
    const updatedInvestments = [...investments];
    updatedInvestments.splice(index, 1);
    setInvestments(updatedInvestments);
  };
  
  const removePhysicalAsset = (index) => {
    const updatedAssets = [...physicalAssets];
    updatedAssets.splice(index, 1);
    setPhysicalAssets(updatedAssets);
  };
  
  // Handle field changes for each category
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allAssets = {
      liquid: liquidAssets,
      investments: investments,
      physical: physicalAssets
    };
    
    console.log('Submitting assets data:', allAssets);
    // Here you would typically send the data to your backend
    alert('Assets saved successfully!');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Nav */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <TrendingUp className="text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">WealthPulse</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="#goals" className="text-gray-600 hover:text-blue-600 transition-colors">Goals</a>
          <a href="#reports" className="text-gray-600 hover:text-blue-600 transition-colors">Reports</a>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <span>JD</span>
            </div>
            <span className="text-gray-700">John Doe</span>
          </div>
        </div>
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      
      {/* Main Content */}
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
                {openLiquid ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
              
              {openLiquid && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your savings accounts, fixed deposits, and other liquid assets.</p>
                  
                  {liquidAssets.map((asset, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Liquid Asset #{index + 1}</h3>
                        {index > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeLiquidAsset(index)}
                            className="text-red-500 hover:text-red-700"
                          >
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
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
                  
                  <button 
                    type="button"
                    onClick={addLiquidAsset}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
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
                {openInvestments ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
              
              {openInvestments && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your investments like NPS, EPFO, stocks, mutual funds, PPF, and crypto.</p>
                  
                  {investments.map((investment, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Investment #{index + 1}</h3>
                        {index > 5 && (
                          <button 
                            type="button"
                            onClick={() => removeInvestment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={investment.details}
                            onChange={(e) => handleInvestmentChange(index, 'details', e.target.value)}
                            placeholder="Ticker symbols, fund names, etc."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={addInvestment}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
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
                {openPhysical ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </div>
              
              {openPhysical && (
                <div className="px-6 py-4 space-y-4">
                  <p className="text-gray-600">Add your physical assets like gold, real estate, and other properties.</p>
                  
                  {physicalAssets.map((asset, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-gray-800">Physical Asset #{index + 1}</h3>
                        {index > 1 && (
                          <button 
                            type="button"
                            onClick={() => removePhysicalAsset(index)}
                            className="text-red-500 hover:text-red-700"
                          >
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
                            <option value="Collectibles">Collectibles</option>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                          <input 
                            type="text" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={asset.details}
                            onChange={(e) => handlePhysicalChange(index, 'details', e.target.value)}
                            placeholder="Location, weight, description, etc."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={addPhysicalAsset}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <PlusCircle className="h-5 w-5 mr-1" />
                    <span>Add Another Physical Asset</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center">
              <button 
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Assets
              </button>
            </div>
          </form>
          
          {/* Summary Stats */}
          <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Asset Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Liquid Assets</h3>
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{liquidAssets.reduce((sum, asset) => sum + (Number(asset.value) || 0), 0).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Investments</h3>
                  <Briefcase className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{investments.reduce((sum, investment) => sum + (Number(investment.value) || 0), 0).toLocaleString()}
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-700">Physical Assets</h3>
                  <Home className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{physicalAssets.reduce((sum, asset) => sum + (Number(asset.value) || 0), 0).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-600 text-white rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Total Net Worth</h3>
                <DollarSign className="h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">
                ₹{[...liquidAssets, ...investments, ...physicalAssets].reduce((sum, item) => sum + (Number(item.value) || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-6 mt-12">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} WealthPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AssetInputForm;