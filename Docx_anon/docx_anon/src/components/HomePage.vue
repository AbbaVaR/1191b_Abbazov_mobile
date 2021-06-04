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
import uploadFile from "./http-file-sender";
import filePicker from "./file-picker";


  export default {
  components: { 
    SettingPage,
    ListPage
   },
    data() {
      return {
        files: {},
        url : this.$store.state.url,
        downloadUrl: '',
        name : '',
        docxFile: {},
        Docx: {},
        flagPick : false,
        flagTake : false,
        responseContent : '',
      }
    },
    mounted(){
      if(ApplicationSettings.getString('documents')){
        this.loadDocList();
      }
    },
    methods: {
      pickFile(){ 
        filePicker()
          .then((r) => {
            this.files = r.results[0];
            console.log("file object", this.files);
            this.flagPick = true;
          //   uploadFile(
          //     this.files.file,
          //     this.$store.state.url
          //   )
          //     .then((data) => {
          //       const messageData = JSON.parse(data);
          //       const message = messageData.message;
          //       console.log("success", messageData);
          //       this.addMessageToList(message);
          //     })
          //     .catch((e) => {
          //       console.log("component error", e);
          //       if (e.responseCode == 422) {
          //         alert({title: "Ошибка",message: "Ошибка проверки файла!", okButtonText: "OK"});
          //       } else {
          //         alert({title: "Ошибка",message: "При загрузке файла произошла ошибка", okButtonText: "OK"});
          //       }
          //     })
          // })
          // .catch((e) => {
          //   console.log(e.type);
          //   console.log(e.msg);
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
          url: this.url + '/file',
          method: "POST",
          content: File.fromPath(this.files.file).readSync(),
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
        this.addDocList();
        ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.documents)));
        Utils.openUrl(this.downloadUrl);
      },

      addDocList(){
        let newItem = {
          id: Math.random(),
          name : this.name,
          path : '/storage/emulated/0/Download/' + this.downloadUrl.split('/').pop() 
        }
       this.$store.commit('addDoc', newItem);
        ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.$store.state.documents)));
      },
      loadDocList(){
        this.$store.commit('addDoc', Object.values(JSON.parse(ApplicationSettings.getString('documents'))));
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
