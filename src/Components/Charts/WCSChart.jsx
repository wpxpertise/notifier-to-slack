import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// recharts start
const data = [
  {
    day: 'Saturday',
    Failed: 50,
    Success: 12,
    New: 12,
  },
  {
    day: 'Sunday',
    Failed: 60,
    Success: 60,
    New: 60,
  },
  {
    day: 'Monday',
    Failed: 70,
    Success: 70,
    New: 70,
  },
  {
    day: 'Tuesday',
    Failed: 30,
    Success: 25,
    New: 20,
  },
  {
    day: 'Wednesday',
    Failed: 40,
    Success: 30,
    New: 40,
  },
  {
    day: 'Thursday',
    Failed: 80,
    Success: 50,
    New: 80,
  },
  {
    day: 'Friday',
    Failed: 20,
    Success: 45,
    New: 10,
  },
];


const WCSChart = () => {
  return (
    <div className='wcs_chart wcs_chart_free'>
      <h4 className='pro_badge'>UPCOMMING</h4>
      <div className="wcs_left wec_left_free">
      <div className="wcs_title">Login attempt:</div>
      <ResponsiveContainer width="100%" aspect={2/0.8}>
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0}/>
              </linearGradient>

              <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
             
            </defs>

            <XAxis dataKey="day" stroke='gray' />
            <YAxis />

            <CartesianGrid strokeDasharray="3 3" className='wcs_chartGrid'/>
            <Tooltip />
            <Area type="monotone" dataKey="Failed" stroke="#8884d8" fillOpacity={1} fill="url(#colorFailed)" />
            <Area type="monotone" dataKey="Success" stroke="#ff7300" fillOpacity={1} fill="url(#colorSuccess)" />
            <Area type="monotone" dataKey="New" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNew)" />
        </AreaChart>
      </ResponsiveContainer>
     </div>
    </div>
  )
}

export default WCSChart