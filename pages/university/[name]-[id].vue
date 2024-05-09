<script setup>

import UniversityDetail from "../../components/university.vue"
const {toTitleCase} = useUtilities();

const route = useRoute();

definePageMeta({
  layout: "custom",
}); 

useHead({
  title: `${toTitleCase(route.params.name)}`
})


const {data: university} = await useFetchUniversity(route.params.id)
const {data: review} = await useFetchReviews(route.params.id)


</script>

<template>
  <div class="flex flex-col min-h-screen" v-if="university">
    <UniversityDetail :university="university" :review="review"/>
  </div>
  <div v-else>
    <h1>Not Found</h1>
  </div>
</template>
