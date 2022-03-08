import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { query } from '../src/db';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'idade', headerName: 'Idade', width: 130, filter:true },
  { field: 'peso', headerName: 'Peso', width: 130 },
  {
    field: 'limite',
    headerName: 'Limite',
    type: 'number',
    width: 90,
  }
];


export default function Index({ federacao }) {
  return (
    <Container maxWidth="sm">
      <Box style={{ height: 400, width: '100%' }}>
     <DataGrid
        rows={federacao}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
      />  
      </Box>
      
    </Container>
  );
}
export async function getStaticPropstemp(context) {
  console.log(process.env);
  return {
    props: {
      federacao: [{ id: 0, descricao: 'isso é um teste' }],
    },
  };
}

export async function getStaticProps(context) {
  console.log('getStatic');
  const federacao = await query(`select  cp.id, p.descricao peso,  cp.limite,
  cp.kimono, i.descricao idade  from categoria_peso cp 
  join idade_federacao if2 on if2.id = cp.idade_federacao_id 
  join peso p ON p.id =cp.peso_id 
  join federacao f on f.id = if2.federacao_id 
  join idade i on i.id =if2.idade_id `);

  return {
    props: {
      federacao: federacao,
    },
  };
}
