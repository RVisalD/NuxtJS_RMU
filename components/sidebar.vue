<script setup>
const modal = ref({
  location: false,
  price: false,
  type: false,
});

const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const priceRange = ref({
  min: "",
  max: "",
}); 

const city = ref("");
const type = ref("");
const route = useRoute();
const { toTitleCase } = useUtilities();

const router = useRouter();

const priceRangeText = computed(()=>{
  const minPrice = route.query.minPrice
  const maxPrice = route.query.maxPrice

  if(!minPrice && !maxPrice){
    return 'Any Price'
  }
  else if(minPrice && !maxPrice){
    return `Above $${minPrice}`
  }
  else if(maxPrice && !minPrice){
    return `Below $${maxPrice}`
  }
  else if(maxPrice && minPrice){
    return `$${minPrice} - $${maxPrice}`
  }
})

const onChangeLocation = () => {
  updateModal("location");
  if (!city.value) return;
  router.push({ path: `/university/city/${city.value}` });
};

const onChangeType = (selectedType) => {
  type.value = selectedType;
  console.log(type.value);
  updateModal("type");
  if (!type.value) return;
  if(type.value === "All") return navigateTo(`/`);
  navigateTo(`/university/type/${type.value}`);
};

const onChangePrice = () =>{
  updateModal("price");
  if(priceRange.value.min && priceRange.value.max){
    if(priceRange.value.min > priceRange.value.max){
      alert("Minimum price cannot be greater than maximum price")
      return
    }
  }
  router.push({
    query: {
      minPrice: priceRange.value.min,
      maxPrice: priceRange.value.max
    }
  })
}
watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);

</script>

<template>
  <div class="h-[195px]">
    <div class="shadow border w-80 mr-10 z-30 h-full sticky">
      <div class="p-5 flex justify-between relative cursor-pointer border-b">
        <h3 class="font-bold">Location</h3>
        <h3 @click="updateModal('location')" class="text-blue-400">
          {{ !route.params.city ? "Give City" : route.params.city }}
        </h3>
        <div
          v-if="modal.location"
          class="absolute border shadow left-56 -mt-16 p-5 top-full bg-white z-50 w-[190px]"
        >
          <div class="mb-2 flex justify-end">
            <button
              @click="updateModal('location')"
              class="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <input type="text" class="border p-1 rounded w-full" v-model="city" />
          <button
            @click="onChangeLocation"
            class="bg-blue-500 w-full mt-2 rounded text-white p-1"
          >
            Apply
          </button>
        </div>
      </div>
      <div class="p-5 flex justify-between relative cursor-pointer border-b">
        <h3 class="font-bold">Type</h3>
        <h3 class="text-blue-400" @click="updateModal('type')">
          {{ route.params.type === 'public' ? 'Public' : (route.params.type === 'private' ? 'Private' : 'All') }}

        </h3>
        <div
          v-if="modal.type"
          class="absolute border shadow left-56 pt-1 pb-3 top-full -mt-16 w-[130px] bg-white rounded-lg z-50 w-full"
        >
          <div class="flex justify-end mb-2">
            <button
              @click="updateModal('type')"
              class="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <h3
            key="All"
            class="text-blue-400 cursor-pointer px-6"
            @click="onChangeType('All')"
          >
            All
          </h3>
          <h3
            key="public"
            class="text-blue-400 cursor-pointer px-6 mt-4"
            @click="onChangeType('public')"
          >
            Public
          </h3>
          <h3
            key="private"
            class="mt-4 text-blue-400 cursor-pointer px-6"
            @click="onChangeType('private')"
          >
            Private
          </h3>
        </div>
      </div>
      <div class="p-5 flex justify-between relative cursor-pointer border-b">
        <h3 class="font-bold w-auto">Price Range</h3>
        <h3 @click="updateModal('price')" class="text-blue-400" >
          {{priceRangeText}}
        </h3>
        <div
          v-if="modal.price"
          class="absolute border shadow left-56 -mt-16 p-5 top-full bg-white z-50 w-[190px]"
        >
          <div class="mb-2 flex justify-end">
            <button
              @click="updateModal('price')"
              class="text-gray-400 hover:text-gray-700 focus:outline-none"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <input type="number" class="border p-1 rounded w-full" placeholder="Minimum" v-model="priceRange.min"/>
          <input type="number" class="border p-1 rounded w-full mt-2" placeholder="Maximum" v-model="priceRange.max">
          <button class="bg-blue-500 w-full mt-2 rounded text-white p-1" @click="onChangePrice()">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
