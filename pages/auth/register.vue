<template>
  <div>
    <div class="login mt-20 mb-52 border h-auto w-[600px] mx-auto shadow-md">
      <div class="p-4">
        <h1 class="text-2xl mx-auto w-max">Register</h1>
        <div class="mt-4 flex justify-between">
          <div class="w-full">
            <label for="firstname" class="text-slate-500">First Name</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="firstname"
              placeholder="Enter Your First Name"
            />
          </div>
          <div class="w-full ml-4">
            <label for="lastname" class="text-slate-500">Last Name</label>
            <br />
            <input
              class="border shadow-md mt-2 p-2 rounded w-full"
              name="lastname"
              placeholder="Enter Your Last Name"
            />
          </div>
        </div>
        <div class="mt-4">
          <label for="email" class="text-slate-500">Email</label>
          <br />
          <input
            class="border shadow-md mt-2 p-2 rounded w-full"
            name="email"
            placeholder="Enter Your Email"
          />
        </div>
        <div class="mt-4">
          <label for="password" class="text-slate-500">Password</label>
          <br />
          <input
            id="password"
            class="border shadow-md mt-2 p-2 rounded w-full"
            name="password"
            placeholder="Enter Your Password"
            :type="showPassword ? 'text' : 'password'"
          />
        </div>
        <div class="flex flex-wrap justify-between items-center mt-4">
          <div
            class="flex w-[140px] justify-between items-center text-slate-400"
          >
            <label for="showPassword">Show Password</label>
            <input type="checkbox" id="showPassword" v-model="showPassword" />
          </div>
          <NuxtLink
            class="text-blue-700 items-center cursor-pointer underline"
            to="/auth/login"
          >
            Already have an account?
          </NuxtLink>
        </div>
        <button class="p-2 rounded text-white mx-auto bg-blue-400 mt-4 w-full">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);
</script>
