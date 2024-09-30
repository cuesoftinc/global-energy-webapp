import { create } from 'zustand';
import { ChartResponse } from '../types';


interface ChartState {
    barChartData: ChartResponse | null;
    setBarChartData: (chart: ChartResponse | null) => void;
}


const useCurrentChartStore = create<ChartState>((set) => ({
    barChartData: null,
    setBarChartData: (chart) => set(() => ({ barChartData: chart })),
}));

export default useCurrentChartStore;
