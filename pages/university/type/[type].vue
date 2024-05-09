<script setup>
import UniversityCard from "../../components/universitycard.vue";

const { toTitleCase } = useUtilities();
const route = useRoute();

const {data: filteredUniversities} = await useFetchType(route.params.type);

useHead({
  title: `${toTitleCase(route.params.type)} Universities `,
});
</script>

<template>
  <div class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16">
    <div class="mt-32 flex">
      <Sidebar />
      <div class="w-full">
        <template v-if="filteredUniversities.length">
          <UniversityCard v-for="uni in filteredUniversities" :key="uni.id" :university="uni" />
        </template>
        <template v-else class="mb-64">
          <p class="text-gray-500">No {{ toTitleCase(route.params.type) }} University Found</p>
        </template>
      </div>
    </div>
  </div>
</template>
