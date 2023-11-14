import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { toast } from 'vue3-toastify';
import router from '@/router'

const userSession = ref(null)
const loading = ref(false)

/*
 * Handles user login via email + password into a supabase session.
 * If not password is empty, it will send a magic link to the users email address.
 */
async function handleLogin(credentials) {
    try {

        const { email, password } = credentials;

        if (!email || !password) return toast.error('Please provide both your email and password.');

        loading.value = true

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            return toast.error(error.message);
        }
        // No error throw, but no user detected so send magic link
        if (!error && !data) {
            return toast.error('Check your email for the login link');
        }
        toast.success('Login successful!');

        return router.push({ name: 'dashboard' })
    } catch (error) {
        console.error('Error thrown:', error.message)
        return toast.error(error.error_description || error);
    } finally {
        loading.value = false
    }
}

/*
 * Handles signup provided a valid credentials object.
 */
async function handleSignup(credentials, metadata) {
    try {
        const { email, password } = credentials
        const { firstname, lastname } = metadata

        console.log({ email, password, firstname, lastname })

        // prompt user if they have not filled populated their credentials
        if (!email || !password || !firstname || !lastname) {
            return toast.error('Please provide your name, email and password.');
        }
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstname,
                    lastname
                }
            }
        })
        if (error) {
            console.error(error, error.message)
            return toast.error(error.message);
        }
        return toast.success('Signup successful, confirmation mail should be sent soon!');
    } catch (err) {
        console.error('signup error', err)
        return toast.error(err.message);
    }
}

/**
 * Handles signup via Third Party Login.
 * https://supabase.com/docs/guides/auth#third-party-logins
 */
async function handleOAuthLogin(provider) {
    const { error } = await supabase.auth.signIn({ provider })
    if (error) console.error('Error: ', error.message)
}

/**
 * Handles password reset. Will send an email to the given email address.
 */
async function handlePasswordReset() {
    const email = prompt('Please enter your email:')
    if (!email) {
        window.alert('Email address is required.')
    } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) {
            alert('Error: ' + error.message)
        } else {
            alert('Password recovery email has been sent.')
        }
    }
}

async function handleUpdateUser(credentials) {
    try {
        const { error } = await supabase.auth.update(credentials)
        if (error) {
            alert('Error updating user info: ' + error.message)
        } else {
            alert('Successfully updated user info!')
            window.location.href = '/'
        }
    } catch (error) {
        alert('Error updating user info: ' + error.message)
    }
}

/**
 * Handles logging a user out of a supabase session
 */
async function handleLogout() {
    console.log('logging out')
    try {
        const { error } = await supabase.auth.signOut()

        if (error) {
            alert('Error signing out')
            console.error('Error', error)
            return
        }

        alert('You have signed out!')
    } catch (err) {
        alert('Unknown error signing out')
        console.error('Error', err)
    }
}

export {
    loading,
    userSession,
    handleLogin,
    handleOAuthLogin,
    handleSignup,
    handleLogout,
    handlePasswordReset,
    handleUpdateUser,
}