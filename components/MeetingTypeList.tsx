'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {
  const router = useRouter()

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >()

  const createMeeting = () => {}

  return (
    <section className='grid grid-cols-1 gap-5 md:grids-col-2 lg:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        className='bg-orange-1'
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='via invitation link'
        className='bg-blue-1'
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <HomeCard
        img='/icons/schedule.svg'
        title='Schedule Meeting'
        description='Plan your meeting'
        className='bg-purple-1'
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View Recordings'
        description='Check out your recordings'
        className='bg-yellow-1'
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        title='Start an instant meeting'
        className='text-center'
        buttonText='Start Meeting'
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList
