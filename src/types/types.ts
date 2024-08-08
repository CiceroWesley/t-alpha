type user = {
    name: string,
    taxNumber: string,
    mail: string,
    phone: string,
    password: string
}

type product = {
    id?: number,
    name: string,
    description: string,
    price: number,
    stock: number
}


export type {user, product}