import { Breadcrumb } from '@/components/breadcrumb';
import { FilterPanel } from '@/components/filter-panel';
import { ProductGrid } from '@/components/product-grid';
import {
  filterProducts,
  getBrandsBySubCategory,
  getCatalogData,
  getSubCategoriesByCategory,
} from '@/lib/catalog';

type HomePageProps = {
  searchParams: {
    category?: string;
    subcategory?: string;
    brand?: string;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const data = await getCatalogData();

  const selectedCategoryId = searchParams.category;
  const selectedSubCategoryId = searchParams.subcategory;
  const selectedBrandId = searchParams.brand;

  const selectedCategory = data.categories.find((item) => item.id === selectedCategoryId);

  const availableSubCategories = selectedCategory
    ? getSubCategoriesByCategory(selectedCategory.id)
    : [];

  const selectedSubCategory = availableSubCategories.find(
    (item) => item.id === selectedSubCategoryId,
  );

  const availableBrands = selectedSubCategory
    ? getBrandsBySubCategory(selectedSubCategory.id)
    : [];

  const selectedBrand = availableBrands.find((item) => item.id === selectedBrandId);

  const products = filterProducts({
    category: selectedCategory?.id,
    subcategory: selectedSubCategory?.id,
    brand: selectedBrand?.id,
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Code Challenge
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dynamic Product Catalog
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Cascading dropdown filters with URL-based state persistence, dynamic breadcrumb,
            and responsive product listing.
          </p>
        </header>

        <Breadcrumb
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          selectedBrand={selectedBrand}
        />

        <FilterPanel
          categories={data.categories}
          subCategories={availableSubCategories}
          brands={availableBrands}
          selectedCategory={selectedCategory?.id}
          selectedSubCategory={selectedSubCategory?.id}
          selectedBrand={selectedBrand?.id}
        />

        <ProductGrid products={products} brands={data.brands} />
      </div>
    </main>
  );
}