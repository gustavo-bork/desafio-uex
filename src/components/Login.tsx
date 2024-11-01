import {
  styled,
  Stack,
  Box,
  Button,
  Checkbox,
  FormLabel,
  FormControl,
  Link,
  TextField,
  Typography,
  FormControlLabel
} from "@mui/material";
import MuiCard from "@mui/material/Card";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { User } from "../types/User";

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2), margin: 'auto', [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    })
  }
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const result = validateLogin();
    if (result === false) return;
    
    const user: User = {
      email,
      password
    };

    if (!localStorage.getItem("user")) {
      toast.error("Usuário não cadastrado");
      return;
    }

    const localUser = JSON.parse(localStorage.getItem("user") as string) as User;
    
    if (!(user.email === localUser.email && user.password === localUser.password)) {
      toast.error("Usuário ou senha incorretos");
      return;
    }

    window.location.href = '/contato';
  };

  const validateLogin = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Email inválido"); 
      return false;
    }

    if (!password) {
      toast.error("Senha não informada");
      return false;
    }

    return true;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Login
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              id="email"
              type="email"
              name="email"
              placeholder="exemplo@email.com" 
              autoFocus
              required
              fullWidth
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="password">Senha</FormLabel>
            </Box>
            <TextField
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              required
              fullWidth
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Lembrar-me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
          >
            Fazer login
          </Button>
          <Typography sx={{ textAlign: 'center' }}>
            Ainda não possui uma conta?
            <span>
              <Link
                href="/cadastro"
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Cadastrar
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  )
}

export default Login;
