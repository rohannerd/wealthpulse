import React, { useState, useCallback, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';

const EnhancedPieChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Tailwind's 'sm' breakpoint

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Colors with better contrast and visual appeal
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
          <p className="font-medium text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">{formatCurrency(payload[0].value)}</p>
          <p className="text-gray-500 text-sm">
            {((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Enhanced active sector renderer
  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    // Adjust font sizes and offsets based on screen size
    const nameFontSize = isMobile ? 12 : 16;
    const valueFontSize = isMobile ? 10 : 14;
    const percentFontSize = isMobile ? 8 : 12;
    const textOffset = isMobile ? 10 : 20;

    return (
      <g>
        <text
          x={cx}
          y={cy - textOffset}
          dy={8}
          textAnchor="middle"
          fill="#333"
          fontSize={nameFontSize}
          fontWeight="bold"
        >
          {payload.name}
        </text>
        <text
          x={cx}
          y={cy + textOffset / 2}
          textAnchor="middle"
          fill="#333"
          fontSize={valueFontSize}
        >
          {formatCurrency(value)}
        </text>
        <text
          x={cx}
          y={cy + textOffset * 1.5}
          textAnchor="middle"
          fill="#666"
          fontSize={percentFontSize}
        >
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

  // Custom legend renderer
  const renderCustomizedLegend = (props) => {
    const { payload } = props;

    return (
      <div className={`flex flex-wrap justify-center mt-4 gap-${isMobile ? '2' : '4'}`}>
        {payload.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center cursor-pointer"
            onClick={() => setActiveIndex(index)}
          >
            <div
              className="w-3 h-3 mr-2 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className={`text-${isMobile ? 'xs' : 'sm'} ${activeIndex === index ? 'font-medium' : ''}`}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Calculate total value for percentage calculations
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Adjust chart dimensions based on screen size
  const innerRadius = isMobile ? 40 : 60;
  const outerRadius = isMobile ? 60 : 80;

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onClick={(_, index) => setActiveIndex(index)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={renderCustomizedLegend}
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary below chart */}
      <div className="mt-2 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          {data[activeIndex]?.name}: <span className="font-medium">{formatCurrency(data[activeIndex]?.value)}</span>
          <span className="text-gray-400 ml-1">
            ({((data[activeIndex]?.value / total) * 100).toFixed(1)}%)
          </span>
        </p>
      </div>
    </div>
  );
};

export default EnhancedPieChart;