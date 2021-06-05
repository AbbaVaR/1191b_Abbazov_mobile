<template>
  <Page  @loaded='onLoad' actionBarHidden="true">
    <StackLayout>
      <label class='label-text center-text'  style="background-color: #FF8C00;" textWrap="true"> История: </label>
      <ScrollView orientation="horizontal">
        <ListView for="document in $store.state.documents">
          <v-template>
              <StackLayout>
                <label class='label-text' textWrap="true" :text="document.name"></label>
                <label class='label-text' textWrap="true" :text="document.path"></label>
              </StackLayout>
          </v-template>
        </ListView>
      </ScrollView>
      <Button  class="btn" text="Удалить историю" @tap="remove" />
    </StackLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";

export default {
  data() {
    return {  
        documents : this.$store.state.documents,
    }
  },
   methods: {
     onLoad(){
       console.log('Load history')
        this.documents = this.$store.state.documents;
     },
     remove () {
      this.$store.commit('delDoc')
      ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.$store.state.documents)));
      this.documents = this.$store.state.documents;
    },
   }
}
</script>