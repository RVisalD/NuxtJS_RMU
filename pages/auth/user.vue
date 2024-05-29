<script setup>

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const props = defineProps({
  university: Object,
});

const loading = ref(false);

const { data: university } = useFetch("https://visal.newlinkmarketing.com/api/universities/filter");
const emits = defineEmits(["changeInput"]);

const isButtonDisabled = computed(() => {
  for (let key in info.value) {
    if (!info.value[key]) {
      return true;
    }
  }
  return false;
});
const info = useState("adInfo", () => {
  return {
    name: "",
    city: "",
    price: "",
    photo: null,
    type: "",
    description: "",
  };
});

const errorMessage = ref("");

const onChangeInput = (data, name) => {
  info.value[name] = data;
};

const CreateUniversity = async () => {
  try {
    loading.value = true;

    // Validate if photo URL exists
    if (!info.value.photo) {
      errorMessage.value = "Photo URL is missing.";
      return;
    }

    // Prepare the request body with form data
    const body = {
      name: info.value.name,
      type: info.value.type,
      description: info.value.description,
      city: info.value.city,
      photo: info.value.photo, // Use the uploaded image URL
      price: parseFloat(info.value.price),
    };

    // Send a POST request to the Laravel endpoint
    const response = await fetch("http://127.0.0.1:8000/api/universities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create university");
    }

    // Reset form state after successful creation
    info.value = {
      name: "",
      city: "",
      price: "",
      photo: null,
      type: "",
      description: "",
    };
    errorMessage.value = "";
    loading.value = false;

    // Optionally, reload the page to reflect new data
    window.location.reload();

  } catch (err) {
    console.error("Creation Error:", err);
    errorMessage.value = err.message || "Failed to create university";
  }
};


const deleteReviewWithUniversity = async (id) => {
  try {
    const response = await $fetch(`http://127.0.0.1:8000/api/universities/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const deleteUniversity = async (id) => {
  deleteReviewWithUniversity(id);
  try {
    const response = await $fetch(`http://127.0.0.1:8000/api/reviews/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <div class="p-6 w-auto mx-auto">
    <div class="w-[400px] mt-36 border p-9 rounded mx-auto">
      <h1 class="text-3xl font-bold mb-4">Profile</h1>
      <div class="flex items-center">
        <!-- Profile Picture Placeholder -->
        <div
          class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mr-4"
        >
          <img
            v-if="user && user.user_metadata && user.user_metadata.picture"
            :src="user.user_metadata.picture"
            alt="User Avatar"
          />
          <span v-else class="text-gray-500 text-2xl">Avatar</span>
        </div>

        <div>
          <p class="text-lg font-semibold">{{ user.user_metadata.name }}</p>
          <p class="text-gray-600">{{ user.email }}</p>
          <p class="text-gray-600">123-456-7890</p>
          <p class="text-gray-600">123 Main St, City</p>
        </div>
      </div>
    </div>
    <div class="login mt-20 mb-28 border h-auto w-[600px] mx-auto shadow-md">
      <div class="p-4">
        <h1 class="text-2xl mx-auto w-max">Register New University</h1>
        <div class="mt-4 justify-between">
          <div class="w-full">
            <label for="name" class="text-slate-500">University Name</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="name"
              placeholder="Enter The University Name"
              v-model="info.name"
              @change-input="onChangeInput"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <div class="w-full">
            <label for="city" class="text-slate-500">City</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="city"
              placeholder="Enter Location of University"
              v-model="info.city"
              @change-input="onChangeInput"
            />
          </div>
          <div class="w-full ml-2">
            <label for="price" class="text-slate-500">University Price</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="price"
              placeholder="Enter The University Price Per Year"
              v-model="info.price"
              @change-input="onChangeInput"
            />
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <div class="w-full">
            <label for="photo" class="text-slate-500">University Photo</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="photo"
              type="text"
              v-model="info.photo"
              placeholder="Enter the Link of University Photo"
            />
          </div>
          <div class="w-full ml-2">
            <label for="type" class="text-slate-500">Type</label>
            <br />
            <select
              name="type"
              class="border shadow-md mt-2 p-2 rounded w-full"
              v-model="info.type"
              @change-input="onChangeInput"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        <!-- <div class="mt-4 justify-between">
          <img
            v-if="info.photo && info.photo.preview"
            :src="info.photo.preview"
            class="mt-2 rounded w-full"
          />
        </div> -->

        <div class="mt-4 justify-between">
          <div class="w-full">
            <label for="description" class="text-slate-500"
              >University Description</label
            >
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="description"
              placeholder="Enter The University Description"
              v-model="info.description"
              @change-input="onChangeInput"
            />
          </div>
        </div>
        <div v-if="loading" class="flex justify-center items-center">
          <div class="loader">Loading...</div>
        </div>
        <div v-else>
          <button
            class="p-2 rounded text-white mx-auto bg-blue-400 mt-4 w-full"
            @click="CreateUniversity"
          >
            Create University
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500 mt-4">
          {{ errorMessage }}
        </p>
      </div>
    </div>
    <div
      class="shadow border w-[800px] mx-auto overflow-hidden mb-5 cursor-pointer flex h-[200px]"
      v-for="university in university"
    >
      <img
        :src="`${university.photo}`"
        class="w-1/3 h-full object-cover"
      />
      <div class="flex flex-col justify-between w-2/3 p-4">
        <div class="flex justify-between">
          <h1 class="text-3xl text-black font-bold mb-2 w-[85%]">
            {{ university.name }}
          </h1>
          <button
            class="text-sm text-white font-bold focus:outline-none border rounded bg-red-500 px-2 py-1 h-[40px]"
            @click="deleteUniversity(university.id)"
          >
            Delete
          </button>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed overflow-y-auto h-28">
          {{ university.description }}
        </p>
      </div>
    </div>
  </div>
</template>
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
