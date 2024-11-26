import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { useStatistics } from './useStatistics';
import { Chart } from './Chart';

function App() {
  const staticData = useStaticData();
  const statistics = useStatistics(10);
  const [activeView, setActiveView] = useState<View>('CPU');
  const cpuUsages = useMemo(
    () => statistics.map((stat) => stat.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stat) => stat.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stat) => stat.storageUsage),
    [statistics]
  );
  const gpuUsages = useMemo(
    () => statistics.map((stat) => stat.gpuUsage),
    [statistics]
  );
  const activeUsages = useMemo(() => {
    switch (activeView) {
      case 'CPU':
        return cpuUsages;
      case 'RAM':
        return ramUsages;
      case 'STORAGE':
        return storageUsages;
      case 'GPU':
        return gpuUsages;
    }
  }, [activeView, cpuUsages, ramUsages, storageUsages, gpuUsages]);

  return (
    <div className="App">
      <div className="main">
        <div>
          <SelectOption
            onClick={() => setActiveView('CPU')}
            title="CPU"
            view="CPU"
            subTitle={staticData?.cpuModel ?? ''}
            data={cpuUsages}
          />
          <SelectOption
            onClick={() => setActiveView('RAM')}
            title="RAM"
            view="RAM"
            subTitle={(staticData?.totalMemoryGB.toString() ?? '') + ' GB'}
            data={ramUsages}
          />
          <SelectOption
            onClick={() => setActiveView('STORAGE')}
            title="STORAGE"
            view="STORAGE"
            subTitle={(staticData?.totalStorage.toString() ?? '') + ' GB'}
            data={storageUsages}
          />
            <SelectOption
            onClick={() => setActiveView('GPU')}
            title="GPU"
            view="GPU"
            subTitle={`${staticData?.gpuModel ?? 'N/A'} (${
              staticData?.gpuMemoryGB ?? 0
            } GB)`}
            data={gpuUsages}
          />
        </div>
        <div className="mainGrid">
          <Chart
            selectedView={activeView}
            data={activeUsages}
            maxDataPoints={10}
          />
        </div>
      </div>
    </div>
  );
}

function SelectOption(props: {
  title: string;
  view: View;
  subTitle: string;
  data: number[];
  onClick: () => void;
}) {
  return (
    <button className="selectOption" onClick={props.onClick}>
      <div className="selectOptionTitle">
        <div>{props.title}</div>
        <div>{props.subTitle}</div>
      </div>
      <div className="selectOptionChart">
        <Chart selectedView={props.view} data={props.data} maxDataPoints={10} />
      </div>
    </button>
  );
}

function useStaticData() {
  const [staticData, setStaticData] = useState<StaticData | null>(null);

  useEffect(() => {
    async function fetchStaticData() {
      const data = await window.electron.getStaticData();
      setStaticData(data);
    }
    fetchStaticData();
  }, []);

  return staticData;
}

export default App;
