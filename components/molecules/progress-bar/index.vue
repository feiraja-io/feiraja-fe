<template>
    <div class="flex relative justify-center">
        <div class="absolute h-[1px] top-[16px] z-[-1] w-full bg-primary max-w-[80%]"></div>
        <div class="flex justify-between w-full">
        <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center w-16">
            <div :class="['w-8 h-8 rounded-full flex items-center justify-center border border-primary', stepClass(index + 1)]">
                <span :class="[index + 1 === currentStep ? 'text-white' : 'text-primary']">{{ index + 1 }}</span>
            </div>
            <div :class="['text-center mt-1', index + 1 === currentStep ? 'text-primary font-semibold text-sm' : 'text-light-black text-sm']">{{ step.name }}</div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
                steps: [
                    { name: 'Conta'},
                    { name: 'Endereço e Entrega'},
                    { name: 'Imagens'},
                    { name: 'Conta Bancária' }
                ]        
        };

    },
    props: {
        currentStep: {
            type: Number,
            required: true,
        },
    },
    methods: {
        stepClass(index) {
            return index === this.currentStep ? 'bg-primary' : 'bg-white';
        },
    },
};
</script>

<style scoped>
</style>