import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from "@mui/material/styles";

const PrettoSlider = styled(Slider)(
    ({theme}) => ({
    color: '#1c7ed4',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      boxShadow: 'inherit',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                  '#1c7ed4',
              )}" d="m12 5.83 2.46 2.46c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 3.7a.9959.9959 0 0 0-1.41 0L8.12 6.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 5.83zm0 12.34-2.46-2.46a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.17c.39-.39.39-1.02 0-1.41a.9959.9959 0 0 0-1.41 0L12 18.17z"/></svg>')`,
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#4799e0',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  }));

function TimeSlider(props) {
    return (
        <div className='time-slider'>
            <Box sx={{ width: '97%', paddingTop: '2em'}}>
                <PrettoSlider
                    color='success'
                    min={4}
                    max={23}
                    step={1}
                    value={props.sliderNums}
                    onChange={props.handleSliderChange}
                    marks={props.sliderMarks}
                    valueLabelDisplay='auto'
                />
            </Box>
        </div>
    )
}

export default TimeSlider;