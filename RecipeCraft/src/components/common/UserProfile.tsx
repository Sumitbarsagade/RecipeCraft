import {  User } from "lucide-react";
import { useState } from "react";



const UserProfile = () =>{
    const [isOn, setIsOn] = useState(false);
    return (
        <div><User onClick={()=> setIsOn(!isOn)}
            className="cursor-pointer transition hover:text-[#C8501A] relative"
            size={22}
          />
          
          {isOn && <div className="w-60 h-fit m-2 p-2 top-20 lg:right-80 md:right-5  bg-[#C8501A] rounded-2xl fixed">
            <ul className="flex items-start justify-between flex-col">
               <li> <a href="/dashboard" className="block px-6 py-4 w-full hover:bg-amber-900">Dashboard</a> </li>
               <li> <a href="/profile" className="block px-6 py-4 w-full hover:bg-amber-900">Profile</a> </li>
               <li> <a href="/create-recipe" className="block px-6 py-4 w-full hover:bg-amber-900">Create Recipes</a> </li>
               <li> <a href="/saved-recipes" className="block px-6 py-4w-full hover:bg-amber-900 ">Saved Recipes</a></li>
               <li> <a href="/log-out" className="block px-6 py-4 w-full hover:bg-amber-900 ">Log out</a> </li>
            </ul>
          </div> }
          
          
          
          </div>
    )
}

export default UserProfile;