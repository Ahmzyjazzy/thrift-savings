<script setup>
import { ref, toRefs, watch } from 'vue'
import { toast } from 'vue3-toastify';
import { supabase } from '../lib/supabase'
import { userSession } from '../vueutils/useAuth'

const prop = defineProps(['path', 'size', 'uploadBucket'])
const { path, size, uploadBucket } = toRefs(prop)

const emit = defineEmits(['update:path'])
const uploading = ref(false)
const src = ref('')
const files = ref()

const downloadImage = async () => {
    try {
        const { data, error } = await supabase.storage.from(uploadBucket.value).download(path.value)
        if (error) throw error
        src.value = URL.createObjectURL(data)
    } catch (error) {
        console.error('Error downloading image: ', error.message)
    }
}

const uploadImage = async (evt) => {
    files.value = evt.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error('You must select an image to upload.')
        }

        const { user } = userSession.value

        const file = files.value[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${user.id}/${Math.random()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from(uploadBucket.value).upload(filePath, file)

        if (uploadError) throw uploadError
        emit('update:path', filePath)
        // emit('upload')
    } catch (error) {
        toast.error(error.message);
    } finally {
        uploading.value = false
    }
}

watch(path, () => {
    if (path.value) downloadImage()
})
</script>

<template>
    <div class="p-5">
        <fieldset class="border border-orange-secondary rounded px-5 pb-5 w-full">

            <legend class="mb-5 font-medium bg-gray-600 text-white px-3 rounded">Upload Thrift Picture</legend>

            <div class="flex flex-col items-center justify-center gap-5">
                <img v-if="src" :src="src" alt="Avatar" class="avatar image" :style="{ height: size + 'em', width: size + 'em' }" />
                <div v-else class="avatar no-image border border-orange-secondary" :style="{ height: size + 'em', width: size + 'em' }"></div>

                <div :style="{ width: size + 'em' }" class="relative">
                    <label class="text-white bg-gradient-to-b from-orange-primary from-20%  via-orange-default via-90% to-orange-default to-90% focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2" 
                        for="single">
                        {{ uploading ? 'Uploading ...' : 'Upload File' }}
                    </label>
                    <input class=" absolute left-0 right-0 invisible" type="file" id="single" accept="image/*"
                        @change="uploadImage" :disabled="uploading" />
                </div>
            </div>

        </fieldset>

    </div>
</template>