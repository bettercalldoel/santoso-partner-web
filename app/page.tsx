// app/page.tsx
import Head from 'next/head';

// Definisikan tipe
interface IService {
  title: string;
  description: string;
}
interface ITestimonial {
  quote: string;
  name: string;
  company: string;
}

// Data Dummy
const services: IService[] = [
  { title: 'Konsultasi Pajak', description: 'Bimbingan ahli untuk mengoptimalkan kewajiban pajak Anda.' },
  { title: 'Pelaporan SPT Tahunan', description: 'Layanan pelaporan pajak yang akurat dan tepat waktu.' },
  { title: 'Perencanaan Pajak', description: 'Strategi proaktif untuk masa depan finansial Anda.' },
];
const testimonials: ITestimonial[] = [
  { quote: 'Santoso & Partner sangat profesional.', name: 'Budi Santoso', company: 'CEO, PT Maju Mundur' },
  { quote: 'Pelayanan cepat dan solutif.', name: 'Citra Lestari', company: 'Owner, Kopi Kenangan Manis' },
  { quote: 'Tim yang ahli dan responsif.', name: 'Agus Wijaya', company: 'Direktur Keuangan, PT Selalu Jaya' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section - DENGAN BACKGROUND IMAGE BARU */}
      <header 
        className="relative bg-cover bg-center" 
        style={{ backgroundImage: "url('/images/office-building.jpg')", minHeight: '50vh' }}
      >
        {/* Overlay gelap agar teks putih tetap terbaca */}
        <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
        
        {/* Konten Hero, dinaikkan di atas overlay (z-10) */}
        <div className="container mx-auto px-6 py-20 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"> 
            Santoso & Partner
          </h1>
          <p className="text-xl text-gray-200 mb-12">
            Your Trusted Partner in Tax Solutions
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.title} 
                  // Service Boxes semi-transparan untuk tampilan elegan
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-100">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Testimonial Section (Tidak Berubah) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Apa Kata Klien Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 p-6 rounded-lg shadow-md">
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