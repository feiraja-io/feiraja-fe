<script lang="ts" setup>
const props = defineProps({
    option: {
        type: Object as () => { value: string; label: string },
        required: true,
    },
    modelValue: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(['update:modelValue']);

const isSelected = (label: string) => {
    return props.modelValue.includes(label);
};

const toggleOption = (label: string) => {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(label);
    if (index > -1) {
        newValue.splice(index, 1);
    } else {
        newValue.push(label);
    }
    emit('update:modelValue', newValue);
};
</script>

<template>
    <label class="flex-row form-control items-center cursor-pointer">
        <input 
            type="checkbox"
            :id="option.value + '-checkbox'"
            class="checkbox checkbox-primary checkbox-sm mr-2"
            v-bind="$attrs"
        >
        <span class="font-normal ml-1 block truncate label-text" :for="option.value + '-checkbox'">{{ option.label }}</span>
    </label>
</template>