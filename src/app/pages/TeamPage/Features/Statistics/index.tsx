import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStatisticsSlice } from './slice';
import { selectStatistics } from './slice/selectors';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Paper, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export function Statistics() {
  const dispatch = useDispatch();
  const { actions } = useStatisticsSlice();
  const statistics = useSelector(selectStatistics);
  const [lineupDataChart, setLineupDataChart] = useState({
    labels: [] as string[],
    datasets: [] as Dataset[],
  });
  const [matchDataChart, setMatchDataChart] = useState({
    labels: [] as string[],
    datasets: [] as Dataset[],
  });
  const chartBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
  const chartBorderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  useEffect(() => {
    if (!statistics) {
      dispatch(actions.loadStatistics());
    }

    if (
      statistics &&
      statistics?.lineups.length > 1 &&
      !lineupDataChart.labels.length
    ) {
      const labels: string[] = [];
      const data: number[] = [];
      // eslint-disable-next-line
      statistics.lineups.map(lineup => {
        const { formation, played } = lineup as any;
        labels.push(formation);
        data.push(Number(played));
      });
      setLineupDataChart({
        labels,
        datasets: [
          {
            label: '# de utilizações',
            data,
            backgroundColor: chartBackgroundColors,
            borderColor: chartBorderColors,
            borderWidth: 1,
          },
        ],
      });
    }

    if (
      statistics &&
      statistics?.fixtures.length > 1 &&
      !matchDataChart.labels.length
    ) {
      const data: number[] = [];
      data.push(statistics.fixtures.played.total);
      data.push(statistics.fixtures.wins.total);
      data.push(statistics.fixtures.draws.total);
      data.push(statistics.fixtures.loses.total);

      setMatchDataChart({
        labels: ['Total', 'Vitórias', 'Empates', 'Derrotas'],
        datasets: [
          {
            label: '# de utilizações',
            data,
            backgroundColor: chartBackgroundColors,
            borderColor: chartBorderColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [statistics]); // eslint-disable-line

  console.log(statistics);

  return (
    <>
      <Grid item xs={12} md={6} component={Paper} sx={{ marginTop: '20px' }}>
        <Typography variant="h5">Formações mais utilizadas</Typography>
        <Doughnut data={lineupDataChart} />
      </Grid>
      <Grid item xs={12} md={6} component={Paper} sx={{ marginTop: '20px' }}>
        <Typography variant="h5">Total de Jogos</Typography>
        <Doughnut data={matchDataChart} />
      </Grid>
    </>
  );
}
