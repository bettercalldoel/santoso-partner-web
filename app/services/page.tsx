// app/services/page.tsx

// Definisikan Tipe
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

// Data Dummy Layanan
const servicesData: IServiceData[] = [
  { id: 1, name: 'Konsultasi Pajak Korporat', description: 'Analisis mendalam dan bimbingan strategis untuk PPh Badan, PPN, dll.', price: 'Mulai dari Rp 5.000.000 / bulan', testimonials: [{ quote: 'Sangat membantu restrukturisasi pajak kami.', name: 'Manajemen PT Industri Berat' }] },
  { id: 2, name: 'Pelaporan SPT Tahunan', description: 'Kami menangani seluruh proses pelaporan SPT Anda.', price: 'Mulai dari Rp 1.500.000 / laporan', testimonials: [{ quote: 'Pelaporan SPT saya tidak pernah semudah ini.', name: 'Budi S., Karyawan Swasta' }] },
  { id: 3, name: 'Perencanaan Pajak (Tax Planning)', description: 'Strategi proaktif untuk meminimalkan beban pajak Anda secara legal.', price: 'By Project Assessment', testimonials: [{ quote: 'Perencanaan mereka menghemat banyak biaya.', name: 'Owner, Startup Teknologi' }] },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          Layanan Profesional Kami
        </h1>
        <div className="space-y-12">
          {servicesData.map((service) => (
            <section key={service.id} className="bg-white p-8 rounded-lg shadow-lg">
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
      </div>
    </div>
  );
}