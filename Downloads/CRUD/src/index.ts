import { IClassProductList, IProduct } from "./interfaces";

class ProductList implements IClassProductList{
    private productList:IProduct[] = []

    id = 1

    createProduct(data: { name: string; price: number; }): IProduct {
        const newProduct :IProduct = {
            name: data.name,
            price: data.price,
            id: this.id,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        this.productList.push(newProduct)
        this.id ++
        return newProduct
    }

    getProducts(): IProduct[] {
        return this.productList
    }

    getOneProduct(id: number): IProduct | undefined {
        return this.productList.find((product) => product.id === id)
    }

    updateProduct(id: number, data: { name?: string | undefined; price?: number | undefined; }): IProduct {
        const index:number = this.productList.findIndex((product) => {
            return product.id === id
        })
        const updateProduct: IProduct = {
            ...this.productList[index],
            ...data,
            updatedAt: new Date()
        }
        this.productList.splice(index, 1, updateProduct)

        return updateProduct
    }

    deleteProduct(id: number): { message: string; } {
        const index:number = this.productList.findIndex((product) => {
            return product.id === id
        })
        this.productList.splice(index, 1)
        return {message: "Product sucessfully deleted."}
    }
}

export const productList = new ProductList()