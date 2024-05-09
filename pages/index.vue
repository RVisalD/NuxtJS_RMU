<script setup>
import Sidebar from "~/components/sidebar.vue";
import UniCard from "../components/universitycard.vue";

const university = ref("");
const universityError = ref(false);
const { toTitleCase } = useUtilities();

const route = useRoute();

const { data: fetchUniversities, refresh } = await useFetchUniversities({
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
});

useHead({
  title: toTitleCase("rate my university"),
});

const handleSearch = () => {
  if (!university.value) {
    return (universityError.value = true);
  } else {
    navigateTo(`/university/${university.value}-1`);
  }
};

const favorite = useLocalStorage("favorite", {});

const handleFavorite = (id) => {
  if (id in favorite.value) {
    delete favorite.value[id];
  } else {
    favorite.value = {
      ...favorite.value,
      [id]: true,
    };
  }
};
</script>

<template>
  <!-- Home -->
  <div
    class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('https://upload.wikimedia.org/wikipedia/commons/c/cd/University-of-Alabama-EngineeringResearchCenter-01.jpg')]"
  >
    <div class="z-10 absolute w-full h-full flex justify-center items-center">
      <div class="text-center w-1/2 mx-auto">
        <h1 class="text-6xl font-serif text-white mb-10">Find University</h1>
        <!-- Search Bar-->
        <div
          class="font-serif w-[100%] text-2xl bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto rounded-full"
        >
          <input
            type="text"
            class="py-3 px-5 w-full text-2xl rounded-full focus:outline-none"
            :class="universityError ? 'border-red-500 : border' : ''"
            placeholder="Search By Name..."
            v-model="university"
          />
          <button class="bg-yellow-400 px-10 text-white" @click="handleSearch">
            Search
          </button>
        </div>
        <!-- End Search Bar-->
      </div>
    </div>
    <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
  </div>

  <!-- End Home -->

  <!-- University -->

  <div
    class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16"
  >
    <div class="mt-32 flex">
      <!-- University Side Bar -->
      <Sidebar />
      <!-- End University Side Bar -->

      <div class="w-full">
        <ClientOnly>
          <UniCard
            v-for="uni in fetchUniversities"
            :key="uni.id"
            :university="uni"
            @favor="handleFavorite"
            :favored="uni.id in favorite"
          />
        </ClientOnly>
      </div>
    </div>
  </div>

  <!-- End Home -->
</template>
