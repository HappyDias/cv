<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
    	{{this.stupidProp}}
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  props: ["stupidProp"]
};
</script>
