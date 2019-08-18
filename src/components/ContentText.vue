<template>
  <div>HI</div>
</template>

<script>
import * as Tabs from "./Tabs";

export default{
  methods: {
    redirect: link => {
      if(link){
        window.open(link);
      }
    }
  },
  props: ["content"]
}
</script>