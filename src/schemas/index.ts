import * as Yup from "yup";

export const signInSchema = Yup.object().shape({
    email: Yup.string().required("Email obrigatório").email("Digite um email válido"),
    password: Yup.string().required("Senha é obrigatória")
})