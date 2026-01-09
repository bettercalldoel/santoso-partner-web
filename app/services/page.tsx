// app/services/page.tsx

import Link from 'next/link';

interface IServiceTestimonial {
  quote: string;
  name: string;
}
interface IServiceData {
  id: number;
  name: string;
  description: string;
  price: string;
  testimonials: IServiceTestimonial[];
}

const servicesData: IServiceData[] = [
  {
    id: 1,
    name: 'Konsultasi Pajak Korporat',
    description: 'Analisis mendalam dan bimbingan strategis untuk PPh Badan, PPN, dan tax risk.',
    price: 'Mulai dari Rp 5.000.000 / bulan',
    testimonials: [{ quote: 'Sangat membantu restrukturisasi pajak kami.', name: 'Manajemen PT Industri Berat' }],
  },
  {
    id: 2,
    name: 'Pelaporan SPT Tahunan',
    description: 'Menangani seluruh proses pelaporan SPT pribadi maupun badan secara end-to-end.',
    price: 'Mulai dari Rp 1.500.000 / laporan',
    testimonials: [{ quote: 'Pelaporan SPT saya tidak pernah semudah ini.', name: 'Budi S., Karyawan Swasta' }],
  },
  {
    id: 3,
    name: 'Perencanaan Pajak (Tax Planning)',
    description: 'Strategi proaktif untuk meminimalkan beban pajak Anda secara legal dan aman.',
    price: 'By Project Assessment',
    testimonials: [{ quote: 'Perencanaan mereka menghemat banyak biaya.', name: 'Owner, Startup Teknologi' }],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50">
      <section className="bg-[#0f3d3e] text-[#f5f1e8] py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Layanan Profesional Kami</h1>
          <p className="text-[#f5f1e8]/80 max-w-2xl mx-auto">
            Dari strategi pajak korporat hingga pelaporan SPT, kami menyediakan layanan lengkap
            dengan standar kepatuhan yang tinggi dan komunikasi yang jelas.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 space-y-12">
          {servicesData.map((service) => (
            <section key={service.id} className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">{service.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
              <div className="mb-4">
                <span className="font-semibold text-gray-800">Detail Harga: </span>
                <span className="text-gray-700">{service.price}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Testimoni Klien:</h4>
                {service.testimonials.map((testimonial, index) => (
                  <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                    <p>"{testimonial.quote}"</p>
                    <cite className="block text-right not-italic text-sm text-gray-500">- {testimonial.name}</cite>
                  </blockquote>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Butuh Konsultasi Khusus?</h2>
          <p className="text-gray-600 mb-6">
            Tim kami siap menyesuaikan layanan untuk kebutuhan industri Anda.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
