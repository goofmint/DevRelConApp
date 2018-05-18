<template>
  <v-ons-navigator swipeable
    :page-stack="pageStack"
    @changeTitle="changeTitle"
    @push-page="pushPage"
  ></v-ons-navigator>
</template>
<script>
  import Vue from 'vue';
  export default{
    data() {
      return {
        pageStack: [this.list]
      };
    },
    props: ['list'],
    created(e) {
    },
    methods: {
      pushPage(e) {
        const lastStack = this.pageStack[this.pageStack.length - 2];
        if (lastStack) {
          const data1 = lastStack.data();
          const data2 = e.data();
          if ((data1.speaker && data2.speaker && data1.speaker.objectId === data2.speaker.objectId) ||
            (data1.session && data2.session && data1.session.objectId === data2.session.objectId)
          ) {
            this.pageStack.pop();
            this.$emit('changeTitle', {
              title: '',
              back: data1.speaker ? 'Speaker' : 'Session'
            })
          } else {
            this.pageStack.push(e);
          }
        } else {
          this.pageStack.push(e);
        }
      },
      changeTitle(options) {
        this.$emit('changeTitle', options);
      }
    }
  };
</script>
