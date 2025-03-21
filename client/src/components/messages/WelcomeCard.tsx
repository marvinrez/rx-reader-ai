export default function WelcomeCard() {
  return (
    <div className="bg-[#28C3A6] text-white p-4 rounded-lg shadow-sm max-w-sm">
      <h2 className="font-semibold text-lg mb-2">
        Welcome to RX Reader – Your Personal Prescription Decoder by AI!
      </h2>
      <p className="text-sm mb-2">
        Having trouble reading a handwritten prescription?
      </p>
      <p className="text-sm mb-3">
        Simply upload an image of the medical prescription, and let RX Reader AI decode the medication names and instructions for you.
      </p>
      <p className="text-sm font-medium">Upload your prescription</p>
      <p className="text-sm">
        Share your requirements and 'Upload an image' by tapping on
        <span className="inline-flex items-center justify-center w-5 h-5 bg-white bg-opacity-20 rounded-full ml-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
        </span>
      </p>
    </div>
  );
}
