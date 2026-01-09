import Image from 'next/image';

interface RandomUser {
  name: { first: string; last: string };
  picture: { large: string };
  location: { city: string; country: string };
}

const roles = [
  'Senior Tax Consultant',
  'Compliance Strategist',
  'Transfer Pricing Lead',
  'Corporate Tax Advisor',
  'VAT Specialist',
  'Payroll & Benefits Analyst',
  'Audit Liaison',
  'Client Success Partner',
];

export default async function TeamsPage() {
  let members: RandomUser[] = [];
  try {
    const response = await fetch('https://randomuser.me/api/?results=8&nat=us', {
      cache: 'no-store',
    });
    const data = (await response.json()) as { results: RandomUser[] };
    members = data.results;
  } catch {
    members = [];
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tim Kami</h1>
          <p className="text-gray-600">
            Konsultan lintas disiplin yang siap membantu strategi pajak dan kepatuhan bisnis Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-gray-600">
                Data tim tidak tersedia saat ini. Silakan muat ulang halaman.
              </p>
            </div>
          ) : (
            members.map((member, index) => (
              <div key={`${member.name.first}-${index}`} className="bg-white rounded-2xl shadow-lg p-6">
                <Image
                  src={member.picture.large}
                  alt={`${member.name.first} ${member.name.last}`}
                  width={160}
                  height={160}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {member.name.first} {member.name.last}
                </h3>
                <p className="text-sm text-blue-600 text-center mb-3">
                  {roles[index % roles.length]}
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Berbasis di {member.location.city}, {member.location.country}. Fokus pada
                  optimalisasi pajak, audit readiness, dan pertumbuhan klien.
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
