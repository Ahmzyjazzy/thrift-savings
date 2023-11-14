<script setup>
import { Form as VeeForm, Field } from 'vee-validate';
import { ref, computed } from 'vue'
import { formSchema, createNewThrift } from '../vueutils/useThrift'
import { userSession } from '../vueutils/useAuth'

import ImageUpload from '../components/ImageUpload.vue';
import HomeLayout from '../layouts/HomeLayout.vue';

const imageUrl = ref('')
const target_amount = ref('')
const frequent_amount = ref('')
const frequency_name = ref('')

const period = computed(() => {
    switch (frequency_name.value) {
        case 'daily':
            return 'Days'
        case 'weekly':
            return 'Weeks'
        case 'monthly':
            return 'Months'
        default:
            return ''
    }
})

async function onSubmit(values, { resetForm }) {

    const { user } = userSession.value

    const thrift = {
        user_id: user.id,
        ...values,
        frequency_alias: period.value,
        image_url: imageUrl.value,
        image_caption: values.description,
        active: true,
        created_at: new Date(),
    }

    try {
        await createNewThrift(thrift)
    
        resetForm()
    } catch (error) {
        console.error(error)
    }
}

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
                <h5 class="text-white text-3xl lg:text-3xl font-semibold">Create Thrift</h5>
                <!-- FDB5A7 -->
            </div>

            <div class="w-full min-h-[200px] bg-white rounded-2xl shadow-sm my-5">
                <ImageUpload 
                    v-model:path="imageUrl" 
                    size="10" 
                    uploadBucket="thrifts" 
                />
            </div>

        </template> 

         <template #default>

            <VeeForm @submit="onSubmit" :validation-schema="formSchema" v-slot="{ isSubmitting, values }" class="p-5 bg-white rounded-2xl shadow-sm">

                <!-- section 1 -->
                <fieldset class="border border-orange-secondary rounded px-5 pb-5">

                    <legend class="mb-5 font-medium bg-gray-600 text-white px-3 rounded">Describe the Thrift Savings</legend>

                    <Field 
                        name="title" 
                        v-slot="{ field, errorMessage, /*meta*/ }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-5">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="text" 
                                    id="title" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="title" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Thrif Name
                                </label>
                            </div>
                            <p v-if="errorMessage" id="title_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                            <!-- <span v-if="meta.valid && meta.touched">✅ Field is valid</span> -->
                        </div>
                    </Field>

                    <Field 
                        name="description" 
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="">
                            <div class="relative">
                                <textarea
                                    v-bind="field"
                                    type="text" 
                                    id="description" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                ></textarea>
                                <label 
                                    for="description" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Description
                                </label>
                            </div>
                            <p v-if="errorMessage" id="description_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                </fieldset>

                <fieldset class="border border-orange-secondary rounded px-5 pb-5 mt-5">

                    <legend class="mb-5 font-medium bg-gray-600 text-white px-3 rounded">Specify How Members Will Save</legend>

                    <Field 
                        name="target_amount" 
                        v-model="target_amount"
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-3">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="text" 
                                    id="target_amount" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="target_amount" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Total Target Amount Per Member
                                </label>
                            </div>
                            <p v-if="errorMessage" id="amount_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                    <Field 
                        name="frequency_name" 
                        v-model="frequency_name"
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-5">
                            <div class="relative">
                                <label 
                                    for="frequency_name" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="relative text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    How Frequent Will Member Save?
                                </label>
                                <select v-bind="field" 
                                    id="frequency_name" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer">
                                    <option selected>Choose an option</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <p v-if="errorMessage" id="amount_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                    <Field 
                        v-if="frequency_name && target_amount"
                        v-model="frequent_amount"
                        name="frequent_amount" 
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="text" 
                                    id="frequent_amount" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="frequent_amount" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Amount To Save {{ `${values.frequency_name ? `(${values.frequency_name?.toUpperCase()})` : ''}` }}
                                </label>
                            </div>
                            <p v-if="errorMessage" id="amount_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                </fieldset>
                
                <!-- section 2 -->
               <fieldset class="border border-orange-secondary rounded px-5 pb-5 mt-5" v-if="period && target_amount && frequent_amount">

                    <legend class="mb-5 font-medium bg-gray-600 text-white px-3 rounded">Specify Thrift Savings Period</legend>

                    <Field 
                        name="frequency_value" 
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-5">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="text" 
                                    id="frequency_value" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="frequency_value" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    How Many {{ period }} Will This Run?
                                </label>
                            </div>
                            <p v-if="errorMessage" id="amount_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                    <Field 
                        name="start_date" 
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-5">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="date" 
                                    id="start_date" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="start_date" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    Start Date
                                </label>
                            </div>
                            <p v-if="errorMessage" id="startDate_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

                    <Field 
                        name="end_date" 
                        v-slot="{ field, errorMessage }"
                        :validateOnBlur="true" :validateOnChange="false" :validateOnInput="true">
                        <div class="mb-5">
                            <div class="relative">
                                <input 
                                    v-bind="field"
                                    type="date" 
                                    id="end_date" 
                                    :class="[errorMessage ? 'focus:border-red-600 border-gray-300' : 'focus:border-gray-600 border-gray-300']"
                                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer" 
                                    placeholder=" " 
                                />
                                <label 
                                    for="end_date" 
                                    :class="[errorMessage ? 'peer-focus:text-red-600' : 'peer-focus:text-gray-600']"
                                    class="absolute text-sm font-medium text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                    End Date
                                </label>
                            </div>
                            <p v-if="errorMessage" id="endDate_help" class="mt-2 text-xs text-red-600 dark:text-red-400">{{ errorMessage }}</p>
                        </div>
                    </Field>

               </fieldset>

                <div class="flex justify-center mt-5">
                    <button type="reset" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                        Reset
                    </button>
                    <button :disabled="isSubmitting" type="submit" class="text-white bg-gradient-to-b from-orange-primary from-20%  via-orange-default via-90% to-orange-default to-90% focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                        {{ isSubmitting ? 'Submitting...' : 'Create Thrift' }}
                    </button>
                </div>
            </VeeForm>
         </template>

    </HomeLayout>
</template>