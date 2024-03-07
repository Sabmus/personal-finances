'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TAmountByDate } from '@/lib/definitions';
import { useEffect, useRef, useState } from 'react';
import { ChartSkeleton } from '@/components/skeleton';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const LineChart = ({ graphData }: { graphData: TAmountByDate[] }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  let accentColor = useRef('');
  let foregroundColor = useRef('');

  useEffect(() => {
    const style = getComputedStyle(document.body);
    accentColor.current = style.getPropertyValue('--color-accent');
    foregroundColor.current = style.getPropertyValue('--color-foreground');
    setIsLoaded(true);
  }, []);

  const options = {
    responsive: true,
    interaction: {
      mode: 'nearest' as const,
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: `hsl(${foregroundColor.current} / 0.5)`,
        },
        title: {
          display: true,
          text: 'Date',
          color: `hsl(${foregroundColor.current})`,
          font: {
            weight: 'bold' as const,
          },
        },
      },
      y: {
        display: true,
        ticks: {
          color: `hsl(${foregroundColor.current} / 0.5)`,
        },
        title: {
          display: true,
          text: 'Amount',
          color: `hsl(${foregroundColor.current})`,
          font: {
            weight: 'bold' as const,
          },
        },
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 4,
        right: 4,
        top: 2,
        bottom: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Amount spent by date',
        color: `hsl(${foregroundColor.current})`,
      },
    },
  };

  const labels = graphData?.map(d => d.date.toLocaleDateString('es-CL'));
  const data = {
    labels,
    datasets: [
      {
        label: 'Amount',
        data: graphData?.map(d => d.totalAmount),
        borderColor: `hsl(${accentColor.current})`,
        borderWidth: 1,
        backgroundColor: `hsl(${accentColor.current} / 0.5)`,
        fill: true,
        tension: 0.25,
      },
    ],
  };

  return <div className="h-full">{isLoaded ? <Line data={data} options={options} /> : <ChartSkeleton />}</div>;
};

export default LineChart;
