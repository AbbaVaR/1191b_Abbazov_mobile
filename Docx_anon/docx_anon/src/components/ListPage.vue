<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <ScrollView orientation="horizontal">
        <ListView for="document in documents">
          <v-template>
            <GridLayout columns="*, 70">
              <label class='label-text' col="0" textWrap="true" @tap="openDocx(document.path)">{{document.name}}</label>
              <Button  class="btn " text="X" @tap="remove(document.id)" col="1"/>
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
        
    }
  },
   methods: {
     openDocx(path){
       try
      {
          let intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
          intent.setDataAndType(android.net.Uri.fromFile(new java.io.File(path)), "application/msword");
          application.android.context.startActivity(android.content.Intent.createChooser(intent, "Open ..."));
      }
      catch (e)
      {
          console.log(e);
      }

    },
     remove (id) {
      this.$documents = this.$documents.filter(task => task.id !== id);
      ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.$documents)));
    },
   }
}
</script>