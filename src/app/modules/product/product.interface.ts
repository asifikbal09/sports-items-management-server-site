export type TProduct ={
    name:string
    price:number
    quantity:number
    imgUrl:string
    description:string
    size?:string
    color?:string
    condition?: 'new'| 'used'
    material?:string
    stype?:string //Sports types like football cricket etc...
    brand?:string
}