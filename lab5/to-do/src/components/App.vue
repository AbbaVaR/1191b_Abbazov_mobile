<template>
  <Page  class="app">
    <StackLayout>
      <TextField class="input" v-model="newText" hint="Введите задачу"  @returnPress= "newTask()"/>
      <ScrollView orientation="horizontal">
        <ListView  class="task" for="task in tasks">
          <v-template>
            <GridLayout columns="250%, 70, 70">
            <label  class="task-text done" v-if="task.done" textWrap="true" col="0">{{task.title}}</label>
            <label  class="task-text" v-else  @tap="edit(task.id, task.title)" textWrap="true" col="0">{{task.title}}</label>
            <Button  class="btn check-btn" text="\/" @tap="taskDone(task.id)" col="1"/>
            <Button  class="btn remove-btn" text="X" @tap="remove(task.id)" col="2"/> 
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import * as ApplicationSettings from "application-settings";

export default {
  data () {
    return {
      newText: '',
      tasks: []
    }
  },
  mounted(){
    if(ApplicationSettings.getString('tasks')){
      this.tasks=Object.values(JSON.parse(ApplicationSettings.getString('tasks')));
    }
  },
  methods: {
    newTask () {
      if(this.newText != ''){
        this.tasks.push({
          id: Math.random(),
          title: this.newText,
          done: false
        });
        this.newText = '';
      }
      this.save();
    },

    taskDone (id) {
      this.tasks = this.tasks.map(task => {
        if (task.id == id) task.done = !task.done;
        return task;
      })
      this.save();
    },

    remove (id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.save();
    },

    save(){
      let toSave = Object.assign({}, this.tasks);
      ApplicationSettings.setString('tasks', JSON.stringify(toSave));
    },
    
    edit(id, old_text) {
      prompt({
        title: "Изменение задачи",
        message: "Новая задача:",
        okButtonText: "OK",
        cancelButtonText: "Отмена",
        defaultText: old_text,
      })
      .then(result => {
         this.tasks.forEach(task => {
          if (task.id == id && result.text != ''){
            task.title = result.text;
            this.save();
          }    
         });
      })
    }
  }
}
</script>

<style>
.app{
    background-color: #333333;
}

.task-text{
  margin: 30px 20px;
  background-color: #424242;
  border-radius: 10%;
  color: #000000;
  text-align: center;
}

.done {
  text-decoration: line-through;
  background-color: #5f5f5f;
}

.btn{
  background-color: #e27d01;
  border-radius: 10%;
  color: #ffffff;
  margin: 30px 10px;
}

.btn:active {
  background-color: #696969;
}

.input{
  background-color: #FF8C00;
  border-radius: 10%;
  color: #000000;
  margin: 50px 30px;
  text-align: center;
}

.input:focus{
    background-color: #e27d01;
}
</style>