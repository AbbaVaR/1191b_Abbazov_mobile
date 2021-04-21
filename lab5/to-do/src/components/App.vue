<template>
  <Page  class="app">
    <StackLayout>
      <TextField class="input" v-model="newText" hint="Введите задачу"  @returnPress= "newTask()"/>
      <ScrollView orientation="horizontal">
        <ListView  class="task" for="task in tasks">
          <v-template>
            <WrapLayout>
            <Button  class="task-text done" v-if="task.done" width="90%">{{task.title}}</Button>
            <Button  class="task-text" v-else width="90%" @tap= "edit(task.id, task.title) ">{{task.title}}</Button>
            <Button  class="add-btn" text="\/" width="5%" @tap="taskDone(task.id)" />
            <Button  class="remove-btn" text="X" width="5%" @tap="remove(task.id)" /> 
            </WrapLayout>
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
      tasks: [
      {
        id: 1,
        title: 'asdasdasdsadasd',
        done: false
      },
      {
        id: 2,
        title: 'dsadsdasd',
        done: false
      },
      {
        id: 3,
        title: 'tyjkl;khhhth',
        done: false
      }
      ]
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
    },
    taskDone (id) {
      this.tasks = this.tasks.map(task => {
        if (task.id == id) task.done = !task.done;
        return task;
      })
    },
    remove (id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
    edit(id) {
      prompt({
        title: "Изменение задачи",
        message: "Новая задача:",
        okButtonText: "OK",
        cancelButtonText: "Отмена",
      })
      .then(result => {
         this.tasks.forEach(task => {
          if (task.id == id ){
            task.title = result.text  
          }
          if (task.title  == "" ){
             remove(id);
          }    
         }   
         );    
      })    
    }
  }
}
</script>

<style>
.done {
  text-decoration: line-through
}
</style>