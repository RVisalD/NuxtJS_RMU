<script setup>
const user = useSupabaseUser();
const supaBase = useSupabaseClient();

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  
};

const logout = async () => {
  const { error } = supaBase.auth.signOut();

  try {
    await $fetch("/api/_supabase/session", {
      method: "POST",
      body: { event: "SIGNED_OUT", session: null },
    });
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
  user.value = null;
  navigateTo("/");
  
};
</script>

<template>
  <!-- Navbar -->
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md px-10"
  >
    <NuxtLink class="text-3xl font-mono" to="/">
      <NuxtImg class="h-12" src="/rmu.png" />
    </NuxtLink>
    <div
      v-if="user && user.user_metadata && user.user_metadata.name"
      class="relative"
    >
      <div
        @click="toggleDropdown"
        class="text-gray-600 hover:text-blue-400 cursor-pointer"
      >
        {{ user.user_metadata.name }}
      </div>
      <div
        v-if="showDropdown"
        class="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200"
      >
        <NuxtLink
          class="block px-4 py-2 text-gray-800 hover:bg-gray-100"
          :to="'/auth/user'"
          >Profile</NuxtLink
        >
        <button
          @click="logout"
          class="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
    <button
      v-else
      @click="navigateTo('/auth/login')"
      class="rounded w-20 h-8 bg-yellow-400 flex justify-center items-center shadow-md"
    >
      <h3 class="text-center text-white">Login</h3>
    </button>
  </header>
  <!-- End Navbar -->
</template>
