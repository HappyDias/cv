<template>
  <!--<span>Physicist, software developer, hardware tinkerer</span><br>-->
  <!--<span class="text--primary">-->
  <div v-if="content.title === 'Interests'">
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="(interestObj, interest) in content.content"
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
  </div>
  <div v-else-if="content.title === 'Education' || content.title === 'Experience'">
    <v-timeline>
      <v-timeline-item v-for="event in content.content.events" v-bind:key="event.title">
        <span slot="opposite">
          <div>
            {{event.date}}
          </div>
          <div>
            {{event.location}}
          </div>
        </span>
        <v-card class="elevation-2">
          <v-card-title class="headline text-truncate">{{event.title}}</v-card-title>
          <v-card-text>
            <v-list three-line>
              <v-list-item-subtitle>
                {{event.department}}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-for="(extraVal, extra) in event.extra" v-bind:key="extra">
                {{extra + ': ' + extraVal}}
              </v-list-item-subtitle>
            </v-list>
          </v-card-text>
          <v-card-actions v-if="event.ref">
            <v-btn @click="()=>redirect(event.ref.href)">
              {{event.ref.text}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
  <div v-else-if="content.title === 'Languages'">
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
  <div v-else-if="content.title === 'Skills'">
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="(skillObj, skill) in content.skills"
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
  </div>
  <div v-else-if="content.title === 'Publications'">
    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="pub in content.bibliography"
        v-bind:key="pub.title"
      >
        <v-expansion-panel-header>
          <v-layout justify-space-around>
            <v-flex xs8 class="text-truncate">{{pub.title}}</v-flex>
            <v-flex xs1 class="text-secondary">{{pub.year}}</v-flex>
          </v-layout>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item three-line>
              {{ 'Title: ' + pub.title }}
            </v-list-item>
            <v-list-item three-line>
              {{ 'Journal: ' + pub.journal }}
            </v-list-item>
            <v-list-item three-line>
              {{ pub.authType }}
            </v-list-item>
            <v-list-item three-line>
              <v-btn @click="redirect(pub.url)">Link</v-btn>
            </v-list-item>	
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
  <div v-else>
    How the hell did you get here?
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