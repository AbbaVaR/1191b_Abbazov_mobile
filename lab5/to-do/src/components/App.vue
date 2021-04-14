<template>
    <Page  actionBarHidden="true">
        <ScrollView>
          <StackLayout>
            <TextField v-model="valueInput" @returnPress= "add()"/>
            <ListView for="(task, index) in tasks" :key="index">
                <Label :text="task.title" />
            </ListView>
          </StackLayout>
        </ScrollView>
    </Page>
</template>

<script >
  export default {
    data() {
      return {
        valueInput: '',
        tasks: [],
        completeTasks: []
      }
    },
    methods:{
        add: function(){    
            if(this.valueInput === '') { return };
            this.tasks.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = '';
        },
        // del: function(index, type){
        //     if (type === 'work' ) this.tasks.splice(index,1);
        //     else this.completeTasks.splice(index,1);
        // },
        // check: function(index){    
        //     this.completeTasks.push(...this.tasks.splice(index, 1));
        // }
    }
  }
</script>

<style scoped>
   
</style>
