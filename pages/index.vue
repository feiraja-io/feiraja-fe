<template>
    <div>
        <h1>Welcome to Feiraja</h1>
        <button @click="goToRegister">Go to Register Page</button>
    </div>
</template>

<script>
export default {
    methods: {
        goToRegister() {
            this.$router.push('/register/step-one');
        }
    }
}
</script>

<style scoped>
button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}
</style>