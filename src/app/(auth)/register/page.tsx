import { AuthLayout } from "@/features/auth/components/AuthLayout"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
    return (
        <AuthLayout 
            title="Crear Cuenta" 
            subtitle="Únete a nosotros y comienza tu experiencia"
        >
            <RegisterForm />
        </AuthLayout>
    )
}