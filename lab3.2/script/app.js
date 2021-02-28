let vue = new Vue ({
    el: '#app',
    data:{
        valueInput: '',
        tasks: [],
        completeTasks: []

    },
    methods:{
        handleInput (event) {
            this.valueInput = event.target.value;
        },
        add: function(){    
            if(this.valueInput === '') { return };
            this.tasks.push({
                title: this.valueInput,
                id: Math.random()
            });
            this.valueInput = '';
        },
        del: function(index, type){
            if (type === 'work' ) this.tasks.splice(index,1);
            else this.completeTasks.splice(index,1);
        },
        check: function(index){    
            this.completeTasks.push(...this.tasks.splice(index, 1));
        }
    }
})
