<template>
    <div>
        <div >
            <div class="flex flex-col">
                <div class= "text-center">
                    <p>Nous sommes le {{ today }} et il est {{ now }}</p>
                </div>
                <div>
                    <button
                        type="submit"
                        @click="sendTime"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Click
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import moment from 'moment';

export default {


    emits: ['buttonClick'],


    name: "DateAndTime",
    component: {},
    props: {},
    data(){
        return {
            today: '--/--',
            now: '--/--',
        }
    },
    methods: {
        updateTime(){
            this.today = moment().format('ddd L');
            this.now = moment().format('LTS');
            setTimeout(this.updateTime, 1000)
        },
        sendTime(){
            this.$emit('buttonClick', this.today, this.now);
        }
    },
    mounted(){
        moment.locale('fr');
        this.updateTime();
    }
}
</script>

<style></style>