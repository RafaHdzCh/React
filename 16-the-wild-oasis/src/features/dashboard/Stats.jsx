import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import * as ColorIcons from "react-icons/fc";

export default function Stats({bookings, confirmedStays, numDays, cabinCount})
{
  const numberOfBookings = bookings.length;
  const totalSales = bookings.reduce((acc,cur) => acc + cur.totalPrice, 0)
  const checkIns = confirmedStays.length;
  const occupation = Math.round(confirmedStays.reduce((acc,cur) => acc+cur.numNights,0) / (numDays * cabinCount) * 100);

  return(
    <>
      <Stat 
        title="Bookings" 
        color="blue" 
        icon={<ColorIcons.FcBriefcase />} 
        value={numberOfBookings}
      />
      <Stat 
        title="Sales" 
        color="green" 
        icon={<ColorIcons.FcMoneyTransfer />} 
        value={formatCurrency(totalSales)}
      />
      <Stat 
        title="Check ins" 
        color="indigo" 
        icon={<ColorIcons.FcCalendar />} 
        value={checkIns}
      />
      <Stat 
        title="Occupancy rate" 
        color="yellow" 
        icon={<ColorIcons.FcRating />} 
        value={occupation+"%"}
      />
    </>
  )
}