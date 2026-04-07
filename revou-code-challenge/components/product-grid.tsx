import type { Brand, Product } from "@/data/catalog";
import { formatRupiah } from "@/lib/catalog";

type ProductGridProps = {
  products: Product[];
  brands: Brand[];
};

export function ProductGrid({ products, brands }: ProductGridProps) {
  const brandMap = new Map(brands.map((brand) => [brand.id, brand.name]));

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Product Collection
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">
            {products.length} Products
          </h2>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-100">
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                <span className="text-sm font-semibold text-slate-600">
                  {brandMap.get(product.brandId)}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  {product.id}
                </span>
                <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
                  Hot Item
                </span>
              </div>

              <h3 className="min-h-[56px] text-lg font-bold leading-snug text-slate-900">
                {product.name}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Clean and simple product card for catalog showcase.
              </p>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Price
                  </p>
                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {formatRupiah(product.price)}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                >
                  View
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}