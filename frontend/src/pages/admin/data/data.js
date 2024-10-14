import React, { useEffect } from 'react';
import { Chart } from "react-google-charts";

const MyChartComponent = () => {
    // Sample data and options for your chart
    const data = [
        ['Year', 'Sales', 'Expenses'],
        ['2013', 1000, 400],
        ['2014', 1170, 460],
        ['2015', 660, 1120],
        ['2016', 1030, 540],
    ];

    const options = {
        title: 'Company Performance',
        hAxis: { title: 'Year', minValue: 0 },
        vAxis: { title: 'Amount', minValue: 0 },
        legend: 'none',
    };

    useEffect(() => {
        // Load Google Charts
        const loadGoogleCharts = () => {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.onload = () => {
                window.google.charts.load('current', { packages: ['corechart', 'bar'] });
                window.google.charts.setOnLoadCallback(drawChart);
            };
            document.body.appendChild(script);
        };

        loadGoogleCharts();
    }, []);

    const drawChart = () => {
        const chartData = google.visualization.arrayToDataTable(data);
        const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        chart.draw(chartData, options);
    };

    return (
        <div>
            <div id="chart_div" style={{ width: '100%', height: '300px' }}></div>
        </div>
    );
};

export default MyChartComponent;
