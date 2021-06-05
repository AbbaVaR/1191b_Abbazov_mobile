<template>
    <Page>
      <GridLayout rows="*,auto">
        <ScrollView>
          <StackLayout rowSpan="2">
            <button class='btn first-btn' @tap='pickFile'> Выбрать файл </button>
            <button class='btn' :isEnabled='flagPick' @tap='request'> Загрузить файл </button>
            <button class='btn' :isEnabled='flagTake' @tap='download'> Получить файл </button>
          </StackLayout>
        </ScrollView>
        <Button class='btn actionMenu' @tap='goToSetting' row="1" text="Настройки"/> 
      </GridLayout>
      
    </Page>
</template>

<script >
import { Utils } from "@nativescript/core";
import * as ApplicationSettings from "application-settings";
import { openFilePicker } from 'nativescript-simple-filepicker';
import SettingPage from "./SettingPage"
import uploadFile from "./http-file-sender";


  export default {
  components: { 
    SettingPage,
   },
    data() {
      return {
        files: '',
        url : this.$store.state.url,
        toLoad : '',
        downloadUrl: '',
        flagPick : false,
        flagTake : false,
      }
    },
    mounted(){
      if(ApplicationSettings.getString('url')){
       this.$store.commit('changeUrl', ApplicationSettings.getString('url'));
      }
    },
    methods: {
      pickFile(){ 
        this.flagTake = false;
        openFilePicker({
          }).then((data) => {
              this.files = data.files[0];
              console.log(`Path: ${this.files}`)
              if (this.files.slice(-4) == 'docx'){
                this.flagPick = true;
              }
              else{
                alert({ 
                  title: "Внимание",
                  message: "Необходимы файлы с раширением .docx",
                  okButtonText: "OK"})
              }
          });
      },

      request(){
        this.flagPick = false,
        uploadFile(
              this.files,
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
        Utils.openUrl(this.downloadUrl);
      },

      goToSetting(){
        this.$navigateTo(SettingPage)
      },
    }  
  }
</script>
