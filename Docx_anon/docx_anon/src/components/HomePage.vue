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
import { Utils } from "@nativescript/core";
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
        toLoad : '',
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
        this.$store.commit('loadDoc', Object.values(JSON.parse(ApplicationSettings.getString('documents'))));
      }
      if(ApplicationSettings.getString('url')){
       this.$store.commit('changeUrl', ApplicationSettings.getString('url'));
      }
    },
    methods: {
      pickFile(){ 
        filePicker()
          .then((r) => {
            this.files = r.results[0];
            console.log("file object", this.files);
            this.flagPick = true;
          })
          .catch((e) => {
            console.log(e.type);
            console.log(e.msg);
          }); 
      },

      request(){
        uploadFile(
              this.files.file,
              `${this.$store.state.url}/file`
            )
              .then((data) => {
                this.toLoad = JSON.parse(data);
                this.flagTake = true;
                alert({title: "Загржен",message: "Файл готов к получению", okButtonText: "OK"});
                console.log("success", this.toLoad );
              })
              .catch((e) => {
                console.log("component error", e);
                if (e.responseCode == 422) {
                  alert({title: "Ошибка",message: "Ошибка проверки файла!", okButtonText: "OK"});
                } else {
                  alert({title: "Ошибка",message: "При загрузке файла произошла ошибка", okButtonText: "OK"});
                }
              })
      },

      download(){
        this.downloadUrl = `${this.$store.state.url}/download/${this.toLoad}`;
        this.flagTake = false;
        this.addDocList();
        ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.documents)));
        Utils.openUrl(this.downloadUrl);
      },

      addDocList(){
        let newItem = {
          id: Math.random(),
          name : this.files.file.split('/').pop(),
          path : '/storage/emulated/0/Download/' + this.downloadUrl.split('/').pop() 
        }
       this.$store.commit('addDoc', newItem);
        ApplicationSettings.setString('documents', JSON.stringify(Object.assign({}, this.$store.state.documents)));
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
