import React from "react";
import { LuCodeXml } from "react-icons/lu";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About me", id: "about" },
    { name: "Education", id: "education" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="flex justify-between items-center px-10 py-4 fixed top-0 left-0 right-0 z-50 bg-black/90">
      <button
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => scrollToSection("home")}
      >
        <LuCodeXml className="text-2xl text-red-500 group-hover:rotate-180 transition-transform duration-500" />
        <h1 className="text-xl font-semibold bg-linear-to-r from-white to-red-500 bg-clip-text text-transparent">
          Kech Kheang
        </h1>
      </button>

      <div>
        <ul className="sm:flex gap-6 hidden">
          {navItems.slice(1).map((item) => (
            <li
              className="nav-item text-gray-200"
              data-text={item.name}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <IconButton
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt2 className="text-2xl text-white" />
          </IconButton>
        </div>
      </div>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="w-64 bg-black h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <LuCodeXml className="text-2xl text-red-500" />
              <span className="font-bold bg-linear-to-r from-white to-red-500 bg-clip-text text-transparent">
                Menu
              </span>
            </div>
            <IconButton
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <IoClose className="text-2xl text-white" />
            </IconButton>
          </div>

          <Divider className="bg-gray-600" />

          {/* Navigation Items */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => scrollToSection(item.id)}>
                  <ListItemText primary={item.name} className="text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
