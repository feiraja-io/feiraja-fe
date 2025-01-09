<template>
    <div>

    <div ref="dropdown" class="relative w-full">
      <button type="button" class="w-full h-12 flex justify-between items-center bg-white border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm" @click="toggleDropdown">
        Selecione cidades que você distribui
        <span class="absolute right-0 flex items-center pr-2 pointer-events-none">
            <svg :class="{'transform rotate-180': isOpen, 'transform rotate-0': !isOpen}" class="h-5 w-5 text-gray-400 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707A1 1 0 014.293 8.293l5-5A1 1 0 0110 3z" clip-rule="evenodd" />
        </svg>
        </span>
      </button>
  
      <div v-if="isOpen" class="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10">
        <ul tabindex="-1" role="listbox" class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm custom-scrollbar">
          <li v-for="city in cities" :key="city" class="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
            <div class="flex items-center">
              <input 
                type="checkbox"
                class="checkbox checkbox-primary mr-2"
                :checked="isSelected(city)"
                @change="toggleCity(city)"
              >
              <span class="font-normal ml-3 block truncate">{{ city }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="selectedCities.length" class="mt-2">
      <h3 class="text-sm font-medium text-gray-700">Cidades selecionadas:</h3>
      <ul class="mt-1 space-y-1">
        <li v-for="city in selectedCities" :key="city" class="flex items-center text-sm text-gray-900">
          <span class="block truncate">{{ city }}</span>
          <button @click="removeCity(city)" class="ml-2 text-red-500 hover:text-red-700">
            &times;
          </button>
        </li>
      </ul>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  const cities = ref(['City 1', 'City 2', 'City 3'])
  const selectedCities = ref<string[]>([])
  const isOpen = ref(false)
  const dropdown = ref<HTMLElement | null>(null)
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }
  
  const toggleCity = (city: string) => {
    if (selectedCities.value.includes(city)) {
      selectedCities.value = selectedCities.value.filter(c => c !== city)
    } else {
      selectedCities.value.push(city)
    }
  }
  
  const isSelected = (city: string) => {
    return selectedCities.value.includes(city)
  }
  
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdown.value && !dropdown.value.contains(event.target as Node)) {
      isOpen.value = false
    }
  }
  
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