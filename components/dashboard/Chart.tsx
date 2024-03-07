import { LineChart, BarChart, NoDataError } from '@/components/dashboard';
import { IChartProps, TAmountByDate, TAmountByPaymentMethod } from '@/lib/definitions';

const Chart = async ({ dataFunction, graphType }: IChartProps) => {
  const graphData = await dataFunction();

  if (graphData.error) {
    return <NoDataError error={graphData.error} />;
  }

  if (graphType === 'line') {
    return <LineChart graphData={graphData.data as TAmountByDate[]} />;
  }

  if (graphType === 'bar') {
    return <BarChart graphData={graphData.data as TAmountByPaymentMethod[]} />;
  }
};

export default Chart;
