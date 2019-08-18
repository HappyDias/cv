<template>
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