<template>
    <div class="flex justify-between items-start">
        <div>
            <div class="mb-5">
                <h5 class="font-medium text-xl text-orange-typography mb-3">Total Saved:</h5>
                <!-- FDB5A7 -->
                <h1 class="flex flex-row items-center relative text-white">
                    <span class="text-md lg:text-xl mr-3 font-semibold leading-1">₦</span>
                    <span class="text-3xl lg:text-6xl font-semibold">32,500,000.</span>
                    <span class="text-md lg:text-xl font-semibold">90</span>
                </h1>
            </div>
            <div>
                <h5 class="font-medium text-xl text-orange-typography mb-3">Target:</h5>
                <!-- FDB5A7 -->
                <h1 class="flex flex-row items-center relative text-white">
                    <span class="text-md mr-3 font-semibold leading-1">₦</span>
                    <span class="text-3xl font-semibold">132,500.</span>
                    <span class="text-md font-semibold">90</span>
                </h1>
            </div>
        </div>
        <router-link :to="{ 'name': 'create-thrift' }" title="Create Thrif Plan">
            <div 
                class=" border-8 bg-gray-800 border-[#FAA38E] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full grid place-items-center">
                <!-- add profile pix -->
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
            </div>
        </router-link>
    </div>

    <!-- button component -->
    <section class="relative my-10">
        <div class="grid grid-cols-3 rounded-md shadow-sm w-full" role="group">
            <button type="button" class="px-4 py-2 text-sm font-medium text-gray-50 bg-gray-700 border border-gray-800 rounded-l-lg hover:bg-gray-700 hover:text-gray-50">
                Profile
            </button>
            <button type="button" class="px-4 py-2 text-sm font-medium text-gray-50 bg-gray-700 border-t border-b border-gray-800 hover:bg-gray-700 hover:text-gray-50">
                Settings
            </button>
            <button type="button" class="px-4 py-2 text-sm font-medium text-gray-50 bg-gray-700 border border-gray-800 rounded-r-md hover:bg-gray-700 hover:text-gray-50">
                Notifications
            </button>
        </div>
    </section>
</template>