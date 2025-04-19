
import React from 'react';

const LogosBar = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-text-secondary mb-8 font-inter text-sm uppercase tracking-wider">
          Trusted by leading property teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {/* Placeholder company logos */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-32 bg-gray-300 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosBar;
