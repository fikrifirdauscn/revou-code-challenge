import { Breadcrumb } from "@/components/breadcrumb";
import { FilterPanel } from "@/components/filter-panel";
import { ProductGrid } from "@/components/product-grid";
import {
  filterProducts,
  getBrandsBySubCategory,
  getCatalogData,
  getSubCategoriesByCategory,
} from "@/lib/catalog";

type HomePageProps = {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
    brand?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const data = await getCatalogData();
  const params = await searchParams;

  const selectedCategoryId = params.category;
  const selectedSubCategoryId = params.subcategory;
  const selectedBrandId = params.brand;

  const selectedCategory = data.categories.find((item) => item.id === selectedCategoryId);

  const availableSubCategories = selectedCategory
    ? getSubCategoriesByCategory(selectedCategory.id)
    : [];

  const selectedSubCategory = availableSubCategories.find(
    (item) => item.id === selectedSubCategoryId
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
      <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">
            Code Challenge
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Dynamic Product Catalog
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Simple ecommerce-style catalog with cascading filters, breadcrumb,
            and URL-based state persistence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          selectedBrand={selectedBrand}
        />

        <FilterPanel
          categories={[...data.categories]}
          subCategories={availableSubCategories}
          brands={availableBrands}
          selectedCategory={selectedCategory?.id}
          selectedSubCategory={selectedSubCategory?.id}
          selectedBrand={selectedBrand?.id}
        />

        <ProductGrid products={products} brands={[...data.brands]} />
      </div>
    </main>
  );
}