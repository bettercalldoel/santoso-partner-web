// app/about/page.tsx
import Image from 'next/image';

// Definisikan tipe
interface ITeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

// Data Tim Dummy
const teamMembers: ITeamMember[] = [
  { name: 'Santoso Utama', role: 'Founder & Senior Partner', bio: 'Pengalaman 20+ tahun.', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { name: 'Elisa Putri', role: 'Managing Partner', bio: 'Ahli dalam regulasi pajak internasional.', image: 'https://randomuser.me/api/portraits/women/75.jpg' },
  { name: 'Bambang Irawan', role: 'Senior Tax Consultant', bio: 'Spesialis PPN dan kepatuhan UMKM.', image: 'https://randomuser.me/api/portraits/men/76.jpg' },
  { name: 'Dewi Anggraini', role: 'Junior Consultant', bio: 'Membantu pelaporan SPT perorangan.', image: 'https://randomuser.me/api/portraits/women/76.jpg' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Sejarah Perusahaan */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Tentang Santoso & Partner
        </h1>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto">
          Didirikan pada tahun 2005, Santoso & Partner berawal dari visi sederhana: membantu bisnis menavigasi kompleksitas pajak di Indonesia.
        </p>
      </section>

      {/* Tim Kami */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Tim Profesional Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white text-center shadow-lg rounded-lg p-6">
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Budaya Perusahaan */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Budaya Kami
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-4 leading-relaxed">
            Kami menjunjung tinggi nilai Integritas, Profesionalisme, dan Kolaborasi.
          </p>
        </div>
      </section>
    </div>
  );
}