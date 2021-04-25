<template actionBarHidden="true">
    <Page actionBarHidden="true"  class="app">
      <StackLayout>
        <ListPicker class='city' :items="listOfItems" v-model="selectedItem"  @selectedIndexChange="check" />
        <!-- <button text="Обновить" @tap="check"/> -->
        <ScrollView orientation="vertical"> 
           <StackLayout class='forecast' orientation="vertical">
              <Image class='img' src="~/res/skc_d.png" stretch="none" /> 
              <label class='text'> Температура: {{weather.fact.temp}}, ощущается: {{weather.fact.feels_like}}</label>
              <label class='text'> Ветер {{weather.fact.wind_speed}} m/c {{weather.fact.wind_dir}}, {{weather.fact.condition}}</label>
              <label class='text'> Давление {{weather.fact.pressure_mm}} мм рт. ст.</label>
           </StackLayout>
        </ScrollView>
      </StackLayout>
    </Page>
</template>

<script >
import { Http } from '@nativescript/core'
import * as ApplicationSettings from "application-settings";

  export default {
    data() {
      return {
        listOfItems: [
          { title: "Ханты-Мансийск",
            toString: () => {
              return 'Ханты-Мансийск';
            },
            latitude: 61.0041700,
            longitude: 69.0019400
          }, 
          { title: "Омск",
            toString: () => {
              return 'Омск';
            },
            latitude: 54.9924400,
            longitude: 73.3685900
          },
          { title: "Тобольск",
            toString: () => {
              return 'Тобольск';
            },
            latitude: 58.1980700,
            longitude: 68.2545700
          },
          { title: "Усть-Ишим",
            toString: () => {
              return 'Усть-Ишим';
            },
            latitude: 57.6935000,
            longitude: 71.1665000
          },
          { title: "Тевриз",
            toString: () => {
              return 'Тевриз';
            },
            latitude: 57.5090000,
            longitude: 72.4042000
          },
          { title: "Викулово",
            toString: () => {
              return 'Викулово';
            },
            latitude: 56.8166700,
            longitude: 70.6106900
          },
          { title: "Вагай",
            toString: () => {
              return 'Вагай';
            },
            latitude: 57.9356600,
            longitude: 69.0195300
          },
          { title: "Дубровное",
            toString: () => {
              return 'Дубровное';
            },
            latitude: 57.1750000,
            longitude: 66.5816667
          },
          { title: "Кип",
            toString: () => {
              return 'Кип';
            },
            latitude: 57.5458333,
            longitude: 71.8502778
          },
          { title: "Тавинск",
            toString: () => {
              return 'Кип';
            },
            latitude: 57.5872222,
            longitude: 71.7202778
          },
        ],
        selectedItem: 0,
        weather: {
          fact: {
            temp : 0,
            feels_like : 0,
            icon : 'name',
            condition : 'condition',
            wind_speed : 0,
            wind_dir : 'wind_dir',
            pressure_mm	: 0,
            }
        },
        imageUrl: '',
      }
    },
    mounted(){
      if(ApplicationSettings.getString('weather')){
        this.weather.fact=JSON.parse(ApplicationSettings.getString('weather'));
      }
      this.imageUrl = "https://yastatic.net/weather/i/icons/blueye/color/svg/" + this.weather.fact.icon + ".svg"
      console.log(this.imageUrl)
    },
    methods:{
      check(){
        this.imageUrl = "https://yastatic.net/weather/i/icons/blueye/color/svg/" + this.weather.fact.icon + ".svg"
        Http.request({
        url: 'https://api.weather.yandex.ru/v2/forecast?limit=1&lat=' +  String(this.listOfItems[this.selectedItem].latitude) + '&lon=' + String(this.listOfItems[this.selectedItem].longitude),
        method: "GET",
        headers: {"X-Yandex-API-Key": "56c71367-24dd-4af3-8f76-91fa82195e69"},
        }).then(
        (response) => {
        this.weather = response.content.toJSON();
        this.translate()
        this.save();
      });
      },

      save(){
        ApplicationSettings.setString('weather', JSON.stringify(this.weather.fact));        
        console.log(`Сохранено как: ${JSON.stringify(this.weather)}`)
      },
    }
  }
</script>

<style scoped>
.app{
    background-color: #bebebe;
}
.forecast{
  font-size: 20;
  margin: 50px 70px;
  padding: 20px;
  padding-bottom: 90px;
  background-color: #979797;
  border-radius: 40%;
}
.img{
  position: center;
  margin: 50px 30% ;
}
.text{
    margin: 50px auto;
    background-color: #979797;
    border-radius: 10%;
    padding: 40px;
}
.city{
  height: 400px;
  font-size: 20;
  background-color: #cf7200;
}
</style>
