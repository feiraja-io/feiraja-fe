<template>
    <div>
        <div ref="dropdown" class="relative w-full">
            <button type="button" class="w-full h-12 flex justify-between items-center bg-white border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus-shadow" @click="toggleDropdown">
                Selecione as cidades de entrega
                <span class="absolute right-0 flex items-center pr-2 pointer-events-none">
                    <svg :class="{'transform rotate-180': isOpen, 'transform rotate-0': !isOpen}" class="h-5 w-5 text-gray-400 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>
            <div v-if="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 border-gray-300">
                <div class="rounded-md ring-opacity-5 p-3  focus:outline-none rounded-es-none rounded-ee-none py-1 border border-gray-300 text-base ring-1 ring-black">
                <FormsFormText v-model="searchQuery" placeholder="Pesquisar pela cidade" input-class="input-sm w-full px-3 py-2 border-b border-gray-300 focus:outline-none"/>
                <ul tabindex="-1" role="listbox" class="max-h-40 mt-2 sm:text-sm custom-scrollbar overflow-auto">
                    <li v-for="option in filteredOptions" :key="option" class="text-gray-900 cursor-default select-none relative py-2 pl-0 pr-9">
                        <label class="flex-row form-control items-center">
                            <input 
                                type="checkbox"
                                :id="option.value + '-checkbox'"
                                class="checkbox checkbox-primary checkbox-sm mr-2"
                                :checked="isSelected(option.label)"
                                @click="toggleOption(option.label)"
                            >
                            <span class="font-normal ml-1 block truncate label-text" :for="option + '-checkbox'">{{ option.label }}</span>
                        </label>
                    </li>
                </ul>
            </div>
                <div class="flex gap-4 items-end justify-end p-4">
                    <button class="btn btn-primary btn-sm" :disabled="!selectedOptions.length" type="button" @click="toggleDropdown">Confirmar</button>
                </div> 
            </div>
        </div>
        <div v-if="selectedOptions.length" class="mt-2">
            <h3 class="text-sm font-medium text-gray-700">Opções selecionadas:</h3>
            <ul class="mt-1 space-y-1 flex flex-wrap gap-3 items-center">
                <li v-for="option in selectedOptions" :key="option" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                    <span class="block truncate">{{ option }}</span>
                    <button type="button" @click="removeOption(option)" class="ml-2 text-white hover:text-gray-200">
                        &times;
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
type Option = {
    label: string
    value: string
}

interface Props {
    options: Array<Option>
}

const props = withDefaults(defineProps<Props>(), {
    options: []
})

const selectedOptions = ref<Option[]>([])
const isOpen = ref(false)
const dropdown = ref<HTMLElement | null>(null)
const searchQuery = ref('')

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const toggleOption = (option: string) => {
    if (selectedOptions.value.includes(option)) {
        selectedOptions.value = selectedOptions.value.filter(o => o !== option)
    } else {
        selectedOptions.value.push(option)
    }
}

const isSelected = (option: Option) => {
    return selectedOptions.value.includes(option)
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

const removeOption = (option: Option) => {
    selectedOptions.value = selectedOptions.value.filter(o => o !== option)
}

const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const filteredOptions = computed(() => {
    return props.options.filter(option => normalizeString(option.label).includes(normalizeString(searchQuery.value)))
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>