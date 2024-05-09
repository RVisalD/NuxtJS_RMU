 <script setup>
import heart from "../public/heart.png";
import heartOutline from "../public/heart-outline.png";

const props = defineProps({
  university: Object,
  favored: Boolean
});

const emit = defineEmits(['favor'])

</script>

<template>
  <div>
    <div
      class="shadow border w-full overflow-hidden mb-5 cursor-pointer flex h-[200px]"
    >
      <NuxtImg
        :src="`${university.photo}`"
        class="w-1/3 h-full object-cover"
        @click="navigateTo(`/university/${university.name}-${university.id}`)"
      />
      <div class="flex flex-col justify-between w-2/3 p-4">
        <div>
          <div class="flex justify-between">
            <h1
              class="text-3xl text-black font-bold mb-2 w-[85%]"
              @click="
                navigateTo(`/university/${university.name}-${university.id}`)
              "
            >
              {{ university.name }}
            </h1>
            <img
              :src="favored ? heart : heartOutline"
              class="w-7 h-7 mr-4"
              @click="emit('favor', university.id)"
            />
          </div>
          <p
            class="text-sm text-gray-700 leading-relaxed overflow-y-auto h-28"
            @click="
              navigateTo(`/university/${university.name}-${university.id}`)
            "
          >
            {{ university.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
