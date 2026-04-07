import { catalogData } from '@/data/catalog';

export async function getCatalogData() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return catalogData;
}

export function getSubCategoriesByCategory(categoryId?: string) {
  if (!categoryId) return [];
  return catalogData.subCategories.filter((item) => item.categoryId === categoryId);
}

export function getBrandsBySubCategory(subCategoryId?: string) {
  if (!subCategoryId) return [];
  return catalogData.brands.filter((item) => item.subCategoryId === subCategoryId);
}

export function filterProducts(params: {
  category?: string;
  subcategory?: string;
  brand?: string;
}) {
  const { category, subcategory, brand } = params;

  const allowedSubCategories = category
    ? catalogData.subCategories.filter((item) => item.categoryId === category).map((item) => item.id)
    : catalogData.subCategories.map((item) => item.id);

  const allowedBrands = subcategory
    ? catalogData.brands.filter((item) => item.subCategoryId === subcategory).map((item) => item.id)
    : catalogData.brands
        .filter((item) => allowedSubCategories.includes(item.subCategoryId))
        .map((item) => item.id);

  return catalogData.products.filter((product) => {
    if (brand) return product.brandId === brand;
    return allowedBrands.includes(product.brandId);
  });
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}