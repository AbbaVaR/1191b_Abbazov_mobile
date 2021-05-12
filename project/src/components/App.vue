<template actionBarHidden="true" >
    <Page>
      <StackLayout>
        <button @tap='pickFile'> check </button>
        <button @tap='request'> post </button>

      </StackLayout>
    </Page>
</template>

<script >
import * as fs from "file-system"
import { Http, HttpResponse } from "@nativescript/core";
import { Mediafilepicker } from 'nativescript-mediafilepicker';

  export default {
    data() {
      return {
        files: [],
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
        url: 'http://192.168.18.76:8000/file',
        docxFile: new Object(),
        binaryDocx: {},
        binary:[],
      }
    },
    methods: {
      pickFile(){ 
        let mediafilepicker = new Mediafilepicker(); 
        mediafilepicker.openFilePicker(this.options);

        mediafilepicker.on("getFiles", (res) => {
          this.files = res.object.get('results');
          console.log(`Path: ${this.files[0].file}`);
          this.prepareFile();           
        });

        mediafilepicker.on("error", function (res) {
            let msg = res.object.get('msg');
            console.log(msg);
        });
        
      },
      prepareFile(){
          try{
            this.docxFile = fs.File.fromPath(this.files[0].file);
            console.log(`Docx: ${this.docxFile}`)
          }
          catch(err){
            console.log(`Error #1 ${err}`)
          }
          this.binaryDocx = this.docxFile.readSync((err) => {
              console.log(`Error #2 ${err}`);
          });
          console.log(`Binary: ${(this.binaryDocx)}`)            
      },

      request(){
        console.log(`@@@ Get POST request`);
        Http.request({
          url: this.url,
          method: "POST",
          content: JSON.stringify({'file' : this.binaryDocx}),
        }).then(
          (response) => {
            let result = response.content.toJSON();
            console.log(`Http POST Result: ${response.content}`)
          },
          (e) => {console.log(`Error #3: ${e}`)}
        );        
      }
    }  
  }
</script>

<style scoped>

</style>
