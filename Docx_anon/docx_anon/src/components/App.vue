<template>
    <Page actionBarHidden="true">
      <StackLayout >
        <button class='btn first-btn' @tap='pickFile'> Выбрать файл </button>
        <button class='btn' :isEnabled='flagPick' @tap='request'> Загрузить файл </button>
        <button class='btn' :isEnabled='flagTake' @tap='request'> Получить файл </button>
        <GridLayout class="actionMenu" columns="*, *">
              <Button class='btn' @tap='goToList' text="Документы" col="0"/>
              <Button class='btn' @tap='goToSetting' text="Настройки" col="1"/> 
        </GridLayout>
      </StackLayout>
    </Page>
</template>

<script >
import { File } from "tns-core-modules/file-system";
import { openFilePicker } from 'nativescript-simple-filepicker';
import { Http, HttpResponse } from '@nativescript/core'
import SettingPage from "./SettingPage"
import ListPage from"./ListPage"

  export default {
  components: { 
    SettingPage,
    ListPage
   },
    data() {
      return {
        files: '',
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
        name : '',
        docxFile: {},
        Docx: {},
        flagPick : false,
        flagTake : false,
      }
    },
    
    methods: {
      pickFile(){ 
        openFilePicker({
        }).then((data) => {
            this.files = data.files[0];
            console.log(`Path: ${this.files}`)
            if (this.files.slice(-4) == 'docx'){
              this.name = this.files.split('/').pop();
              console.log(`File name: ${this.name}`)
              this.flagPick = true;
              this.prepareFile();
            }
            else{
              alert({ 
                title: "Внимание",
                message: "Необходимы файлы с раширением .docx",
                okButtonText: "OK"})
            }
        });
      },
      prepareFile(){
          try{
            this.docxFile = File.fromPath(this.files);
            console.log(`Docx: ${this.docxFile}`)
          }
          catch(err){
            console.log(`Error #1 ${err}`)
          }
          this.Docx = this.docxFile.readSync();
          console.log(`File: ${(this.Docx)}`);
      },

      request(){
        console.log(`Get POST request`)
        Http.request({
          url: this.url,
          method: "POST",
          content: {'file': File.fromPath(this.files).readSync()},
        }).then(
          (response) => {
            console.log(`Http POST Result: ${response.statusCode}`)
            console.log(`Http POST Result: ${response.content}`)
          }, 
          (e) => {console.log(`Error #3: ${e}`)}
        );  
      },
      goToSetting(){
        this.$navigateTo(SettingPage)
      },
      goToList(){
        this.$navigateTo(ListPage)
      },
    }  
  }
</script>
