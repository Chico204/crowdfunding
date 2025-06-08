export default function PledgeModal({ pledges, selectedId, customAmount, onChangePledge, onAmountChange, onConfirm, onClose }) {
  const selectedPledge = pledges.find(p => p.id === selectedId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-semibold mb-4">Select a Pledge</h2>
        <form onSubmit={e => { e.preventDefault(); onConfirm(); }}>
          {pledges.map((pledge) => (
            <label
              key={pledge.id}
              className={`block border rounded p-3 my-2 cursor-pointer ${pledge.slots <= 0 ? 'opacity-50 cursor-not-allowed' : ''} ${selectedId === pledge.id ? 'border-blue-500 ring-2 ring-blue-300' : ''}`}
            >
              <input
                type="radio"
                name="pledge"
                value={pledge.id}
                checked={selectedId === pledge.id}
                onChange={() => {
                  if (pledge.slots > 0) {
                    onChangePledge(pledge.id);
                    onAmountChange(pledge.amount);
                  }
                }}
                disabled={pledge.slots <= 0}
                className="mr-2"
              />
              <strong>{pledge.label}</strong>
              <p className="text-sm text-gray-600">{pledge.description}</p>
              <p className="text-xs mt-1">Slots left: {pledge.slots}</p>
            </label>
          ))}
          <input
            type="number"
            min="25"
            value={customAmount}
            onChange={e => onAmountChange(Number(e.target.value))}
            placeholder="Enter your pledge (min $25)"
            className="w-full mt-4 p-2 border rounded"
            required
          />
          <div className="flex justify-between gap-4 mt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Confirm ${customAmount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
