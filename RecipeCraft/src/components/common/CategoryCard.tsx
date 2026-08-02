interface Props {
  title: string;
  image: string;
  recipes: number;
}

export default function CategoryCard({
  title,
  image,
  recipes,
}: Props) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-5">

        <h3 className="text-xl font-bold">
          {title}
        </h3>

        <p className="mt-1 text-gray-500">
          {recipes} Recipes
        </p>

      </div>
    </div>
  );
}