import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/ModeToggle";
import { NavigationMenuDemo } from "@/components/NavigationMenuDemo";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Linkora by sachanakshat",
    description: "Connecting dots better",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="flex items-center justify-between p-4 border-b">
                        <a className="hidden sm:block sm:text-3xl sm:font-semibold sm:tracking-tight">
                            LINKORA
                        </a>
                        {/* <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Item One
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>
                                        Link
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            
                        </NavigationMenuList>
                    </NavigationMenu> */}

                        <NavigationMenuDemo />
                        <div className="flex items-center justify-between p-4">
                            <Input
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Search for a person"
                            />
                            <Icons.gitHub className="h-8 w-8 mx-4" />
                            <ModeToggle />
                        </div>
                    </div>

                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
