<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'

</script>


<template>
    <AuthLayout>
        <template #header>
             <figure class="w-[300px] h-[300px] bg-white rounded-full mb-5 overflow-hidden flex justify-center items-center">
                <img src="@/assets/images/SilverCrestAirFryer-3-1.png" alt="" class="w-[300px] h-[300px] object-contain">
              </figure>
              <h4 class="font-medium text-white text-2xl mb-5">Ember Thrift <sub class="text-xs">by Omkits</sub></h4>
              <p class="text-white font-medium text-center">Join us for 1k daily payment plan for the next 35days and own a <i class="font-bold">Silvercrest 6L Airfryer</i> with a free Airfryer liner</p>
        </template>

        <template #default>
            <div>
            <div>
                <div class="w-12 h-12">
                <img src="@/assets/images/omkits_green-300x92.png" alt="" class="w-12 h-12 object-contain object-center">
                </div>
                <div>
                <h5 class="text-2xl font-medium mt-3">2023 Ember Thrift with Omkits</h5>
                <div class="flex gap-3 text-gray-500 text-xs">
                    <span>Join us for 1k daily payment plan for the next 35days and own a Silvercrest 6L Airfryer with a free Airfryer liner</span>
                </div>
                </div>
            </div>

            <div class="my-10">
                <h5 class="font-semibold">Wed, Nov 01 2023 - Thur, Dec 5 2023</h5>
            </div>

            <div class="my-10">
                <h5 class="font-semibold mb-3">Host</h5>
                <div class="flex justify-between items-center">
                <div class="flex flex-row gap-3">
                    <div class="w-10 h-10 bg-[#035FFF] text-white rounded-full flex justify-center items-center font-semibold">
                    <p class="text-xs">OT</p>
                    </div>
                    <div>
                    <h5 class="text-sm mb-1">Olajire Taiwo</h5>
                    <p class="text-xs text-gray-500">CEO, Omkits</p>
                    </div>
                </div>
                <div>
                    <p class="text-xs border rounded-2xl px-2 py-1">Organizer</p>
                </div>
                </div>
            </div>
            </div>

            <div>
            <form action="" class="flex flex-col mb-5">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                        placeholder="youremail@example.com" required>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                        placeholder="*******" required>
                </div>
                </div>
                <button type="button" class="text-white bg-gradient-to-b from-orange-primary from-20% via-orange-default via-90% to-orange-default to-90% focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                Login
                </button>
            </form>

            <p>Need to join? click on the <a href="" class="text-orange-primary font-medium">link</a> to request access</p>
            </div>
        </template>

    </AuthLayout>
</template>