
import Hero from "../components/layout/Hero";
import LatestRecipes from "../components/layout/LatestRecipes";
import Newsletter from "../components/layout/Newsletter";
import PopularCategories from "../components/layout/PopularCategories";
import PopularChefs from "../components/layout/PopularChefs";
import TrendingRecipes from "../components/layout/TrendingRecipes";
import WhyChooseUs from "../components/layout/WhyChooseUs";

const HomePage=()=>{
  return(
   <div className="" >
    
    
        <Hero/>
        <PopularCategories/>
        <TrendingRecipes/>
        <LatestRecipes/>
        <WhyChooseUs/>
        <PopularChefs/>
        <Newsletter/>
        

   </div>
  )
}

export default HomePage;