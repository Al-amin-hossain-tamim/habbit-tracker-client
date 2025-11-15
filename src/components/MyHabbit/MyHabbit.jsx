import React, { use } from 'react';
import { useLoaderData } from 'react-router';
// const dataPromise = fetch("http://localhost:5000/habbits").then(res => res.json()).then(data => console.log(data))
const MyHabbit = () => {
  const data = useLoaderData()
  console.log(data)
  return (
    <div>
      {
        data.map(d=>{
          console.log(d.imageFile)
        })
      }
    </div>
  );
};

export default MyHabbit;