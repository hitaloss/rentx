import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    email: Yup.string().required("Email obrigatório").email("Digite um email válido"),
    password: Yup.string().required("Senha é obrigatória")
})

export const registerSchema = Yup.object().shape({
    name: Yup.string().required("Nome obrigatório").min(3, "Digite um nome válido"),
    email: Yup.string().required("Email obrigatório").email("Email válido"),
    driverLicense: Yup.string().required("CNH é obrigatória").min(11, "CNH inválida")
})
