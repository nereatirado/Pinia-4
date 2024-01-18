import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        };
    },
    actions:{
        addItems(count,item){
            count=parseInt(count);
            for(let index=0;index<count;index++){
                this.items.push({...item});
            }
        },
        clearItem(name){
            this.items=this.items.filter((item) => item.name != name);
        },
        setItemCount(item,count){
            this.clearItem(item.name);
            this.addItems(count, item);
        },
    },
    getters:{
        count:(state)=>state.items.length,
        isEmpty:(state)=>state.count===0,
        grouped:state =>groupBy(state.items,item=>item.name),
        groupCount: (state)=>(name)=>state.grouped[name].length,
        //hemos creado un getter que se llama compraTotal para crear el calculo final de nuestra compra des de el .reduce() donde sumaremos todos los precios de enuestros elementos seleccionados 
        compraTotal: (state)=>state.items.reduce((total, valorInicial)=> total+valorInicial?.price,0)
    }
});

