import { useEffect, useState } from "react";

import DashboardLayout
  from "../components/layout/DashboardLayout";

import CreateCategoryDialog
  from "../components/categories/CreateCategoryDialog";

import {
  getCategories,
} from "../services/category.service";

type Category = {
  id: string;
  name: string;
  type: "INCOME" | "EXPENSE";
};

export default function CategoriesPage() {

  const [categories,
    setCategories] =
    useState<Category[]>([]);

  const loadCategories =
    async () => {

      const response =
        await getCategories();

      setCategories(
        response.data
      );
    };

  useEffect(() => {

    loadCategories();

  }, []);

  const incomeCategories =
    categories.filter(
      c => c.type === "INCOME"
    ).length;

  const expenseCategories =
    categories.filter(
      c => c.type === "EXPENSE"
    ).length;

  return (

    <DashboardLayout>

      <div className="flex justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Categories
          </h1>

          <p className="text-zinc-400 mt-2">
            Organize your finances
          </p>

        </div>

        <CreateCategoryDialog
          onCreated={loadCategories}
        />

      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-8
        "
      >

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Total Categories
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {categories.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Income Categories
          </p>

          <h2 className="text-4xl font-bold mt-3 text-emerald-400">
            {incomeCategories}
          </h2>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-400">
            Expense Categories
          </p>

          <h2 className="text-4xl font-bold mt-3 text-red-400">
            {expenseCategories}
          </h2>
        </div>

      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
      >

        {categories.length === 0 ? (

          <div
            className="
            col-span-full
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-12
            text-center
            "
          >

            <h3
              className="
              text-2xl
              font-semibold
              mb-2
              "
            >
              No Categories Yet
            </h3>

            <p className="text-zinc-400">
              Create your first category
              to organize your finances.
            </p>

          </div>

        ) : (

          categories.map(
            (category) => (

              <div
                key={category.id}
                className="
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                "
              >

                <h3 className="text-xl font-semibold">
                  {category.name}
                </h3>

                <div className="mt-4">

                  <span
                    className={
                      category.type === "INCOME"

                        ? `
                        px-3 py-1 rounded-full
                        bg-emerald-500/10
                        text-emerald-400
                        text-sm
                        `

                        : `
                        px-3 py-1 rounded-full
                        bg-red-500/10
                        text-red-400
                        text-sm
                        `
                    }
                  >
                    {category.type}
                  </span>

                </div>

              </div>
            )
          )

        )}

      </div>

    </DashboardLayout>
  );
}