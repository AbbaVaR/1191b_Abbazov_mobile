<template>
    <Page actionBarHidden="true">
      <StackLayout>
        <button @tap='pickFile'> check </button>
        <button @tap='requestt'> post </button>

      </StackLayout>
    </Page>
</template>

<script >
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
//import { Http, HttpResponse } from "@nativescript/core";
import { Mediafilepicker } from 'nativescript-mediafilepicker';
import Http from '@billow/nsv-http'

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
        url: 'http://192.168.1.125:8000/file',
        docxFile: new Object(),
        Docx: {},
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
            this.docxFile = File.fromPath(this.files[0].file);
            console.log(`Docx: ${this.docxFile}`)
          }
          catch(err){
            console.log(`Error #1 ${err}`)
          }
          this.Docx = this.docxFile.readSync();
          console.log(`File: ${(this.Docx)}`);
      },

      // request(){
      //   console.log(`@@@ Get POST request ${JSON.stringify(this.Docx)}`);
      //   Http.request({
      //     url: this.url,
      //     method: "POST",
      //     content: {'file': File.fromPath(this.files[0].file).readSync()},
      //   }).then(
      //     (response) => {
      //       let result = response.content.toJSON();
      //       console.log(`Http POST Result: ${response.content}`)
      //     },
      //     (e) => {console.log(`Error #3: ${e}`)}
      //   );        
      // },
      requestt(){
        new Http({ baseUrl: 'http://192.168.1.125:8000', headers: {}}).post('/file', {'file': File.fromPath(this.files[0].file).readSync() }, 
        content => {
              console.log(`It's work: ${content}`)
            }, error => {
              console.log(`Request error: ${error}`)
            })
      },

    }  
  }
</script>

<style scoped>

</style>
