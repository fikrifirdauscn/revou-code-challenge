import type { Brand, Category, SubCategory } from '@/data/catalog';

type BreadcrumbProps = {
  selectedCategory?: Category;
  selectedSubCategory?: SubCategory;
  selectedBrand?: Brand;
};

export function Breadcrumb({
  selectedCategory,
  selectedSubCategory,
  selectedBrand,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className="product-breadcrumb mb-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <li>Home</li>
        <li>/</li>
        <li>Products</li>
        {selectedCategory && (
          <>
            <li>/</li>
            <li>{selectedCategory.name}</li>
          </>
        )}
        {selectedSubCategory && (
          <>
            <li>/</li>
            <li>{selectedSubCategory.name}</li>
          </>
        )}
        {selectedBrand && (
          <>
            <li>/</li>
            <li className="font-semibold text-slate-900">{selectedBrand.name}</li>
          </>
        )}
      </ol>
    </nav>
  );
}