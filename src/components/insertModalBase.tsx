import * as React from "react";
import type { TransitionProps } from '@mui/material/transitions'
import { Container, Button, Slide, Typography, IconButton, Toolbar, AppBar, Dialog, Box } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide direction='up' ref={ref} {...props}>
      {props.children}
    </Slide>
  )
})

interface InsertModalBaseProps {
  open: boolean
  setOpen: (value: boolean) => void
  children?: React.ReactNode
  title: string
  subtitle?: string
  modalContainerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xs'
  onSubmit?: () => void
  hideButton?: boolean
}

const InsertModalBase = ({
  open,
  setOpen,
  children,
  title,
  subtitle,
  modalContainerSize = 'md'
}: InsertModalBaseProps) => {
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='close'
            onClick={() => setOpen(false)}
            sx={{ color: 'blue' }}
          >
            <i className='tabler-x' />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h5' component='div' color='primary'>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth={modalContainerSize} className='p-4' sx={{ minWidth: '250px' }}>
        <Typography className='pb-4' variant='h5' sx={{ fontWeight: 'bold' }} color='primary'>
          {subtitle}
        </Typography>
        {children}
      </Container>
    </Dialog>
  )
}

export default InsertModalBase;
