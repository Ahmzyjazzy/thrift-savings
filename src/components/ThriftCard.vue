<script setup>
import IconThrift from '../components/icons/IconThrift.vue'

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    percentageSaved: {
        type: String,
        required: false
    },
    totalSaved: {
        type: Number,
        required: false
    },
    totalGoal: {
        type: Number,
        required: false
    }
})
</script>

<template>
    <div class="w-full bg-white border border-gray-50 rounded-2xl shadow min-h-[100px] px-5 py-5 mb-5">
        <div class="flex justify-between items-start">
            <div class="flex flex-row flex-nowrap">
                <span class="w-12 h-12 mr-3 rounded-lg bg-orange-secondary grid place-items-center">
                    <slot>
                        <IconThrift />
                    </slot>
                </span>
                <div class="flex-1">
                    <h3 class="text-xl ">{{ title }}</h3>
                    <p class="text-gray-500 text-base">{{ description }}</p>
                </div>
            </div>
            <h5 class="font-bold text-xl text-orange-primary">{{ percentageSaved }}%</h5>
        </div>
        <div class="outer-progress rounded-lg h-2 w-full bg-orange-secondary mt-5 mb-2">
            <div class="progress-value rounded-lg h-2 w-8/12 bg-orange-primary"></div>
        </div>
        <div class="flex justify-between items-center">
            <h1 class="flex flex-row items-center relative text-gray-500">
                <span class="text-xs mr-1 font-semibold leading-1">₦</span>
                <span class=" text-lg font-semibold font-recoleta">{{ totalSaved }}.</span>
                <span class="text-xs font-semibold">00</span>
            </h1>
            <h1 class="flex flex-row items-center relative text-gray-500">
                <span class="text-xs mr-1 font-semibold leading-1">₦</span>
                <span class=" text-lg font-semibold font-recoleta">{{ totalGoal }}.</span>
                <span class="text-xs font-semibold">00</span>
            </h1>
        </div>
    </div>
</template>

<style scoped>

</style>
