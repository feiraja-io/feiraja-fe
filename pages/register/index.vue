<template>
    <div class="container mx-auto max-w-sm mt-8">
        <h1 class="font-primary font-medium">Cadastre a sua fornecedora</h1>
        <form class="w-full formkit-form mx-auto flex flex-col gap-4 mt-8" @submit.prevent="submitForm">
            <h2 class="font-primary font-medium text-lg mb-2">Informações da empresa</h2>
            <FormsFormText id="name" v-model="form.name" label="Nome" placeholder="Insira o nome da fornecedora" required />
            <FormsFormText id="responsible" v-model="form.responsible" label="Responsável" placeholder="Insira o nome do responsável" required />
            <FormsFormText id="cnpj" v-model="form.cnpj" label="CNPJ" placeholder="Insira o CNPJ" required />
            <h2 class="font-primary font-medium text-lg my-2">Endereço</h2>
            <FormsFormText id="address" v-model="form.address" label="Endereço" placeholder="Insira o endereço" required />
            <FormsFormText id="neighborhood" v-model="form.neighborhood" label="Bairro" placeholder="Insira o bairro" required />
            <FormsFormText id="cep" v-model="form.cep" label="CEP" placeholder="Insira o CEP" required />
            <FormsFormText id="city" v-model="form.city" label="Cidade" placeholder="Insira a cidade" required />
            <FormsFormText id="state" v-model="form.state" label="Estado" placeholder="Insira o estado" required />
            <h2 class="font-primary font-medium text-lg">Distribuição de produtos</h2>
            <FormsFormMultiselect v-model="form.cityDelivery" :options="cities" label="Cidades de entrega" />
            <h2 class="font-primary font-medium text-lg my-2">Informações adicionais</h2>
            <div>
                <label for="logomarca">Logomarca:</label>
                <input id="logomarca" type="file" @change="handleFileUpload('logomarca', $event)" >
            </div>
            <div>
                <label for="certificacoes">Certificações Orgânicas:</label>
                <input id="certificacoes" type="file" @change="handleFileUpload('certificacoes', $event)" >
            </div>
            <div>
                <label for="fotoEquipe">Foto da Equipe:</label>
                <input id="fotoEquipe" type="file" @change="handleFileUpload('fotoEquipe', $event)" >
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
        </form>
    </div>
</template>

<script lang="ts" setup>

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

const submitForm = () => {
    console.log('Form submitted:', form.value);
};
</script>