import { Contact } from "../../types/Contact";
import { useState } from "react";
import { toast } from "react-toastify";
import { Grid, TextField, Button, Box, InputAdornment } from "@mui/material";
import { ContentPaste } from "@mui/icons-material";
import InsertModalBase from "../insertModalBase";
import cep from "cep-promise";

const ContatoModal = ({
  open,
  setOpen,
  userName
}: {
  open: boolean,
  setOpen: (value: boolean) => void
  userName: string | null
}) => {
  const [contact, setContact] = useState<Contact>({
    name: '',
    cpf: '',
    telephone: '',
    address: {
      street: '',
      neighborhood: '',
      number: 0,
      complement: null,
      cep: '',
      city: '',
      state: '',
      latitude: '',
      longitude: ''
    }
  });

  const onClickCEP = () => {
    cep(contact.address.cep)
      .then(res => {
        const { street, neighborhood, city, state } = res;

        setContact(prevState => ({
          ...prevState,
          address: {
            ...prevState.address,
            street,
            neighborhood,
            city,
            state
          }
        }));
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const IsValidCPF = (strCPF: string) => {
    let soma: number = 0;
    let resto: number;

    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
  }

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setContact(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = () => {
    const result = IsValidCPF(contact.cpf);
    if (result === false) {
      toast.error("CPF inválido");
      return;
    }
    const contacts = localStorage.getItem("contacts") ? JSON.parse(localStorage.getItem("contacts") as string) as Contact[] : [];
    localStorage.setItem("contacts", JSON.stringify([...contacts, contact]));

    toast.success(userName ? "Contato atualizado com sucesso" : "Contato cadastrado com sucesso");

    setOpen(!open);
  }

  return (
    <InsertModalBase open={open} setOpen={setOpen} title='Adicionar contato'>
      <Box component="form" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              required
              value={contact.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="cpf"
              label="CPF"
              fullWidth
              required
              value={contact.cpf}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="telephone"
              label="Telefone"
              fullWidth
              required
              value={contact.telephone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="street"
              label="Endereço"
              fullWidth
              required
              value={contact.address.street}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="complement"
              label="Complemento"
              fullWidth
              value={contact.address.complement || ''}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="neighborhood"
              label="Bairro"
              required
              fullWidth
              value={contact.address.neighborhood}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="number"
              label="Número"
              fullWidth
              required
              value={contact.address.number}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="cep"
              label="CEP"
              fullWidth
              required
              value={contact.address.cep}
              onChange={handleAddressChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button variant="outlined" color="primary" onClick={onClickCEP}>
                        <ContentPaste />
                      </Button>
                    </InputAdornment>
                  )
                }
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="city"
              label="Cidade"
              fullWidth
              required
              value={contact.address.city}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="state"
              label="Estado"
              fullWidth
              required
              value={contact.address.state}
              onChange={handleAddressChange}
            />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={3}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                {userName ? "Atualizar" : "Cadastrar"}
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button fullWidth variant="outlined" onClick={() => setOpen(!open)}>Cancelar</Button> 
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </InsertModalBase>
  );
}

export default ContatoModal;
