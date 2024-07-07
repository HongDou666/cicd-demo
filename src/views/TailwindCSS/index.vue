<template>
  <!-- 持续监听构建：
    npx tailwindcss -i ./src/tailwindcss/style.css -o ./css/style.css --watch
   -->
  <div class="text-4xl text-green-700 text-center font-semibold">Hello Tailwind</div>

  <div class="text-center mt-10">
    <p class="text-xs">前端晚间课</p>
    <p class="text-sm">前端晚间课</p>
    <p class="text-base">前端晚间课</p>
    <p class="text-lg">前端晚间课</p>
    <p class="text-xl">前端晚间课</p>
    <p class="text-2xl">前端晚间课</p>
    <p class="text-3xl">前端晚间课</p>
    <p class="text-4xl">前端晚间课</p>
    <p class="text-5xl">前端晚间课</p>
    <p class="text-6xl">前端晚间课</p>
  </div>

  <div class="text-center mt-10">
    <p class="font-thin">前端晚间课</p>
    <p class="font-extralight">前端晚间课</p>
    <p class="font-light">前端晚间课</p>
    <p class="font-normal">前端晚间课</p>
    <p class="font-medium">前端晚间课</p>
    <p class="font-semibold">前端晚间课</p>
    <p class="font-bold">前端晚间课</p>
    <p class="font-extrabold">前端晚间课</p>
    <p class="font-black">前端晚间课</p>
  </div>

  <div class="text-center mt-10">
    <p class="text-green-100">前端晚间课</p>
    <p class="text-green-200">前端晚间课</p>
    <p class="text-green-300">前端晚间课</p>
    <p class="text-green-400">前端晚间课</p>
    <p class="text-green-500">前端晚间课</p>
    <p class="text-green-600">前端晚间课</p>
    <p class="text-green-700">前端晚间课</p>
    <p class="text-green-800">前端晚间课</p>
    <p class="text-green-900">前端晚间课</p>
  </div>

  <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>

  <div class="text-center mt-10">
    <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>
    <button class="bg-red-700 btn">前端晚间课</button>
  </div>

  <button class="bg-red-700 btn hover:bg-red-500">前端晚间课</button>

  <button class="bg-red-700 btn hover:bg-red-500 focus:outline-none">前端晚间课</button>

  <button class="bg-red-700 btn hover:bg-red-500 focus:outline-none focus:shadow-outline">前端晚间课</button>

  <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-700 duration-2000">前端晚间课</button>

  <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded transform hover:scale-110 hover:bg-red-700 duration-1000">
    前端晚间课
  </button>

  <div class="group m-10 p-10 border hover:bg-gray-100">
    <p class="font-black group-hover:text-red-900">前端晚间课</p>
    <p class="font-black group-hover:text-blue-900">前端晚间课</p>
  </div>

  <button class="bg-cyan btn hover:bg-red-500 focus:outline-none focus:shadow-outline max-w-custom w-76 text-xxs">前端晚间课</button>

  <div class="line-clamp-2">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit a in ad voluptatem Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    Suscipit a in ad voluptatem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit a in ad voluptatem Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Suscipit a in ad voluptatem
  </div>
</template>

<script setup lang="ts" name="TailwindCSS"></script>

<style scoped lang="less"></style>
