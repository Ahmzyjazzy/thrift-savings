import { ref, reactive } from 'vue'
import { supabase } from '@/lib/supabase'
import { toast } from 'vue3-toastify'
import router from '@/router'
import * as yup from 'yup'

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
})

const loading = ref(false)
const balanceLoading = ref(false)
const thrifBalance = reactive({
    total_active_saved: 0,
    total_active_target: 0,
})
const allThrifts = ref([])
const activeFilter = ref(true)

function formatAmount(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function calculatePercentage(targetAmount, totalSaved) {
    return ((totalSaved/targetAmount) * 100)
}

async function fetchActiveBalance() {
    try {
        const { user } = userSession.value

        balanceLoading.value = true

        const { data, error } = await supabase
            .rpc('active_thrift_savings_balance', { p_userid: user.id })

        if (error) {
            console.log('error', error)
            return toast.error(error.message)
        }

        // handle for when no thrifts are returned
        if (data === null) {
            return
        }

        // store response to allThrifts
        thrifBalance.total_active_saved = data[0]?.balance.total_active_saved
        thrifBalance.total_active_target = data[0]?.balance.total_active_target

    } catch (err) {
        console.error('Error retrieving data from db', err)
        return toast.error(err.message)
    } finally {
        balanceLoading.value = false
    }
}

/**
 * Retrieve thrifts summary for the signed in user
 */
async function fetchThriftSummary() {
    try {
        const { user } = userSession.value

        loading.value = true

        const { data: thrifts, error } = await supabase
            .rpc('thrift_savings_summary', { p_userid: user.id, p_active: activeFilter.value })

        if (error) {
            console.log('error', error)
            return toast.error(error.message)
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
        return toast.error(err.message)
    } finally {
        loading.value = false
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
            return toast.error(error.message)
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
        return toast.error(err.message)
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
            return toast.error(error.message)
        }

        toast.success('Created a new thrift!')

        setTimeout(function () {
            router.push({ name: 'thrifts' })
        }, 3000)
    } catch (error) {
        console.error('Error thrown:', error.message)
        return toast.error(error.error_description || error)
    } finally {
        loading.value = false
    }
}

export {
    // thrift forms
    loading,
    formSchema,
    createNewThrift,
    // thrift records
    activeFilter,
    allThrifts,
    fetchThrifts,
    fetchThriftSummary,
    // balance
    thrifBalance,
    balanceLoading,
    fetchActiveBalance,
    // helper
    formatAmount,
    calculatePercentage
}