export interface MaterialNameDTO {
    name: string
}

export interface MaterialFieldDTO {
    id: string
    name: string
}

export interface MaterialPriceDTO {
    dimensionId: string
    price: number
}

export interface MaterialDimensionDTO {
    materialId: string
    dimensionId: string
    price: number
}