<template>
    <Page actionBarHidden="true">
      <StackLayout >
        <button class='btn first-btn' @tap='pickFile'> Выбрать файл </button>
        <button class='btn' :isEnabled='flagPick' @tap='request'> Загрузить файл </button>
        <button class='btn' :isEnabled='flagTake' @tap='download'> Получить файл </button>
        <GridLayout class="actionMenu" columns="*, *">
              <Button class='btn' @tap='goToList' text="Документы" col="0"/>
              <Button class='btn' @tap='goToSetting' text="Настройки" col="1"/> 
        </GridLayout>
      </StackLayout>
    </Page>
</template>

<script >
import { File } from "tns-core-modules/file-system";
import { Utils } from "@nativescript/core";
import { Http, HttpResponse } from '@nativescript/core'
import * as ApplicationSettings from "application-settings";
import { openFilePicker } from 'nativescript-simple-filepicker';
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
        downloadUrl: '',
        name : '',
        docxFile: {},
        Docx: {},
        flagPick : false,
        flagTake : true,
        responseContent : '',
        documents : [
          {
            id: Math.random(),
            name : 'test',
            path : '/test'
          }
        ]
      }
    },
    mounted(){
      if(ApplicationSettings.getString('documents')){
        this.documents=Object.values(JSON.parse(ApplicationSettings.getString('documents')));
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
          url: this.$url * '/file',
          method: "POST",
          content: {'file': java.nio.file.Files.readAllBytes(this.files).join()},
        }).then(
          (response) => {
            console.log(`Http POST Result: ${response.statusCode}`)
            console.log(`Http POST Result: ${response.content}`)
            this.flagPick = false;
            this.flagTake = true;
          }, 
          (e) => {console.log(`Error #3: ${e}`)}
        );  
      },

      download(){
        this.downloadUrl = this.$url +'/download/' + this.responseContent
        this.flagTake = false;
        this.documents.push({
          id: Math.random(),
          name : this.name,
          path : '/storage/emulated/0/Download/' + this.downloadUrl.split('/').pop() 
        });
        ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.documents)));
        Utils.openUrl(this.downloadUrl);
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
