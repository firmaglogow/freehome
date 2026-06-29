import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export default function ContactSection() {
  return (
    <section
      id="kontakt"
      className="border-t border-gold-500/10 bg-forest-800 py-20 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Dane + mapa */}
          <div>
            <SectionHeading
              eyebrow="Kontakt"
              title="Porozmawiajmy o Twojej nieruchomości"
              subtitle="Wpadnij do biura przy ul. Grodzkiej 18 albo napisz — odezwiemy się szybko."
            />

            <div className="mt-7 space-y-3 text-sm">
              <p className="font-display text-base text-cream">
                {site.fullName}
              </p>
              <p className="text-cream/85">
                <span className="text-cream/55">Adres: </span>
                {site.address.street}, {site.address.city}
              </p>
              <p className="text-cream/85">
                <span className="text-cream/55">Telefon: </span>
                <a href={site.phoneHref} className="text-gold-400 hover:underline">
                  {site.phone}
                </a>
              </p>
              <p className="text-cream/85">
                <span className="text-cream/55">E-mail: </span>
                <a
                  href={`mailto:${site.email}`}
                  className="text-gold-400 hover:underline"
                >
                  {site.email}
                </a>
              </p>
              <p className="text-cream/85">
                <span className="text-cream/55">Godziny: </span>
                {site.hours}
              </p>
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-gold-500/15">
              {/* Mapa OpenStreetMap (tymczasowo iframe; docelowo Leaflet z pinami ofert) */}
              <iframe
                title="Mapa — biuro FREE HOME, Głogów"
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=16.06%2C51.65%2C16.12%2C51.68&layer=mapnik&marker=51.6635%2C16.0858"
              />
            </div>
          </div>

          {/* Formularz */}
          <div className="rounded-3xl border border-gold-500/15 bg-forest-900 p-7 sm:p-8">
            <h3 className="text-xl text-cream">Napisz do nas</h3>
            <p className="mt-1 mb-5 text-sm text-cream/60">
              Wypełnij krótki formularz — oddzwonimy.
            </p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
