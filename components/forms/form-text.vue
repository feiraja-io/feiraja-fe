<template>
    <div class="form-control">
        <div class="label">
            <label class="label-text" :for="id">{{ label }}</label>
        </div>
        <input 
            :id="id" 
            class="input input-bordered w-full" 
            :type="type" 
            :value="modelValue"
            :placeholder="placeholder"
            required 
            @input="updateValue" 
        >
    </div>
</template>

<script setup lang="ts">
interface Props {
    id: string
    label: string
    modelValue: string
    type?: string
    placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    placeholder: ''
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const updateValue = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
}
</script>

<style scoped>
.form-control {
  @apply transition-all duration-200 ease-in-out;
}

.label {
    @apply pt-0;
}

.label-text {
  @apply font-medium text-sm text-gray-700;
}

.input {
  @apply p-3 rounded;
}

.input:focus {
    @apply shadow-md shadow-primary/50;
}

.input:hover:not(:focus) {
  @apply border-gray-400;
}

.input::placeholder {
  @apply text-gray-400;
}

.input:disabled {
  @apply bg-gray-100 cursor-not-allowed;
}

.input.error {
  @apply border-error;
}

.error-message {
  @apply text-xs text-error mt-1;
}
</style>