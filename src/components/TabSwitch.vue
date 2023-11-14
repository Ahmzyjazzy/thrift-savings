<script setup>
defineProps({
    activeFilter: {
        type: Boolean,
        required: true
    },
})
</script>
<template>
    <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
            <a href="#" 
                @click="$emit('toggleFilter', true)"
                :class="[activeFilter ? 'text-orange-typography border-orange-typography active' : 'border-transparent hover:text-orange-typography']" 
                class="inline-block p-4 border-b-2 rounded-t-lg font-medium" aria-current="page">Active</a>
        </li>
        <li class="mr-2">
            <a href="#" 
                @click="$emit('toggleFilter', false)"
                :class="[!activeFilter ? 'text-orange-typography border-orange-typography active' : 'border-transparent hover:text-orange-typography']" 
                class="inline-block p-4 border-b-2 rounded-t-lg font-medium">Closed</a>
        </li>
    </ul>
</template>