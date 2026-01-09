// app/about/page.tsx
import Image from 'next/image';

interface ITeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}
interface IMilestone {
  year: string;
  title: string;
  description: string;
}

const teamMembers: ITeamMember[] = [
  {
    name: 'Santoso Utama',
    role: 'Founder & Senior Partner',
    bio: '20+ tahun memimpin strategi pajak korporat dan restrukturisasi.',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Elisa Putri',
    role: 'Managing Partner',
    bio: 'Ahli regulasi pajak lintas negara dan compliance audit.',
    image: 'https://randomuser.me/api/portraits/women/75.jpg',
  },
  {
    name: 'Bambang Irawan',
    role: 'Senior Tax Consultant',
    bio: 'Spesialis PPN, PPh, dan kepatuhan UMKM.',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Junior Consultant',
    bio: 'Pendampingan pelaporan SPT perorangan dan payroll tax.',
    image: 'https://randomuser.me/api/portraits/women/76.jpg',
  },
];
const milestones: IMilestone[] = [
  {
    year: '2005',
    title: 'Perjalanan Dimulai',
    description: 'Kantor pertama dibuka di Jakarta dengan fokus pada konsultasi pajak UMKM.',
  },
  {
    year: '2012',
    title: 'Ekspansi Regional',
    description: 'Membentuk tim lintas kota untuk melayani klien korporat multinasional.',
  },
  {
    year: '2018',
    title: 'Digital Compliance',
    description: 'Mengadopsi sistem pelaporan digital untuk mempercepat monitoring klien.',
  },
  {
    year: '2024',
    title: 'Growth Partner',
    description: 'Lebih dari 200 klien mempercayakan strategi pajak dan pertumbuhan bisnis.',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f5f1e8]">
      <div className="container mx-auto px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          Tentang Santoso & Partner
        </h1>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl mx-auto text-center">
          Didirikan pada 2005, Santoso & Partner membantu bisnis menavigasi kompleksitas pajak
          di Indonesia dan Asia Tenggara. Kami memadukan wawasan regulasi, teknologi, dan
          pendekatan konsultatif untuk menjaga kepatuhan sekaligus mendorong pertumbuhan.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Jejak Perjalanan Kami
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-600 mb-2">
                {milestone.year}
              </p>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {milestone.title}
              </h3>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          ))}
        </div>
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

      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Budaya Kami
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Kami menjunjung tinggi Integritas, Profesionalisme, dan Kolaborasi.
            Lingkungan kerja kami fokus pada pembelajaran berkelanjutan dan pelayanan
            yang jelas serta akuntabel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="bg-gray-50 rounded-lg p-4">
              Transparansi komunikasi dengan klien di setiap tahap.
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              Keputusan berbasis data dan analisis risiko.
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              Komitmen pada hasil yang terukur dan berkelanjutan.
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
