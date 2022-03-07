import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { query } from '../src/db';

export default function Index({ federacao }) {
  return (
    <Container maxWidth="sm">
      <Box>Funcionou</Box>
      <Box sx={{ my: 4 }}>
        <div>
          <div>
            <ol type="0">
              {federacao.map((r) => (
                <li key={r.id}>
                  {r.descricao} {r.limite} {r.kimono}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Box>
    </Container>
  );
}
export async function getStaticProps(context) {
  const federacao = await query(`select  cp.id, p.descricao,  cp.limite,
  cp.kimono, i.descricao  from categoria_peso cp 
  join idade_federacao if2 on if2.id = cp.idade_federacao_id 
  join peso p ON p.id =cp.peso_id 
  join federacao f on f.id = if2.federacao_id 
  join idade i on i.id =if2.idade_id `);
  console.log('getStaticProps');
  return {
    props: {
      federacao: federacao,
    },
  };
}
