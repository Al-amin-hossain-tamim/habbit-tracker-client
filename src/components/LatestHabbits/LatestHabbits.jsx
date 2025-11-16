import React, { useEffect, useState} from 'react';
import LatestHabbit from '../LatestHabbit/LatestHabbit';
const LatestHabbits = () => {
  
  const [latestHabbits,setLatestHabbits] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/latest-habbits")
    .then(res=>res.json())
    .then(data =>setLatestHabbits(data))
  },[])
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
        latestHabbits.map(latestHabbit=>
           <LatestHabbit key={latestHabbit._id} latestHabbit = {latestHabbit}></LatestHabbit>)
      }
      
    </div>
   </div>
  );
};

export default LatestHabbits;