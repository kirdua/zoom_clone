'use client'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { setCurrentDate } from '@/utils/dateFormat'
import MeetingTypeList from '@/components/MeetingTypeList'

const Home = () => {
  const [time, setTime] = useState(new Date())

  const getCurrentTime = () => {
    const currentTime = new Date()
    setTime(currentTime)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      getCurrentTime()
    }, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meeting at: 12:30pm
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {format(time, 'HH:mm a')}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>
              {setCurrentDate()}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
