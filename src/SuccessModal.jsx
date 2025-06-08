export default function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-[#0000009a] bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-sm p-8 rounded-lg shadow-md text-center relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h2 className="text-xl font-bold mb-4">Thank you for your support!</h2>
        <p className="mb-4 text-gray-600 font-sm text-center">Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed</p>
        <button
          onClick={onClose}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
       Got it
        </button>
      </div>
    </div>
  );
}
