import FooterLink from "../common/FooterLink";

export default function Footer() {
  return (
    <footer className="bg-[#1E2A24] py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 lg:grid-cols-5">

        <div>
          <h2 className="font-serif text-3xl font-bold text-[#D4A843]">
            🍳 RecipeCraft
          </h2>

          <p className="mt-5 text-gray-400">
            Discover, Cook and Share your favorite recipes with the world.
          </p>
        </div>

        <FooterLink
          title="Recipes"
          links={["Trending", "Latest", "Healthy", "Desserts"]}
        />

        <FooterLink
          title="Company"
          links={["About", "Blog", "Careers", "Contact"]}
        />

        <FooterLink
          title="Community"
          links={["Chefs", "Forums", "Events", "Support"]}
        />

        <FooterLink
          title="Legal"
          links={["Privacy", "Terms", "Cookies", "Security"]}
        />

      </div>

      <div className="mt-16 border-t border-white/10 pt-8 text-center text-gray-500">
        © 2026 RecipeCraft. All Rights Reserved.
      </div>
    </footer>
  );
}