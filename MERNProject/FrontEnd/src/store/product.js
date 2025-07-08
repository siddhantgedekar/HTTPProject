import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProducts: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success: false, message: 'Please provide all the fields'}
        }
        const res = await fetch("/api/sapwoodg18/products", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body:JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data] }));
        return {success: true, message: data}
    },
    fetchProducts: async () => {
        const res = await fetch('/api/sapwoodg18/products');
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProducts: async (pid) => {
        const res = await fetch(`/api/sapwoodg18/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) {
            return {success: false, data: data.message};
        }
        set((state) => ({products: state.products.filter((product) => product._id !== pid) }));
        return {success: true, message: data.message};
    },
    updateProducts: async (pid, updatedProduct) => {
        const res = await fetch(`/api/sapwoodg18/products/${pid}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if(!data.success) {
            return {success: false, message: data.message};
        }
        set((state) => ({
            products: state.products.map((product) => product._id === pid ? data.data : product),
        }))
        return {success: true, message: data.message}
    }
}));