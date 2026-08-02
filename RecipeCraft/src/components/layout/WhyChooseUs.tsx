import {
  ChefHat,
  HeartHandshake,
  Search,
} from "lucide-react";
import FeatureCard from "../common/FeatureCard";
import SectionHeader from "../common/SectionHeader";

export default function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          title="Why RecipeCraft?"
          subtitle="Everything you need for your cooking journey."
        />

        <div className="grid gap-8 md:grid-cols-3">

          <FeatureCard
            icon={<Search size={32} />}
            title="Smart Discovery"
            description="Search recipes instantly using ingredients, cuisine, tags and cooking time."
          />

          <FeatureCard
            icon={<ChefHat size={32} />}
            title="Expert Recipes"
            description="Recipes shared by experienced home cooks and professional chefs."
          />

          <FeatureCard
            icon={<HeartHandshake size={32} />}
            title="Community Driven"
            description="Like, save, follow chefs and build your personal cookbook."
          />

        </div>

      </div>
    </section>
  );
}