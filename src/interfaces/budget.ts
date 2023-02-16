export interface Budget {
    id: string
    name: string
    price?: number
    materials?: BudgetMaterial[]
}

export interface BudgetField {
    id: string
    name: string
}

export interface BudgetMaterial {
    id: string
    name: string
    dimension: Dimension
    price: Number
    quantity: Number
}

export interface MaterialMultiDimension {
    id: string
    name: string
    dimensions: Dimension[]
}

export interface BudgetName {
    name: string
}

export interface MaterialDetails {
    metric: string
    quantity: Number
}

export interface Dimension {
    id: string
    metric: string
    quantity: Number
    price: Number
}

export interface DimensionPrice {
    price: Number
}

export interface BudgetMaterialForm {
    budgetId: string
    materialId: string
    metric: string
    quantity: number
}