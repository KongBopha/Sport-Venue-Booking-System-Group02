<template>
    <section
      class="flex flex-wrap flex-auto w-full min-h-[150px] items-center justify-center gap-x-[200px] gap-y-10 py-10"
    >

    <button class="flex items-center justify-center border border-blue-600 rounded-xl">
        <div class="px-6 py-4 text-[20px] font-bold text-black"  @click="$emit('sport-selected', 'Football Sport')">
            Football Sport
        </div>
    </button>

    <button class="flex items-center justify-center border border-blue-600 rounded-xl">
        <div class="px-6 py-4 text-[20px] font-bold text-black" @click="$emit('sport-selected', 'Valleyball')">
            Valleyball
        </div>
    </button>

    <button class="flex items-center justify-center border border-blue-600 rounded-xl"   @click="$emit('sport-selected', 'Table Tennis')">
        <div class="px-6 py-4 text-[20px] font-bold text-black">
            Table Tennis
        </div>
    </button>
      
    </section>
  </template>
 

