import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "./ui";
import { faqs } from "../data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-brand-soft/40">
      <SectionHeading center eyebrow="FAQ" title="Preguntas frecuentes" />
      <div className="mx-auto mt-10 max-w-3xl space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="font-medium text-foreground">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                  open === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <div className={`grid transition-all ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm text-muted-foreground">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
