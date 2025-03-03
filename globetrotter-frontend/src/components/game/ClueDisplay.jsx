import React from 'react';
import Card from '../common/Card';

const ClueDisplay = ({ clues }) => {
  if (!clues || clues.length === 0) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50">
      <h3 className="text-xl font-bold mb-4 text-center text-indigo-800">Where am I?</h3>
      <div className="space-y-3">
        {clues.map((clue, index) => (
          <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Clue {index + 1}:</span> {clue}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClueDisplay;