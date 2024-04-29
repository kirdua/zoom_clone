'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker'

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'

import { useToast } from './ui/use-toast'

const MeetingTypeList = () => {
  const router = useRouter()
  const { user } = useUser()
  const client = useStreamVideoClient()
  const { toast } = useToast()

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >()

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  })

  const [callDetails, setCallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!client || !user) return

    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' })
        return
      }

      const id = crypto.randomUUID()
      const call = client.call('default', id)

      if (!call) throw new Error('Failed to create call')

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'Instant meeting'

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      })

      setCallDetails(call)

      if (!values.description) {
        router.push(`/meeting/${call.id}`)
      }

      toast({
        title: 'Meeting Created',
      })
    } catch (error) {
      console.log(error)
      toast({ variant: 'destructive', title: 'Failed to create Meeting' })
    }
  }

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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          title='Create meeting'
          onClose={() => setMeetingState(undefined)}
          handleClick={createMeeting}
        >
          <div className='flex flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Add a description
            </label>
            <Textarea
              className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
              onChange={(e) => {
                setValues({ ...values, description: e.target.value })
              }}
            />
          </div>
          <div className='flex w-full flex-col gap-2.5'>
            <label className='text-base text-normal leading-[22px] text-sky-2'>
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm aa'
              className='w-full rounded bg-dark-3 p-2 focus:outline-none'
              onChange={(date) => {
                setValues({ ...values, dateTime: date! })
              }}
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          title='Meeting Created'
          className='text-center'
          image='/icons/checked.svg'
          buttonIcon='/icons/copy.svg'
          buttonText='Copy Meeting Link'
          onClose={() => setMeetingState(undefined)}
          handleClick={() => {
            //navigator.clipboard.writeText(meetingLink)
            //toast({ title: 'Link copied' })
          }}
        />
      )}
    </section>
  )
}

export default MeetingTypeList
