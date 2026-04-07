import type { Brand, Category, SubCategory } from "@/data/catalog";

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
      className="product-breadcrumb mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
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
            <li className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {selectedBrand.name}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}