import React, {useState} from 'react'
import PledgeModal from "./PledgeModal";
import SuccessModal from "./SuccessModal";

const crowdfundingData = {
  totalFunds: 100000,
  currentFunds: 89914,
  backers: 5000,
  daysLeft: 56,
  pledges: [
    { id: 1, amount: 25, label: "Bamboo Stand", description: "You get an ergonomic stand made of natural bamboo. You've helped us  launch our promotional campaign, and you'll be added to a special Backer member list", slots: 101 },
    { id: 2, amount: 50, label: "Black Edition Stand", description: "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included", slots: 64 },
    { id: 3, amount: 100, label: "Mahogany Special Edition", description: "Receive a special edition product.", slots: 25 },
  ]
};


export default function Crowdfunding() {
  const [fundsRaised, setFundsRaised] = useState(crowdfundingData.currentFunds);
  const [backers, setBackers] = useState(crowdfundingData.backers);
  const [bookmarked, setBookmarked] = useState(false);
  const [showPledgeModal, setShowPledgeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPledgeId, setSelectedPledgeId] = useState(null);
  const [customAmount, setCustomAmount] = useState(25);
  const [pledges, setPledges] = useState(crowdfundingData.pledges);

  const handleConfirmPledge = () => {
    if (customAmount >= 25) {
      setFundsRaised(prev => prev + customAmount);
      setBackers(prev => prev + 1);
      setPledges(prev => prev.map(p => {
        if (p.id === selectedPledgeId && p.slots > 0) {
          return { ...p, slots: p.slots - 1 };
        }
        return p;
      }));
      setShowPledgeModal(false);
      setShowSuccessModal(true);
    }
  };

  return (
    <div>
     <h1>Mastercraft Bamboo Monitor Riser</h1>
  <p> A beautifully handcrafted monitor stand to reduce neck and eye strain</p>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-4">
        <div className="flex justify-between items-center">
          
          <div className="flex gap-2">
            <button onClick={() => setBookmarked(!bookmarked)} className={`p-2 rounded-full ${bookmarked ? 'bg-green-400' : 'bg-gray-200'}`}>
              {bookmarked ? "✓ Bookmarked" : "☆ Bookmark"}
            </button>
            <button onClick={() => setShowPledgeModal(true)} className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
              Make a Pledge
            </button>
          </div>
        </div>

        <div className="my-4 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <p> ${crowdfundingData.currentFunds.toLocaleString()} <span>of ${crowdfundingData.totalFunds.toLocaleString()} </span> </p>
           <p> {backers.toLocaleString()} <span>total backers</span></p>
        <p> {crowdfundingData.daysLeft} <span>days left</span>
        </p>
        </div>

        <div className="my-4">
          <div className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{ width: `${(fundsRaised / crowdfundingData.totalFunds) * 100}%` }}
            ></div>
          </div>
      
        </div>
  <div>
    <h1>About this project</h1>
    <p>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates yours screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused  on the task at hand. </p>
    <p>
        Featuring artisan craftsmanship, the simplicity of the design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.
    </p>
  </div>
        <div className="my-6">
        
          {pledges.map((pledge) => (
            <div key={pledge.id} className={`border p-3 rounded mb-3 ${pledge.slots <= 0 ? 'opacity-50' : ''}`}>
              <strong>{pledge.label}</strong>
              <p>Pledge ${pledge.amount} or more</p>
              <p className="text-sm text-gray-600">{pledge.description}</p>
              <p className="text-xs text-gray-500 mt-1">{pledge.slots} <span>left</span></p>
              <button
                disabled={pledge.slots <= 0}
                onClick={() => {
                  if (pledge.slots > 0) {
                    setSelectedPledgeId(pledge.id);
                    setCustomAmount(pledge.amount);
                    setShowPledgeModal(true);
                  }
                }}
                className={`mt-2 px-3 py-1 rounded-full ${pledge.slots > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
              >
                Select Reward
              </button>
            </div>
          ))}
        </div>
      </div>

      {showPledgeModal && (
        <PledgeModal
          pledges={pledges}
          selectedId={selectedPledgeId}
          customAmount={customAmount}
          onChangePledge={setSelectedPledgeId}
          onAmountChange={setCustomAmount}
          onConfirm={handleConfirmPledge}
          onClose={() => setShowPledgeModal(false)}
        />
      )}

      {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} amount={customAmount} />}
    </div>
  );
}
