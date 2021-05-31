<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <label class='label-text'  style="background-color: #FF8C00" textWrap="true"> История: </label>
      <ScrollView orientation="horizontal">
        <ListView for="document in documents">
          <v-template>
            <GridLayout columns="280%, 100%" rows="*, *">
              <label class='label-text' row="0" col="0" textWrap="true">Файл: {{document.name}}</label>
              <label class='label-text' row="1" col="0" textWrap="true">Путь: {{document.path}}</label>
              <Button  class="btn " text="X" @tap="remove(document.id)" col="1" rowSpan="2"/>
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
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
     remove (id) {
      this.documents = this.documents.filter(document => document.id !== id);
      ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.documents)));
    },
   }
}
</script>