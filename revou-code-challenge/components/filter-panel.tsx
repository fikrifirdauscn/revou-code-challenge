'use client';


import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { Brand, Category, SubCategory } from '@/data/catalog';


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


   if (next.category) params.set('category', next.category);
   else params.delete('category');


   if (next.subcategory) params.set('subcategory', next.subcategory);
   else params.delete('subcategory');


   if (next.brand) params.set('brand', next.brand);
   else params.delete('brand');


   const queryString = params.toString();
   router.push(queryString ? `${pathname}?${queryString}` : pathname);
 }


 function handleCategoryChange(value: string) {
   updateParams({
     category: value || undefined,
     subcategory: undefined,
     brand: undefined,
   });
 }


 function handleSubCategoryChange(value: string) {
   updateParams({
     category: selectedCategory,
     subcategory: value || undefined,
     brand: undefined,
   });
 }


 function handleBrandChange(value: string) {
   updateParams({
     category: selectedCategory,
     subcategory: selectedSubCategory,
     brand: value || undefined,
   });
 }


 function handleReset() {
   router.push(pathname);
 }


 return (
   <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 md:grid-cols-4">
     <div className="space-y-2">
     </div>
   </div>
 );
}
