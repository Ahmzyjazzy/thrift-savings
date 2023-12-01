<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { handleLogin, loading } from '../vueutils/useAuth'

import AuthLayout from '@/layouts/AuthLayout.vue'

const email = ref('')
const password = ref('')

</script>

<template>
    <AuthLayout>

        <template #default>
            <div>
                <div>
                    <div>
                    <h5 class="text-2xl font-medium mt-3 font-recoleta">Login to Your Account</h5>
                    <div class="flex gap-3 text-gray-500 text-sm">
                        <span>Group Target Savings For Friends, Family and Colleagues</span>
                    </div>
                    </div>
                </div>

                <form action="#" onsubmit="event.preventDefault()" class="flex flex-col my-5">
                    <div class="grid gap-6 mb-6">
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
                    <button 
                        :disabled="loading"
                        @click="handleLogin({ email, password })" 
                        type="submit" 
                        :class="[
                            loading ? 
                            'bg-gradient-to-b from-gray-400 from-20%  via-gray-500 via-90% to-gray-300' : 
                            'bg-gradient-to-b from-orange-primary from-20%  via-orange-default via-90% to-orange-default to-90% focus:ring-4 focus:ring-orange-300']"
                        class="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                    {{ loading ? 'Processing request. Please wait...' : 'Login' }}
                    </button>
                </form>
            </div>

            <div class="text-center">
                <p>Don't have an account? <RouterLink class="text-orange-primary font-medium" to="register">Create an Account</RouterLink></p>
            </div>
        </template>

    </AuthLayout>
</template>