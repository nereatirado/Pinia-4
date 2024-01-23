import { defineStore , acceptHMRUpdate} from "pinia";
import { groupBy } from "lodash";
import {useAuthUserStore} from "@/stores/AuthUserStore.js"
import {useLocalStorage} from "@vueuse/core"

export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            // items: [],
            items: useLocalStorage("CartStore:items",[]),
        };
    },
    actions:{
        addItems(count,item){
            count=parseInt(count);
            for(let index=0;index<count;index++){
                this.items.push({...item});
            }
        },
        //ERRORES 
        // addItems(count,item){
        //     throw new Error("example error");
        //     count=parseInt(count);
        //     for(let index=0;index<count;index++){
        //         this.items.push({...item});
        //         //this.items.push(item);
        //     }
        // },
        clearItem(name){
            this.items=this.items.filter((item) => item.name != name);
        },
        setItemCount(item,count){
            this.clearItem(item.name);
            this.addItems(count, item);
        },
        checkout(){
            const authUserStore=useAuthUserStore();
            alert(`${authUserStore.username} name just bought ${this.count} items at a total of $${this.total}`)
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
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useCartStore,import.meta.hot));
 }
    

