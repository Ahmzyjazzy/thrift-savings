
<script setup>
import Footer from '../components/Footer.vue';

</script>

<template>
    <div class="absolute left-0 right-0 min-h-[300px] bg-gradient-to-b from-orange-primary from-20%  via-orange-default via-90% to-orange-default to-90%"></div>

        <main class="px-5 lg:px-10 pt-10 mx-auto max-w-2xl">

            <!-- header component -->
            <header class="bg-transparent relative">
                <slot name="header"> </slot>
            </header>

            <!-- thrift component -->
            <section class="mx-auto relative">

                <slot></slot>

            </section>

              <slot name="footer">
                  <Footer />
              </slot>
        </main>
</template>