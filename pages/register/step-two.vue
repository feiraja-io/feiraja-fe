<template>
    <div class="container mx-auto max-w-sm my-14">
        <h1 class="font-primary font-semibold">Cadastre a sua fornecedora</h1>
        <section class="mt-8 mb-6">
            <MoleculesProgressBar :currentStep="2" />
        </section>
        <form class="w-full formkit-form mx-auto flex flex-col gap-4 mt-8" @submit.prevent="submitForm">
            <h2 class="font-primary font-semibold text-lg my-2">Endereço</h2>
            <FormsFormText id="cep" v-model="form.cep" label="CEP" placeholder="Insira o CEP" required />
            <FormsFormText id="address" v-model="form.address" label="Endereço" placeholder="Insira o endereço" required />
            <FormsFormText id="neighborhood" v-model="form.neighborhood" label="Bairro" placeholder="Insira o bairro" required />
            <FormsFormText id="city" v-model="form.city" label="Cidade" placeholder="Insira a cidade" required />
            <FormsFormText id="state" v-model="form.state" label="Estado" placeholder="Insira o estado" required />
            <h2 class="font-primary font-semibold text-lg my-2">Distribuição de produtos</h2>
            <FormsFormMultiselect v-model="form.cityDelivery" :options="cities" label="Cidades de entrega" />
            <button class="btn btn-primary mt-10" type="submit">Próximo</button>
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