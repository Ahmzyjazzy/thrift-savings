<template>
     <main class="grid place-items-center h-screen w-screen">

        <div class="">
            
          <div class="grid lg:grid-cols-2 lg:rounded-2xl lg:shadow-xl bg-transparent max-w-4xl lg:min-h-[600px]">

            <div class="bg-orange-primary p-8 flex flex-col justify-center items-center lg:rounded-bl-2xl lg:rounded-tl-2xl">
                <slot name="header">
                    <figure class="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] bg-white rounded-full mb-5 overflow-hidden flex justify-center items-center">
                        <img src="@/assets/images/thrift.jpeg" alt="" class="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] object-contain">
                    </figure>
                    <h4 class="font-medium text-white text-5xl mb-5 flex flex-col items-center">
                        ThriftBox <sub class="text-sm text-center">Installmental Savings Plan To Help Sell Faster and Buy Smarter.</sub>
                    </h4>
                    <!-- <p class="text-white font-medium text-left mt-5">
                        <b>For Business Owners</b>, setup a group target savings thrift for your customers. 
                        Join thousands of serial entrepreneurs selling fast using thriftbox group target savings link.  
                    </p>
                    <p class="text-white font-medium text-left mt-5">
                        <b>For consumer,</b> do you want to spend your money on what matters most to you? 
                        Access affordable products for sale with an installmental thrift target savings to purchase item from trusted vendors and business owners.
                    </p> -->
                </slot>
            </div>

            <div class="bg-white p-8 lg:rounded-br-2xl lg:rounded-tr-2xl flex flex-col justify-between">

              <slot></slot>

            </div>
        
          </div>

          <slot name="footer">
              <div class="flex justify-center items-center my-5">
                <p class="text-gray-600 text-sm">Powered by <a href="" class="text-orange-primary font-medium">ThriftBox</a></p>
              </div>
          </slot>

        </div>
      </main>

</template>