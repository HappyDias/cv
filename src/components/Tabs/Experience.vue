<template>
  <Timeline :content="content"/>
</template>

<script>
  import "Timeline" from "./Timeline.vue";
  export default{
    components: {Timeline},
    props: ["content"]
  }
</script>