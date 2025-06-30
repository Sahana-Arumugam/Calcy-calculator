class Calculator{
    constructor(prevnum,curnum){
        this.prevnum=prevnum
        this.curnum=curnum
        this.clear()
    }

    clear(){
        this.curop=''
        this.prevop=''
        this.op=undefined
    }

    delete(){
        this.curop=this.curop.toString().slice(0,-1)
    }
    
    appendno(num){
        if(num==='.' && this.curop.includes('.')) return
        this.curop=this.curop.toString()+num.toString()
    }
    chooseop(op){
        if(this.curop==='') return
        if(this.prevop!==''){
            this.compute()
        }
        this.op=op
        this.prevop=this.curop
        this.curop=''
    }
    compute(){
        let comp 
        const prev = parseFloat(this.prevop)
        const cur = parseFloat(this.curop)
        if (isNaN(prev)||isNaN(cur)) return
        switch(this.op){
            case '+':
                comp=prev+cur
                break
            case '-':
                comp=prev-cur
                break
            case '*':
                comp=prev*cur
                break
            case '/':
                comp=prev/cur
                break
            case '+':
            default:
                return;               
        }
        this.curop=comp
        this.op=undefined
        this.prevop=''

    }
    updateno(){
        this.curnum.innerText=this.curop
        if(this.op!=null){
            this.prevnum.innerText=`${this.prevop} ${this.op}`
        }
        else{
            this.prevnum.innerText=''
        }
    }
}







console.log('js connected');

const nums=document.querySelectorAll('[data-num]')
const ops=document.querySelectorAll('[data-op]')
const eq=document.querySelector('[data-eq]')
const dlt=document.querySelector('[data-del]')
const ac=document.querySelector('[data-ac]')
const prevop=document.querySelector('[data-prev-no]')
const curop=document.querySelector('[data-cur-no]')

const cal=new Calculator(prevop,curop)
nums.forEach(button => {
    button.addEventListener('click',() => {
        cal.appendno(button.innerText)
        cal.updateno();
    })
})

ops.forEach(button => {
    button.addEventListener('click',() => {
        cal.chooseop(button.innerText)
        cal.updateno();
    })
})


eq.addEventListener('click',button => {
    cal.compute()
    cal.updateno()
})

ac.addEventListener('click',button => {
    cal.clear()
    cal.updateno()
})

dlt.addEventListener('click',button => {
    cal.delete()
    cal.updateno()
})