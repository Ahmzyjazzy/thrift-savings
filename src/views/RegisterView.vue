<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { handleSignup } from '../vueutils/useAuth'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

</script>

<template>
    <AuthLayout>

        <template #default>
            <div>

                <div>
                    <h5 class="text-2xl font-medium mt-3">Create an Account</h5>
                    <div class="flex gap-3 text-gray-500 text-xs">
                        <span>Group Target Savings To Sell Faster and Buy Smarter</span>
                    </div>
                </div>

                <form action="#" onsubmit="event.preventDefault()" class="flex flex-col my-5">
                    <div class="grid gap-6 mb-6">
                        <div>
                            <label for="firstname"  class="block mb-2 text-sm font-medium">First Name</label>
                            <input type="text" v-model="firstname" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                                placeholder="John" required>
                        </div>
                        <div>
                            <label for="lastname" class="block mb-2 text-sm font-medium">Last Name</label>
                            <input type="text" v-model="lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                                placeholder="Doe" required>
                        </div>
                        <div>
                                <label for="email" class="block mb-2 text-sm font-medium">Email</label>
                                <input type="email" v-model="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                                    placeholder="youremail@example.com" required>
                            </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" v-model="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" 
                                placeholder="*******" required>
                        </div>
                    </div>
                    <button @click="handleSignup({ email, password }, { firstname, lastname })" 
                        type="submit" 
                        class="text-white bg-gradient-to-b from-orange-primary from-20% via-orange-default via-90% to-orange-default to-90% focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    >
                    Create Account
                    </button>
                </form>
            </div>

            <div class="text-center">
                <p>Already have account? <RouterLink class="text-orange-primary font-medium" to="login">Login</RouterLink></p>
            </div>
        </template>

    </AuthLayout>
</template>