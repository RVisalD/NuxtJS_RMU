<script setup>
const error = useError();

const handleError = () => {
    clearError({
        redirect: "/"
    })
}
</script>

<template>
    <div class="flex h-screen justify-center items-center flex-col">
        <h1 class="text-9xl">
            {{error.statusCode}}
        </h1>
        <p class="mt-7 text-4xl">
            {{error.message}}
        </p>
        <button class="bg-sky-500 rounded mt-4 p-2 text-white" @click="handleError()">
            Go Back
        </button>
    </div>
</template>