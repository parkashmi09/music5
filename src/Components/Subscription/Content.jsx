import React from 'react';

const Content = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      cta: 'Go Free',
      ctaClass: 'border border-white rounded-lg hover:bg-white hover:text-black'
    },
    {
      name: 'Bronze Plan',
      price: '$20',
      period: '/mo. per user',
      cta: 'Go Bronze',
      ctaClass: 'border border-white rounded-lg hover:bg-white hover:text-black'
    },
    {
      name: 'Gold Plan',
      price: '$30',
      period: '/mo. per user',
      cta: 'Go Gold',
      ctaClass: 'bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE44D]'
    },
    {
      name: 'Platinum Plan',
      price: '$45',
      period: '/mo. per user',
      cta: 'Go Platinum',
      ctaClass: 'border border-white rounded-lg hover:bg-white hover:text-black'
    }
  ];

  return (
    <div className="w-full bg-black px-4">
      <div className="max-w-7xl mx-auto flex justify-end">
        <div className="w-[80%] grid grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col items-center justify-center py-6">
              <h3 className="text-white text-lg font-medium mb-1">
                {plan.name}
              </h3>
              <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-white text-base">
                  {plan.price}
                </span>
                <span className="text-gray-400 text-sm">
                  {plan.period}
                </span>
              </div>
              <div className={`mt-4 px-8 py-2 text-white transition-all duration-300 text-sm ${plan.ctaClass}`}>
              <button
              >
                {plan.cta}
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;