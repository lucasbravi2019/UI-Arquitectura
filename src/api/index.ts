import {
  baseUrl,
  DELETE,
  GET,
  POST,
  PUT,
} from './config';

const callApi = async (endpoint: string, verb: {}) => {
    try {
        const response = await fetch(`${baseUrl}/${endpoint}`, verb)
        switch (response.status) {
            case 500:
                return await response.json()
            case 404:
                return await response.json()
            case 400:
                return await response.json()
            case 201:
                return await response.json()
            case 202:
            case 204:
                return await response.json()
            case 200:
                return await response.json()
            default:
                return await response.json()
        }
    } catch (error) {
        return
    }
}

export const getData = (endpoint: string) => callApi(endpoint, GET())

export const postData = (endpoint: string, body = {}) => callApi(endpoint, POST(body))

export const putData = (endpoint: string, body = {}) => callApi(endpoint, PUT(body))

export const deleteData = (endpoint: string) => callApi(endpoint, DELETE())

export const endpoints = {
    getAllBudgets: 'budgets',
    getBudgetByOid: (oid: string) => `budgets/${oid}`,
    createBudget: 'budgets',
    updateBudget: (oid: string) => `budgets/${oid}`,
    deleteBudget: (oid: string) => `budgets/${oid}`,
    addMaterialToBudget: (budgetId: string, materialId: string): string => `materials/${materialId}/budgets/${budgetId}`,
    getAllMaterials: 'materials',
    createMaterial: 'materials',
    editMaterial: (oid: string) => `materials/${oid}`,
    deleteMaterial: (oid: string) => `materials/${oid}`,
    addDimensionToMaterial: (materialId: string, dimensionId: string) => `dimensions/${dimensionId}/materials/${materialId}`,
    removeDimensionFromMaterials: (dimensionId: string) => `dimensions/${dimensionId}/materials`,
    changeMaterialDimensionPrice: (dimensionId: string) => `materials/${dimensionId}/price`,
    getAllDimensions: 'dimensions',
    createDimension: 'dimensions',
    updateDimension: (oid: string) => `dimensions/${oid}`,
    deleteDimension: (oid: string) => `dimensions/${oid}`
}