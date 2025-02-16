"use client"

import DaForm from '@da-shui/components/common/form'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Image from 'next/image'

function Login() {
    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-slate-500/20">
            <DaForm className="tw-bg-white tw-p-8 tw-rounded-md tw-space-y-4 lg:tw-flex tw-gap-10 tw-justify-center tw-items-center">
                <div className="tw-flex tw-justify-center">
                    <Image
                        src={'/image/bananero.jpg'}
                        height={300}
                        width={300}
                        alt="bananero"
                        className="tw-rounded-full tw-aspect-square tw-m-4"
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div>
                        <Typography variant="h4" component="h1" color="primary">Bienvenido, Ingrese</Typography>
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-4">
                        <TextField label='Ingresa tu correo' />
                        <TextField type='password' label='Ingresa tu contraseña' />
                    </div>
                    <div className='tw-flex tw-justify-center'>
                        <Button href='/dashboard' variant='contained'>Ingresar</Button>
                    </div>
                    <div className='tw-flex tw-justify-center'>
                        <Typography color="primary" component="p" 
                            sx={{ 
                                cursor: "pointer",
                                textDecoration: "underline",
                                "&:hover": {
                                    opacity: 0.7
                                }
                            }}
                        >
                            ¿ Olvido su contraseña ?
                        </Typography>
                    </div>
                </div>
            </DaForm>
        </div>
    )
}

export default Login