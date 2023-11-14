import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { toast } from 'vue3-toastify';
import router from '@/router'
import * as yup from 'yup';

import { userSession } from '../vueutils/useAuth'

const formSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    target_amount: yup.number().required().positive().integer(),
    frequent_amount: yup.number().required().positive('Must be a positive nunver').integer('Must bean an integer'),
    frequency_name: yup.mixed().oneOf(['daily', 'weekly', 'monthly']).required(),
    frequency_value: yup.number().required().positive('Must be a positive nunver').integer('Must bean an integer'),
    start_date: yup.date().default(() => new Date()),
    end_date: yup.date().default(() => new Date()),
});

const loading = ref(false)
const allThrifts = ref([])
const activeFilter = ref(true)

/**
 * Retrieve thrifts summary for the signed in user
 */
async function fetchThriftSummary() {
    try {
        const { user } = userSession.value

        loading.value = true;

        const { data: thrifts, error } = await supabase
            .rpc('thrift_savings_summary', { p_userid: user.id, p_active: activeFilter.value })

        if (error) {
            console.log('error', error)
            return toast.error(error.message);
        }
        
        // handle for when no thrifts are returned
        if (thrifts === null) {
            allThrifts.value = []
            return
        }

        // store response to allThrifts
        allThrifts.value = thrifts

    } catch (err) {
        console.error('Error retrieving data from db', err)
        return toast.error(err.message);
    } finally {
        loading.value = false;
    }
}

/**
 * Retrieve all thrifts for the signed in user
 */
async function fetchThrifts() {
    try {
        const { data: thrifts, error } = await supabase.from('thrifts').select('*').order('id')

        if (error) {
            console.log('error', error)
            return toast.error(error.message);
        }
        // handle for when no thrifts are returned
        if (thrifts === null) {
            allThrifts.value = []
            return
        }
        // store response to allThrifts
        allThrifts.value = thrifts

    } catch (err) {
        console.error('Error retrieving data from db', err)
        return toast.error(err.message);
    }
}

/**
 *  Add a new thrift to supabase
 */
async function createNewThrift(thrift) {
    try {

        loading.value = true

        const { data, error } = await supabase.from('thrifts').insert([thrift]).single()

        if (error) {
            console.error('There was an error inserting', error)
            return toast.error(error.message);
        }

        toast.success('Created a new thrift!');

        setTimeout(function () {
            router.push({ name: 'thrifts' })
        }, 3000)
    } catch (error) {
        console.error('Error thrown:', error.message)
        return toast.error(error.error_description || error);
    } finally {
        loading.value = false
    }
}

export {
    loading,
    formSchema,
    createNewThrift,
    activeFilter,
    allThrifts,
    fetchThrifts,
    fetchThriftSummary
}