import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { selectPlayers } from './slice/selectors';
import { usePlayersTableSlice } from './slice';

export function PlayersTable() {
  const dispatch = useDispatch();
  const { actions } = usePlayersTableSlice();
  const players = useSelector(selectPlayers);

  useEffect(() => {
    if (!players) {
      dispatch(actions.loadPlayers());
    }
  }, [players]); // eslint-disable-line

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      valueGetter: (params: GridValueGetterParams) => params.row.player.name,
      resizable: true,
      width: 100,
    },
    {
      field: 'age',
      headerName: 'Idade',
      valueGetter: (params: GridValueGetterParams) => params.row.player.age,
      resizable: true,
      width: 100,
    },
    {
      field: 'nationality',
      headerName: 'Nacionalidade',
      valueGetter: (params: GridValueGetterParams) =>
        params.row.player.nationality,
      resizable: true,
      width: 100,
    },
  ];
  return (
    <DataGrid
      getRowId={row => row.player.id}
      rows={players || []}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
