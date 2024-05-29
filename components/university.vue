<script setup>

const props = defineProps({
  university: Object,
  review: Array,
});

const info = useState("adinfo", () => {
  return {
    review: "",
  };
});

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) {
      return true;
    }
  }
  return false;
});

const route = useRoute();
const errorMessage = ref("");

const CreateReview = async () => {
  const body = {
    ...info.value,
    review: info.value.review,
  };
  try {
    const response = await $fetch(`https://visal.newlinkmarketing.com/api/universities/${route.params.id}/reviews`, {
      method: "post",
      body,
    });
    console.log(response)
    // navigateTo("/");
    window.location.reload();
  } catch (error) {
    errorMessage.value = error.statusMessage;
  }
}


</script>

<template>
  <div>
    <div class="mt-10">
      <NuxtImg :src="`${university.photo}`" class="w-full" />
      <!-- University Info -->
      <h1 class="text-4xl font-bold  mt-10">{{ university.name }}</h1>
      <div
        class="text-slate-500 flex text-lg mt-3 border-b pb-5 justify-between"
      >
        <div class="flex">
          <p class="mr-2">{{ university.city }}</p>
          <p class="mr-2">|</p>
          <p class="mr-2">{{ university.type }}</p>
        </div>
        <div>
          <p class="font-bold text-2xl">Max Price: ${{ university.price }}</p>
        </div>
      </div>
      <!-- End University Info -->

      <!-- University Body -->
      <div class="flex justify-between">
        <!-- University Majors -->
        <div>
          <div class="text-2xl mt-5 font-bold">Majors:</div>
          <div class="mr-10 mt-2 pb-5">
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Architecture</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Civil Engineering</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Industry Engineering</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Computer Science</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Management of Information System</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Banking and Finance</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Business Adminstration</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>International Trade and Logistic</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>International Relations</p>
            </div>
            <div class="flex text-lg mt-2">
              <p class="rounded text-lime-800 mr-3">✔</p>
              <p>Economics</p>
            </div>
          </div>
        </div>
        <!-- End University Majors -->

        <!-- University Reviews -->
        <div class="border mt-5 w-[400px] p-4">
          <h1 class="text-3xl font-bold">Review</h1>
          <div class="mt-4 w-100 overflow-y-auto h-[370px]">
            <div v-for="(review, index) in review" :key="index" class="border-t">
              <p class="text-slate-500 mt-3 text-justify mb-3">
                {{ review.review }}
              </p>
            </div>
          </div>
        </div>
        <!-- End University Reviews -->
      </div>
      <!-- End University Body -->

      <!-- University Description -->
      <div class="mt-5 border-t pt-5">
        {{ university.description }}
      </div>
      <!-- End University Description -->

      <!-- University Contact -->
      <div class="mt-4 border-t">
        <div class="flex w-[600px] justify-between mt-5">
          <input
            class="border p-1 w-[500px] rounded shadow-md"
            placeholder="Give Review to This University"
            name="review"
            v-model="info.review"
          />
          <button class="bg-sky-500 w-[70px] rounded text-white shadow-md" :disabled="isButtonDisabled" @click="CreateReview">
            Submit
          </button>
        </div>
      </div>
      <p v-if="errorMessage" class="text-red-500 mt-4">
        {{ errorMessage }}
      </p>
      <!-- End University Contact -->
    </div>
  </div>
</template>
