export default function WelcomeCard() {
  return (
    <div 
      className="bg-[#1A7F77] text-white p-4 rounded-lg shadow-sm max-w-sm"
      role="region"
      aria-labelledby="welcome-heading"
    >
      <h2 id="welcome-heading" className="font-semibold text-lg mb-2">
        Welcome to RX Reader – Your Personal Prescription Decoder by AI!
      </h2>
      <p className="text-sm mb-2 text-white">
        Having trouble reading a handwritten prescription?
      </p>
      <p className="text-sm mb-3 text-white">
        Simply upload an image of the medical prescription, and let RX Reader AI decode the medication names and instructions for you.
      </p>
      <h3 className="text-sm font-bold text-white">Upload your prescription</h3>
      <p className="text-sm text-white">
        Share your requirements and 'Update Prescription' by tapping on
        <span 
          className="inline-flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full ml-1"
          aria-label="paperclip icon"
          role="img"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3 w-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </span>
      </p>
      <p className="text-sm text-white">
        Type your question
      </p>
    </div>
  );
}