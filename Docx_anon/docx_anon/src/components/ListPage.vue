<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <ScrollView orientation="horizontal">
        <ListView for="document in documents">
          <v-template>
            <label class='label-text'  textWrap="true" @tap='openDocx(document.path)'>{{document.name}}</label>
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>

export default {
  data() {
    return {
        documents : [{
        id : Math.random(),
        name : 'text.docx',
        path : '/storage/emulated/0/Documents/text.docx' 
      }]
    }
  },
   methods: {
     openDocx(path){
       try {
            let intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
            intent.setDataAndType(android.net.Uri.fromFile(new java.io.File(path)), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            application.android.currentContext.startActivity(android.content.Intent.createChooser(intent, "Open File..."));
        }
        catch (e) {
            console.log(e);
        }
    },
   }
}
</script>