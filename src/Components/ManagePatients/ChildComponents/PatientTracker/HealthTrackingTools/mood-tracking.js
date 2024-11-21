import React, { useState } from "react";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Chart from "react-apexcharts";

const MoodTracking = ({ moodData }) => {
    const colors = ['#ED0000', '#BE0000', '#A50000', '#8E2100', '#5C3500', '#391200', '#193802', '#2B6203', '#488910', '#75CB2B'];

    const [options] = useState({
        chart: {
            id: "basic-bar",
            type: "area"
        },
        xaxis: {
            categories: ['2020-11-02', '2020-11-03', '2020-11-04', '2020-11-05', '2020-11-06', '2020-11-07']
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount: 5
        },
        stroke: {
            curve: 'smooth',
        },
        markers: {
            size: 4,
            fill: {
                colors: ['#ED0000', '#BE0000', '#A50000', '#8E2100', '#5C3500', '#391200']
            }
        },
        theme: {
            palette: 'palette1',
            monochrome: {
                enabled: true,
                color: '#1E64CC',
                shadeTo: 'light',
                shadeIntensity: 0.65
            }
        }

    });

    const [series] = useState([
        {
            name: "series-1",
            data: [85, 55, 80, 60, 20, 35]
        }
    ]);

    return (
        <>
            <div className='Mood-Frist-Container'>
                <div className='Habit-Container-Content'>
                    <h5>Mood tracking</h5>
                    <div className="Habit-Container-label">Modified on 11/07/20</div>
                </div>
                <div className="Graph">
                    <div className="app">
                        <div className="mixed-chart" >
                            <Chart
                                options={options}
                                series={series}
                                className="responsive-chart"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='Mood-Second-Container'>
                <div className="Mood-Tracking-pecentage">
                    <div className="Mood"> <h5>Mood tracking</h5>
                        <div className="Habit-Container-label">Modified on 11/07/20</div></div>
                    <div className="MoodTrackC">
                        <EmojiEmotionsIcon style={{ marginRight: '5px', color: '#75CB2B', height: '50px' }} />
                        <span className="MoodTrackContainer-Span">
                            98.5
                        </span>
                    </div>
                </div>
                <div className="Last-Mood-Tracking">
                    <p>Last recorded mood rating</p>
                    <div className="MoodTrackContainer">
                        <EmojiEmotionsIcon style={{ marginRight: '5px', color: '#75CB2B' }} />
                        <span >
                            98.5
                        </span>
                        <span>
                            Healthy
                        </span>
                    </div>
                </div>
                <div>
                    {colors.map((color, index) => (
                        <EmojiEmotionsIcon key={index} style={{ margin: '0px 12px', color: color }} />
                    ))}
                    {/* <div>
                        {colors.map((color, index) => (
                            <span key={index} style={{ margin: '5px 13px', color: color }}>{index * 10} </span>
                        ))}
                    </div> */}
                </div>
                <div className="MoodTracking-Main-Con">
                    <div className="Mood-Tracking-Sub-Container" style={{ marginLeft: '.6rem' }}>
                        <div>0</div>
                        <div>Bad</div>
                    </div>
                    <div className="Mood-Tracking-Sub-Container" style={{ marginLeft: '1.1rem' }}>
                        <div>30</div>
                        <div>Poor</div>
                    </div>
                    <div className="Mood-Tracking-Sub-Container">
                        <div>50</div>
                        <div>Okey</div>
                    </div>
                    <div className="Mood-Tracking-Sub-Container-Avg">
                        <div>70</div>
                        <div>Average</div>
                    </div>
                    <div className="Mood-Tracking-Sub-Container-Healthy">
                        <div>100</div>
                        <div>Healthy</div>
                    </div>
                </div>
                <div className="horizontal-line-activity"></div>
                <a href="" className="Previous">View Previous rating</a>
            </div>
        </>
    )
}

export default MoodTracking;
