'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TAmountByPaymentMethod } from '@/lib/definitions';
import { ChartSkeleton } from '@/components/skeleton';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ graphData }: { graphData: TAmountByPaymentMethod[] }) => {
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
    scales: {
      x: {
        display: true,
        ticks: {
          color: `hsl(${foregroundColor.current} / 0.5)`,
        },
        title: {
          display: true,
          text: 'Payment Method',
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
        text: 'Amount spent by Payment Method',
        color: `hsl(${foregroundColor.current})`,
      },
    },
  };

  const labels = graphData?.map(d => d.paymentMethod);
  const data = {
    labels,
    datasets: [
      {
        label: 'Amount',
        data: graphData?.map(d => d.totalAmount),
        borderColor: `hsl(${accentColor.current})`,
        borderWidth: 1,
        backgroundColor: `hsl(${accentColor.current} / 0.5)`,
        hoverBackgroundColor: `hsl(${accentColor.current})`,
        barThickness: 50,
        maxBarThickness: 70,
      },
    ],
  };

  return (
    <div className="h-full">
      {isLoaded ? <Bar options={options} data={data} /> : <ChartSkeleton />}
    </div>
  );
};

export default BarChart;
