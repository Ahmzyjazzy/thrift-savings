<script setup>
import { watch, onMounted } from 'vue'
import LvSkeleton from 'lightvue/skeleton';
import HomeLayout from '../layouts/HomeLayout.vue';
import ThriftCard from '../components/ThriftCard.vue';
import TabSwitch from '../components/TabSwitch.vue';
import BalanceActionHeader from '../components/BalanceActionHeader.vue';

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
        <!-- header component -->
        <template #header>
            <BalanceActionHeader />
        </template>    

        <template #default>

            <div class="flex justify-between items-center">
                <div>
                    <h5 class="text-gray-800 font-medium text-xl font-recoleta">My Thrifts</h5>
                    <router-link :to="{ name: 'thrifts' }" class="text-sm text-orange-primary">
                        View All
                    </router-link>
                </div>
                <div class="text-center text-gray-500 font-medium text-xl">
                    <TabSwitch 
                        :activeFilter="activeFilter"
                        @toggle-filter="(value) => activeFilter = value"
                    />
                </div>
            </div>

            <div class="tabs py-10">
                <div class="tabs-content">
                    <div v-if="loading" class="w-full bg-white border border-gray-50 rounded-2xl shadow min-h-[100px] px-5 py-5 mb-5 grid grid-cols-1 place-items-center">
                        <lv-skeleton :width="150" :height="20" primaryColor="#f6c6bc" secondaryColor="#FEF0EE" />
                    </div>
                    <template 
                        v-else
                        v-for="item in allThrifts" :key="item.id">
                        <ThriftCard 
                            :title="item.title" 
                            :description="item.description" 
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
