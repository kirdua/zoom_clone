import { format } from 'date-fns'

export const setCurrentDate = () => {
  return format(new Date(), 'eeee, mm/dd/yyyy')
}
