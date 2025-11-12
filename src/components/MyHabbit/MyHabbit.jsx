import React, { use, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { updateProfile } from 'firebase/auth';
import profile from '../../assets/profile.png'
import Loading from '../Loading/Loading';

const MyHabbit = () => {
    const {user} = use(AuthContext)
    const [loading,setLoading] = useState(true)
    

    const handleSave =(e)=>{
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photoUrl.value;

        const profile = {
            displayName:name,
            photoURL:photo

        }
        setLoading(true)
        updateProfile(user,profile)
        .then(()=>{
            setLoading(false)
            e.target.reset()
        })
        .catch()
    }
    return (
       <div className='bg-black/5 py-30'>
        <title></title>
         <div className="max-w-md mx-auto  p-6 bg-base-100 rounded-2xl shadow-lg w-11/12">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        My Profile
      </h2>

      <div className="text-center mb-6">

        {
            user.photoURL?<img
          src={user.photoURL}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        /> : <img
          src={profile}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-2"
        />
        }
        <p className="font-semibold">{user.displayName || "No Name"}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            name='name'
            placeholder='Enter Your Name'
           
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
           name='photoUrl'
           placeholder='Enter Your Photo Url'
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? <Loading></Loading> : ""}`}
        >
          Update Profile
        </button>
      </form>
    </div>
       </div>
    );
};

export default MyHabbit;