import React from 'react'
import { useNavigate } from 'react-router-dom';
import Arrownavcomponent from './Arrownavcomponent';

const Dashboardwidget3 = () => {
  return (
    <div className='p-5 bg-gradient-to-br from-[#8c95fb]/20 to-[#eaddff]20 min-h-screen'> 
        <Arrownavcomponent className="mb-5" />
        <span className="font-label text-xs uppercase tracking-[0.1em] text-outline font-bold mt-2">Step 03 of 3</span>
        <h1 className='text-5xl font-[800]'>What are your primary goals?</h1>


        <div>
            <div className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-full p-5 mt-6 shadow-md cursor-pointer'>
            <div className='flex flex-col gap-2'>
                <span>MOOD</span>
                <p className='font-medium text-xl'>Track Moods</p>
            </div>
            <p>icon</p>
            </div>

             <div className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-full p-5 mt-6 shadow-md cursor-pointer'>
            <div className='flex flex-col gap-2'>
                <span>WELLNESS</span>
                <p className='font-medium text-xl'>Manage Stress</p>
            </div>
            <p>icon</p>
            </div>

             <div className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-full p-5 mt-6 shadow-md cursor-pointer'>
            <div className='flex flex-col gap-2'>
                <span>SPIRIT</span>
                <p className='font-medium text-xl'>Daily Motivation</p>
            </div>
            <p>icon</p>
            </div>

             <div className='flex justify-between items-center bg-white dark:bg-gray-800 rounded-full p-5 mt-6 shadow-md cursor-pointer'>
            <div className='flex flex-col gap-2'>
                <span>SUPPORT</span>
                <p className='font-medium text-xl'>Talk to a Therapist</p>
            </div>
            <p>icon</p>
            </div>
            
        </div>


        <div className="motivation-carousel mt-10 p-8 rounded-t-xl bg-gradient-to-br from-[#8c95fb]/20 to-[#eaddff]20 shadow-md">
            <p className='mx-auto text-center '>"Every journey begins with a single step towards your own inner peace"</p>
        </div>

        <div className="button mt-10 flex justify-center">
            <button className="bbg-gradient-to-br from-[#8c95fb]/20 to-[#eaddff]20 shadow-md  text-black font-bold py-2 px-4 rounded">
                Finish Journey
            </button>
        </div>
    </div>
  )
}

export default Dashboardwidget3