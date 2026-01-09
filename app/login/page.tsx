// app/login/page.tsx
'use client'; // <-- WAJIB untuk komponen dengan state/interaksi

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { setStoredUser } from '@/lib/auth';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedName =
      name.trim() ||
      trimmedEmail.split('@')[0]?.replace(/[^a-z0-9]+/gi, ' ').trim() ||
      'User';

    if (!trimmedEmail || !password.trim()) {
      setMessage('Email dan password wajib diisi.');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setMessageType('');

    try {
      if (!isLogin) {
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            password: password.trim(),
          }),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(errorData.message || 'Registrasi gagal.');
        }
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmedEmail,
          password: password.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login gagal.');
      }

      const data = (await response.json()) as {
        user: { name?: string; email: string; userToken: string };
      };

      if (!data.user.userToken) {
        throw new Error('Token login tidak ditemukan. Coba lagi.');
      }

      const role =
        trimmedEmail.startsWith('admin@') || trimmedEmail.endsWith('@santoso.co.id')
          ? 'admin'
          : 'editor';

      setStoredUser({
        name: data.user.name || trimmedName,
        email: data.user.email,
        role,
        token: data.user.userToken,
      });

      setMessage('Login berhasil. Mengarahkan ke halaman Create Blog...');
      setMessageType('success');
      router.push('/blog/create');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Terjadi kesalahan. Coba lagi.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md m-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isLogin ? 'Login Akun Anda' : 'Buat Akun Baru'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Memproses...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm text-center mt-4 ${
              messageType === 'error' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-6">
          <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-blue-600 hover:underline">
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
          </button>
        </div>
      </div>
    </div>
  );
}
