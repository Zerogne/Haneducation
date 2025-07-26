"use client"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HAN</span>
              </div>
              <span className="font-bold text-xl">HAN Education</span>
            </div>
            <p className="text-muted-foreground">
              {t("HeroSubtitle")}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t("ServicesBadge")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Service1Title")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Service2Title")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Service3Title")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Service4Title")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t("AboutBadge")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("AboutBadge")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("TeamBadge")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("PartnerUniversities")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Career")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t("Contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">{t("Contact")}</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{t("ContactPhone")}: +976 7777 7777</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{t("ContactEmail")}: info@haneducation.mn</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{t("ContactAddressValue")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HAN Education. {t("ContactCopyright")}</p>
        </div>
      </div>
    </footer>
  )
}
