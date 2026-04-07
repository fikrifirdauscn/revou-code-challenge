"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Brand, Category, SubCategory } from "@/data/catalog";

type FilterPanelProps = {
  categories: Category[];
  subCategories: SubCategory[];
  brands: Brand[];
  selectedCategory?: string;
  selectedSubCategory?: string;
  selectedBrand?: string;
};

export function FilterPanel({
  categories,
  subCategories,
  brands,
  selectedCategory,
  selectedSubCategory,
  selectedBrand,
}: FilterPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParams(next: {
    category?: string;
    subcategory?: string;
    brand?: string;
  }) {
    const params = new URLSearchParams(searchParams.toString());

    if (next.category) params.set("category", next.category);
    else params.delete("category");

    if (next.subcategory) params.set("subcategory", next.subcategory);
    else params.delete("subcategory");

    if (next.brand) params.set("brand", next.brand);
    else params.delete("brand");

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Filters
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Find your product
          </h2>
        </div>

        <button
          type="button"
          onClick={() => router.push(pathname)}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="category"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Main Category
          </label>
          <select
            id="category"
            name="category"
            value={selectedCategory ?? ""}
            onChange={(e) =>
              updateParams({
                category: e.target.value || undefined,
                subcategory: undefined,
                brand: undefined,
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="subcategory"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Sub Category
          </label>
          <select
            id="subcategory"
            name="subcategory"
            value={selectedSubCategory ?? ""}
            disabled={!selectedCategory}
            onChange={(e) =>
              updateParams({
                category: selectedCategory,
                subcategory: e.target.value || undefined,
                brand: undefined,
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select sub category</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="brand"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={selectedBrand ?? ""}
            disabled={!selectedSubCategory}
            onChange={(e) =>
              updateParams({
                category: selectedCategory,
                subcategory: selectedSubCategory,
                brand: e.target.value || undefined,
              })
            }
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}