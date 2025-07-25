"use client"

import DaForm from '@/components/common/form'

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Image from 'next/image'

export default function Login() {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-500/20">
            <DaForm className="bg-white p-8 rounded-md space-y-4 lg:flex gap-10 justify-center items-center">
                <div className="flex justify-center">
                    <Image
                        src={'/image/bananero.jpg'}
                        height={300}
                        width={300}
                        alt="bananero"
                        className="rounded-full aspect-square m-4"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <Typography variant="h4" component="h1" color="primary">Bienvenido, Ingrese</Typography>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TextField label='Ingresa tu correo' />
                        <TextField type='password' label='Ingresa tu contraseña' />
                    </div>
                    <div className='flex justify-center'>
                        <Button href='/dashboard' variant='contained'>Ingresar</Button>
                    </div>
                    <div className='flex justify-center'>
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