// app/page.tsx

import Link from 'next/link';

interface IService {
  title: string;
  description: string;
  cta: string;
}
interface ITestimonial {
  quote: string;
  name: string;
  company: string;
}

const services: IService[] = [
  {
    title: 'Konsultasi Pajak',
    description: 'Bimbingan ahli untuk mengoptimalkan kewajiban pajak dan kepatuhan Anda.',
    cta: 'Jadwalkan Sesi',
  },
  {
    title: 'Pelaporan SPT Tahunan',
    description: 'Layanan pelaporan pajak yang akurat, tepat waktu, dan aman.',
    cta: 'Lihat Paket',
  },
  {
    title: 'Perencanaan Pajak',
    description: 'Strategi proaktif agar arus kas tetap sehat dan risiko terkendali.',
    cta: 'Mulai Audit',
  },
];
const testimonials: ITestimonial[] = [
  {
    quote: 'Santoso & Partner sangat profesional dan fokus pada solusi jangka panjang.',
    name: 'Budi Santoso',
    company: 'CEO, PT Maju Mundur',
  },
  {
    quote: 'Pelayanan cepat, jelas, dan selalu proaktif mengingatkan timeline.',
    name: 'Citra Lestari',
    company: 'Owner, Kopi Kenangan Manis',
  },
  {
    quote: 'Tim yang ahli dan responsif, laporan pajak kami lebih rapi dari sebelumnya.',
    name: 'Agus Wijaya',
    company: 'Direktur Keuangan, PT Selalu Jaya',
  },
];

export default function Home() {
  return (
    <>
      <header
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/office-building.jpg')" }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-[#0f3d3e]/90 via-[#0f3d3e]/75 to-transparent"></div>
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#f5f1e8]/30 blur-3xl"></div>
        <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10 text-white">
          <div className="max-w-3xl animate-fade-up">
            <p className="uppercase tracking-[0.3em] text-xs text-[#f5f1e8] mb-4">
              Konsultan Pajak Premium
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Santoso & Partner
            </h1>
            <p className="text-xl text-[#f5f1e8] mb-8">
              Your Trusted Partner in Tax Solutions. Misi kami adalah membantu bisnis
              bertumbuh dengan kepatuhan yang jelas dan strategi pajak yang cerdas.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="bg-[#f5f1e8] text-[#0f3d3e] px-6 py-3 rounded-full font-semibold hover:bg-white transition"
              >
                Jelajahi Layanan
              </Link>
              <Link
                href="/teams"
                className="border border-[#f5f1e8] text-[#f5f1e8] px-6 py-3 rounded-full font-semibold hover:bg-[#f5f1e8] hover:text-[#0f3d3e] transition"
              >
                Temui Tim Kami
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-up-delay">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-[#f5f1e8]/90 mb-4">{service.description}</p>
                <span className="text-xs uppercase tracking-[0.2em] text-[#f5f1e8]">
                  {service.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Membangun Kepercayaan Sejak 2005
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Santoso & Partner berawal dari tim kecil konsultan yang ingin membuat pajak
                terasa lebih mudah bagi pemilik bisnis. Kini kami dipercaya lebih dari 200
                perusahaan di Indonesia, Singapura, dan Asia Tenggara untuk menavigasi
                regulasi yang terus berubah.
              </p>
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-3xl font-bold text-[#0f3d3e]">200+</p>
                  <p className="text-sm text-gray-500">Klien Aktif</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0f3d3e]">35</p>
                  <p className="text-sm text-gray-500">Konsultan Bersertifikat</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-[#0f3d3e]">18</p>
                  <p className="text-sm text-gray-500">Tahun Pengalaman</p>
                </div>
              </div>
            </div>
            <div className="bg-[#f5f1e8] p-8 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Budaya Kerja Kami
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>Integritas sebagai standar utama setiap keputusan.</li>
                <li>Kolaborasi lintas disiplin untuk solusi menyeluruh.</li>
                <li>Berorientasi pada data dan hasil yang terukur.</li>
                <li>Komunikasi yang jelas dan proaktif.</li>
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center mt-6 text-[#0f3d3e] font-semibold hover:underline"
              >
                Pelajari lebih lanjut &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0f3d3e] text-[#f5f1e8]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold">Solusi Pajak End-to-End</h2>
              <p className="text-[#f5f1e8]/80">
                Layanan yang dirancang untuk bisnis rintisan hingga korporasi.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center bg-[#f5f1e8] text-[#0f3d3e] px-5 py-3 rounded-full font-semibold hover:bg-white transition"
            >
              Lihat Semua Layanan
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-[#f5f1e8]/80 mb-6">{service.description}</p>
                <Link href="/services" className="text-sm font-semibold hover:underline">
                  {service.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Apa Kata Klien Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 p-6 rounded-2xl shadow-md">
                <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-gray-800 font-bold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
