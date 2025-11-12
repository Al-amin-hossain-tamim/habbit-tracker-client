import React from 'react';

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <p className='text-2xl font-bold mt-30'><span className="loading loading-bars loading-xl "></span> <span>Loading please wait!!</span></p>
        </div>
    );
};

export default Loading;