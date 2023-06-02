import  MoreVertTwoTone  from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './featured.scss'

const WCSFeatured = () => {
    

  return (
    <div className='wcs_featured wcs_featured_free'>
        <h4 className='pro_badge'>UPCOMMING</h4>
        <div className="wcs_featured wec_left_featured">
            <div className="wcs_top">
                <h1 className="wcs_title">Site Health Status</h1>
                <MoreVertTwoTone fontSize='small'/>
            </div>
            <div className="wcs_bottom">
                <div className="wcs_featuredChart">
                <CircularProgressbar value={0} text={`${0}%`} strokeWidth={5} />
                </div>
                <p className="wcs_title">Error</p>
                <p className="wcs_amount">0</p>
                <div className="wcs_summary">
                    
                    <div className="wcs_item">
                        <div className="itemTitle">Good</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                            <div className="resultAmount">0</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">Recommended</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpIcon fontSize='small'/>
                            <div className="resultAmount">0</div>
                        </div>
                    </div>
                    <div className="wcs_item">
                        <div className="itemTitle">Critical</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize='small'/>
                            <div className="resultAmount">0</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WCSFeatured