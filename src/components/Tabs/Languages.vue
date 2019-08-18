<template>
  <div>
    <v-layout ma-4 column>
      <div class="text--primary title">
        Mother Tongue
      </div>
      <div class="text--primary subtitle-1">
        {{content.content.mother}}
      </div>
    </v-layout>
    <v-divider ma-2/>
    <v-layout ma-4 column>
      <div class="text--primary title">
        Other Languages
      </div>
      <div>
        Self-assessment - <a target="_blank" href="https://en.wikipedia.org/wiki/Common_European_Framework_of_Reference_for_Languages">CEF</a> level
      </div>
    </v-layout>
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="(languageObj, language) in content.content.languages"
        v-bind:key="language"
      >
        <v-expansion-panel-header>
          {{language}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  Understanding
                </v-list-item-title>
                <v-list-item-subtitle v-for="(type, typeName) in languageObj.understanding" v-bind:key="typeName">
                  {{typeName + ' - ' + type}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  Speaking
                </v-list-item-title>
                <v-list-item-subtitle v-for="(type, typeName) in languageObj.speaking" v-bind:key="typeName">
                  {{typeName + ' - ' + type}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>
                  Writing
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{languageObj.writing}}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
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