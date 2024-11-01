import {
  Grid,
  Typography,
  Card,
  Button
} from "@mui/material";
import { useState, useEffect } from 'react';
import { Contact } from '../../types/Contact';
import ContatoModal from './modal';


const Contato = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts") as string) as Contact[]);
    }
  }, []);

  return (
    <Grid>
      <Grid xs={12} marginTop={3} marginLeft={3}>
        <Button color="primary" variant="outlined" onClick={() => { setOpen(!open); setName(null) }}>Adicionar contato</Button>
      </Grid>
      <Grid container marginTop={3} marginLeft={3}>
        <ContatoModal open={open} setOpen={setOpen} userName={name} />
        <Grid container item xs={4}>
          <Grid item xs={4}>
            <Card>
              <Typography>Contatos</Typography>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <Typography>Mapa</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            {contacts.map(contact => (
              <Button onClick={() => { setOpen(!open); setName(contact.name) }}>{contact.name}</Button>
            ))}
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <div id="map"></div>
          </Card>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Contato;
