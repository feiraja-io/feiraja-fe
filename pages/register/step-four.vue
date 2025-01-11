<template>
    <div class="container mx-auto max-w-sm mt-8">
        <h1 class="font-primary font-medium">Cadastre a sua fornecedora</h1>
        <form class="w-full formkit-form mx-auto flex flex-col gap-4 mt-8" @submit.prevent="submitForm">
            <h2 class="font-primary font-medium text-lg mb-2">Informações da empresa</h2>
            <FormsFormText id="name" v-model="form.name" label="Nome" placeholder="Insira o nome da fornecedora" required />
            <FormsFormText id="responsible" v-model="form.responsible" label="Responsável" placeholder="Insira o nome do responsável" required />
            <FormsFormText id="cnpj" v-model="form.cnpj" label="CNPJ" placeholder="Insira o CNPJ" required />
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts" setup>

type Option = {
    label: string
    value: string
}


const form = ref({
    nome: '',
    responsavel: '',
    cnpj: '',
    endereco: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    cidadeEntrega: '',
    logomarca: null,
    certificacoes: null,
    fotoEquipe: null,
});

const cities = ref([]);

onMounted(async () => {
    getCities();
});

const getCities = async () => {
    try {
        const response = await $fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/29/municipios');
        cities.value = response.map(city => ({ value: city.id, label: city.nome }));
        console.log(cities.value)
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
}

const submitForm = () => {
    console.log('Form submitted:', form.value);
};
</script>