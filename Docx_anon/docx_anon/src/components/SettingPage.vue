<template>
  <Page actionBarHidden="true">
    <StackLayout>
      <label class='label-text' textWrap="true">Адрес сервера:</label>
      <TextField class="input" v-model="url"  @returnPress= "changeUrl()"/>
    </StackLayout>
  </Page>
</template>

<script>
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
      console.log(this.$store.state.url);

    }
  }
}
</script>