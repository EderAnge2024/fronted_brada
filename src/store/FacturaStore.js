import {create} from 'zustand'  //permite guardar y compartir datos entre componentes
import axios from 'axios'  // permite comunicar tu frontend con el backend

const useFacturaStore = create((set)=>({
    facturas: [],
    addFactura: async(factura)=>{
        try {
            const response = await axios.post('https://bakend-bradatec.onrender.com/factura',factura)
            set((state)=>({facturas: [...state.facturas, response.data]}))
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchFactura: async()=>{
        try {
            const response = await axios.get('https://bakend-bradatec.onrender.com/factura')
            set({facturas: response.data})
            return response.data
        } catch (error) {
            console.log("Error fecthing facturas", error.message)
            return []
        }
    },
    deleteFactura: async(ID_Factura)=>{
        try {
            const response = await axios.delete(`https://bakend-bradatec.onrender.com/factura/${ID_Factura}`)
            console.log("factura delete:",response.data)
            set((state)=>({facturas: state.facturas.filter(factura=>factura.ID_Factura !== ID_Factura)})) 
        } catch (error) {                                                       
            console.log("Error deleting factura:", error.message)
        }
    },

    updateFactura: async (ID_Factura, updatedData) => {
        try { 
            const response = await axios.put(`https://bakend-bradatec.onrender.com/factura/${ID_Factura}`, updatedData)
            console.log("factura updated:", response.data)
            set((state) => ({facturas: state.facturas.map((factura)=> factura.ID_Factura === ID_Factura ? {...factura, ...response.data} : factura)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating factura:", error.message)
        }
    }
    
}))

export default useFacturaStore