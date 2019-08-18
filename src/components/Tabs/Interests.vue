<template>
  <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(interestObj, interest) in content.content.interests"
      v-bind:key="interest"
    >
      <v-expansion-panel-header>
        {{interest}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item v-for="interestItem in interestObj" v-bind:key="interestItem.title" three-line>
            <v-list-item-content>
              <v-list-item-title>
                {{interestItem.title}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{interestItem.comment}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
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