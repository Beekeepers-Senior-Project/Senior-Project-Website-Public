import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <NavigationMenu className="py-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
          >
            <Link to="/Senior-Project-Website" className="px-4 text-lg text-foreground font-bold">Beekeepers Senior Project</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
          >
            <Link to="/Senior-Project-Website/team" className={cn(navigationMenuTriggerStyle())}> Team </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
          >
            <Link to="/Senior-Project-Website/time" className={cn(navigationMenuTriggerStyle())}> Time Tracking </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={cn(navigationMenuTriggerStyle())}
            href="https://seniorproject.se.rit.edu"
          >
            Senior Project
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuLink
            asChild
          >
            <Link to="/Senior-Project-Website/agendas" className={cn(navigationMenuTriggerStyle())}> Agendas </Link>
          </NavigationMenuLink>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}