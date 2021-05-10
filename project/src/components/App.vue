<template actionBarHidden="true" >
    <Page>
      <StackLayout>
        <button @tap='pickFile()'> check </button>
      </StackLayout>
    </Page>
</template>

<script >
import * as fs from "file-system"
import { Mediafilepicker } from 'nativescript-mediafilepicker';

  export default {
    data() {
      return {
        file: [],
        options: {
          android: {
              extensions: ['docx'],
              maxNumberFiles: 1
          },
          ios: {
              extensions: ['docx'],
              multipleSelection: false,
          }
        },
        docxFile: {},
        binaryDocx: {}
      }
    },
    methods: {
      pickFile(){ 
        let mediafilepicker = new Mediafilepicker(); 
        mediafilepicker.openFilePicker(this.options);

        mediafilepicker.on("getFiles", function (res) {
          this.file = res.object.get('results');
          console.log(`Path: ${this.file[0].file}`);
          try{
            this.docxFile = fs.File.fromPath(this.file[0].file);
            console.log(`Docx: ${this.docxFile}`)
          }
          catch(err){
            console.log(`Error #1 ${err}`)
          }
          this.binaryDocx = this.docxFile.readSync((err) => {
              console.log(`Error #2 ${err}`);
          });
          console.log(`Binary: ${typeof this.binaryDocx}`)
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
        },

      prepareFile(){
        
        
      }
    }  
  }
</script>

<style scoped>

</style>
