<template>
    <div class="container mx-auto max-w-sm my-14">
        <h1 class="font-primary font-semibold">Cadastre a sua fornecedora</h1>
        <section class="mt-8 mb-6">
            <MoleculesProgressBar :steps="4" :currentStep="1" />
        </section>
        <form class="w-full formkit-form mx-auto flex flex-col gap-4 mt-8" @submit.prevent="submitForm">
            <h2 class="font-primary font-semibold text-lg mb-2">Dados da conta</h2>
            <FormsFormText id="email" v-model="form.email" label="E-mail" placeholder="Insira seu email" required @blur="validateEmail(form.email)" :error-message="emailErrorMessage"/>
            <FormsFormText id="password" v-model="form.password" label="Senha" type="password" placeholder="Insira uma senha" required @blur="validatePassword" :error-message="passwordErrorMessage"/>
            <FormsFormText id="confirmPassword" v-model="form.confirmPassword" type="password" label="Confirmar senha" placeholder="Confirme a sua senha" required @blur="validateConfirmPassword" :error-message="confirmPasswordErrorMessage"/>
            <h2 class="font-primary font-semibold text-lg my-2">Informações da empresa</h2>
            <FormsFormText id="name" v-model="form.name" label="Nome" placeholder="Insira o nome da fornecedora" required />
            <FormsFormText id="responsible" v-model="form.responsible" label="Responsável" placeholder="Insira o nome do responsável" required />
            <FormsFormText id="cnpj" v-model="form.cnpj" label="CNPJ" placeholder="Insira o CNPJ" required @blur="validateCNPJ(form.cnpj)" :error-message="cnpjErrorMessage"/>
            <button class="btn btn-primary mt-10" type="submit">Próximo</button>
        </form>
    </div>
</template>

<script lang="ts" setup>


const form = ref({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    responsible: '',
    cnpj: '',
});

const emailErrorMessage = ref('');

const passwordErrorMessage = ref('');
const confirmPasswordErrorMessage = ref('');
const cnpjErrorMessage = ref('');

const validatePassword = () => {
    if (form.value.password.length < 8) {
        passwordErrorMessage.value = 'A senha deve ter pelo menos 8 caracteres';
    } else {
        passwordErrorMessage.value = '';
    }
};

const validateConfirmPassword = () => {
    if (form.value.confirmPassword !== form.value.password) {
        confirmPasswordErrorMessage.value = 'As senhas não coincidem';
    } else {
        confirmPasswordErrorMessage.value = '';
    }
};

const validateCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) {
        cnpjErrorMessage.value = 'CNPJ inválido';
        return false;
    }

    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != parseInt(digits.charAt(0))) {
        cnpjErrorMessage.value = 'CNPJ inválido';
        return false;
    }

    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result != parseInt(digits.charAt(1))) {
        cnpjErrorMessage.value = 'CNPJ inválido';
        return false;
        }

        cnpjErrorMessage.value = '';
        return true;
    };

    const validateForm = () => {
        validateEmail(form.value.email);
        validatePassword();
        validateConfirmPassword();
        validateCNPJ(form.value.cnpj);
        return !emailErrorMessage.value && !passwordErrorMessage.value && !confirmPasswordErrorMessage.value && !cnpjErrorMessage.value;
    };


const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if(!re.test(email)) {
        emailErrorMessage.value = "Insira um e-mail válido";
    } else {
        emailErrorMessage.value = '';
    }
};

const submitForm = () => {
    if (validateForm()) {
        useRouter().push('/register/step-two');
    }
};
</script>
