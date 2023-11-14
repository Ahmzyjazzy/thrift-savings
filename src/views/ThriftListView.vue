<script setup>
import { watch, onMounted } from 'vue'

import ThriftCard from '../components/ThriftCard.vue';
import HomeLayout from '../layouts/HomeLayout.vue';

import { loading, fetchThriftSummary, allThrifts, activeFilter } from '../vueutils/useThrift'

onMounted(() => {
    fetchThriftSummary()
})

watch(activeFilter, () => {
    fetchThriftSummary()
})
</script>


<template>
    
        <HomeLayout>

            <template #header>
            
                <div class="flex">
                    <router-link :to="{ name: 'dashboard' }">
                        <svg class="w-6 h-6 text-orange-typography" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                    </router-link>
                </div>

                <div class="my-5">
                    <h5 class="text-white text-3xl lg:text-3xl font-semibold">My Thrifts</h5>
                    <!-- FDB5A7 -->
                </div>

            </template> 

             <template #default>

                <div class="flex justify-center items-center">
                    <div class="text-center text-gray-500 font-medium text-xl">
                        <ul class="flex flex-wrap -mb-px">
                            <li class="mr-2">
                                <a href="#" 
                                    @click="activeFilter = true"
                                    :class="[activeFilter ? 'text-orange-typography border-orange-typography active' : 'border-transparent hover:text-orange-typography']" 
                                    class="inline-block p-4 border-b-2 rounded-t-lg" aria-current="page">Active</a>
                            </li>
                            <li class="mr-2">
                                <a href="#" 
                                    @click="activeFilter = false"
                                    :class="[!activeFilter ? 'text-orange-typography border-orange-typography active' : 'border-transparent hover:text-orange-typography']" 
                                    class="inline-block p-4 border-b-2 rounded-t-lg">Closed</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="tabs py-10">
                    <div class="tabs-content">
                        <div v-if="loading" class="w-full bg-white border border-gray-50 rounded-2xl shadow min-h-[100px] px-5 py-5 mb-5 grid place-items-center">
                            Loading, Please wait...
                        </div>
                        <template 
                            v-else
                            v-for="item in allThrifts" :key="item.id">
                            <ThriftCard 
                                :title="item.title" 
                                :description="item.description" 
                                percentageSaved="67" 
                                :totalSaved="item.total_saved" 
                                :totalGoal="item.target_amount"
                            />
                        </template>
                        <div v-if="!loading && allThrifts.length == 0" class="w-full bg-white border border-gray-50 rounded-2xl shadow min-h-[100px] px-5 py-5 mb-5 grid place-items-center">
                            No data found
                        </div>
                    </div>
                </div>

             </template>

        </HomeLayout>
</template>