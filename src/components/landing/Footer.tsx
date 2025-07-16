import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "GitHub", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "mailto:hello@example.com", icon: Mail },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="space-y-8">
          <Logo />
          <p className="text-sm leading-6 text-gray-600">
            Empowering creators with AI-powered tools to transform their content
            creation process. Fast, simple, and incredibly powerful.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <IconComponent className="h-6 w-6" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="text-center">
            <p className="text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} AI SaaS Platform. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
