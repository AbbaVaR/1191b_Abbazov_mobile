<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <label class='label-text center-text' textWrap="true">Адрес сервера:</label>
      <TextField class="input" v-model="url"  @returnPress= "changeUrl()"/>
    </StackLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";

export default {
   data() {
    return {  
        url : this.$store.state.url,
        newUrl : ''
    }
  },
  methods: {
    changeUrl(){
      this.$store.commit('changeUrl', this.url)
      ApplicationSettings.setString('url', this.$store.state.url);
      alert({title: "Изменён",message: "Адрес сервера изменён", okButtonText: "OK"});
      console.log(this.$store.state.url);

    }
  }
}
</script>