import { format } from 'date-fns'

export const setCurrentDate = () => {
  return format(new Date(), 'eeee, MMMM dd, yyyy')
}
