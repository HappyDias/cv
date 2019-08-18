<template>
  <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(skillObj, skill) in content.content.skills"
      v-bind:key="skill"
    >
      <v-expansion-panel-header>
        {{skill}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list>
          <v-list-item v-for="skillItem in skillObj" v-bind:key="skillItem.name" three-line>
            <v-list-item-content>
              <v-list-item-title>
                {{skillItem.name}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{skillItem.description}}
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