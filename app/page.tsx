"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Scissors,
  Sparkles,
  Star,
  Award,
  Armchair,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NAV_LINKS = [
  { label: "INICIO", href: "#home" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "NUESTRA HISTORIA", href: "#historia" },
  { label: "GALERIA", href: "#galeria" },
  { label: "CONTACTO", href: "#contacto" },
];

const SERVICES = [
  {
    icon: Scissors,
    name: "CORTE SIGNATURE",
    desc: "Corte de precision adaptado a tu estilo y personalidad.",
    price: "Desde $8.000",
  },
  {
    icon: Sparkles,
    name: "AFEITADO CLASICO",
    desc: "Afeitado a navaja con toalla caliente y productos premium.",
    price: "Desde $7.000",
  },
  {
    icon: Armchair,
    name: "ARREGLO DE BARBA",
    desc: "Perfilado y diseño experto para una barba prolija.",
    price: "Desde $5.000",
  },
  {
    icon: Award,
    name: "GROOMING PREMIUM",
    desc: "Tratamientos de alta gama para cabello y barba.",
    price: "Desde $4.000",
  },
];

const GALLERY = [
  { src: "/images/hero.png", title: "Corte Fade Clasico" },
  { src: "/images/feature.png", title: "Afeitado a Navaja" },
  { src: "/images/feature.png", title: "Diseño de Barba" },
  { src: "/images/hero.png", title: "Estilo Pompadour" },
];

const TESTIMONIALS = [
  {
    name: "Martin R.",
    text: "El mejor corte que me hice en Buenos Aires. Atencion impecable y ambiente unico.",
  },
  {
    name: "Federico G.",
    text: "El afeitado clasico es una experiencia. Volveria todas las semanas si pudiera.",
  },
  {
    name: "Ignacio P.",
    text: "Profesionales de verdad. Se nota el cuidado en cada detalle del local y del servicio.",
  },
];

const TIME_SLOTS = [
  "10:00","10:30","11:00","11:30","12:00","12:30",
  "14:00","14:30","15:00","15:30","16:00","16:30",
  "17:00","17:30","18:00","18:30","19:00","19:30",
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    service: "CORTE SIGNATURE",
    date: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        }
      );
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () =>
    setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F3F0", fontFamily: "Inter, sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(26, 26, 26, 0.85)", backdropFilter: "blur(8px)" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          <div>
            <p
              className="text-white font-bold text-sm md:text-base tracking-widest"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              BARBERIA EL CORTE
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-6" style={{ backgroundColor: "#8B6F47" }} />
              <span className="text-[10px] tracking-widest" style={{ color: "#8B6F47" }}>
                BUENOS AIRES
              </span>
              <span className="h-px w-6" style={{ backgroundColor: "#8B6F47" }} />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-widest text-white/80 hover:text-[#8B6F47] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#reserva">
              <Button
                className="rounded-none text-xs tracking-widest px-6 py-5"
                style={{ backgroundColor: "#8B6F47", color: "#1A1A1A" }}
              >
                RESERVAR TURNO
              </Button>
            </a>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
          style={{ backgroundColor: "rgba(26, 26, 26, 0.95)" }}
        >
          <div className="flex flex-col gap-5 px-6 pb-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm tracking-widest text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a href="#reserva" onClick={() => setMenuOpen(false)}>
              <Button
                className="rounded-none text-xs tracking-widest w-full py-5"
                style={{ backgroundColor: "#8B6F47", color: "#1A1A1A" }}
              >
                RESERVAR TURNO
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="pt-20 grid md:grid-cols-2"
        style={{
          background: "linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 60%, #1A1A1A 100%)",
        }}
      >
        <div className="flex flex-col justify-center px-6 md:px-16 py-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
            <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
              DESDE 2018
            </span>
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-white leading-tight uppercase"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            CORTES DE
            <br />
            PRECISION.
          </h1>
          <h1
            className="text-5xl md:text-6xl font-bold leading-tight uppercase mb-6"
            style={{ fontFamily: "Montserrat, sans-serif", color: "#8B6F47" }}
          >
            ESTILO
            <br />
            ATEMPORAL.
          </h1>
          <span className="h-px w-16 mb-6" style={{ backgroundColor: "#8B6F47" }} />
          <p className="text-white/70 max-w-md mb-8 leading-relaxed">
            Una barberia moderna construida sobre el oficio clasico. Cortes
            expertos, afeitados a navaja y grooming premium para el hombre
            actual.
          </p>
          <a href="#reserva">
            <Button
              className="rounded-none text-xs tracking-widest px-8 py-6 flex items-center gap-3"
              style={{ backgroundColor: "#8B6F47", color: "#1A1A1A" }}
            >
              RESERVA TU TURNO
              <ArrowRight size={16} />
            </Button>
          </a>
        </div>
        <div className="relative min-h-[420px]">
          <Image
            src="/images/hero.png"
            alt="Barbero trabajando en un corte de precision"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ backgroundColor: "#2C2C2C" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Scissors, value: "2.500+", label: "CLIENTES SATISFECHOS" },
            { icon: Sparkles, value: "6+", label: "AÑOS DE OFICIO" },
            { icon: Star, value: "4.9", label: "CALIFICACION PROMEDIO" },
            { icon: Award, value: "PREMIUM", label: "PRODUCTOS UNICAMENTE" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <stat.icon size={30} style={{ color: "#8B6F47" }} />
              <div>
                <p
                  className="text-2xl md:text-3xl font-bold text-white"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-widest text-white/60">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
                <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
                  NUESTROS SERVICIOS
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold uppercase"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#1A1A1A" }}
              >
                SERVICIO EXPERTO. SIEMPRE.
              </h2>
            </div>
            <a href="#reserva" className="mt-6 md:mt-0">
              <Button
                variant="outline"
                className="rounded-none text-xs tracking-widest"
                style={{ borderColor: "#8B6F47", color: "#8B6F47" }}
              >
                VER TODOS LOS SERVICIOS
              </Button>
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {SERVICES.map((service) => (
              <Card
                key={service.name}
                className="rounded-none border p-6 hover:shadow-lg transition-shadow flex-1 flex items-start gap-5"
                style={{ borderColor: "#8B6F47", backgroundColor: "#F5F3F0" }}
              >
                <div
                  className="w-14 h-14 rounded-full border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: "#8B6F47" }}
                >
                  <service.icon size={24} style={{ color: "#8B6F47" }} />
                </div>
                <div>
                  <h3
                    className="text-sm font-bold tracking-widest mb-3"
                    style={{ fontFamily: "Montserrat, sans-serif", color: "#1A1A1A" }}
                  >
                    {service.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "#666666" }}>
                    {service.desc}
                  </p>
                  <p className="font-bold text-lg" style={{ color: "#1A1A1A" }}>
                    {service.price}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY MASONRY */}
      <section id="galeria" className="py-24" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
            <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
              NUESTRO ESPACIO
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-white mb-12"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            HECHO PARA CABALLEROS
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="relative group overflow-hidden h-[250px] md:h-[300px]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-black/60">
                  <p className="text-white text-xs tracking-widest p-4">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BENTO / HISTORIA */}
      <section id="historia" className="py-24 px-6 md:px-16" style={{ backgroundColor: "#F5F3F0" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-[420px] order-2 md:order-1">
            <Image
              src="/images/feature.png"
              alt="Interior de la barberia El Corte"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
              <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
                NUESTRA HISTORIA
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase mb-6"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#1A1A1A" }}
            >
              OFICIO CLASICO, MIRADA MODERNA
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#666666" }}>
              Barberia El Corte nacio en Buenos Aires con una idea simple:
              combinar la tradicion del oficio barberil con un ambiente
              contemporaneo y prolijo. Cada corte es una conversacion entre
              precision tecnica y estilo personal.
            </p>
            <div className="space-y-4">
              {[
                "Barberos formados en tecnicas clasicas y modernas",
                "Productos premium seleccionados con cuidado",
                "Ambiente pensado para relajarse y disfrutar",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={18} style={{ color: "#8B6F47" }} className="mt-0.5" />
                  <p style={{ color: "#2C2C2C" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-24 px-6 md:px-16" style={{ backgroundColor: "#2C2C2C" }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
            <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
              TESTIMONIOS
            </span>
            <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-white mb-10"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            LO QUE DICEN NUESTROS CLIENTES
          </h2>

          <div className="flex items-center justify-center gap-6">
            <button onClick={prevTestimonial} aria-label="Anterior">
              <ChevronLeft className="text-white/60 hover:text-[#8B6F47]" size={28} />
            </button>
            <div className="min-h-[160px] flex flex-col items-center justify-center">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#8B6F47" style={{ color: "#8B6F47" }} />
                ))}
              </div>
              <p className="text-white/80 text-lg italic mb-4 max-w-xl">
                &quot;{TESTIMONIALS[testimonialIndex].text}&quot;
              </p>
              <p className="text-sm tracking-widest" style={{ color: "#8B6F47" }}>
                {TESTIMONIALS[testimonialIndex].name}
              </p>
            </div>
            <button onClick={nextTestimonial} aria-label="Siguiente">
              <ChevronRight className="text-white/60 hover:text-[#8B6F47]" size={28} />
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="reserva" className="py-24 px-6 md:px-16" style={{ backgroundColor: "#F5F3F0" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
              <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
                RESERVA TU TURNO
              </span>
              <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#1A1A1A" }}
            >
              ASEGURA TU LUGAR
            </h2>
          </div>

          {status === "success" ? (
            <Card className="rounded-none border p-10 text-center" style={{ borderColor: "#8B6F47" }}>
              <Check size={40} className="mx-auto mb-4" style={{ color: "#8B6F47" }} />
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "Montserrat, sans-serif", color: "#1A1A1A" }}
              >
                TURNO SOLICITADO CON EXITO
              </h3>
              <p style={{ color: "#666666" }}>
                Nos pondremos en contacto para confirmar tu horario a la brevedad.
              </p>
            </Card>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border p-8 md:p-12"
              style={{ borderColor: "#8B6F47", backgroundColor: "#FFFFFF" }}
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                    NOMBRE COMPLETO
                  </label>
                  <Input
                    required
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="rounded-none"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                    EMAIL
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                    SERVICIO
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full h-10 border px-3 rounded-none text-sm"
                    style={{ borderColor: "#e5e5e5" }}
                  >
                    {SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                    FECHA PREFERIDA
                  </label>
                  <Input
                    required
                    type="date"
                    name="date"
                    value={formState.date}
                    onChange={handleChange}
                    className="rounded-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                  HORARIO PREFERIDO (INTERVALOS DE 30 MIN)
                </label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormState({ ...formState, time: slot })}
                      className="text-xs py-2 border transition-colors"
                      style={{
                        borderColor: formState.time === slot ? "#8B6F47" : "#e5e5e5",
                        backgroundColor: formState.time === slot ? "#8B6F47" : "transparent",
                        color: formState.time === slot ? "#F5F3F0" : "#2C2C2C",
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xs tracking-widest mb-2 block" style={{ color: "#666666" }}>
                  MENSAJE (OPCIONAL)
                </label>
                <Textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Alguna preferencia o detalle adicional"
                  className="rounded-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm mb-4 text-red-600">
                  Ocurrio un error al enviar tu reserva. Por favor intenta nuevamente.
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="rounded-none w-full py-6 text-xs tracking-widest"
                style={{ backgroundColor: "#8B6F47", color: "#1A1A1A" }}
              >
                {status === "loading" ? "ENVIANDO..." : "CONFIRMAR RESERVA"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT SPLIT */}
      <section id="contacto" className="grid md:grid-cols-2" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="px-6 md:px-16 py-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-px w-8" style={{ backgroundColor: "#8B6F47" }} />
            <span className="text-xs tracking-widest" style={{ color: "#8B6F47" }}>
              VISITANOS
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold uppercase text-white mb-8"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            HORARIOS Y UBICACION
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin size={22} style={{ color: "#8B6F47" }} className="mt-1" />
              <div>
                <p className="text-white font-bold text-sm mb-1">UBICACION</p>
                <p className="text-white/60 text-sm">Buenos Aires, Argentina</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={22} style={{ color: "#8B6F47" }} className="mt-1" />
              <div>
                <p className="text-white font-bold text-sm mb-1">HORARIOS</p>
                <p className="text-white/60 text-sm">Lunes a Sabado, 10 a 20 hs</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={22} style={{ color: "#8B6F47" }} className="mt-1" />
              <div>
                <p className="text-white font-bold text-sm mb-1">TELEFONO</p>
                <a href="tel:+541100000000" className="text-white/60 text-sm hover:text-[#8B6F47]">
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={22} style={{ color: "#8B6F47" }} className="mt-1" />
              <div>
                <p className="text-white font-bold text-sm mb-1">EMAIL</p>
                <a
                  href="mailto:contacto@elcortebarberia.com"
                  className="text-white/60 text-sm hover:text-[#8B6F47]"
                >
                  contacto@elcortebarberia.com
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative min-h-[320px]" style={{ backgroundColor: "#2C2C2C" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={40} style={{ color: "#8B6F47" }} className="mx-auto mb-3" />
              <p className="text-white/40 text-sm tracking-widest">MAPA DE UBICACION</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#1A1A1A" }} className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 grid md:grid-cols-4 gap-10">
          <div>
            <p
              className="text-white font-bold text-sm tracking-widest mb-3"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              BARBERIA EL CORTE
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              Cortes de precision y estilo atemporal en el corazon de Buenos Aires.
            </p>
          </div>
          <div>
            <p className="text-white text-xs tracking-widest mb-4">NAVEGACION</p>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} className="text-white/50 text-sm hover:text-[#8B6F47]">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-xs tracking-widest mb-4">SERVICIOS</p>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <span key={s.name} className="text-white/50 text-sm">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-xs tracking-widest mb-4">CONTACTO</p>
            <p className="text-white/50 text-sm mb-2">Buenos Aires, Argentina</p>
            <a href="mailto:contacto@elcortebarberia.com" className="text-white/50 text-sm hover:text-[#8B6F47]">
              contacto@elcortebarberia.com
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-white/30 text-xs tracking-widest">
            © 2024 BARBERIA EL CORTE. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </footer>
    </div>
  );
}