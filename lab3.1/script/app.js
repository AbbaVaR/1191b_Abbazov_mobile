let vue = new Vue ({
    el: '#calc',
    data:{
        result: '',
        symbols: ['1', '2', '3', '+', '4', '5', '6', '-', '7' ,'8', '9', '/', '0', '.', '*'],
    },
    methods:{
        input: function(char){
            this.result = this.result.toString();
            this.result += char;
        },
        calc: function(){
            try{
                this.result = eval(this.result);
            }
            catch{
                this.result = 'invalid input';
            }
        },
        del: function(){
            this.result = '';
        }
    }
})
