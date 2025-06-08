import React, {useState} from 'react'
import PledgeModal from "./PledgeModal";
import SuccessModal from "./SuccessModal";
import { GoBookmarkFill } from "react-icons/go";


const crowdfundingData = {
  totalFunds: 100000,
  currentFunds: 89914,
  backers: 5000,
  daysLeft: 56,
  pledges: [
    { id: 1, amount: 25, label: "Bamboo Stand", description: "You get an ergonomic stand made of natural bamboo. You've helped us  launch our promotional campaign, and you'll be added to a special Backer member list", slots: 101 },
    { id: 2, amount: 75, label: "Black Edition Stand", description: "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included", slots: 64 },
    { id: 3, amount: 200, label: "Mahogany Special Edition", description: "You get two Special Edition Mahogany stands, a Backer T-Shirt and a personal thank you. You'll be added to our Backer member list. Shopping is included ", slots: 25 },
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
      <div className='max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-4 relative -top-20 md:max-w-lg'>
        <img
    src="/images/logo-mastercraft.svg"
    alt="MASTERCRAFT"
    className="w-20 mx-auto relative -top-10"
  />
     <h1 className='text-center text-2xl font-bold'>Mastercraft Bamboo Monitor Riser</h1>
  <p className='text-center p-2 pb-6'> A beautifully handcrafted monitor stand to reduce neck and eye strain</p>
   
        <div className="flex justify-between items-center">
          
          <div className="flex gap-2 text-center  justify-center items-center md:flex md:justify-between">
            <button onClick={() => setShowPledgeModal(true)} className="p-2 rounded-full w-60 bg-teal-500 text-white hover:bg-teal-700">
             Back this Project
            </button>
            <button onClick={() => setBookmarked(!bookmarked)} className={`p-3 rounded-full ${bookmarked ? 'bg-gray-400' : 'bg-gray-200'}`}>
              {bookmarked ? "✓ Bookmarked" : <GoBookmarkFill />}
            </button>
           
          </div>
        </div>

        <div className="my-4 text-3xl text-gray-600 flex flex-col   md:flex-row justify-between items-center md:items-center gap-4 md:text-lg">
        <p className='font-bold text-black flex flex-col text-center p-2'>
  ${fundsRaised.toLocaleString()}
  <span className='text-sm font-semibold pt-2  text-gray-500'>
    of ${crowdfundingData.totalFunds.toLocaleString()}
  </span>
</p>

           <p className='font-bold text-black flex flex-col text-center p-2'> {backers.toLocaleString()} <span className='text-sm font-semibold pt-2 text-gray-500'>total backers</span></p>
        <p className='font-bold text-black flex flex-col text-center p-2'> {crowdfundingData.daysLeft} <span className='text-sm font-semibold pt-2  text-gray-500'>days left</span>
        </p>
        </div>

        <div className="my-4">
          <div className="w-full bg-gray-300 h-4 rounded-lg overflow-hidden">
            <div
              className="h-full bg-teal-500 transition-all"
              style={{ width: `${(fundsRaised / crowdfundingData.totalFunds) * 100}%` }}
            ></div>
          </div>
      
        </div></div>
          <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg mt-4 md:max-w-lg relative -top-10"> 
  <div>
    <h1 className='font-bold text-xl '>About this project</h1>
    <p className=' text-gray-500'>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates yours screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused  on the task at hand. </p>
    <p className='pt-8  text-gray-500'>
        Featuring artisan craftsmanship, the simplicity of the design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.
    </p>
  </div>
        <div className="my-6">
        
          {pledges.map((pledge) => (
            <div key={pledge.id} className={`border p-3 rounded mb-3 ${pledge.slots <= 0 ? 'opacity-50' : ''}`}>
              <strong>{pledge.label}</strong>
              <p className='text-teal-500'>Pledge ${pledge.amount} or more</p>
              <p className="text-sm text-gray-600">{pledge.description}</p>
              <p className="text-xl mt-1 text-teal-500">{pledge.slots} <span className=' text-gray-500 text-xs items-center'>left</span></p>
              <button
                disabled={pledge.slots <= 0}
                onClick={() => {
                  if (pledge.slots > 0) {
                    setSelectedPledgeId(pledge.id);
                    setCustomAmount(pledge.amount);
                    setShowPledgeModal(true);
                  }
                }}
                className={`mt-2 px-3 py-1 rounded-full ${pledge.slots > 0 ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
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
