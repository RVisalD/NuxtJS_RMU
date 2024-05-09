<script setup>
const university = ref("");
const universityError = ref(false);

const handleSearch = () => {
    if(!university.value){
        return universityError.value = true;
    }
    else{
        navigateTo(`/university/${university.value}-1`);
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
          <button class="bg-yellow-400 px-10 text-white" @click="handleSearch">Search</button>
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
      <div class="shadow border w-80 mr-10 z-30 h-full sticky">
        <div
          class="p-5 flex justify-between relative cursor-pointer border-b justify-between"
        >
          <h3 class="font-bold">Location</h3>
          <h3 class="text-blue-400">Phnom Penh</h3>
          <!-- <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
                <input  type="text" class="border p-1 rounded"/> 
                <button class="bg-blue-500 w-full mt-2 rounded text-white p-1 ">Apply </button>
            </div> -->
        </div>
        <div
          class="p-5 flex justify-between relative cursor-pointer border-b justify-between"
        >
          <h3 class="font-bold">Type</h3>
          <select class="text-blue-400">
            <option value="">Select Type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
          </select>
        </div>
        <div
          class="p-5 flex justify-between relative cursor-pointer border-b justify-between"
        >
          <h3 class="font-bold w-auto">Price Range</h3>
          <h3 class="text-blue-400">$1000 / Year</h3>
          <!-- <div class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white">
        <input  type="text" class="border p-1 rounded"/> 
        <button class="bg-blue-500 w-full mt-2 rounded text-white p-1 ">Apply </button>
      </div> -->
        </div>
      </div>
      <!-- End University Side Bar -->

      <div class="w-full">
        <!-- University Cards -->

        

        <!-- University Card -->
        <div
          class="shadow border w-full overflow-hidden mb-5 cursor-pointer flex h-[200px]"
        >
          <NuxtImg
            src="https://pppenglish.sgp1.digitaloceanspaces.com/image/main/field/image/camed-business-shcool.jpg"
            class="w-1/3 h-full object-cover"
          />
          <div class="flex flex-col justify-between w-2/3 p-4">
            <div>
              <h1 class="text-3xl text-black font-bold mb-2">
                Paragon International University
              </h1>
              <p class="text-sm text-gray-700 leading-relaxed mb-4">
                Paragon International University (formerly known as Zaman
                University) was established in 2010, as a new member of Zaman
                educational institutions (now under Paragon Education Company).
                Zaman University was rebranded and was officially recognized as
                Paragon International University by a sub-decree of the Royal
                Government of Cambodia on 28 January 2019.
              </p>
            </div>
          </div>
        </div>
        <!-- End University Card -->

        <!-- End University Cards -->
      </div>
    </div>
  </div>

  <!-- End Home -->
</template>
