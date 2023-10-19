import type { FetchProductDTO, ProductResponse } from '@/models/products';
import apiService from '@/services/ApiService'

const END_POINTS = {
  PRODUCTS: '/products',
  SEARCH_PRODUCTS: '/products/search',
}


export class ProductRepository {
  static async fetchProducts(params: FetchProductDTO): Promise<ProductResponse> {
    return await apiService.get<ProductResponse>(END_POINTS.PRODUCTS, params);
  }

  static async searchProducts(params: FetchProductDTO): Promise<ProductResponse> {
    return await apiService.get<ProductResponse>(END_POINTS.SEARCH_PRODUCTS, params);
  }
}
 
