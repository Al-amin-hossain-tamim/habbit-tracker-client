import React, { use} from 'react';
import LatestHabbit from '../LatestHabbit/LatestHabbit';
const LatestHabbits = ({latestHabbits}) => {
  const LatestHabbits = use(latestHabbits);
  return (
   <div className='mt-10'>
     <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Featured Habits</h2>
          <button
            className="text-sm text-purple-600 hover:underline"
          >
            Refresh
          </button>
        </div>
     <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {
        LatestHabbits.map(latestHabbit=>
           <LatestHabbit key={latestHabbit._id} latestHabbit = {latestHabbit}></LatestHabbit>)
      }
      
    </div>
   </div>
  );
};

export default LatestHabbits;