<script setup>
import { userSession } from '../vueutils/useAuth'

import ThriftCard from '../components/ThriftCard.vue';

</script>

<template>

    <div class="absolute left-0 right-0 min-h-[300px] bg-gradient-to-b from-orange-primary from-20%  via-orange-default via-90% to-orange-default to-90%"></div>

    <main class="px-5 lg:px-10 pt-10 mx-auto max-w-2xl">

        <!-- header component -->
        <header class="bg-transparent relative">
            <div class="flex justify-between items-start">
                <div>
                    <div class="mb-5">
                        <h5 class="font-medium text-xl text-[#f6c6bc] mb-3">Total Saved:</h5>
                        <!-- FDB5A7 -->
                        <h1 class="flex flex-row items-center relative text-white">
                            <span class="text-md lg:text-xl mr-3 font-semibold leading-1">₦</span>
                            <span class="text-3xl lg:text-6xl font-semibold">32,500,000.</span>
                            <span class="text-md lg:text-xl font-semibold">90</span>
                        </h1>
                    </div>
                    <div>
                        <h5 class="font-medium text-xl text-[#f6c6bc] mb-3">Target:</h5>
                        <!-- FDB5A7 -->
                        <h1 class="flex flex-row items-center relative text-white">
                            <span class="text-md mr-3 font-semibold leading-1">₦</span>
                            <span class="text-3xl font-semibold">132,500.</span>
                            <span class="text-md font-semibold">90</span>
                        </h1>
                    </div>
                </div>
                <div class="border-8 border-[#FAA38E] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full">
                    <!-- add profile pix -->
                </div>
            </div>
        </header>

        <!-- button component -->
        <section class="relative my-10">
            <button type="button" class="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-5 mr-2 mb-2">
                Create Thrift Plan
            </button>
        </section>

        <!-- thrift component -->
        <section class="mx-auto relative">
        
            <div class="flex justify-between items-center">
                <div>
                    <h5 class="text-gray-800 font-medium text-xl">My Thrifts</h5>
                </div>
                <div class="text-center text-gray-500 font-medium text-xl">
                    <ul class="flex flex-wrap -mb-px">
                        <li class="mr-2">
                            <a href="#" class="inline-block p-4 border-transparent rounded-t-lg hover:text-orange-default" aria-current="page">Active</a>
                        </li>
                        <li class="mr-2">
                            <a href="#" class="inline-block p-4 text-orange-default border-b-2 border-orange-default rounded-t-lg active">Closed</a>
                        </li>
                    </ul>
                </div>
            </div>
        
            <div class="tabs py-10">
                <div class="tabs-content tab-active hidden">

                </div>
                <div class="tabs-content tab-closed">

                    <ThriftCard 
                        title="Ember Thrift 2023" 
                        description="Save 1k for the next 35days..." 
                        percentageSaved="67" 
                        totalSaved="75,500" 
                        totalGoal="105,500"
                    />

                    <ThriftCard 
                        title="Tokyo Centre Table" 
                        description="Save 5k per week for the next 4 weeks..." 
                        percentageSaved="50" 
                        totalSaved="300,000" 
                        totalGoal="150,000"
                    />

                </div>
            </div>


        </section>

    </main>

    <!-- <header class="mx-auto max-w-2xl mt-3">
        <nav class="flex justify-between items-center px-5 py-5">
            <figcaption class="flex items-center justify-center space-x-4 text-left">
                <div class="w-12 h-12 rounded-full border grid place-items-center bg-orange-primary">
                    <p class="font-semibold text-white">
                        {{ userSession['user']['user_metadata']['firstname'].charAt(0) }} 
                        {{ userSession['user']['user_metadata']['lastname'].charAt(0) }}
                    </p>
                </div>
                <div>
                    <div class="text-slate-900 font-semibold">
                        {{ userSession['user']['user_metadata']['firstname'] }}
                        {{ userSession['user']['user_metadata']['lastname'] }}
                    </div>
                    <div class="mt-0.5 text-xs lg:text-sm truncate leading-6">{{ userSession['user']['email'] }}</div>
                </div>
            </figcaption>
            <div>
                <a href="">
                    <svg class="w-6 h-6 text-gray-800" aria-hidden="true" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 8C5.80777 8 5.13108 7.79473 4.55551 7.41015C3.97993 7.02556 3.53133 6.47893 3.26642 5.83939C3.00152 5.19985 2.9322 4.49612 3.06725 3.81719C3.2023 3.13825 3.53564 2.51461 4.02513 2.02513C4.51461 1.53564 5.13825 1.2023 5.81719 1.06725C6.49612 0.932205 7.19985 1.00152 7.83939 1.26642C8.47893 1.53133 9.02556 1.97993 9.41015 2.55551C9.79473 3.13108 10 3.80777 10 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.5 17H1V15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.5 11H18.38C18.2672 10.5081 18.0714 10.0391 17.801 9.613L18.601 8.818C18.6947 8.72424 18.7474 8.59708 18.7474 8.4645C18.7474 8.33192 18.6947 8.20476 18.601 8.111L17.894 7.404C17.8002 7.31026 17.6731 7.25761 17.5405 7.25761C17.4079 7.25761 17.2808 7.31026 17.187 7.404L16.392 8.204C15.9647 7.93136 15.4939 7.73384 15 7.62V6.5C15 6.36739 14.9473 6.24021 14.8536 6.14645C14.7598 6.05268 14.6326 6 14.5 6H13.5C13.3674 6 13.2402 6.05268 13.1464 6.14645C13.0527 6.24021 13 6.36739 13 6.5V7.62C12.5081 7.73283 12.0391 7.92863 11.613 8.199L10.818 7.404C10.7242 7.31026 10.5971 7.25761 10.4645 7.25761C10.3319 7.25761 10.2048 7.31026 10.111 7.404L9.404 8.111C9.31026 8.20476 9.25761 8.33192 9.25761 8.4645C9.25761 8.59708 9.31026 8.72424 9.404 8.818L10.204 9.618C9.9324 10.0422 9.73492 10.5096 9.62 11H8.5C8.36739 11 8.24021 11.0527 8.14645 11.1464C8.05268 11.2402 8 11.3674 8 11.5V12.5C8 12.6326 8.05268 12.7598 8.14645 12.8536C8.24021 12.9473 8.36739 13 8.5 13H9.62C9.73283 13.4919 9.92863 13.9609 10.199 14.387L9.404 15.182C9.31026 15.2758 9.25761 15.4029 9.25761 15.5355C9.25761 15.6681 9.31026 15.7952 9.404 15.889L10.111 16.596C10.2048 16.6897 10.3319 16.7424 10.4645 16.7424C10.5971 16.7424 10.7242 16.6897 10.818 16.596L11.618 15.796C12.0422 16.0676 12.5096 16.2651 13 16.38V17.5C13 17.6326 13.0527 17.7598 13.1464 17.8536C13.2402 17.9473 13.3674 18 13.5 18H14.5C14.6326 18 14.7598 17.9473 14.8536 17.8536C14.9473 17.7598 15 17.6326 15 17.5V16.38C15.4919 16.2672 15.9609 16.0714 16.387 15.801L17.182 16.601C17.2758 16.6947 17.4029 16.7474 17.5355 16.7474C17.6681 16.7474 17.7952 16.6947 17.889 16.601L18.596 15.894C18.6897 15.8002 18.7424 15.6731 18.7424 15.5405C18.7424 15.4079 18.6897 15.2808 18.596 15.187L17.796 14.392C18.0686 13.9647 18.2662 13.4939 18.38 13H19.5C19.6326 13 19.7598 12.9473 19.8536 12.8536C19.9473 12.7598 20 12.6326 20 12.5V11.5C20 11.3674 19.9473 11.2402 19.8536 11.1464C19.7598 11.0527 19.6326 11 19.5 11ZM14 14.5C13.5055 14.5 13.0222 14.3534 12.6111 14.0787C12.2 13.804 11.8795 13.4135 11.6903 12.9567C11.5011 12.4999 11.4516 11.9972 11.548 11.5123C11.6445 11.0273 11.8826 10.5819 12.2322 10.2322C12.5819 9.8826 13.0273 9.6445 13.5123 9.54804C13.9972 9.45157 14.4999 9.50108 14.9567 9.6903C15.4135 9.87952 15.804 10.2 16.0787 10.6111C16.3534 11.0222 16.5 11.5055 16.5 12C16.5 12.663 16.2366 13.2989 15.7678 13.7678C15.2989 14.2366 14.663 14.5 14 14.5Z" fill="currentColor"/>
                    </svg>
                </a>
            </div>
        </nav>
    </header>

    <main class="mx-auto max-w-2xl relative">

        <div class="flex flex-col justify-center items-center mt-10">
            <h5>Total Saved</h5>
            <h1 class="text-orange-primary font-semibold text-5xl">₦8,500,000</h1>
        </div>

         <div class="flex flex-col justify-center items-center mt-10">
            <h5>Goal</h5>
            <h1 class="text-gray-500 font-semibold text-5xl">₦350,000,000</h1>
        </div>

        <div class="flex my-10">
            <button type="button" class="w-full flex justify-center items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                <svg class="w-4 h-4 mr-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                Create New Group Savings
            </button>
        </div>

    </main> -->

</template>
