import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import Button from '../common/Button';

const SharePopup = ({ challenge, user, onClose }) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const shareCardRef = useRef(null);
  
  const shareUrl = `${window.location.origin}/challenge/${challenge.accessCode}`;
  
  const handleShare = async () => {
    setIsGeneratingImage(true);
    
    try {
      const dataUrl = await toPng(shareCardRef.current, { quality: 0.95 });
      
      // Convert data URL to Blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'globetrotter-challenge.png', { type: 'image/png' });
      
      // Create share data
      const shareData = {
        title: 'Globetrotter Challenge',
        text: `${user.username} has challenged you to a game of Globetrotter! Can you beat their score?`,
        url: shareUrl,
        files: [file]
      };
      
      // Try native sharing if available
      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        onClose();
      } else {
        // Fallback to WhatsApp sharing
        window.open(`https://wa.me/?text=${encodeURIComponent(
          `${user.username} has challenged you to a game of Globetrotter! Can you beat their score? ${shareUrl}`
        )}`, '_blank');
        onClose();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-center text-indigo-800">
          Challenge Your Friends
        </h3>
        
        <div 
          ref={shareCardRef} 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white mb-6"
        >
          <div className="text-center mb-4">
            <h4 className="text-2xl font-bold">Globetrotter Challenge</h4>
            <p className="text-indigo-100 mt-1">Test your travel knowledge!</p>
          </div>
          
          <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
            <p className="font-medium">{user.username} has challenged you!</p>
            <div className="mt-2 flex justify-between items-center">
              <div>
                <p className="text-xs text-indigo-100">SCORE</p>
                <p className="text-xl font-bold">{user.score.correct} correct</p>
              </div>
              <div className="text-5xl">🌍</div>
            </div>
          </div>
          
          <p className="text-center text-sm text-indigo-100">Scan or click link to play</p>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm mb-2">Share this link with your friends:</p>
          <p className="text-indigo-600 font-medium break-all">{shareUrl}</p>
        </div>
        
        <div className="flex justify-between">
          <Button 
            onClick={onClose} 
            primary={false}
            className="px-6"
          >
            Cancel
          </Button>
          
          <Button 
            onClick={handleShare} 
            className="px-6 flex items-center space-x-2"
            disabled={isGeneratingImage}
          >
            <span>📤</span>
            <span>{isGeneratingImage ? 'Generating...' : 'Share'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SharePopup;