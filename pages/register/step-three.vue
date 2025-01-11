<template>
    <div class="container mx-auto max-w-sm mt-8">
        <h1 class="font-primary font-medium">Cadastre a sua fornecedora</h1>
        <form class="w-full formkit-form mx-auto flex flex-col gap-4 mt-8" @submit.prevent="submitForm">
            <h2 class="font-primary font-medium text-lg my-2">Imagens</h2>
            <FormsFormFileUpload v-model="form.logo" label="Logomarca" />
            <div>
                <label for="certificacoes">Certificações Orgânicas:</label>
            </div>
            <div>
                <label for="fotoEquipe">Foto da Equipe:</label>
            </div>
            <button class="btn btn-primary" type="submit">Próximo</button>
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